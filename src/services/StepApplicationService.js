import request from '../utils/request';
const StepApplicationService = {
  /** 分步填写申报内容 */
  // 新增试点申报点击
  ajaxAddInfo: (parameter) => {
    return request('/decl/declares/add-info', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/decl/declares/add', parameter);
  },
  // 编辑详情
  ajaxEditInfo: (parameter) => {
    return request('/decl/declares/update-info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/decl/declares/update', parameter);
  },
  // 七牛
  getQiniuToken: (parameter) => {
    return request('/common/image/get-token', parameter);
  },
  // 下载
  getExcel: (parameter) => {
    return request('/decl/declares/get-excel', parameter);
  },

};
export default StepApplicationService;

