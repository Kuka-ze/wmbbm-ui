import request from '../utils/request';

const CockpitService = {
  // 数据大屏-中间c位重点数据、志愿者活跃度数据(前端定时5秒调用一次)
  centerFiveSecond: (parameter) => {
    return request('/screenNew/screen/five-second', parameter);
  },
  // 大屏地图数据-JSON
  mapDataJSON: (parameter) => {
    return request('/screenNew/screen/map-json', parameter);
  },
  // 区下拉接口
  getCenterArea: (parameter) => {
    return request('/screenNew/screen/area-list', parameter);
  },
  // 数据大屏-右下角-活动排行专题-二级页面(sdm)
  activityRank: (parameter) => {
    return request('/screenNew/activity/activity-type-second-list', parameter);
  },
  // 前端每小时刷新一次接口 文化场馆
  oneHour: (parameter) => {
    return request('/screenNew/screen/one-hour', parameter);
  },
  // 每分钟刷新一次接口
  oneMinute: (parameter) => {
    return request('/screenNew/screen/one-minute', parameter);
  },
};

export default CockpitService;
