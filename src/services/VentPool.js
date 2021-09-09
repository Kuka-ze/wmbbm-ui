import request from '../utils/request';
const AccountManagement = {
  /** 大家帮-问题池 */
  // 列表
  ajaxList: (parameter) => {
    return request('/opinion/opinion/list', parameter);
  },
  // 退回
  ajaxReject: (parameter) => {
    return request('/opinion/opinion/refuse', parameter);
  },
  //接收-下拉组织
  ajaxNextDrop: (parameter) => {
    return request('/opinion/opinion/next-list', parameter);
  },
  // 接收
  ajaxReceive: (parameter) => {
    return request('/opinion/opinion/receive', parameter);
  },
  // 解决
  ajaxResolve: (parameter) => {
    return request('/opinion/opinion/solve', parameter);
  },
  // 所有状态
  ajaxStateList: (parameter) => {
    return request('/opinion/opinion/state-list', parameter);
  },
  // 详情
  ajaxDetail: (parameter) => {
    return request('/opinion/opinion/info', parameter);
  },
};
export default AccountManagement;