import type { DependencyList } from 'react';
export declare type ReturnValue<T extends any[]> = {
    run: (...args: T) => void;
    cancel: () => void;
};
declare function useDebounceFn<T extends any[]>(fn: (...args: T) => Promise<any>, deps: DependencyList | number, wait?: number): ReturnValue<T>;
export default useDebounceFn;
