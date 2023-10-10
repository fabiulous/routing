import React from 'react';
import { Routing } from '../types';
export declare const generateUseRouter: <T extends Routing.Config>(context: React.Context<Routing.ContextProps<Routing.RecursiveRoutes<T>>>) => () => Routing.RecursiveRoutes<T>;
