import { Maybe, MaybeNull } from '../types';
export declare const useQueryState: <T = string>(name: string, defaultValue?: T | undefined) => [Maybe<T>, (value?: MaybeNull<T> | undefined) => void];
