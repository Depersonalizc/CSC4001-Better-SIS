import React from 'react';
import type { DropdownFooterProps } from '../DropdownFooter';
import './index.less';
export declare type DropdownProps = {
    label?: React.ReactNode;
    footer?: DropdownFooterProps;
    padding?: number;
    disabled?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    visible?: boolean;
};
declare const FilterDropdown: React.FC<DropdownProps>;
export default FilterDropdown;
