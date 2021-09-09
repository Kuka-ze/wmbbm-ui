import request from '../utils/request';
const WelfarePublicity = {
  /** 通知宣传 */
  // 列表-1
  ajaxList: (parameter) => {
    return request('/notice/welfare/welfare-list', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/notice/welfare/welfare-delete', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/notice/welfare/welfare-add', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/notice/welfare/welfare-edit', parameter);
  },
  // 编辑-详情
  ajaxEditDetail: (parameter) => {
    return request('/notice/welfare/welfare-edit-detail', parameter);
  },
  // 详情
  ajaxDetail: (parameter) => {
    return request('/notice/welfare/welfare-detail', parameter);
  },
  // 所属中心(带全部)
  ajaxAreaTree: (parameter) => {
    return request('/notice/welfare/welfare-by-center', parameter);
  },
  // pc后台判断当前用户是不是中心，所，站点管理员
  ajaxIsAdministrators: (parameter) => {
    return request('/basics/center/is-administrators-v3', parameter);
    // return request('/basics/center/is-administrators', parameter);
  },
  // 所属中心下拉列表
  placeCenterList: (parameter) => {
    return request('/notice/welfare/welfare-by-center', parameter);
  },
  // 置顶
  welfareTop: (parameter) => {
    return request('/notice/welfare/welfare-top', parameter);
  },

};
export default WelfarePublicity;

