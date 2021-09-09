import request from '../utils/request';
const LoginManagement = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/ding/ding-login/city-list', parameter);
  },
  ajaxAppid: (parameter) => {
    return request('/ding/ding-login/city-info', parameter);
  },
  ajaxCode:  (parameter) => {
    return request('/ding/ding-login/ding-login', parameter);
  },
}
export default LoginManagement;