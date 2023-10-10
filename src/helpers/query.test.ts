import { describe, expect, test } from 'vitest';
import { addQuery, parseQuery, removeQuery } from './query';

describe('addQuery', () => {
  test('Should correctly add query to the given string', () => {
    const search = '?oldQuery=old';
    const newQuery = { newQuery: 'new' };
    const result = addQuery(search, newQuery);
    expect(result).to.equal('newQuery=new&oldQuery=old');
  });

  test('Should override existing queries with new ones', () => {
    const search = '?query=old';
    const newQuery = { query: 'new' };
    const result = addQuery(search, newQuery);
    expect(result).to.equal('query=new');
  });

  test('Should correctly handle boolean and numeric values', () => {
    const search = '?bool=true&num=1';
    const newQuery = { bool: false, num: 2 };
    const result = addQuery(search, newQuery);
    expect(result).to.equal('bool=false&num=2');
  });
});

describe('removeQuery', () => {
    test('Should correctly remove given queries from the search string', () => {
      const search = '?query1=value1&query2=value2';
      const result = removeQuery(search, ['query1']);
      expect(result).to.equal('query2=value2');
    });
  
    test('Should gracefully handle non-existing queries', () => {
      const search = '?query1=value1';
      const result = removeQuery(search, ['query2']);
      expect(result).to.equal('query1=value1');
    });
  });
  
  describe('parseQuery', () => {
    test('Should correctly parse a query string into an object', () => {
      const query = '?query1=value1&query2=value2';
      const result = parseQuery(query);
      expect(result).toEqual({
        query1: 'value1',
        query2: 'value2',
      });
    });
  
    test('Should correctly parse boolean values', () => {
      const query = '?query1=true';
      const result = parseQuery(query);
      expect(result).toEqual({ query1: true });
    });

  });