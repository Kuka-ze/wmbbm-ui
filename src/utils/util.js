import { Popover } from 'antd';
import React from 'react';
export function getUrl() {
  let location = window.location,
    hostname = location.hostname,
    port = location.port,
    protocol = location.protocol;
  /** 改了后要复制到static/ueditor/ueditor.all.js，同步一下（编辑器上传图片） */
  if (hostname == 'localhost') {   //本地环境
    return 'https://wmdn-api-pre.zje.com/wmdn-jgn/?r='
  } else if (hostname == 'wmdn-pre.zje.com') {/** 预发1 */
    return 'https://wmdn-api-pre.zje.com/wmdn-jgn/?r='
  } else if (hostname == 'wmdn-pre-kelang.zje.com') {/** 预发2 */
    return 'https://wmdn-api-pre.zje.com/wmdn-zhd/?r='
  } else if (hostname == 'wmdn.zje.com') {/** 生产 */
    return 'https://wmdn-api.zje.com/index.php?r='
  } else if (hostname == 'wmdn-gs.zje.com') {/** 拱墅 */
    return 'https://wmdn-api.zje.com/index.php?r='
  } else if (hostname == 'wmdn-code.zje.com') {/** 文明码 */
    return 'https://wmdn-code-api.zje.com/index.php?r='
  } else if (hostname == 'wmdn-yj.zje.com') {/** 西子义警 */
    return 'https://wmdn-yj-api.zje.com/index.php?r='
  } else {/** 其他 */
    return 'https://wmdn-api.zje.com/index.php?r='
  }
}



export function download(url) {
  if (url && Object.prototype.toString.call(url) === '[object String]') {
    let a = document.createElement('a')
    a.href = encodeURI(url)
    a.download = 'excel';
    a.id = 'downLoad'
    a.style.display = 'none'
    // a.click()
    document.body.appendChild(a)
    document.getElementById('downLoad').click()
    document.body.removeChild(document.getElementById('downLoad'))
    a = null
  }
}
export function authority(auth) {
  // return true;
  let res = false;
  // const reg = /(?<=\/).*?(?=\?)|(?<=\/).*/;
  // let hash = reg.exec(location.hash)[0];
  let hash = location.hash.replace("#/", "");
  hash = hash.split('?')[0];
  //console.log(hash)
  const menu = sessionStorage.menus ? JSON.parse(sessionStorage.menus) : [];
  menu.map(item1 => {
    item1.children && item1.children.map(item2 => {

      if (item2.menuUrl === hash) {
        //console.log(item2)
        item2.children && item2.children.map(item3 => {
          if (item3.key == auth || item3.menuCode == auth) {
            res = true;
          }
        })
      }
    })
  });
  return res;
}
export function authoritys(auth, num) {
  let res = false;
  // const reg = /(?<=\/).*?(?=\?)|(?<=\/).*/;
  // let hash = reg.exec(location.hash)[0];
  //let hash = num==1 ? "jurisdictionalDistrict":num==2?"communityContact":num==3?"activityList":"CommitteeMember"
  //hash = hash.split('?')[0];
  //console.log(hash)
  let hash;
  if (num == 1) {
    hash = "approvalList"
  }
  // if (num == 1) {
  //   hash = "jurisdictionalDistrict"
  // } else if (num == 2) {
  //   hash = "communityContact"
  // } else if (num == 3) {
  //   hash = "activityList"
  // } else if (num == 4) {
  //   hash = "committeeMember"
  // } else if (num == 5) {
  //   hash = "grid"
  // } else if (num == 6) {
  //   hash = "taskList"
  // }
  //console.log(hash)
  const menu = sessionStorage.menus ? JSON.parse(sessionStorage.menus) : [];
  menu.map(item1 => {
    item1.children && item1.children.map(item2 => {
      if (item2.menuUrl === hash) {
        item2.children && item2.children.map(item3 => {
          if (item3.key == auth || item3.menuCode == auth) {
            res = true;
          }
        })
      }
    })
  });
  return res;
}
export function noData(text, record) {
  return text ? text : '-'
}

export function checkPhone(rule, value, callback) {
  let regex = /^1[0-9]{10}$/;//手机号
  if (value && !regex.test(value)) {
    //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
    callback('请输入正确的手机号码！');
  } else {
    callback();
  }
}
export function checkCard(rule, value, callback) {
  let regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//身份证号
  if (value && !regex.test(value)) {
    //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
    callback('请输入正确的身份证号码！');
  } else {
    callback();
  }
}

export function checkAlipay(rule, value, callback) {
  let regex = /^((\w)+(\.\w+)*@([\w-])+((\.[\w-]+)+)|(1\d{10}))$/;//支付宝账号
  if (value && !regex.test(value)) {
    callback('请输入正确的支付宝账号！');
  } else {
    callback();
  }
}

export function checkTel(rule, value, callback) {
  let regex = /^((0\d{2,3}-\d{7,8})|(1[0-9]{10}))$/;//固话或者手机号
  if (value && !regex.test(value)) {
    callback('请输入正确的固话或手机号！');
  } else {
    callback();
  }
}

export function checkHttp(rule, value, callback) {
  let regex = /^(http[s]?|ftp):\/\/[^\\/\\.]+?\..+\w$/;//网址
  if (value && !regex.test(value)) {
    callback('请输入正确的网址！');
  } else {
    callback();
  }
}

export function checkEmail(rule, value, callback) {
  let regex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (value && !regex.test(value)) {
    callback('请输入正确的邮箱！');
  } else {
    callback();
  }
}

