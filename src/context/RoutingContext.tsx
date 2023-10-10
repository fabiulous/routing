import React from 'react';

import { generateRouter } from '../routing';
import { Routing } from '../types';


export const RoutingContext = React.createContext<Routing.ContextProps<Routing.Config>>({
  router: generateRouter(() => {}, {}),
  location: {
    pathname: window.location.pathname,
    search: '',
    hash: '',
  },
  go: () => {},
});
