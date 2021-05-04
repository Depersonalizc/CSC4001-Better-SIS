import { isBrowser } from '@ant-design/pro-utils';
import zhLocal from './zh-CN';
import zhTWLocal from './zh-TW';
import enUSLocal from './en-US';
import itITLocal from './it-IT';
var locales = {
  'zh-CN': zhLocal,
  'zh-TW': zhTWLocal,
  'en-US': enUSLocal,
  'it-IT': itITLocal
};

var getLanguage = function getLanguage() {
  // support ssr
  if (!isBrowser()) return 'zh-CN';
  var lang = window.localStorage.getItem('umi_locale');
  return lang || window.g_locale || navigator.language;
};

export { getLanguage };
export default (function () {
  var gLocale = getLanguage();

  if (locales[gLocale]) {
    return locales[gLocale];
  }

  return locales['zh-CN'];
});