import React from 'react';
import { useMount } from 'react-use';

import { parseQuery } from '../helpers/query';
import { RoutingContext } from '../context/RoutingContext';

export const useQueryState = <T = string>(name: string, defaultValue?: T): [Fabiulous.Maybe<T>, (value?: Fabiulous.MaybeNull<T>) => void] => {
  const { go, location } = React.useContext(RoutingContext);

  const value = React.useMemo(() => location ? parseQuery(location.search)[name] as Fabiulous.Maybe<T> : undefined, [location, name]);

  const setValue = React.useCallback((value?: Fabiulous.MaybeNull<T>) => {
    go({ [name]: value });
  }, [go, name]);
  

  useMount(() => {
    if (!value && defaultValue) {
      go({ [name]: defaultValue }, true);
    }
  });

  return [
    value,
    setValue,
  ];
};
