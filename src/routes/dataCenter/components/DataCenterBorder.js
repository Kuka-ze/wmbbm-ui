import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './DataCenterBorder.less'

class DataCenterBorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:""
    };
  }

  render() {
    return (
      <div className="DataCenterBorder">
        <div className="DataCenterCont">
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default DataCenterBorder;

