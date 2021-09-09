import request from '../utils/request';
const CivilizationShow = {
  /** 内容管理  文明秀 */
  // 列表
  ajaxList: (parameter) => {
    return request('/notice/civilization/list', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/notice/civilization/del', parameter);
  },
  // // 新增
  // ajaxAdd: (parameter) => {
  //   return request('/notice/notice/notice-add', parameter);
  // },
  // // 编辑
  // ajaxEdit: (parameter) => {
  //   return request('/notice/notice/notice-edit', parameter);
  // },
  // // 编辑-详情
  // ajaxEditDetail: (parameter) => {
  //   return request('/notice/notice/notice-edit-detail', parameter);
  // },
  // // 详情
  // ajaxDetail: (parameter) => {
  //   return request('/notice/notice/notice-detail', parameter);
  // },
  // 新增-类型下拉列表
  // noticeTypeDrop: (parameter) => {
  //   return request('/notice/notice/notice-type-drop', parameter);
  // },
  // 类型下拉列表
  civilizationShowTypeDrop: (parameter) => {
    return request('/notice/civilization/type', parameter);
  },
  // // 所属中心(带全部)
  // ajaxAreaTree: (parameter) => {
  //   return request('/basics/center/center-list', parameter);
  // },
  // // pc后台判断当前用户是不是中心，所，站点管理员
  // ajaxIsAdministrators: (parameter) => {
  //   return request('/basics/center/is-administrators', parameter);
  // },
  // 所属中心下拉列表
  placeCenterList: (parameter) => {
    return request('/notice/civilization/center-list', parameter);
    // return request('/basics/place/center-list', parameter);
  }

};
export default CivilizationShow;

