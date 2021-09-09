import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import "./DataCenterLayout.less";
/**
 * 数据中心顶层组件，（包含页面汉化，moment日期格式化，和antd组件样式格式化）
 */
class DataCenterLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <div className="data-center">
          {this.props.children}
        </div>
      </ConfigProvider>
    );
  }
}

export default DataCenterLayout;