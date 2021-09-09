import request from '../utils/request';
const PublicService = {
  /** 合作小程序 */
  // 列表
  ajaxList: (parameter) => {
    return request('/operation/applets/cooperation-list', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/operation/applets/cooperation-add', parameter);
  },
  // 编辑详情
  ajaxInfo: (parameter) => {
    return request('/operation/applets/cooperation-info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/operation/applets/cooperation-update', parameter);
  },
  // 删除
  ajaxDel: (parameter) => {
    return request('/operation/applets/cooperation-del', parameter);
  },
};
export default PublicService;

