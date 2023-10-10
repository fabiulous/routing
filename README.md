
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

import { RoutingContext } from '@fabiulous/routing';

interface Props<T> {
  routes: T;
  location: Location;
  go: (pathname: string, params: Maybe<Routing.RouteParams>, replace: Maybe<boolean>) => void;
}

export const RoutingProvider = <T extends Routing.Config>({ children, routes, location, go }: React.PropsWithChildren<Props<T>>) => {

const router = React.useMemo(() => generateRouter(go, routes), [go]);

return (
    <RoutingContext.Provider
      value={{
        router: router as Routing.RecursiveRoutes<T>,
        location,
        go: (params, replace) => go(window.location.pathname, params, replace),
      }}
    >
      {children}
    </RoutingContext.Provider>
);
};

export const RoutingConsumer = RoutingContext.Consumer;

```

### Usage

```ts

import { useRouter } from '@fabiulous/routing';

const router = useRouter();

router.users.edit(5).go();
router.users.view(4).nested.view(5).edit.go();
router.products.go({ page: 2, category: 5 });
router.products.view(7).go();
```


```ts

import { useQueryState, useDebouncedQueryState } from '@fabiulous/routing';

[param, setParam] = useQueryState('page', 1);
[currSearch, search, setSearch] = useDebouncedQueryState('search');
```
