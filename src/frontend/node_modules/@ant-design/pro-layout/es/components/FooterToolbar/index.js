import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import './index.less';
import { RouteContext } from '../../index';

var FooterToolbar = function FooterToolbar(props) {
  var children = props.children,
      className = props.className,
      extra = props.extra,
      style = props.style,
      renderContent = props.renderContent,
      restProps = _objectWithoutProperties(props, ["children", "className", "extra", "style", "renderContent"]);

  var _useContext = useContext(_ConfigProvider.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = props.prefixCls || getPrefixCls('pro');
  var baseClassName = "".concat(prefixCls, "-footer-bar");
  var value = useContext(RouteContext);
  var width = useMemo(function () {
    var hasSiderMenu = value.hasSiderMenu,
        isMobile = value.isMobile,
        siderWidth = value.siderWidth;

    if (!hasSiderMenu) {
      return undefined;
    } // 0 or undefined


    if (!siderWidth) {
      return '100%';
    }

    return isMobile ? '100%' : "calc(100% - ".concat(siderWidth, "px)");
  }, [value.collapsed, value.hasSiderMenu, value.isMobile, value.siderWidth]);
  var dom = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-left")
  }, extra), /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-right")
  }, children));
  /** 告诉 props 是否存在 footerBar */

  useEffect(function () {
    if (!value || !(value === null || value === void 0 ? void 0 : value.setHasFooterToolbar)) {
      return function () {};
    }

    value === null || value === void 0 ? void 0 : value.setHasFooterToolbar(true);
    return function () {
      var _value$setHasFooterTo;

      value === null || value === void 0 ? void 0 : (_value$setHasFooterTo = value.setHasFooterToolbar) === null || _value$setHasFooterTo === void 0 ? void 0 : _value$setHasFooterTo.call(value, false);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames(className, "".concat(baseClassName)),
    style: _objectSpread({
      width: width
    }, style)
  }, omit(restProps, ['prefixCls'])), renderContent ? renderContent(_objectSpread(_objectSpread(_objectSpread({}, props), value), {}, {
    leftWidth: width
  }), dom) : dom);
};

export default FooterToolbar;