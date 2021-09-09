import request from '../utils/request';
const CentralManagement = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/basics/center/list', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/basics/center/add', parameter);
  },
  // 省市区树
  ajaxAreaTree: (parameter) => {
    // return request('/operation/corp/area-tree', parameter);
    return request('/basics/center/area-tree', parameter);
  },
  // 管理员列表
  ajaxUserList: (parameter) => {
    return request('/basics/center/user-list', parameter);
  },
  // 编辑详情
  ajaxEditInfo: (parameter) => {
    return request('/basics/center/update-info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/basics/center/update', parameter);
  },
  // 详情
  ajaxInfo: (parameter) => {
    return request('/basics/center/info', parameter);
  },
  // 文明实践所列表
  ajaxTabList: (parameter) => {
    return request('/basics/center/middle-part-list-one', parameter);
  },
  // 志愿联盟列表
  ajaxTabList2: (parameter) => {
    return request('/basics/center/middle-part-list-two', parameter);
  },
  // 中心下拉
  ajaxCenterLevel: (parameter) => {
    return request('/basics/center/center-level', parameter);
  },

};
export default CentralManagement;

