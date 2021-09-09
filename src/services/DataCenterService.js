import request from '../utils/request';

const DataCenterService = {
  // 热门活动
  screenOneHour: (parameter) => {
    return request('/screenClass/screen/gs-one-hour', parameter);
    // return request('/screen/screen/gs-one-hour', parameter);
  },
  // 文明实践活动类型占比
  screenTwelveHour: (parameter) => {
    return request('/screenClass/screen/gs-twelve-hour', parameter);
    // return request('/screen/screen/gs-twelve-hour', parameter);
  },
  // 数据大屏-中间c位重点数据、志愿者活跃度数据(前端定时5秒调用一次)
  centerFiveSecond: (parameter) => {
    return request('/screenClass/screen/gs-five-second', parameter);
    // return request('/screen/screen/gs-five-second', parameter);
  },
  // 大屏地图数据-JSON
  mapDataJSON: (parameter) => {
    return request('/screenClass/screen/map-json', parameter);
    // return request('/screen/screen/gs-map-data', parameter);
  },
  //大屏地图数据-获取中心下所列表
  getPlace: (parameter) => {
    return request('/screenClass/screen/get-place', parameter);
    // return request('/screen/screen/gs-map-data', parameter);
  },
  // 大屏地图数据
  mapData: (parameter) => {
    return request('/screenClass/screen/gs-map-data', parameter);
    // return request('/screen/screen/gs-map-data', parameter);
  },
  // 地图信息
  mapMessage: (parameter) => {
    return request('/screenClass/screen/gs-map-message', parameter);
    // return request('/screen/screen/gs-map-message', parameter);
  },
  // 地图图片
  mapList: (parameter) => {
    return request('/screenClass/screen/map-list', parameter);
    // return request('/screen/screen/map-list', parameter);
  },
  // 文明治理的接口
  civilizationGovernance:(parameter) => {
    return request('/screenClass/screen/gs-one-minute', parameter);
    // return request('/screen/screen/gs-one-minute', parameter);
  },
  // 区下拉接口
  getCenterArea:(parameter) => {
    return request('/screenClass/screen/get-center-area', parameter);
  },
  // 左上-文明指数折线图
  screenCivilization:(parameter) => {
    return request('/screenClass/screen/civilization', parameter);
  },

};

export default DataCenterService;
