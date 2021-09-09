import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './DataCenterTitle.less'
/**
 * 标题组件
 * @param {string} titleName 标题名字
 */

class DataCenterTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {

  }

  render() {
    let { titleName } = this.props;
    return (
      <div className="DataCenterTitle">
        <div className="title-name">{titleName}</div>
      </div>
    );
  }
}

export default DataCenterTitle;

