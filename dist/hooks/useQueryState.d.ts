import React from 'react';
import { Maybe, MaybeNull, Routing } from '../types';
export declare const generateUseQueryState: <T extends Routing.Config>(context: React.Context<Routing.ContextProps<Routing.RecursiveRoutes<T>>>) => <T_1 = string>(name: string, defaultValue?: T_1 | undefined) => [Maybe<T_1>, (value?: MaybeNull<T_1> | undefined) => void];
