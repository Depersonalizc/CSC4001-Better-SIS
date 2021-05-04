function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export var getOpenKeysFromMenuData = function getOpenKeysFromMenuData(menuData) {
  return (menuData || []).reduce(function (pre, item) {
    if (item.key) {
      pre.push(item.key);
    }

    if (item.children) {
      var newArray = pre.concat(getOpenKeysFromMenuData(item.children) || []);
      return newArray;
    }

    return pre;
  }, []);
};
var themeConfig = {
  daybreak: 'daybreak',
  '#1890ff': 'daybreak',
  '#F5222D': 'dust',
  '#FA541C': 'volcano',
  '#FAAD14': 'sunset',
  '#13C2C2': 'cyan',
  '#52C41A': 'green',
  '#2F54EB': 'geekblue',
  '#722ED1': 'purple'
};

var invertKeyValues = function invertKeyValues(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    acc[obj[key]] = key;
    return acc;
  }, {});
};
/**
 * #1890ff -> daybreak
 *
 * @param val
 */


export function genThemeToString(val) {
  return val && themeConfig[val] ? themeConfig[val] : undefined;
}
/**
 * Daybreak-> #1890ff
 *
 * @param val
 */

export function genStringToTheme(val) {
  var stringConfig = invertKeyValues(themeConfig);
  return val && stringConfig[val] ? stringConfig[val] : val;
}
export function clearMenuItem(menusData) {
  return menusData.map(function (item) {
    var finalItem = _objectSpread({}, item);

    if (!finalItem.name || finalItem.hideInMenu) {
      return null;
    }

    if (finalItem && (finalItem === null || finalItem === void 0 ? void 0 : finalItem.children)) {
      if (!finalItem.hideChildrenInMenu && finalItem.children.some(function (child) {
        return child && child.name && !child.hideInMenu;
      })) {
        return _objectSpread(_objectSpread({}, item), {}, {
          children: clearMenuItem(finalItem.children)
        });
      } // children 为空就直接删掉


      delete finalItem.children;
    }

    return finalItem;
  }).filter(function (item) {
    return item;
  });
}