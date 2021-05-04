import "antd/es/dropdown/style";
import _Dropdown from "antd/es/dropdown";
import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext } from 'react';
import Footer from '../DropdownFooter';
import './index.less';

var FilterDropdown = function FilterDropdown(props) {
  var children = props.children,
      label = props.label,
      footer = props.footer,
      disabled = props.disabled,
      onVisibleChange = props.onVisibleChange,
      visible = props.visible;

  var _useContext = useContext(_ConfigProvider.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('pro-core-field-dropdown');
  return /*#__PURE__*/React.createElement(_Dropdown, {
    disabled: disabled,
    trigger: ['click'],
    visible: visible,
    onVisibleChange: onVisibleChange,
    overlay: /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-overlay")
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-content")
    }, children), footer && /*#__PURE__*/React.createElement(Footer, _extends({
      disabled: disabled
    }, footer)))
  }, /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-label")
  }, label));
};

export default FilterDropdown;