import request from '../utils/request';
const CentralManagement = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/basics/site/list', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/basics/site/add', parameter);
  },
  // 管理员列表
  ajaxUserList: (parameter) => {
    return request('/basics/center/user-list', parameter);
  },
  // 点类型下拉(带全部)
  ajaxSiteType: (parameter) => {
    return request('/basics/site/type', parameter);
  },
  // 所属中心(带全部)
  ajaxAreaTree: (parameter) => {
    return request('/basics/center/center-list', parameter);
  },
  // 所属所
  ajaxPlaceList: (parameter) => {
    return request('/basics/center/place-list', parameter);
  },
  // 站列表
  ajaxStationList: (parameter) => {
    return request('/basics/center/station-list', parameter);
  },
  // 编辑详情
  ajaxEditInfo: (parameter) => {
    return request('/basics/site/update-info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/basics/site/update', parameter);
  },
  // 详情
  ajaxInfo: (parameter) => {
    return request('/basics/site/info', parameter);
  },
  // 志愿队伍列表
  ajaxTabList: (parameter) => {
    return request('/basics/center/middle-part-list-two', parameter);
  },
  // 小区数据导出-生成下载连接（1.7.3）
  ajaxExcelIndex: (parameter) => {
    return request('/volunteer/excel/index', parameter);
  },


};
export default CentralManagement;