export function checkDefault(rule, value, callback) {
  let regex = /^.{1,30}$/;          //30位任意字符
  if (value && !regex.test(value)) {
    callback('请输入！');
  } else {
    callback();
  }
}
export function checkDefaultPeople(rule, value, callback) {
  let regex = /^.{1,10}$/;          //10位任意字符
  if (value && !regex.test(value)) {
    callback('请输入10字以内！');
  } else {
    callback();
  }
}
export function checkDefaults(rule, value, callback) {
  let regex = /^.{1,20}$/;          //20位任意字符
  if (value && !regex.test(value)) {
    callback('请输入20字以内！');
  } else {
    callback();
  }
}
export function checkNum(rule, value, callback) {
  let regex = /^([1-9]\d*|[0]{1,1})$/;        //含0正整数
  if (value && !regex.test(value)) {
    callback('请输入0或正整数！');
  } else {
    callback();
  }
}

export function checkNums(rule, value, callback) {
  let regex = /^\+?[1-9]\d{0,3}(\.\d*)?$/;        //1-9999正整数
  if (value && !regex.test(value)) {
    callback('请输入1-9999正整数！');
  } else {
    callback();
  }
}
// 获取cookie
export function getCookie(key) {
  const name = key + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// 设置cookie,默认是30天
export function setCookie(key, value) {
  const d = new Date();
  d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toGMTString();
  document.cookie = key + "=" + value + "; " + expires;
}
export function popovers(value, num, width) {
  if (value) {
    if (value.length > num) {
      return <Popover placement="topLeft" content={<div style={{ width: `${width ? width + "px" : ""}` }}>{value}</div>}><div>{value.substring(0, num)}...</div></Popover>
    } else {
      return value
    }
  } else {
    return "-"
  }
}
// 设置筛选条件及分页
export function setCacheData(data) {
  console.log("set")
  sessionStorage.setItem('cacheData', JSON.stringify(data));
}
//获取筛选条件及分页
export function getCacheData() {
  let datas = JSON.parse(sessionStorage.getItem('cacheData'));
  return datas ? datas : ""
  return false
}

//清除筛选条件及分页
export function removeCacheData() {
  console.log("remove")
  sessionStorage.removeItem('cacheData');
}

//获取年月日
export function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

//获取年月日  (d天前或d周)
export function getYesFormatDate(d, type) {
  var weekDay = new Date().getDay();
  if (weekDay == 0) {
    //如果是周日，则设为7天
    weekDay = 7;
  }
  //weekDay-当前是周几
  var time;
  if (type == 'day') {
    time = (new Date).getTime() - 24 * 60 * 60 * 1000 * d
  } else if (type == 'week') {
    time = (new Date).getTime() - 24 * (d * 7 - 1 + weekDay) * 60 * 60 * 1000;
  } else {
    time = (new Date).getTime();
  }
  var date = new Date(time);  //获取日期
  var seperator1 = "-";
  var year = type == 'year' ? date.getFullYear() - d : date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var yesday = year + seperator1 + month + seperator1 + strDate;
  return yesday;
}
//获取上月年月
export function getMoutnFormatDate() {
  var time = (new Date).getTime();
  var date = new Date(time);  //获取的是今天的日期
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (month == 0) {
    month = "12";
    year = year - 1;
  }
  var yesMouth = year + seperator1 + month;
  return yesMouth;
}

//获取6月前 年月
export function getSixMoutnFormatDate() {
  var time = (new Date).getTime();
  var date = new Date(time);  //获取的是今天的日期
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() - 6;
  if (month < 0) {
    year = year - 1;
    let newMonth = month + 13;
    if (newMonth <= 9) {
      month = "0" + newMonth;
    } else {
      month = newMonth;
    }
  } else if (month >= 0) {
    let newMonth = month + 1;
    month = "0" + newMonth
  }
  var sixMouth = year + seperator1 + month;
  return sixMouth;
}

//获取当前年
export function getYearFormatDate() {
  var time = (new Date).getTime();
  var date = new Date(time);
  var year = date.getFullYear() - 1;
  return year;
}


//获取30天前或今年第一天 年月日
// export function getOneMouthFormatDate() {
//   var time = (new Date).getTime() - 24 * 130 * 60 * 60 * 1000;
//   var date = new Date(time);  //获取的是30天前的日期
//   var time1 = (new Date).getTime();
//   var date1 = new Date(time1);  //获取的是今天的日期
//   var seperator1 = "-";
//   var year = date.getFullYear();
//   var year1 = date1.getFullYear();
//   if (year == year1) {
//     var month = date.getMonth() + 1;
//     var strDate = date.getDate();
//     if (month >= 1 && month <= 9) {
//       month = "0" + month;
//     }
//     if (strDate >= 0 && strDate <= 9) {
//       strDate = "0" + strDate;
//     }
//   } else {
//     year = year1;
//     var month = '01';
//     var strDate = '01';
//   }


//   var week = year + seperator1 + month + seperator1 + strDate;
//   return week;
// }

//获取本月年月
// export function getMouthFormatDate(m) {
//   var time = (new Date).getTime();
//   var date = new Date(time);  //获取的是今天的日期
//   var seperator1 = "-";
//   var year = date.getFullYear();
//   var month = date.getMonth() - m;
//   if (month >= 0 && month < 9) {
//     month = "0" + (month + 1);
//   }
//   if (month == 12) {
//     year = year - 1;
//   }
//   var yesMouth = year + seperator1 + month;
//   return yesMouth;
// }