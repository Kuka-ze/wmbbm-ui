import request from '../utils/request';
const NoticePublicity = {
  /** 服务排期 */
  // 列表
  ajaxList: (parameter) => {
    return request('/volunteer/scheduling/list', parameter);
  },
  // 队伍下拉
  ajaxTeamList: (parameter) => {
    return request('/volunteer/scheduling/team-list', parameter);
  },
  // 配置
  ajaxAdd: (parameter) => {
    return request('/volunteer/scheduling/team-add', parameter);
  },
  // 排期明细
  ajaxInfo: (parameter) => {
    return request('/volunteer/scheduling/team-scheduling-info', parameter);
  },

};
export default NoticePublicity;

