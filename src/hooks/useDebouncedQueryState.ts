import React from 'react';
import { useMount } from 'react-use';

import { parseQuery } from '../helpers/query';
import { RoutingContext } from '../context/RoutingContext';
import { Maybe } from '../types';


export const useDebouncedQueryState = <T = string>(name: string, defaultValue?: T, delay: number = 500): [Maybe<T>, Maybe<T>, React.Dispatch<React.SetStateAction<T | undefined>>] => {

  const { location, go } = React.useContext(RoutingContext);
  const timeout = React.useRef<number>();

  const query = React.useMemo(() => {
    const value = location ? parseQuery(location.search)[name] : undefined;
    return (Array.isArray(value) ? value[0] : value) as unknown as Maybe<T>;
  }, [location, name]);

  const [value, setValue] = React.useState(query);

  const updateHistory = React.useCallback(() => {
    go({ [name]: value });
  }, [go, name, value]);

  React.useEffect(
    () => {
      if (query !== value) {
        timeout.current = window.setTimeout(() => {
          updateHistory();
        }, delay);
      }

      return () => {
        window.clearTimeout(timeout.current);
      };
    },
    [updateHistory, delay, query, value],
  );

  React.useEffect(() => {
    setValue(query);
  }, [query]);

  useMount(() => {
    if (!value && defaultValue) {
      go({ [name]: defaultValue }, true);
      setValue(defaultValue);
    }
  });

  return [
    value,
    query,
    setValue,
  ];
};
