import request from '../utils/request';
const welfarePoolService = {
  /** 公益池 */
  // 公益池列表
  ajaxList: (parameter) => {
    return request('/opinion/help-template/list', parameter);
  },
  ajaxStateList: (parameter) => {
    return request('/opinion/help-template/template-type', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/opinion/help-template/del', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/opinion/help-template/add', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/opinion/help-template/update', parameter);
  },
  // 编辑-详情
  ajaxEditInfo: (parameter) => {
    return request('/opinion/help-template/update-info', parameter);
  },

  // 公益池统筹详情(zhd)
  planInfo: (parameter) => {
    return request('/opinion/help-template/plan-info', parameter);
  },
  // 公益池查看详情(zhd)
  welfareInfo: (parameter) => {
    return request('/opinion/help-template/info', parameter);
  },
  // 活动根据活动id查询待统筹名单(zhd)
  planInfoService: (parameter) => {
    return request('/opinion/help-template/plan-info-service', parameter);
  },
  //添加统筹
  planAdd: (parameter) => {
    return request('/opinion/help-template/plan-add', parameter);
  },
  // 队伍下拉
  teamList: (parameter) => {
    return request('/opinion/help-template/template-team', parameter);
  },
  // 公益池详情-开启关闭小程序显示(zhd)
  updateAlipay: (parameter) => {
    return request('/opinion/help-template/update-alipay', parameter);
  },

};
export default welfarePoolService;

