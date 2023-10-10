import React from 'react';

import { Maybe, Routing } from './types';


const generateRoute = <T extends Routing.Routes> (fn: (path: string, params: Maybe<Routing.RouteParams>, replace?: boolean) => void, route: T, basePath: string = ''): Routing.Route | ((...args: (string | number)[]) => Routing.Route) => {
  if (typeof route === 'string') {
    const path = `${basePath}${route}`;
    return {
      path,
      go: (params, replace = false) => fn(path, params, replace),
    };
  }

  if (typeof route === 'function') {
    return args => {
      const routeResult = route(args);

      if (typeof routeResult === 'string') {
        const path = `${basePath}${routeResult}`;
        return {
          path,
          go: (params, replace = false) => fn(path, params, replace),
        };
      }
      const path = `${basePath}${routeResult.path}`;
      return {
        path,
        go: (params, replace = false) => fn(path, params, replace),
        ...generateRouter(fn, routeResult.routes, path),
      };
    };
  }

  const path = `${basePath}${route.path}`;

  return {
    path,
    go: (params, replace = false) => fn(path, params, replace),
    ...Object.keys(route.routes).reduce((prev, curr) => ({
      ...prev,
      [curr]: generateRoute(fn, route.routes[curr], path),
    }), {} as any),
  };
};


export const generateRouter = <T extends Routing.Config | Record<string, Routing.Routes>> (fn: (path: string, params: Maybe<Routing.RouteParams>, replace?: boolean) => void, routes: T, basePath: string = ''): Routing.RecursiveRoutes<T> => {
  return Object.keys(routes).reduce((prev, curr) => ({
    ...prev,
    [curr]: generateRoute(fn, routes[curr], basePath),
  }), {} as any);
};


export const createRoutingContext = <T extends Routing.Config> (
  routes: T,
  location: Location,
  go: (pathname: string, params: Maybe<Routing.RouteParams>, replace: Maybe<boolean>) => void,
) => {
  const router = generateRouter(go, routes);
  return React.createContext<Routing.ContextProps<T>>({
    router,
    location: undefined,
    go: (params, replace) => go(location.pathname, params, replace),
  });
}
