import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import './ThemeColor.less';
import { CheckOutlined } from '@ant-design/icons';
import React from 'react';
import { genThemeToString } from '../../utils/utils';
var Tag = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var color = _ref.color,
      check = _ref.check,
      rest = _objectWithoutProperties(_ref, ["color", "check"]);

  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      backgroundColor: color
    },
    ref: ref
  }), check ? /*#__PURE__*/React.createElement(CheckOutlined, null) : '');
});

var ThemeColor = function ThemeColor(_ref2, ref) {
  var colors = _ref2.colors,
      value = _ref2.value,
      onChange = _ref2.onChange,
      formatMessage = _ref2.formatMessage;
  var colorList = colors || [];

  if (colorList.length < 1) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "theme-color",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-color-content"
  }, colorList.map(function (_ref3) {
    var key = _ref3.key,
        color = _ref3.color;
    var themeKey = genThemeToString(color);
    return /*#__PURE__*/React.createElement(_Tooltip, {
      key: color,
      title: themeKey ? formatMessage({
        id: "app.setting.themecolor.".concat(themeKey)
      }) : key
    }, /*#__PURE__*/React.createElement(Tag, {
      className: "theme-color-block",
      color: color,
      check: value === key || genThemeToString(value) === key,
      onClick: function onClick() {
        return onChange && onChange(key);
      }
    }));
  })));
};

export default /*#__PURE__*/React.forwardRef(ThemeColor);