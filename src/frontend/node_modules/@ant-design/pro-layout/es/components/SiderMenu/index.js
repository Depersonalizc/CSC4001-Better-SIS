import "antd/es/drawer/style";
import _Drawer from "antd/es/drawer";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect } from 'react';
import classNames from 'classnames';
import Omit from 'omit.js';
import { getFlatMenus } from '@umijs/route-utils';
import SiderMenu from './SiderMenu';
import MenuCounter from './Counter';

var SiderMenuWrapper = function SiderMenuWrapper(props) {
  var isMobile = props.isMobile,
      menuData = props.menuData,
      siderWidth = props.siderWidth,
      collapsed = props.collapsed,
      onCollapse = props.onCollapse,
      style = props.style,
      className = props.className,
      hide = props.hide,
      getContainer = props.getContainer,
      prefixCls = props.prefixCls,
      matchMenuKeys = props.matchMenuKeys;

  var _MenuCounter$useConta = MenuCounter.useContainer(),
      setFlatMenuKeys = _MenuCounter$useConta.setFlatMenuKeys;

  useEffect(function () {
    if (!menuData || menuData.length < 1) {
      return function () {
        return null;
      };
    } // 当 menu data 改变的时候重新计算这两个参数


    var newFlatMenus = getFlatMenus(menuData);
    var animationFrameId = requestAnimationFrame(function () {
      setFlatMenuKeys(Object.keys(newFlatMenus));
    });
    return function () {
      return window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchMenuKeys.join('-')]);
  useEffect(function () {
    if (isMobile === true) {
      onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse(true);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [isMobile]);
  var omitProps = Omit(props, ['className', 'style']);

  if (hide) {
    return null;
  }

  return isMobile ? /*#__PURE__*/React.createElement(_Drawer, {
    visible: !collapsed,
    placement: "left",
    className: classNames("".concat(prefixCls, "-drawer-sider"), className),
    onClose: function onClose() {
      return onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse(true);
    },
    style: _objectSpread({
      padding: 0,
      height: '100vh'
    }, style),
    getContainer: getContainer,
    width: siderWidth,
    bodyStyle: {
      height: '100vh',
      padding: 0,
      display: 'flex',
      flexDirection: 'row'
    }
  }, /*#__PURE__*/React.createElement(SiderMenu, _extends({}, omitProps, {
    className: classNames("".concat(prefixCls, "-sider"), className),
    collapsed: isMobile ? false : collapsed,
    splitMenus: false
  }))) : /*#__PURE__*/React.createElement(SiderMenu, _extends({
    className: classNames("".concat(prefixCls, "-sider"), className)
  }, omitProps, {
    style: style
  }));
};

export default SiderMenuWrapper;