import request from '../utils/request';
const AccountManagement = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/volunteer/team/list', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/volunteer/team/add', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/volunteer/team/remove', parameter);
  },
  // 所属中心(带全部)
  ajaxAreaTree: (parameter) => {
    return request('/volunteer/team/team-center', parameter);
  },
  // 管理员列表
  ajaxUserList: (parameter) => {
    return request('/volunteer/team/team-admin', parameter);
  },
  // 队伍类型下拉
  ajaxTeamType: (parameter) => {
    return request('/volunteer/team/team-type', parameter);
  },
  // 队伍类型下拉a
  ajaxTeamTypea: (parameter) => {
    return request('/volunteer/team/team-type-a', parameter);
  },
  // 队伍归属下拉
  ajaxTeamBelong: (parameter) => {
    return request('/volunteer/team/team-belong', parameter);
  },
  // pc后台判断当前用户是不是中心，所，站点管理员
  ajaxIsAdministrators: (parameter) => {
    return request('/basics/center/is-administrators', parameter);
  },
  // 编辑详情
  ajaxTeamInfo: (parameter) => {
    return request('/volunteer/team/info', parameter);
  },
  // 编辑
  ajaxTeamEdit: (parameter) => {
    return request('/volunteer/team/edit', parameter);
  },
  // 所属中心下拉列表
  placeCenterList: (parameter) => {
    return request('/volunteer/team/team-list-center', parameter);
    // return request('/basics/place/center-list', parameter);
  },
  // 志愿者队伍管理-详情-授权
  teamGrant: (parameter) => {
    return request('/volunteer/team/grant', parameter);
  },
  // 队伍标签-下拉
  teamTags: (parameter) => {
    return request('/volunteer/team/team-tags', parameter);
  },

};
export default AccountManagement;

