import request from '../utils/request';
const VolunteerService = {
  /** 志愿者管理 */
  // 志愿者列表
  volunteerList: (parameter) => {
    return request('/volunteer/volunteer/list', parameter);
  },
  // 技能列表
  skillList: (parameter) => {
    return request('/volunteer/volunteer/skill-list', parameter);
  },
  // 志愿者新增
  volunteerAdd: (parameter) => {
    return request('/volunteer/volunteer/add', parameter);
  },
  //志愿者新增 - 根据手机号查询志愿者
  volunteerMobile: (parameter) => {
    return request('/volunteer/volunteer/volunteer-mobile', parameter);
  },
  // 志愿者编辑
  volunteerEdit: (parameter) => {
    return request('/volunteer/volunteer/edit', parameter);
  },
  // 志愿者详情
  volunteerInfo: (parameter) => {
    return request('/volunteer/volunteer/info', parameter);
  },
  // 编辑详情
  volunteerDetail: (parameter) => {
    return request('/volunteer/volunteer/detail', parameter);
  },
  // 删除
  volunteerRemove: (parameter) => {
    return request('/volunteer/volunteer/remove', parameter);
  },
  // 队伍下拉列表
  volunteerTeamDrop: (parameter) => {
    return request('/volunteer/team/team-drop', parameter);
  },
  // 志愿者积分明细
  volunteerScoreDetail: (parameter) => {
    return request('/volunteer/volunteer/score-detail', parameter);
  },
  // 中心队伍下拉列表
  ajaxCenterTeamDrop: (parameter) => {
    return request('/volunteer/team/center-team-drop', parameter);
  },
  // 志愿者积分明细
  ajaxDetail: (parameter) => {
    return request('/volunteer/volunteer/score-detail', parameter);
  },
  // 所属中心(带全部)
  ajaxAreaTree: (parameter) => {
    return request('/basics/center/center-list', parameter);
  },
  // 队伍类型下拉
  ajaxTeamType: (parameter) => {
    return request('/volunteer/team/team-type-a', parameter);
    // return request('/volunteer/team/team-type', parameter);
  },
  // 队伍归属下拉
  ajaxTeamBelong: (parameter) => {
    return request('/volunteer/team/team-belong', parameter);
  },
  // 队伍下拉列表
  ajaxTeamDrop: (parameter) => {
    return request('/volunteer/team/team-list-drop', parameter);
  },
  // pc后台判断当前用户是不是中心，所，站点管理员
  ajaxIsAdministrators: (parameter) => {
    return request('/basics/center/is-administrators-v2', parameter);
  },
  // 所属中心下拉列表
  placeCenterList: (parameter) => {
    return request('/basics/place/center-list', parameter);
  },
  // 志愿者管理-批量导入-下载数据模板
  getExcel: (parameter) => {
    return request('/volunteer/volunteer/get-excel', parameter);
  },
  // 标签类别下拉
  labelTypeDrop: (parameter) => {
    return request('/volunteer/volunteer/tag-list-drop', parameter);
  },
  // 标签选择列表
  tagList: (parameter) => {
    return request('/volunteer/volunteer/tag-list', parameter);
  },

};
export default VolunteerService;

