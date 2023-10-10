/// <reference types="react" />
import { Routing } from './types';
export { generateRoutes } from './routing';
export * from './helpers/query';
export declare const generateRouting: <T extends Routing.Config>(fn: Routing.ConfigFn, config: T) => {
    RoutingContext: import("react").Context<Routing.ContextProps<Routing.RecursiveRoutes<T>>>;
    useRouter: () => Routing.RecursiveRoutes<T>;
    useQueryState: <T_1 = string>(name: string, defaultValue?: T_1 | undefined) => [import("./types").Maybe<T_1>, (value?: import("./types").MaybeNull<T_1> | undefined) => void];
    useDebouncedQueryState: <T_2 = string>(name: string, defaultValue?: T_2 | undefined, delay?: number) => [import("./types").Maybe<T_2>, import("./types").Maybe<T_2>, import("react").Dispatch<import("react").SetStateAction<T_2 | undefined>>];
};
