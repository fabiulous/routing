import { Routing } from './types';
import { generateContext } from './context';
import { generateUseDebouncedQueryState, generateUseQueryState, generateUseRouter } from './hooks';
export { generateRoutes } from './routing';


export const generateRouting = <T extends Routing.Config>(fn: Routing.ConfigFn, config: T) => {
  const RoutingContext = generateContext<T>(fn, config);
  const useRouter = generateUseRouter<T>(RoutingContext);
  const useQueryState = generateUseQueryState<T>(RoutingContext);
  const useDebouncedQueryState = generateUseDebouncedQueryState<T>(RoutingContext);

  return {
    RoutingContext,
    useRouter,
    useQueryState,
    useDebouncedQueryState,
  }
}
