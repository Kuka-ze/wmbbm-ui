import request from '../utils/request';
const NoticePublicity = {
  /** 通知宣传 */
  // 列表
  ajaxList: (parameter) => {
    return request('/notice/build/build-list', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/notice/build/build-delete', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/notice/build/build-add', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/notice/build/build-edit', parameter);
  },
  // 编辑-详情
  ajaxEditDetail: (parameter) => {
    return request('/notice/build/build-edit-detail', parameter);
  },
  // 详情
  ajaxDetail: (parameter) => {
    return request('/notice/build/build-detail', parameter);
  },
  // 新增-类型下拉列表
  noticeTypeDrop: (parameter) => {
    return request('/notice/build/build-type-drop', parameter);
  },
  // 所属中心(带全部)
  ajaxAreaTree: (parameter) => {
    return request('/notice/notice/notice-by-center', parameter);
  },
  // pc后台判断当前用户是不是中心，所，站点管理员
  ajaxIsAdministrators: (parameter) => {
    return request('/basics/center/is-administrators-v3', parameter);
    // return request('/basics/center/is-administrators', parameter);
  },
  // 所属中心下拉列表
  placeCenterList: (parameter) => {
    return request('/notice/notice/notice-by-center', parameter);
  },
  // 置顶
  buildTop: (parameter) => {
    return request('/notice/build/build-top', parameter);
  },

};
export default NoticePublicity;

