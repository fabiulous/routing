export type Maybe<T> = T | undefined;
export type MaybeNull<T> = T | null;
export type Noop = () => any;
export type MaybeNoop<T> = T | Noop;
export type PartialNull<T> = {
    [P in keyof T]?: T[P] | null;
};
export declare namespace Routing {
    type Location = {
        pathname: string;
        search: string;
        hash: string;
    };
    type ContextProps<T> = {
        router: T;
        location: Maybe<Routing.Location>;
        go: (params?: Record<string, unknown>, replace?: boolean) => void;
    };
    type PathRoute = string;
    type ComplexRoute = {
        path: PathRoute;
        routes: Record<string, Routes>;
    };
    type SimpleFunctionRoute = (...args: any[]) => PathRoute;
    type ComplexFunctionRoute = (...args: any[]) => ComplexRoute;
    type Routes = PathRoute | SimpleFunctionRoute | ComplexRoute | ComplexFunctionRoute;
    type ConfigFn = (path: string, params: Maybe<Routing.RouteParams>, replace?: boolean) => void;
    interface Config extends Record<string, PathRoute | ComplexRoute> {
    }
    type RouteParams = Record<string, unknown>;
    type Route = {
        path: string;
        go(params?: RouteParams, replace?: boolean): void;
    };
    type RecursiveRoutes<T extends Config | Record<string, Routes>> = {
        [K in keyof T]: T[K] extends PathRoute ? Route : T[K] extends ComplexRoute ? Route & RecursiveRoutes<T[K]['routes']> : T[K] extends SimpleFunctionRoute ? (...args: Parameters<T[K]>) => Route : T[K] extends ComplexFunctionRoute ? (...args: Parameters<T[K]>) => RecursiveRoutes<ReturnType<T[K]>['routes']> & Route : never;
    };
}
