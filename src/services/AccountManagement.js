import request from '../utils/request';
const AccountManagement = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/operation/corp/list', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/operation/corp/add', parameter);
  },
  // 开启关闭账号
  ajaxUpdateStatus: (parameter) => {
    return request('/operation/corp/update-status', parameter);
  },
  // 重置密码
  ajaxUpdatePwd: (parameter) => {
    return request('/operation/corp/update-pwd', parameter);
  },
  // 省市区树
  ajaxAreaTree: (parameter) => {
    return request('/operation/corp/area-tree', parameter);
  },
  // 获取绑定钉钉详情
  dingdingShow: (parameter) => {
    return request('/operation/corp/update-ding-info', parameter);
  },
  // 绑定钉钉 保存
  saveDingding: (parameter) => {
    return request('/operation/corp/add-ding', parameter);
  },
  // 绑定支付宝小程序编辑详情
  updateAlipayInfo: (parameter) => {
    return request('/operation/corp/update-ali-pay-info', parameter);
  },
  // 绑定支付宝小程序
  addAlipay: (parameter) => {
    return request('/operation/corp/add-ali-pay', parameter);
  },
};
export default AccountManagement;

