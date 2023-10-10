import React from 'react';

import { generateRouter } from '../routing';


export const RoutingContext = React.createContext<Fabiulous.Routing.ContextProps<Fabiulous.Routing.Config>>({
  router: generateRouter(() => {}, {}),
  location: {
    pathname: window.location.pathname,
    search: '',
    hash: '',
  },
  go: () => {},
});
