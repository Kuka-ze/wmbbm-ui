import request from '../utils/request';
const PublicService = {
  /** 公益直通车 */
  // 列表
  ajaxList: (parameter) => {
    return request('/operation/applets/list', parameter);
  },
  // 开启/关闭
  ajaxOpen: (parameter) => {
    return request('/operation/applets/open', parameter);
  },
  // 管理列表
  ajaxList2: (parameter) => {
    return request('/operation/applets/template-list', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/operation/applets/template-add', parameter);
  },
  // 编辑详情
  ajaxInfo: (parameter) => {
    return request('/operation/applets/template-info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/operation/applets/template-update', parameter);
  },
  // 删除
  ajaxDel: (parameter) => {
    return request('/operation/applets/template-del', parameter);
  },
  // 可选小程序列表
  ajaxApplets: (parameter) => {
    return request('/operation/applets/template-applets', parameter);
  },
  // 应用租户列表
  ajaxCorp: (parameter) => {
    return request('/operation/applets/template-corp', parameter);
  },

};
export default PublicService;

