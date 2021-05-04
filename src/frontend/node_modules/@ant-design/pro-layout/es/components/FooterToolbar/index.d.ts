import type { ReactNode } from 'react';
import React from 'react';
import './index.less';
import type { RouteContextType } from '../../index';
export declare type FooterToolbarProps = {
    extra?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    renderContent?: (props: FooterToolbarProps & RouteContextType & {
        leftWidth?: string;
    }, dom: JSX.Element) => ReactNode;
    prefixCls?: string;
};
declare const FooterToolbar: React.FC<FooterToolbarProps>;
export default FooterToolbar;
