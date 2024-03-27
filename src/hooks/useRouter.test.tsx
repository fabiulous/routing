import { expect, vi, describe, test } from "vitest";
import { renderHook } from '@testing-library/react'

import { routes } from '../tests/mocks';
import { generateRoutes, generateRouting } from '..';

const customFunction: (path: string, params: any, replace?: boolean | undefined) => void = vi.fn((() => {}));

const { RoutingContext, useRouter } = generateRouting(customFunction, routes);
const router = generateRoutes(customFunction, routes);

const wrapper = ({ children }: any) => {
  Object.defineProperty(window.location, 'search', {
    writable: true,
    value: '?name=Test'
  });

  return (
    <RoutingContext.Provider value={{
      router,
      location: window.location,
      go: (params, replace) => customFunction(window.location.pathname, params, replace),
    }}>
      {children}
    </RoutingContext.Provider>
  )
};
  

describe('useRouter', () => {
  test('Should return generated router', () => {
    const { result } = renderHook(() => useRouter(), { wrapper });

    const router = generateRoutes(customFunction, routes);
  
    expect(result.current.home.path).toBe(router.home.path);
    expect(result.current.auth.login.path).toBe(router.auth.login.path);
    expect(result.current.users.editTab(1, 'test').path).toBe(router.users.editTab(1, 'test').path);
  })
});
