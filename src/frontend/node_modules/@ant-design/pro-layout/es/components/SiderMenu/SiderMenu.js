import "antd/es/menu/style";
import _Menu from "antd/es/menu";
import "antd/es/layout/style";
import _Layout from "antd/es/layout";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import classNames from 'classnames';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './index.less';
import BaseMenu from './BaseMenu';
import MenuCounter from './Counter';
var Sider = _Layout.Sider;
export var defaultRenderLogo = function defaultRenderLogo(logo) {
  if (typeof logo === 'string') {
    return /*#__PURE__*/React.createElement("img", {
      src: logo,
      alt: "logo"
    });
  }

  if (typeof logo === 'function') {
    return logo();
  }

  return logo;
};
export var defaultRenderLogoAndTitle = function defaultRenderLogoAndTitle(props) {
  var renderKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'menuHeaderRender';
  var logo = props.logo,
      title = props.title,
      layout = props.layout;
  var renderFunction = props[renderKey || ''];

  if (renderFunction === false) {
    return null;
  }

  var logoDom = defaultRenderLogo(logo);
  var titleDom = /*#__PURE__*/React.createElement("h1", null, title);

  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props);
  }

  if (layout === 'mix' && renderKey === 'menuHeaderRender') {
    return null;
  }

  return /*#__PURE__*/React.createElement("a", null, logoDom, props.collapsed ? null : titleDom);
};
export var defaultRenderCollapsedButton = function defaultRenderCollapsedButton(collapsed) {
  return collapsed ? /*#__PURE__*/React.createElement(MenuUnfoldOutlined, null) : /*#__PURE__*/React.createElement(MenuFoldOutlined, null);
};

var SiderMenu = function SiderMenu(props) {
  var _classNames;

  var collapsed = props.collapsed,
      fixSiderbar = props.fixSiderbar,
      menuFooterRender = props.menuFooterRender,
      _onCollapse = props.onCollapse,
      theme = props.theme,
      siderWidth = props.siderWidth,
      isMobile = props.isMobile,
      onMenuHeaderClick = props.onMenuHeaderClick,
      _props$breakpoint = props.breakpoint,
      breakpoint = _props$breakpoint === void 0 ? 'lg' : _props$breakpoint,
      style = props.style,
      layout = props.layout,
      _props$menuExtraRende = props.menuExtraRender,
      menuExtraRender = _props$menuExtraRende === void 0 ? false : _props$menuExtraRende,
      _props$collapsedButto = props.collapsedButtonRender,
      collapsedButtonRender = _props$collapsedButto === void 0 ? defaultRenderCollapsedButton : _props$collapsedButto,
      links = props.links,
      menuContentRender = props.menuContentRender,
      prefixCls = props.prefixCls,
      onOpenChange = props.onOpenChange,
      headerHeight = props.headerHeight,
      logoStyle = props.logoStyle;
  var baseClassName = "".concat(prefixCls, "-sider");

  var _MenuCounter$useConta = MenuCounter.useContainer(),
      flatMenuKeys = _MenuCounter$useConta.flatMenuKeys;

  var siderClassName = classNames("".concat(baseClassName), (_classNames = {}, _defineProperty(_classNames, "".concat(baseClassName, "-fixed"), fixSiderbar), _defineProperty(_classNames, "".concat(baseClassName, "-layout-").concat(layout), layout && !isMobile), _defineProperty(_classNames, "".concat(baseClassName, "-light"), theme === 'light'), _classNames));
  var headerDom = defaultRenderLogoAndTitle(props);
  var extraDom = menuExtraRender && menuExtraRender(props);
  var menuDom = menuContentRender !== false && flatMenuKeys && /*#__PURE__*/React.createElement(BaseMenu, _extends({}, props, {
    mode: "inline",
    handleOpenChange: onOpenChange,
    style: {
      width: '100%'
    },
    className: "".concat(baseClassName, "-menu")
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, fixSiderbar && /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      width: collapsed ? 48 : siderWidth,
      overflow: 'hidden',
      flex: "0 0 ".concat(collapsed ? 48 : siderWidth, "px"),
      maxWidth: collapsed ? 48 : siderWidth,
      minWidth: collapsed ? 48 : siderWidth,
      transition: "background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)"
    }, style)
  }), /*#__PURE__*/React.createElement(Sider, {
    collapsible: true,
    trigger: null,
    collapsed: collapsed,
    breakpoint: breakpoint === false ? undefined : breakpoint,
    onCollapse: function onCollapse(collapse) {
      if (!isMobile) {
        if (_onCollapse) {
          _onCollapse(collapse);
        }
      }
    },
    collapsedWidth: 48,
    style: _objectSpread({
      overflow: 'hidden',
      paddingTop: layout === 'mix' && !isMobile ? headerHeight : undefined
    }, style),
    width: siderWidth,
    theme: theme,
    className: siderClassName
  }, headerDom && /*#__PURE__*/React.createElement("div", {
    className: classNames("".concat(baseClassName, "-logo"), _defineProperty({}, "".concat(baseClassName, "-collapsed"), collapsed)),
    onClick: layout !== 'mix' ? onMenuHeaderClick : undefined,
    id: "logo",
    style: logoStyle
  }, headerDom), extraDom && /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-extra ").concat(!headerDom && "".concat(baseClassName, "-extra-no-logo"))
  }, extraDom), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  }, menuContentRender ? menuContentRender(props, menuDom) : menuDom), /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-links")
  }, /*#__PURE__*/React.createElement(_Menu, {
    theme: theme,
    inlineIndent: 16,
    className: "".concat(baseClassName, "-link-menu"),
    selectedKeys: [],
    openKeys: [],
    mode: "inline"
  }, (links || []).map(function (node, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(_Menu.Item, {
        className: "".concat(baseClassName, "-link"),
        key: index
      }, node)
    );
  }), collapsedButtonRender && !isMobile && /*#__PURE__*/React.createElement(_Menu.Item, {
    className: "".concat(baseClassName, "-collapsed-button"),
    title: false,
    onClick: function onClick() {
      if (_onCollapse) {
        _onCollapse(!collapsed);
      }
    }
  }, collapsedButtonRender(collapsed)))), menuFooterRender && /*#__PURE__*/React.createElement("div", {
    className: classNames("".concat(baseClassName, "-footer"), _defineProperty({}, "".concat(baseClassName, "-footer-collapsed"), !collapsed))
  }, menuFooterRender(props))));
};

export default SiderMenu;