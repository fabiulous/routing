import React from 'react';


const generateRoute = <T extends Fabiulous.Routing.Routes> (fn: (path: string, params: Fabiulous.Maybe<Fabiulous.Routing.RouteParams>, replace?: boolean) => void, route: T, basePath: string = ''): Fabiulous.Routing.Route | ((...args: (string | number)[]) => Fabiulous.Routing.Route) => {
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


export const generateRouter = <T extends Fabiulous.Routing.Config | Record<string, Fabiulous.Routing.Routes>> (fn: (path: string, params: Fabiulous.Maybe<Fabiulous.Routing.RouteParams>, replace?: boolean) => void, routes: T, basePath: string = ''): Fabiulous.Routing.RecursiveRoutes<T> => {
  return Object.keys(routes).reduce((prev, curr) => ({
    ...prev,
    [curr]: generateRoute(fn, routes[curr], basePath),
  }), {} as any);
};


export const createRoutingContext = <T extends Fabiulous.Routing.Config> (
  routes: T,
  location: Location,
  go: (pathname: string, params: Fabiulous.Maybe<Fabiulous.Routing.RouteParams>, replace: Fabiulous.Maybe<boolean>) => void,
) => {
  const router = generateRouter(go, routes);
  return React.createContext<Fabiulous.Routing.ContextProps<T>>({
    router,
    location: undefined,
    go: (params, replace) => go(location.pathname, params, replace),
  });
}
