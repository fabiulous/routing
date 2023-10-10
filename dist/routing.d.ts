import { Maybe, Routing } from './types';
export declare const generateRoutes: <T extends Record<string, Routing.Routes> | Routing.Config>(fn: (path: string, params: Maybe<Routing.RouteParams>, replace?: boolean) => void, routes: T, basePath?: string) => Routing.RecursiveRoutes<T>;
