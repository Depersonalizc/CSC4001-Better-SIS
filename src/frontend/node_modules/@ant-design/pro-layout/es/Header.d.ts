import './Header.less';
import React, { Component } from 'react';
import type { GlobalHeaderProps } from './components/GlobalHeader';
import type { WithFalse } from './typings';
import type { PrivateSiderMenuProps } from './components/SiderMenu/SiderMenu';
export declare type HeaderViewProps = GlobalHeaderProps & {
    isMobile?: boolean;
    collapsed?: boolean;
    logo?: React.ReactNode;
    headerRender?: WithFalse<(props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode>;
    headerTitleRender?: WithFalse<(logo: React.ReactNode, title: React.ReactNode, props: HeaderViewProps) => React.ReactNode>;
    headerContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
    siderWidth?: number;
    hasSiderMenu?: boolean;
};
declare type HeaderViewState = {
    visible: boolean;
};
declare class HeaderView extends Component<HeaderViewProps & PrivateSiderMenuProps, HeaderViewState> {
    renderContent: () => React.ReactNode;
    render(): React.ReactNode;
}
export default HeaderView;
