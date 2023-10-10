import React from 'react';

import { Routing } from '../types';

export const generateUseRouter = <T extends Routing.Config>(context: React.Context<Routing.ContextProps<Routing.RecursiveRoutes<T>>>) => {
  return () => {
    const { router } = React.useContext(context);
    return router;
  };
}
