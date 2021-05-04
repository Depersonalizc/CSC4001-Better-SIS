import './index.less';
import React from 'react';
import type { ProSettings } from '../../defaultSettings';
declare type MergerSettingsType<T> = Partial<T> & {
    primaryColor?: string;
    colorWeak?: boolean;
};
export declare type SettingItemProps = {
    title: React.ReactNode;
    action: React.ReactElement;
    disabled?: boolean;
    disabledReason?: React.ReactNode;
};
export declare type SettingDrawerProps = {
    settings?: MergerSettingsType<ProSettings>;
    collapse?: boolean;
    getContainer?: any;
    publicPath?: string;
    hideLoading?: boolean;
    hideColors?: boolean;
    hideHintAlert?: boolean;
    prefixCls?: string;
    hideCopyButton?: boolean;
    onCollapseChange?: (collapse: boolean) => void;
    onSettingChange?: (settings: MergerSettingsType<ProSettings>) => void;
    pathname?: string;
    disableUrlParams?: boolean;
};
export declare type SettingDrawerState = {
    collapse?: boolean;
    language?: string;
} & MergerSettingsType<ProSettings>;
export declare const getFormatMessage: () => (data: {
    id: string;
    defaultMessage?: string;
}) => string;
/**
 * 可视化配置组件
 *
 * @param props
 */
declare const SettingDrawer: React.FC<SettingDrawerProps>;
export default SettingDrawer;
