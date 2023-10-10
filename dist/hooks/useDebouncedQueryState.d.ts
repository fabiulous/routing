import React from 'react';
import { Maybe } from '../types';
export declare const useDebouncedQueryState: <T = string>(name: string, defaultValue?: T | undefined, delay?: number) => [Maybe<T>, Maybe<T>, React.Dispatch<React.SetStateAction<T | undefined>>];
