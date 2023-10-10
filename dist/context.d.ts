import React from 'react';
import { Routing } from './types';
export declare const generateContext: <T extends Routing.Config>(fn: Routing.ConfigFn, config: T) => React.Context<Routing.ContextProps<Routing.RecursiveRoutes<T>>>;
