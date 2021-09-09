import request from '../utils/request';
const CentralManagement = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/partyEdu/party-activity/activity-list', parameter);
  },
  // 活动状态下拉
  ajaxAreaTree: (parameter) => {
    return request('/partyEdu/party-activity/activity-state', parameter);
  },
  // 添加群众
  ajaxMassesAdd: (parameter) => {
    return request('/partyEdu/party-activity/masses-add', parameter);
  },
  // 取消活动
  ajaxCancel: (parameter) => {
    return request('/partyEdu/party-activity/activity-cancel', parameter);
  },
  // 活动池-时长审核-志愿者列表
  ajaxVolunteerList: (parameter) => {
    return request('/partyEdu/party-activity/volunteer-list', parameter);
  },
  // 活动池-时长审核
  ajaxAudit: (parameter) => {
    return request('/partyEdu/party-activity/duration-audit', parameter);
  },
  // 详情
  ajaxInfo: (parameter) => {
    return request('/partyEdu/party-activity/activity-detail', parameter);
  },
  // 活动根据活动id查询待统筹名单
  ajaxInfoService: (parameter) => {
    return request('/partyEdu/party-template/plan-info-service', parameter);
  },
};
export default CentralManagement;

