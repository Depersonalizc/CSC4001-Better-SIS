import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";
import React, { useContext } from 'react';
import { useIntl } from '@ant-design/pro-provider';
import './index.less';

var DropdownFooter = function DropdownFooter(props) {
  var intl = useIntl();
  var onClear = props.onClear,
      onConfirm = props.onConfirm,
      disabled = props.disabled;

  var _useContext = useContext(_ConfigProvider.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('pro-core-dropdown-footer');
  return /*#__PURE__*/React.createElement("div", {
    className: prefixCls,
    onClick: function onClick(e) {
      return e.target.getAttribute('data-type') !== 'confirm' && e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement(_Button, {
    style: {
      visibility: onClear ? 'visible' : 'hidden'
    },
    type: "link",
    size: "small",
    disabled: disabled,
    onClick: function onClick(e) {
      if (onClear) {
        onClear(e);
      }

      e.stopPropagation();
    }
  }, intl.getMessage('form.lightFilter.clear', '清除')), /*#__PURE__*/React.createElement(_Button, {
    "data-type": "confirm",
    type: "primary",
    size: "small",
    onClick: onConfirm,
    disabled: disabled
  }, intl.getMessage('form.lightFilter.confirm', '确认')));
};

export default DropdownFooter;