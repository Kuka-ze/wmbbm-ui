import request from '../utils/request';
const AccountManagement = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/activity/activity-type/activity-type-list', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/activity/activity-type/activity-type-add', parameter);
  },
  // pc后台判断当前用户是不是中心，所，站点管理员
  ajaxIsAdministrators: (parameter) => {
    return request('/basics/center/is-administrators', parameter);
  },
  // 编辑详情
  ajaxActivityTypeEditDetail: (parameter) => {
    return request('/activity/activity-type/activity-type-edit-detail', parameter);
  },
  // 编辑
  ajaxActivityTypeEdit: (parameter) => {
    return request('/activity/activity-type/activity-type-edit', parameter);
  }
 

};
export default AccountManagement;

