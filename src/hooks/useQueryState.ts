import React from 'react';
import { useMount } from 'react-use';

import { parseQuery } from '../helpers/query';
import { Maybe, MaybeNull, Routing } from '../types';


export const generateUseQueryState = <T extends Routing.Config>(context: React.Context<Routing.ContextProps<Routing.RecursiveRoutes<T>>>) => {
  return <T = string>(name: string, defaultValue?: T): [Maybe<T>, (value?: MaybeNull<T>) => void] => {
    const { go, location } = React.useContext(context);

    const value = React.useMemo(() => location ? parseQuery(location.search)[name] as Maybe<T> : undefined, [location, name]);

    const setValue = React.useCallback((value?: MaybeNull<T>) => {
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
}
