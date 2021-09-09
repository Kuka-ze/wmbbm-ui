import React from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom';

/**
 *面包屑组件
 * @param {Array} breadcrumbs 数组对象
 * 包含字段：
 * @param {string} name 面包屑名称
 * @param {string} href 面包屑url
 */

function newBreadcrumb({breadcrumbs}) {

  //判断字符是否为空的方法
  function isStringNotEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      console.log(1);
      return false;
    } else {
      console.log(2);
      return true;
    }
  }

  return (
    <Breadcrumb
      separator=">"
    >
      {breadcrumbs.map((value, index) => {
        return (
          <Breadcrumb.Item key={index}>
            {value.href ? <Link to={value.href}>{value.name}</Link> : value.name}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default newBreadcrumb
