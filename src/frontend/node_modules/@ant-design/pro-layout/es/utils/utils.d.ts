import type { MenuDataItem } from '../typings';
export declare const getOpenKeysFromMenuData: (menuData?: MenuDataItem[] | undefined) => string[];
/**
 * #1890ff -> daybreak
 *
 * @param val
 */
export declare function genThemeToString(val?: string): string;
/**
 * Daybreak-> #1890ff
 *
 * @param val
 */
export declare function genStringToTheme(val?: string): string;
export declare function clearMenuItem(menusData: MenuDataItem[]): MenuDataItem[];
