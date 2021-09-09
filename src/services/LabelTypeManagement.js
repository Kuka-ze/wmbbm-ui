import request from '../utils/request';
const LabelTypeManagement = {
  /** 通知宣传 */
  // 列表
  ajaxList: (parameter) => {
    return request('/operation/label/label-type-list', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/operation/label/del-type', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/operation/label/add-type', parameter);
  },
  // 编辑-详情
  ajaxEditDetail: (parameter) => {
    return request('/operation/label/type-info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/operation/label/update-type', parameter);
  },
  // 标签类别下拉列表
  labelTypeDrop: (parameter) => {
    return request('/operation/label/type-list', parameter);
  },
  // 显示和隐藏
  ajaxTypeStatus: (parameter) => {
    return request('/operation/label/type-status', parameter);
  },
};
export default LabelTypeManagement;

