import request from '../utils/request';
const ZyhPublicity = {
  /** 通知宣传 */
  // 志愿汇活动--列表
  ajaxList: (parameter) => {
    return request('/activity/activity-volhui/activity-volhui-list', parameter);
  },
  // 志愿汇活动-列表-详情
  ajaxDetail: (parameter) => {
    return request('/activity/activity-volhui/activity-volhui-detail', parameter);
  },
  // 志愿汇活动-列表-活动区域列表
  ajaxAreaTree: (parameter) => {
    return request('/activity/activity-volhui/area-drop-by-hang', parameter);
  },

};
export default ZyhPublicity;

