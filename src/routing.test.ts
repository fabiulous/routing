import { generateRoutes } from '../src/routing'
import { describe, expect, test, vi } from 'vitest'
import { routes } from './tests/mocks';

const customFunction = vi.fn(() => {})

describe('generateRouter testing', () => {
  const result = generateRoutes(customFunction, routes);

  test('Route paths', () => {
    expect(result.home.path).toBe('/')
    expect(result.auth.path).toBe('/auth');
    expect(result.auth.login.path).toBe('/auth/login');
    expect(result.users.path).toBe('/users');
    expect(result.users.create.path).toBe('/users/create');
    const editResult = result.users.edit();
    expect(editResult.path).toBe('/users/edit/:userId');
    const editResultWithId = result.users.edit(1);
    expect(editResultWithId.path).toBe('/users/edit/1');
    const editResultWithIdAndTab = result.users.editTab(1, 'test');
    expect(editResultWithIdAndTab.path).toBe('/users/edit/1/test');
  })

  test('Route go', () => {
    result.home.go();
    expect(customFunction).toHaveBeenLastCalledWith('/', undefined, false);
    result.home.go({ filter: 'value' });
    expect(customFunction).toHaveBeenLastCalledWith('/', { filter: 'value' }, false);
    result.home.go({ filter: 'value' }, true);
    expect(customFunction).toHaveBeenLastCalledWith('/', { filter: 'value' }, true);

    result.auth.go();
    expect(customFunction).toHaveBeenLastCalledWith('/auth', undefined, false);
    result.auth.go({ filter: 'value' });
    expect(customFunction).toHaveBeenLastCalledWith('/auth', { filter: 'value' }, false);
    result.auth.go({ filter: 'value' }, true);
    expect(customFunction).toHaveBeenLastCalledWith('/auth', { filter: 'value' }, true);

    result.users.go();
    expect(customFunction).toHaveBeenLastCalledWith('/users', undefined, false);
    result.users.edit(4).go();
    expect(customFunction).toHaveBeenLastCalledWith('/users/edit/4', undefined, false);
    result.users.edit(4).go({ filter: 'value'});
    expect(customFunction).toHaveBeenLastCalledWith('/users/edit/4', { filter: 'value'}, false);

    result.users.view(6).nested.view(10).go();
    expect(customFunction).toHaveBeenLastCalledWith('/users/6/nested/10', undefined, false);
    result.users.view(6).nested.view(10).edit.go();
    expect(customFunction).toHaveBeenLastCalledWith('/users/6/nested/10/edit', undefined, false);
  });
});
