import React from 'react';
import { Maybe, Routing } from '../types';
export declare const generateUseDebouncedQueryState: <T extends Routing.Config>(context: React.Context<Routing.ContextProps<Routing.RecursiveRoutes<T>>>) => <T_1 = string>(name: string, defaultValue?: T_1 | undefined, delay?: number) => [Maybe<T_1>, Maybe<T_1>, React.Dispatch<React.SetStateAction<T_1 | undefined>>];
