export function getURLParameter(url, paramName) {
  try {
    if ( url.indexOf("?") !== -1 ) {
      let paramString = url.split("?")[1];
      let value = "";
      let targetIndex = paramString.indexOf(paramName);
      if ( targetIndex !== -1 ) {
        for ( let i = targetIndex; i < paramString.length; ++i ) {
          if ( paramString[i] === '&' || paramString[i] === '/' ) {
            break;
          } else {
            value += paramString[i];
          }
        }
        // console.log(`value = ${value}`);

        if ( value.indexOf('=') !== -1 ) {
          value = value.split('=')[1];
          console.log(`getURLparam: ${paramName} = ${value} with type = ${typeof value}`);
          return value === "null"? null : value;
        } else {
          throw new Error(`Error in course page courseTitle retrieval: no '=' in value`);
        }
      } else {
        throw new Error(`Error in get URL parameter: no such parameter ${paramName}`);
      }
    }
  }
  catch(error) {
    throw new Error(error);
  }
}


/* --------------------------
 * !!! 教师个人网站URL信息 !!!
 * -------------------------- */
export const instructorNameToPageURL = (instructor) => {
  switch(instructor) {
    case "Han Xiaoguang":
      return "https://mypage.cuhk.edu.cn/academics/hanxiaoguang/";
    case "Zhao Junhua":
      return "https://www.zhaojunhua.org/";
    case "Cai Wei":
      return "https://mypage.cuhk.edu.cn/academics/caiwei/";
    default:
      // return "https://sse.cuhk.edu.cn/teacher-search?keywords=&alphabet=All&category=All&academic=All&class_type=All&page=3";
      return null;
  }
};


/* -----------------------
 * !!! Cookie 相关函数 !!!
 * ----------------------- */

// 返回具有给定 name 的 cookie，
// 如果没找到，则返回 undefined
export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


export function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // 如果需要，可以在这里添加其他默认值
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}


export function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}




/* --------------------
 * !!! 日期格式函数 !!!
 * -------------------- */
export function dateFormat(date, fmt="YYYY-mm-dd HH:MM") {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}