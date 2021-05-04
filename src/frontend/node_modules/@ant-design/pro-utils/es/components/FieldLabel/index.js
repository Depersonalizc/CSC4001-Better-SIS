import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useContext } from 'react';
import { DownOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useIntl } from '@ant-design/pro-provider';
import './index.less';

var FieldLabel = function FieldLabel(props) {
  var _classNames;

  var label = props.label,
      onClear = props.onClear,
      value = props.value,
      _props$size = props.size,
      size = _props$size === void 0 ? 'middle' : _props$size,
      disabled = props.disabled,
      ellipsis = props.ellipsis,
      placeholder = props.placeholder,
      className = props.className,
      style = props.style,
      formatter = props.formatter,
      bordered = props.bordered,
      _props$allowClear = props.allowClear,
      allowClear = _props$allowClear === void 0 ? true : _props$allowClear;

  var _useContext = useContext(_ConfigProvider.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('pro-core-field-label');
  var intl = useIntl();

  var getTextByValue = function getTextByValue(aLabel, aValue) {
    if (aValue !== undefined && aValue !== null && aValue !== '' && (!Array.isArray(aValue) || aValue.length)) {
      var _str;

      var str;

      if (formatter) {
        str = formatter(aValue);
      } else {
        str = Array.isArray(aValue) ? aValue.join(',') : String(aValue);
      }

      var prefix = aLabel ? /*#__PURE__*/React.createElement(React.Fragment, null, aLabel, ': ') : '';

      if (!ellipsis) {
        return /*#__PURE__*/React.createElement("span", null, prefix, str);
      }

      var getText = function getText() {
        var isArrayValue = Array.isArray(aValue) && aValue.length > 1;
        var unitText = intl.getMessage('form.lightFilter.itemUnit', '项');

        if (str.length > 32 && isArrayValue) {
          return "...".concat(aValue.length).concat(unitText);
        }

        return '';
      };

      var tail = getText();
      return /*#__PURE__*/React.createElement("span", {
        title: str
      }, prefix, (_str = str) === null || _str === void 0 ? void 0 : _str.substr(0, 32), tail);
    }

    return aLabel || placeholder;
  };

  return /*#__PURE__*/React.createElement("span", {
    className: classNames(prefixCls, "".concat(prefixCls, "-").concat(size), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-active"), !!value || value === 0), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-bordered"), bordered), _defineProperty(_classNames, "".concat(prefixCls, "-allow-clear"), allowClear), _classNames), className),
    style: style
  }, getTextByValue(label, value), (value || value === 0) && allowClear && /*#__PURE__*/React.createElement(CloseOutlined, {
    className: classNames("".concat(prefixCls, "-icon"), "".concat(prefixCls, "-close")),
    onClick: function onClick(e) {
      if (onClear && !disabled) {
        onClear();
      }

      e.stopPropagation();
    }
  }), /*#__PURE__*/React.createElement(DownOutlined, {
    className: classNames("".concat(prefixCls, "-icon"), "".concat(prefixCls, "-arrow"))
  }));
};

export default FieldLabel;