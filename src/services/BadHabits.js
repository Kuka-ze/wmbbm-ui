import request from '../utils/request';
const AccountManagement = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/volunteer/habits/list', parameter);
  },
  // 详情
  ajaxDetail: (parameter) => {
    return request('/volunteer/habits/detail', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/volunteer/habits/remove', parameter);
  },
  // 所属中心(带全部)
  ajaxAreaTree: (parameter) => {
    return request('/basics/center/center-list', parameter);
  },
  // 所属中心下拉列表
  placeCenterList: (parameter) => {
    return request('/basics/place/center-list', parameter);
  },


};
export default AccountManagement;

