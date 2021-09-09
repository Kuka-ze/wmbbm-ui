import React from 'react';
import { Row, Col, Rate } from 'antd';
import DataCenterBorder from './DataCenterBorder.js'; //DataCenterBorder
import { Link } from 'react-router-dom';
import first from '../images/first.png'
import second from '../images/second.png'
import third from '../images/third.png'
import fourth from '../images/fourth.png'
import fifth from '../images/fifth.png'
import './dataRank.less'
/**
 * 排行榜组件
 * @param {string} dataList 中心
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
    let { dataList } = this.props;
    return (
      <div>
        {dataList && dataList.length > 0 && dataList.map((item, index) => {
          return <div key={index} style={{ width: '3.08rem', position: 'absolute', left: '22.0%', top: '2.4rem', zIndex: '99', padding: '.2rem 0 0 .24rem' }}>
            <DataCenterBorder bgType="6">
              <div style={{ height: '1.53rem', overflow: 'hidden' }}>
                <div className="civilization-time-box">
                  <div className="name"><img style={{ width: '.3rem' }} className="volunteer-logo" src={require("../images/volunteer-logo.png")} />{item.name || '-'}时代文明实践中心</div>
                  <div className="rate-box">
                    <Rate className="rate" disabled value={item.wmzs} />
                  </div>
                  <div className="civilization-time">活动文明时长：{item.hdwmsc || '-'}</div>
                </div>
              </div>
            </DataCenterBorder>
            <div style={{ paddingTop: '.12rem' }}>
              <DataCenterBorder bgType="7">
                <div style={{ height: '3.45rem', overflow: 'hidden' }}>
                  <div className="info-box">
                    <div className="info-list"><span className="point point-1"></span>新时代文明实践所：{item.nextNum || '0'}</div>
                    <div className="info-list"><span className="point point-2"></span>志愿者：{item.volunteer || '-'}</div>
                    <div className="info-list"><span className="point point-3"></span>志愿队伍：{item.team || '-'}</div>
                    <div className="info-list"><span className="point point-4"></span>发布活动：{item.activity || '-'}</div>
                    <div className="info-list"><span className="point point-5"></span>发布秀文明：{item.civilization || '-'}</div>
                    <div className="info-list"><span className="point point-6"></span>文化馆场：{item.venue || -''}</div>
                  </div>
                </div>
              </DataCenterBorder>
            </div>
          </div>
        })
        }
      </div >
    );
  }
}

export default DataRank;

