import request from '../utils/request';
const publicitService = {
  /** 公益池 */
  //宣讲项目列表(zhd)
  ajaxList: (parameter) => {
    return request('/partyEdu/party-template/list', parameter);
  },
  // 类型下拉
  ajaxStateList: (parameter) => {
    return request('/partyEdu/party-template/template-type', parameter);
  },
  // 删除
  ajaxDelete: (parameter) => {
    return request('/partyEdu/party-template/del', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/partyEdu/party-template/add', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/partyEdu/party-template/update', parameter);
  },
  // 编辑-详情
  ajaxEditInfo: (parameter) => {
    return request('/partyEdu/party-template/update-info', parameter);
  },

  // 宣讲项目统筹详情(zhd)
  planInfo: (parameter) => {
    return request('/partyEdu/party-template/plan-info', parameter);
  },
  //宣讲项目查看详情(zhd)
  welfareInfo: (parameter) => {
    return request('/partyEdu/party-template/info', parameter);
  },
  // 活动根据活动id查询待统筹名单(zhd)
  planInfoService: (parameter) => {
    return request('/partyEdu/party-template/plan-info-service', parameter);
  },
  //添加统筹
  planAdd: (parameter) => {
    return request('/partyEdu/party-template/plan-add', parameter);
  },
  // 队伍下拉
  teamList: (parameter) => {
    return request('/partyEdu/party-template/template-team', parameter);
  },
  // 宣讲项目-开启关闭小程序显示(zhd)
  updateAlipay: (parameter) => {
    return request('/partyEdu/party-template/update-alipay', parameter);
  },

};
export default publicitService;

