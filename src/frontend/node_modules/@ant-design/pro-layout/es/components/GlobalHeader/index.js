function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import './index.less';
import React from 'react';
import classNames from 'classnames';
import { defaultRenderLogo, defaultRenderLogoAndTitle, defaultRenderCollapsedButton } from '../SiderMenu/SiderMenu';
import TopNavHeader from '../TopNavHeader';
import { clearMenuItem } from '../../utils/utils';

var renderLogo = function renderLogo(menuHeaderRender, logoDom) {
  if (menuHeaderRender === false) {
    return null;
  }

  if (menuHeaderRender) {
    return menuHeaderRender(logoDom, null);
  }

  return logoDom;
};

var GlobalHeader = function GlobalHeader(props) {
  var isMobile = props.isMobile,
      logo = props.logo,
      collapsed = props.collapsed,
      onCollapse = props.onCollapse,
      _props$collapsedButto = props.collapsedButtonRender,
      collapsedButtonRender = _props$collapsedButto === void 0 ? defaultRenderCollapsedButton : _props$collapsedButto,
      rightContentRender = props.rightContentRender,
      menuHeaderRender = props.menuHeaderRender,
      onMenuHeaderClick = props.onMenuHeaderClick,
      propClassName = props.className,
      style = props.style,
      layout = props.layout,
      children = props.children,
      _props$headerTheme = props.headerTheme,
      headerTheme = _props$headerTheme === void 0 ? 'dark' : _props$headerTheme,
      splitMenus = props.splitMenus,
      menuData = props.menuData,
      prefixCls = props.prefixCls;
  var baseClassName = "".concat(prefixCls, "-global-header");
  var className = classNames(propClassName, baseClassName, _defineProperty({}, "".concat(baseClassName, "-layout-").concat(layout), layout && headerTheme === 'dark'));

  if (layout === 'mix' && !isMobile && splitMenus) {
    var noChildrenMenuData = (menuData || []).map(function (item) {
      return _objectSpread(_objectSpread({}, item), {}, {
        children: undefined
      });
    });
    var clearMenuData = clearMenuItem(noChildrenMenuData);
    return /*#__PURE__*/React.createElement(TopNavHeader, _extends({
      mode: "horizontal"
    }, props, {
      splitMenus: false,
      menuData: clearMenuData,
      theme: headerTheme
    }));
  }

  var logoDom = /*#__PURE__*/React.createElement("span", {
    className: "".concat(baseClassName, "-logo"),
    key: "logo"
  }, /*#__PURE__*/React.createElement("a", null, defaultRenderLogo(logo)));
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: _objectSpread({}, style)
  }, isMobile && renderLogo(menuHeaderRender, logoDom), isMobile && collapsedButtonRender && /*#__PURE__*/React.createElement("span", {
    className: "".concat(baseClassName, "-collapsed-button"),
    onClick: function onClick() {
      if (onCollapse) {
        onCollapse(!collapsed);
      }
    }
  }, collapsedButtonRender(collapsed)), layout === 'mix' && !isMobile && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-logo"),
    onClick: onMenuHeaderClick
  }, defaultRenderLogoAndTitle(_objectSpread(_objectSpread({}, props), {}, {
    collapsed: false
  }), 'headerTitleRender'))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, children), rightContentRender && rightContentRender(props));
};

export default GlobalHeader;