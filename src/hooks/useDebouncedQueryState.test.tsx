import { expect, vi, describe, test, beforeEach } from "vitest";
import { act, renderHook } from '@testing-library/react'
import { useDebouncedQueryState } from './useDebouncedQueryState'
import { routes } from '../tests/mocks';
import { RoutingContext } from '../context/RoutingContext';
import { generateRouter } from "../routing";

const customFunction: (path: string, params: any, replace?: boolean | undefined) => void = vi.fn((() => {}));

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
      go: (params, replace) => customFunction(window.location.pathname, params, replace),
    }}>
      {children}
    </RoutingContext.Provider>
  )
};
  

describe('useDebouncedQueryState', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  test('Should mount with default value', async() => {
    renderHook(() => useDebouncedQueryState('defaultParam', 'DefaultValue'), { wrapper });
  
    expect(customFunction).toHaveBeenLastCalledWith('blank', { defaultParam: 'DefaultValue' }, true );
  })

  test('Should send new value to go function', () => {
    const { result } = renderHook(() => useDebouncedQueryState('name'), { wrapper });
  
    expect(result.current[0]).toBe('Test');
    expect(result.current[1]).toBe('Test');

    act(() => {
      result.current[2]('UpdatedTest');
    });

    vi.runAllTimers();
  
    expect(customFunction).toHaveBeenLastCalledWith('blank', { name: 'UpdatedTest' }, undefined);

    expect(result.current[0]).toBe('UpdatedTest');
    expect(result.current[1]).toBe('Test');

  })
});
