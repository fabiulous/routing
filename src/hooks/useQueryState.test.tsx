import { expect, vi, describe, test } from "vitest";
import { act, renderHook } from '@testing-library/react';

import { routes } from '../tests/mocks';
import { generateRoutes, generateRouting } from '..';

const customFunction: (path: string, params: any, replace?: boolean | undefined) => void = vi.fn((() => {}));

const { RoutingContext, useQueryState } = generateRouting(customFunction, routes);
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


describe('useQueryState', () => {
  test('Should mount with default value', async() => {
    renderHook(() => useQueryState('defaultParam', 'DefaultValue'), { wrapper });
  
    expect(customFunction).toHaveBeenLastCalledWith('blank', { defaultParam: 'DefaultValue' }, true );
  })

  test('Should send new value to go function', () => {
    const { result } = renderHook(() => useQueryState('name'), { wrapper });

    expect(result.current[0]).toBe('Test');

    act(() => {
      result.current[1]('UpdatedTest');
    });

    expect(customFunction).toHaveBeenLastCalledWith('blank', { name: 'UpdatedTest' }, undefined );
  })
});
