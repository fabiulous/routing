import { expect, vi, describe, test } from "vitest";
import { renderHook } from '@testing-library/react'
import { useRouter } from './useRouter'
import { routes } from '../tests/mocks';
import { RoutingContext } from '../context/RoutingContext';
import { generateRouter } from "../routing";

const customFunction = vi.fn((() => {}));

const wrapper = ({ children }: any) => {
  Object.defineProperty(window.location, 'search', {
    writable: true,
    value: '?name=Test'
  });

  const router = generateRouter(customFunction, routes);

  return (
    <RoutingContext.Provider value={{
      router,
      location: window.location,
      go: customFunction,
    }}>
      {children}
    </RoutingContext.Provider>
  )
};
  

describe('useRouter', () => {
  test('Should return generated router', () => {
    const { result } = renderHook(() => useRouter(), { wrapper });

    const router = generateRouter(customFunction, routes);
  
    // @ts-ignore
    expect(result.current.home.path).toBe(router.home.path);
    // @ts-ignore
    expect(result.current.auth.login.path).toBe(router.auth.login.path);
  })
});
