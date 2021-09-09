import request from '../utils/request';
const PublicService = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/basics/city/list', parameter);
  },
  // 编辑详情
  ajaxEditInfo: (parameter) => {
    return request('/basics/city/update-info', parameter);
  },
  // 详情
  ajaxInfo: (parameter) => {
    return request('/basics/city/info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/basics/city/update', parameter);
  },
  // 管理员列表
  ajaxUserList: (parameter) => {
    return request('/basics/center/user-list', parameter);
  }
};
export default PublicService;

