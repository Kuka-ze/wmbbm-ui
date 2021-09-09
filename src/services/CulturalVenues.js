import request from '../utils/request';
const NoticePublicity = {
  /** 通知宣传 */
  // 列表
  ajaxList: (parameter) => {
    return request('/notice/cultural/list', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/notice/cultural/remove', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/notice/cultural/add', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/notice/cultural/edit', parameter);
  },
  // 编辑-详情
  ajaxEditDetail: (parameter) => {
    return request('/notice/cultural/info', parameter);
  },
  // 详情
  ajaxDetail: (parameter) => {
    return request('/notice/cultural/detail', parameter);
  },
  // 新增-类型下拉列表
  noticeTypeDrop: (parameter) => {
    return request('/notice/cultural/venue-type', parameter);
  },
  // 所属中心(带全部)
  ajaxAreaTree: (parameter) => {
    return request('/notice/cultural/center-list', parameter);
  },
  // pc后台判断当前用户是不是中心，所，站点管理员
  ajaxIsAdministrators: (parameter) => {
    return request('/basics/center/is-administrators-v3', parameter);
    // return request('/basics/center/is-administrators', parameter);
  },
  // 所属中心下拉列表
  placeCenterList: (parameter) => {
    return request('/notice/cultural/center-list', parameter);
  }

};
export default NoticePublicity;

