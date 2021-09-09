import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';
import DataCenterLayout from './components/DataCenterLayout.js'; // 顶层组件
import DataCenterMap from './components/DataCenterMap.js'; // 地图
import Header from "./components/Header"; //头部
import StreetLeft from './components/StreetLeft.js'; //Left
import StreetRight from './components/StreetRight.js'; //Right
import StreetTop from './components/StreetTop.js'; //Top
import "./Cockpit.less";


class Cockpit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    /** 定时刷新 */
    this.interval = setInterval(() => {
      let time = new Date(); // 程序计时的月从0开始取值后+1
      if (time.getSeconds() % 5 === 0) {
        // 按照秒刷新(5秒)
        // console.log("5秒");
      }
      if (time.getSeconds() % 60 === 0) {
        // 按照秒刷新(60秒)
        // console.log("60秒");
        this.props.dispatch({
          type: 'CockpitModel/oneMinute',
          payload: {
            centerId: sessionStorage.getItem('communityId') || "0"
          }
        });
        this.props.dispatch({
          type: 'CockpitModel/centerFiveSecond',
          payload: {
            centerId: sessionStorage.getItem('communityId') || "0"
          },
        });
      }
      if (time.getHours() % 1 === 0 && time.getMinutes() === 0 && time.getSeconds() === 0) {
        // 按照小时刷新(1小时)
        this.props.dispatch({
          type: 'CockpitModel/oneHour',
          payload: {
            centerId: sessionStorage.getItem('communityId') || "0"
          },
        });
      }
      if (time.getHours() === 0 && time.getMinutes() === 0 && time.getSeconds() === 0) {
        // 零点刷新所有
        this.props.dispatch({
          type: 'CockpitModel/init',
          payload: {
            centerId: sessionStorage.getItem('communityId') || "0"
          },
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval=null;
  }

  render() {
    let { dispatch, mapDataJSON, screenCity, areaName, communityId, centerArea, centerFiveSecond = {}, oneMinute = {}, styleList = [], applyList = [], hotList = [], oneHour = {}, cityLp } = this.props;
    let { civilizationList = [], evenBroadUpdateTime } = oneMinute;
    let { skillList = [], activityDurationList = {}, adc = {}, volunteerCode = {}, volunteerSex = {}, rollMonth = {}, rollTotal = {} } = oneHour;
    let { star = {} } = adc;

    let { nextList = {}, volunteerCount = '' } = centerFiveSecond;
    /** map */
    let dataCenterMapProps = {
      oneHour,
      nextList,
      mapDataJSON,
      areaName,
      screenCity,
      communityId,
      dispatch,
      oneMinute,
      evenBroadUpdateTime,
      cityLp
    }

    /** header */
    let headerProps = {
      titleName: sessionStorage.getItem('communityId') == 0 ? `${areaName}文明大脑` : areaName.indexOf("文明实践中心") != -1 ? `${areaName} ` : `${cityLp?'临平区':areaName}新时代文明实践中心`,
      communityList: centerArea,
      communityId: this.props.communityId,
      star,
      handleChange(value, o) {
        sessionStorage.setItem('communityId', value);
        dispatch({
          type: 'CockpitModel/concat',
          payload: {
            communityId: value,
            areaName: o.props.children,
            cityLp: false
          }
        });
        dispatch({
          type: 'CockpitModel/centerFiveSecond',
          payload: {
            centerId: value
          },
        });
        // 获取地图数据
        dispatch({
          type: 'CockpitModel/mapDataJSON',
          payload: {
            centerId: value == '16' ? '0' : value
          },
        });
        // 前端每分钟刷新一次接口(zhd&jgn&sdm) 事件播报
        dispatch({
          type: 'CockpitModel/oneMinute',
          payload: {
            centerId: value
          },
        });
        // 前端每小时刷新一次接口 文化场馆
        dispatch({
          type: 'CockpitModel/oneHour',
          payload: {
            centerId: value
          },
        });
        dispatch({
          type: 'CockpitModel/activityRank',
          payload: {
            centerId: value
          },
        });
      },
      onCommunityLp(){//余杭和临平切换
        dispatch({
          type: 'CockpitModel/concat',
          payload: {
            cityLp: !cityLp
          }
        });
      }
    }
    /** Left */
    let streetLeftProps = {
      civilizationList,
      skillList,
      activityDurationList,
      volunteerCode,
      volunteerSex
    }
    /** top */
    let streetTopProps = {
      nextList,
      adc,
      volunteerCount
    }
    /** Right */
    let streetRightProps = {
      styleList,
      applyList,
      hotList,
      rollMonth,
      rollTotal,
      communityId
    }

    return (
      <DataCenterLayout>
        <DataCenterMap {...dataCenterMapProps} />
        <Header {...headerProps} />
        <StreetLeft {...streetLeftProps} />
        <StreetRight {...streetRightProps} />
        <StreetTop {...streetTopProps} />
      </DataCenterLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.CockpitModel,
    loading: state.loading.models.CockpitModel
  };
}
export default connect(mapStateToProps)(Form.create()(Cockpit));
