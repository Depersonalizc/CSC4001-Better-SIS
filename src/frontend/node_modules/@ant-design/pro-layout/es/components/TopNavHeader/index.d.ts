import React from 'react';
import type { SiderMenuProps, PrivateSiderMenuProps } from '../SiderMenu/SiderMenu';
import './index.less';
import type { GlobalHeaderProps } from '../GlobalHeader';
export declare type TopNavHeaderProps = SiderMenuProps & GlobalHeaderProps & PrivateSiderMenuProps & {};
declare const TopNavHeader: React.FC<TopNavHeaderProps>;
export default TopNavHeader;
