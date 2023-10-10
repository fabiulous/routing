import React from 'react';

import { RoutingContext } from '../context/RoutingContext';

export const useRouter = () => {
  const { router } = React.useContext(RoutingContext);
  return router;
};
