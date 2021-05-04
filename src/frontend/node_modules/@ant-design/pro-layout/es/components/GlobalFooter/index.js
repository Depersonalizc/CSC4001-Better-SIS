import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";
import './index.less';
import React, { useContext } from 'react';
import classNames from 'classnames';
export default (function (_ref) {
  var className = _ref.className,
      prefixCls = _ref.prefixCls,
      links = _ref.links,
      copyright = _ref.copyright,
      style = _ref.style;
  var context = useContext(_ConfigProvider.ConfigContext);
  var baseClassName = context.getPrefixCls(prefixCls || 'pro-global-footer');

  if ((links == null || links === false || Array.isArray(links) && links.length === 0) && (copyright == null || copyright === false)) {
    return null;
  }

  var clsString = classNames(baseClassName, className);
  return /*#__PURE__*/React.createElement("div", {
    className: clsString,
    style: style
  }, links && /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-links")
  }, links.map(function (link) {
    return /*#__PURE__*/React.createElement("a", {
      key: link.key,
      title: link.key,
      target: link.blankTarget ? '_blank' : '_self',
      href: link.href
    }, link.title);
  })), copyright && /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-copyright")
  }, copyright));
});