import React from 'react';
import { Row, Col, Table, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import DataCenterBorder from './DataCenterBorder.js'; //DataCenterBorder
import { popovers } from './../../../utils/util';
import './StreetTop.less'
import echarts from 'echarts';
/**
 * 顶部组件
 */

class StreetTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {

  }

  render() {
    let { adc = {}, volunteerCount = '' } = this.props


    return (
      <div className="StreetTop">
        <DataCenterBorder bgType="5">
          <div style={{ height: '1.30rem', overflow: 'hidden' }}>
            <Row type="flex" justify="space-between" className="base-data-box">
              <Col className="base-data-list">
                <div className="base-info">
                  <div className="name">志愿者</div>
                  <div className="num-box"><span className="num">{volunteerCount || 0}</span>人</div>
                </div>
              </Col>
              <Col className="base-data-list">
                <div className="base-info">
                  <div className="name">志愿队伍</div>
                  <div className="num-box"><span className="num">{adc.teamCount || 0}</span>支</div>
                </div>
              </Col>
              <Col className="base-data-list">
                <div className="base-info">
                  <div className="name">发布活动</div>
                  <div className="num-box"><span className="num">{adc.activityCount || 0}</span>起</div>
                </div>
              </Col>
              <Col className="base-data-list">
                <div className="base-info">
                  <div className="name">发布秀文明</div>
                  <div className="num-box"><span className="num">{adc.civiCount || 0}</span>次</div>
                </div>
              </Col>
              <Col className="base-data-list">
                <div className="base-info">
                  <div className="name">文化场馆</div>
                  <div className="num-box"><span className="num">{adc.venueCount || 0}</span>所</div>
                </div>
              </Col>
            </Row>
          </div>
        </DataCenterBorder>
      </div>
    );
  }
}

export default StreetTop;

