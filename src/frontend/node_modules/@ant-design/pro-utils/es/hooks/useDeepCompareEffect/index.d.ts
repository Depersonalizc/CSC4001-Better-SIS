import type { DependencyList } from 'react';
export declare const isDeepEqual: (a: any, b: any) => boolean;
declare function useDeepCompareEffect(effect: React.EffectCallback, dependencies?: DependencyList): void;
export default useDeepCompareEffect;
