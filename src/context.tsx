import React from 'react';

import { Routing } from './types';
import { generateRoutes } from '.';


export const generateContext = <T extends Routing.Config>(fn: Routing.ConfigFn, config: T) => {
  const router = generateRoutes<T>(fn, config);

  const RoutingContext = React.createContext<Routing.ContextProps<Routing.RecursiveRoutes<T>>>({
    router,
    location: {
      pathname: window.location.pathname,
      search: '',
      hash: '',
    },
    go: (params, replace) => fn(window.location.pathname, params, replace),
  });

  return RoutingContext;
}
