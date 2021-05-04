import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";
import './GridContent.less';
import React, { useContext } from 'react';
import classNames from 'classnames';
import RouteContext from '../../RouteContext';
/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 *
 * @param props
 */

var GridContent = function GridContent(props) {
  var value = useContext(RouteContext);
  var children = props.children,
      propsContentWidth = props.contentWidth,
      propsClassName = props.className,
      style = props.style;

  var _useContext = useContext(_ConfigProvider.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = props.prefixCls || getPrefixCls('pro');
  var contentWidth = propsContentWidth || value.contentWidth;
  var className = "".concat(prefixCls, "-grid-content");
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(className, propsClassName, {
      wide: contentWidth === 'Fixed'
    }),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-grid-content-children")
  }, children));
};

export default GridContent;