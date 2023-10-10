import queryString from 'query-string';

import { cleanObject } from './object';

export const queryStringOptions: queryString.ParseOptions = {
  arrayFormat: 'bracket',
  parseBooleans: true,
};

export const addQuery = (search: string, query: Record<string, any>) => {
  const current = queryString.parse(search, queryStringOptions);
  const newQuery = cleanObject({
    ...current,
    ...query,
  });

  return queryString.stringify(newQuery, queryStringOptions);
};

export const removeQuery = (search: string, queryNames: string[]) => {
  const current = queryString.parse(search);

  const newQuery = Object.keys(current).reduce<Record<string, any>>((newQuery, key) => {
    if(!queryNames.includes(key)) {
      newQuery[key] = current[key];
    }
    return newQuery;
  }, {});

  return queryString.stringify(newQuery, queryStringOptions);
};

export const parseQuery = (query: string) => queryString.parse(query, queryStringOptions);
