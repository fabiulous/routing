import React from 'react';
import { Maybe, Routing } from './types';
export declare const generateRouter: <T extends Routing.Config | Record<string, Routing.Routes>>(fn: (path: string, params: Maybe<Routing.RouteParams>, replace?: boolean) => void, routes: T, basePath?: string) => Routing.RecursiveRoutes<T>;
export declare const createRoutingContext: <T extends Routing.Config>(routes: T, location: Location, go: (pathname: string, params: Maybe<Routing.RouteParams>, replace: Maybe<boolean>) => void) => React.Context<Routing.ContextProps<T>>;
