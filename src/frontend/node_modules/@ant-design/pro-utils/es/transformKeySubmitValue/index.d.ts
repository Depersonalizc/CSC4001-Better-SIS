import type { SearchTransformKeyFn } from '../typing';
export declare type DataFormatMapType = Record<string, SearchTransformKeyFn | undefined>;
declare const transformKeySubmitValue: <T = any>(values: T, dataFormatMapRaw: Record<string, SearchTransformKeyFn | undefined>) => T;
export default transformKeySubmitValue;
