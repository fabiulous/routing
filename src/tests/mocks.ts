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
      editTab: (userId: string | number = ':userId', tab: string) => `/edit/${userId}/${tab}`,
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
