import request from '../utils/request';
const LabelManagement = {
  /** 通知宣传 */
  // 列表
  ajaxList: (parameter) => {
    return request('/operation/label/list', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/operation/label/del', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/operation/label/add', parameter);
  },
  // 编辑-详情
  ajaxEditDetail: (parameter) => {
    return request('/operation/label/info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/operation/label/update', parameter);
  },
  // 标签类别下拉列表
  labelTypeDrop: (parameter) => {
    return request('/operation/label/label-type-drop', parameter);
  }
};
export default LabelManagement;

