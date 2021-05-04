import './index.less';
import React from 'react';
import type { WithFalse } from '../../typings';
export declare type GlobalFooterProps = {
    links?: WithFalse<{
        key?: string;
        title: React.ReactNode;
        href: string;
        blankTarget?: boolean;
    }[]>;
    copyright?: React.ReactNode;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
};
declare const _default: ({ className, prefixCls, links, copyright, style }: GlobalFooterProps) => JSX.Element | null;
export default _default;
