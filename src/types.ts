
export type Maybe<T> = T | undefined;
export type MaybeNull<T> = T | null;
export type Noop = () => any;
export type MaybeNoop<T> = T | Noop;
export type PartialNull<T> = {
  [P in keyof T]?: T[P] | null;
};

export namespace Routing {
  export type Location = {
    pathname: string;
    search: string;
    hash: string;
  };

  export type ContextProps<T extends Routing.Config> = {
    router: Routing.RecursiveRoutes<T>;
    location: Maybe<Routing.Location>;
    go: (params?: Record<string, unknown>, replace?: boolean) => void;
  };

  export type PathRoute = string;
  
  export type ComplexRoute = {
    path: PathRoute;
    routes: Record<string, Routes>;
  }

  export type SimpleFunctionRoute = (...args: any[]) => PathRoute;

  export type ComplexFunctionRoute = (...args: any[]) => ComplexRoute;

  export type Routes = PathRoute | SimpleFunctionRoute | ComplexRoute | ComplexFunctionRoute;

  export interface Config extends Record<string, PathRoute | ComplexRoute> {}

  export type RouteParams = Record<string, unknown>;

  export type Route = {
    path: string;
    go(params?: RouteParams, replace?: boolean): void;
  }

  export type RecursiveRoutes<T extends Config | Record<string, Routes> = any> = {
    [K in keyof T]: T[K] extends PathRoute
      ? Route
      : T[K] extends ComplexRoute
      ? Route & RecursiveRoutes<T[K]['routes']>
      : T[K] extends SimpleFunctionRoute
      ? (...args: Parameters<T[K]>) => Route
      : T[K] extends ComplexFunctionRoute
      // @ts-ignore
      ? (...args: Parameters<T[K]>) => RecursiveRoutes<ReturnType<T[K]>['routes']> & Route
      : never;
  };
}
