import request from '../utils/request';
const AccountManagement = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/volunteer/league/list', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/volunteer/league/add', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/volunteer/league/remove', parameter);
  },
  // 编辑-详情
  ajaxInfo: (parameter) => {
    return request('/volunteer/league/info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/volunteer/league/edit', parameter);
  },
  // 详情
  ajaxDetail: (parameter) => {
    return request('/volunteer/league/detail', parameter);
  },
  // 所属中心(带全部)
  ajaxAreaTree: (parameter) => {
    return request('/volunteer/league/league-center', parameter);
  },
  // 联盟管理员列表
  ajaxUserList: (parameter) => {
    return request('/volunteer/league/league-admin', parameter);
  },
  // pc后台判断当前用户是不是中心管理员
  ajaxIsAdministrators: (parameter) => {
    return request('/basics/center/center-administrators', parameter);
  },
  // 所属中心下拉列表
  placeCenterList: (parameter) => {
    return request('/basics/place/center-list', parameter);
  },
  // 志愿队伍列表
  ajaxTabList: (parameter) => {
    return request('/volunteer/league/team-list', parameter);
  },
};
export default AccountManagement;

