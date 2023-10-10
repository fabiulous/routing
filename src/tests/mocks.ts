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
};
