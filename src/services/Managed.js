import request from '../utils/request';
const CentralManagement = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/basics/place/list', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/basics/place/add', parameter);
  },
  // 所属中心(带全部)
  ajaxAreaTree: (parameter) => {
    return request('/basics/center/center-list', parameter);
  },
  // 管理员列表
  ajaxUserList: (parameter) => {
    return request('/basics/center/user-list', parameter);
  },
  // 编辑详情
  ajaxEditInfo: (parameter) => {
    return request('/basics/place/update-info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/basics/place/update', parameter);
  },
  // 详情
  ajaxInfo: (parameter) => {
    return request('/basics/place/info', parameter);
  },
  // 文明实践站列表
  ajaxTabList: (parameter) => {
    return request('/basics/center/middle-part-list-one', parameter);
  },
  // 志愿队伍列表
  ajaxTabList1: (parameter) => {
    return request('/basics/center/middle-part-list-two', parameter);
  },
  

};
export default CentralManagement;

