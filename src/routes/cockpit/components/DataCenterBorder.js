import React from 'react';
import './DataCenterBorder.less'

/**
 * 边框背景组件
 * @param {string} bgType 背景类型，从左往右1-8
 */

class DataCenterBorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { bgType } = this.props;
    return (
      <div className="DataCenterBorders">
        <div className={`DataCenterCont bgType-${bgType}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DataCenterBorder;