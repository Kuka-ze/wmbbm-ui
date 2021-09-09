import request from '../utils/request';

const commonInterface = {
  // 系统接口
  login: (parameter) => {
    return request('/jurisdiction/common/login', parameter);
  },
  loginOut: (parameter) => {
    return request('/jurisdiction/common/login-out', parameter);
  },
  resetPassword: (parameter) => {
    return request('/jurisdiction/new-user/change-password', parameter)
  },
  //获取左侧菜单栏
  menuList: (parameter) => {
    return request('/jurisdiction/common/menu-list', parameter)
  },
  //小区下拉
  communitys: (parameter) => {
    return request('/street/backend/user/communitys', parameter);
  },
  //5级联动关联小区接口
  community: (parameter) => {
    return request('/street/backend/user/communitys', parameter)
  },
  group: (parameter) => {
    return request('/street/backend/common/get-groups', parameter)
  },
  building: (parameter) => {
    return request('/street/backend/common/get-buildings', parameter)
  },
  unit: (parameter) => {
    return request('/street/backend/common/get-units', parameter)
  },
  room: (parameter) => {
    return request('/street/backend/common/get-rooms', parameter)
  },
  //1.19.0
  //使用分析-本级统计
  baseList: (parameter) => {
    return request('/workBench/analysis-new/this-level', parameter)
  },
  baseLine: (parameter) => {
    return request('/workBench/analysis-new/broken-line', parameter)
  },
  ajaxTable: (parameter) => {
    return request('/workBench/analysis-new/lower-level', parameter)
  },
  getOut: (parameter) => {
    return request('/workBench/analysis-new/this-level-excel', parameter)
  },
  getOutLow: (parameter) => {
    return request('/workBench/analysis-new/lower-level-excel', parameter)
  },
  //志愿者分析
  volList: (parameter) => {
    return request('/workBench/volunteer/corp-home-top', parameter)
  },
  volLine: (parameter) => {
    return request('/workBench/volunteer/corp-home-bottom', parameter)
  },
  ajaxTable2: (parameter) => {
    return request('/workBench/volunteer/next-statistic', parameter)
  },
  getVolOut: (parameter) => {
    return request('/workBench/volunteer/this-level-excel', parameter)
  },
  getVolOutLow: (parameter) => {
    return request('/workBench/volunteer/next-level-excel', parameter)
  },
  //活动分析
  activeList: (parameter) => {
    return request('/workBench/activity-analy/activity-analy-top', parameter)
  },
  activeLine: (parameter) => {
    return request('/workBench/activity-analy/activity-analy-bottom', parameter)
  },
  ajaxTable3: (parameter) => {
    return request('/workBench/activity-analy/activity-analy-next', parameter)
  },
  getAcOut: (parameter) => {
    return request('/workBench/activity-analy/activity-local-excel', parameter)
  },
  getAcOutLow: (parameter) => {
    return request('/workBench/activity-analy/activity-next-excel', parameter)
  },
  //秀文明分析
  civiList: (parameter) => {
    return request('/workBench/civilization/this-level', parameter)
  },
  ajaxTable4: (parameter) => {
    return request('/workBench/civilization/lower-level', parameter)
  },
  getCiviOutLow: (parameter) => {
    return request('/workBench/civilization/lower-level-excel', parameter)
  },
};
export default commonInterface;
