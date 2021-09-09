import request from '../utils/request';

const commonInterface = {
  // 活动管理-列表(系列&单次活动)v1.8.0
  getApprovalList: (parameter) => {
    return request('/activity/activity/activity-list', parameter);
  },
  // 所属中心/所/站/点下拉列表
  ajaxActivityCenterDataDrop: (parameter) => {
    return request('/activity/activity/activity-center-data-drop', parameter);
  },
  // 活动类型下拉
  getListDrop: (parameter) => {
    return request('/activity/activity/activity-type-drop', parameter);
  },
  // 所属中心、所、站、联盟、点下拉
  getLevelListDrop: (parameter) => {
    return request('/activity/activity/activity-center-data-drop', parameter);
  },
  // 签到范围下拉
  getOpenAndSign: (parameter) => {
    return request('/activity/activity/activity-sign-range', parameter);
  },
  // 活动管理-列表-新增(单次活动)v1.8.0
  activityAdd: (parameter) => {
    return request('/activity/activity/activity-add', parameter);
  },
  // pc后台判断当前用户是不是中心，所，站点管理员 1.4.9
  ajaxIsAdministrators: (parameter) => {
    return request('/basics/center/is-administrators-v3', parameter);
  },
  // 活动管理-列表-参与情况明细(单次&系列活动下子活动)v1.8.0
  ajaxVolunteerDetail: (parameter) => {
    return request('/activity/activity/activity-many-child-detail', parameter);
    // return request('/activity/activity/volunteer-detail', parameter);
  },
  // 删除
  inspectDelete: (parameter) => {
    return request('/activity/activity/activity-delete', parameter);
  },
  // 参与情况明细-取消报名
  ajaxVolunteerCancel: (parameter) => {
    return request('/activity/activity/volunteer-cancel', parameter);
  },
  // 参与情况明细-发放时长
  ajaxVolunteerTime: (parameter) => {
    return request('/activity/activity/duration-send', parameter);
  },
  // 参与情况明细-驳回
  ajaxVolunteerReject: (parameter) => {
    return request('/activity/activity/duration-rejected', parameter);
  },
  // 参与情况明细-撤销驳回
  ajaxVolunteerJect: (parameter) => {
    return request('/activity/activity/undo-rejected', parameter);
  },
  // 参与情况明细-驳回原因
  ajaxVolunteerReason: (parameter) => {
    return request('/activity/activity/rejected-reason', parameter);
  },
  // 活动状态下拉
  ajaxActivityStatusDrop: (parameter) => {
    return request('/activity/activity/activity-status-drop', parameter);
  },
  // 所属中心下拉列表  1.4.9
  ajaxCenterDropFromActivityList: (parameter) => {
    return request('/basics/place/center-list', parameter);
    //return request('/activity/activity/center-list', parameter);
  },
  // 根据中心id获取所下拉列表  1.4.9
  ajaxPlaceDropByCenterId: (parameter) => {
    return request('/basics/place/place-list', parameter);
    //return request('/activity/activity/place-list', parameter);
  },
  // 根据所id获取站下拉列表 1.4.9
  ajaxStationDropByPlaceId: (parameter) => {
    return request('/basics/place/station-list', parameter);
    //return request('/activity/activity/station-list', parameter);
  },
  // 根据站id获取点下拉列表  1.4.9
  ajaxSiteDropByStationId: (parameter) => {
    return request('/basics/place/site-list', parameter);
    //return request('/activity/activity/site-list', parameter);
  },

  //根据中心id来获取联盟的下拉列表  1.4.9
  ajaxAllianceDropByCenterId: (parameter) => {
    return request('/basics/place/volunteer-league', parameter);
    //return request('/activity/activity/league-list', parameter);
  },

  // 开启
  ajaxActivityOpen: (parameter) => {
    return request('/activity/activity/activity-open', parameter);
  },
  // 取消
  ajaxActivityCancel: (parameter) => {
    return request('/activity/activity/activity-cancel', parameter);
  },


  // 查看详情
  activityInfo: (parameter) => {
    return request('/volunteer/activity/approval-info', parameter);
  },
  // 查看详情下拉
  getEnterpriseSite: (parameter) => {
    return request('/volunteer/activity/get-enterprise-site', parameter);
  },
  // 活动审批
  activityAudit: (parameter) => {
    return request('/volunteer/activity/activity-audit', parameter);
  },

  // 活动列表
  activityList: (parameter) => {
    return request('/volunteer/activity/activity-list', parameter);
  },
  // 活动列表详情
  activityListInfo: (parameter) => {
    return request('/volunteer/activity/activity-info', parameter);
  },
  // 活动列表下拉
  activityStatus: (parameter) => {
    return request('/volunteer/activity/activity-status', parameter);
  },
  // 取消活动
  activityCancel: (parameter) => {
    return request('/volunteer/activity/activity-cancel', parameter);
  },
  // 拒绝参与
  refusedVolunteer: (parameter) => {
    return request('/volunteer/activity/refused-volunteer', parameter);
  },
  // 管理员签到
  backgroundSign: (parameter) => {
    return request('/volunteer/activity/background-sign', parameter);
  },
  // 编辑详情
  activityEditDetail: (parameter) => {
    return request('/activity/activity/activity-edit-detail', parameter);
  },
  // 详情
  activityDetail: (parameter) => {
    return request('/activity/activity/activity-detail', parameter);
  },
  //编辑
  activityEdit: (parameter) => {
    return request('/activity/activity/activity-edit', parameter);
  },
  //活动管理-列表-活动&报名状态下拉列表v1.8.0
  activityApplyStatus: (parameter) => {
    return request('/activity/activity/activity-apply-status-drop', parameter);
  },
  // 活动管理-列表-新增(系列活动)v1.8.0
  activityAddMany: (parameter) => {
    return request('/activity/activity/activity-add-many', parameter);
  },
  // 活动管理-列表-参与情况明细(系列活动)v1.8.0
  ajaxActivityManyDetail: (parameter) => {
    return request('/activity/activity/activity-many-detail', parameter);
  },

  // 活动列表-1.19.4
  getApprovalInList: (parameter) => {
    return request('/workBench/activity-analy/start-activity-list', parameter);
  },
  getApprovalInListOut: (parameter) => {
    return request('/workBench/activity-analy/start-activity-excel', parameter);
  }
  


};
export default commonInterface;
