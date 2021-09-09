import request from '../utils/request';
const NoticePublicity = {
  /** 通知宣传 */
  // 列表
  ajaxList: (parameter) => {
    return request('/notice/task/list', parameter);
  },
  // 状态下拉(带全部)
  placeCenterList: (parameter) => {
    return request('/notice/task/state', parameter);
  },
  // 执行详情
  ajaxImplement: (parameter) => {
    return request('/notice/task/implement', parameter);
  },
  // 响应
  ajaxResponse: (parameter) => {
    return request('/notice/task/response', parameter);
  },
  // 队员下拉
  ajaxVolunteerList: (parameter) => {
    return request('/notice/task/volunteer-list', parameter);
  },
  // 指派
  ajaxAssign: (parameter) => {
    return request('/notice/task/assign', parameter);
  }

};
export default NoticePublicity;

