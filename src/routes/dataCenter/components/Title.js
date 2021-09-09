import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './Title.less'
/**
 * 标题组件
 * @param {string} titleName 标题名字
 * @param {string} type 标题左右类型
 */

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {

  }

  render() {
    let { titleName, type } = this.props;
    return (
      <div className="Title">
        <div className={type == "right" ? "title-name title-name-right" : "title-name"}>{titleName}</div>
      </div>
    );
  }
}

export default Title;

