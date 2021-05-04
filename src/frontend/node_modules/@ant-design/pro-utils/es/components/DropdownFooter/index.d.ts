import React from 'react';
import './index.less';
export declare type DropdownFooterProps = {
    onClear?: (e: React.MouseEvent) => void;
    onConfirm?: (e: React.MouseEvent) => void;
    disabled?: boolean;
};
declare const DropdownFooter: React.FC<DropdownFooterProps>;
export default DropdownFooter;
