import { test } from 'vitest';
import { cleanObject } from './object';

test('cleanObject', ({ expect }) => {
  const dirtyObject = {
    validKey: 'validValue',
    nullKey: null,
    undefinedKey: undefined,
    emptyStringKey: '',
  };
  
  const cleaned = cleanObject(dirtyObject);
  
  // Expect the cleaned object to only contain the valid key
  expect(cleaned).toEqual({ validKey: 'validValue' });
});
