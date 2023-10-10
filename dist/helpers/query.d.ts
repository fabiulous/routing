import queryString from 'query-string';
export declare const queryStringOptions: queryString.ParseOptions;
export declare const addQuery: (search: string, query: Record<string, any>) => string;
export declare const removeQuery: (search: string, queryNames: string[]) => string;
export declare const parseQuery: (query: string) => queryString.ParsedQuery<string>;
