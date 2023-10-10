
### Config

```ts
export const routes = {
  home: '/',
  auth: {
    path: '/auth',
    routes: {
      login: '/login',
    },
  },
  users: {
    path: '/users',
    routes: {
      create: '/create',
      edit: (userId: string | number = ':userId') => `/edit/${userId}`,
      view: (userId: string | number = ':userId') => ({
        path: `/${userId}`,
        routes: {
          edit: '/details',
          nested: {
            path: '/nested',
            routes: {
              nested: '/nested',
              view: (nestedId: string | number = ':nestedId') => ({
                path: `/${nestedId}`,
                routes: {
                  edit: '/edit',
                },
              }),
            },
          },
        },
      }),
    },
  },
  products: {
    path: '/products',
    routes: {
      create: '/create',
      view: (productId: string | number = ':productId') => `/${productId}`,,
      edit: (productId: string | number = ':productId') => `/edit/${productId}`,
    },
  },
};
```

### Quickstart

```tsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { generateRoutes, generateRouting, addQuery } from '@fabiulous/routing';

import { routes } from '@shared/routes';

// Generate Context and hooks dynamically to infer router type correctly
const {
  RoutingContext: _RoutingContext,
  useRouter: _useRouter,
  useQueryState: _useQueryState,
  useDebouncedQueryState: _useDebouncedQueryState,
} = generateRouting(() => {}, routes);

export const RoutingContext = _RoutingContext;

export const RoutingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const go = React.useCallback((pathname: string, params: CVT.Maybe<Record<string, unknown>>, replace: boolean = false) => {
    navigate({
      pathname,
      search: params && addQuery(window.location.search, params),
    }, {
      replace,
    });
  }, [navigate]);

  const router = React.useMemo(() => generateRoutes(go, routes), [go]);

  return (
    <RoutingContext.Provider value={{
      router,
      location,
      go: (params: CVT.Maybe<Record<string, unknown>>, replace?: boolean) => go(location.pathname, params, replace),
    }}>
      {children}
    </RoutingContext.Provider>
  );
};

export const RoutingConsumer = RoutingContext.Consumer;

export const useRouter = _useRouter;
export const useQueryState = _useQueryState;
export const useDebouncedQueryState = _useDebouncedQueryState;

```

### Usage

```ts

import { useRouter } from 'src/routing';

const router = useRouter();

router.users.edit(5).go();
router.users.view(4).nested.view(5).edit.go();
router.products.go({ page: 2, category: 5 });
router.products.view(7).go();
```


```ts

import { useQueryState, useDebouncedQueryState } from 'src/routing';

[param, setParam] = useQueryState('page', 1);
[currSearch, search, setSearch] = useDebouncedQueryState('search');
```
