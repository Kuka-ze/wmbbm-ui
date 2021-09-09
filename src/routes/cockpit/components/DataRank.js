import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import first from '../images/first.png'
import second from '../images/second.png'
import third from '../images/third.png'
import fourth from '../images/fourth.png'
import fifth from '../images/fifth.png'
import './dataRank.less'
/**
 * 排行榜组件
 * @param {string} dataList rank排行榜
 */

class DataRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {

  }

  render() {
    let { dataList = [] } = this.props;
    let newList = dataList.slice(0, 5)
    return (
      <div>
        {newList && newList.length > 0 ? newList && newList.length > 0 && newList.map((item, index) => {
          return <div key={index}>
            <div className={index == 1 || index == 3 ? "rank" : "rank-opacity"} >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={index == 0 ? first : index == 1 ? second : index == 2 ? third : index == 3 ? fourth : index == 4 ? fifth : ""}></img>
                <div className="ellipsis-over">{item.name}</div>
              </div>
              <div className={index == 3 || index == 4 ? "fontColor-white" : 'fontColor-green'}>{item.totals || item.count}</div>
            </div>
          </div>
        })
          : <div className="noData">暂无数据</div>}
      </div >
    );
  }
}

export default DataRank;

