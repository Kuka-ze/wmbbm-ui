import request from '../utils/request';
const NoticePublicity = {
  /** 通知宣传 */
  // 列表
  ajaxList: (parameter) => {
    return request('/volunteer/server/type-list', parameter);
  },
  // 服务类型-关联队伍-未关联已关联队伍列表
  serverTeamDrop: (parameter) => {
    return request('/volunteer/server/server-team-drop', parameter);
  },
  // 服务类型-关联队伍-未关联队伍列表所有
  serverTeamTargetAll: (parameter) => {
    return request('/volunteer/server/server-team-target-all', parameter);
  },
  // 服务类型-关联队伍-已关联队伍列表所有
  serverTeamSelectedAll: (parameter) => {
    return request('/volunteer/server/server-team-selected-all', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/volunteer/server/team-relation-add', parameter);
  },

};
export default NoticePublicity;

