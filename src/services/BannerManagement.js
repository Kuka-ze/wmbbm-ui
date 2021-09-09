import request from '../utils/request';
const PublicService = {
  /** 账号管理 */
  // 列表
  ajaxList: (parameter) => {
    return request('/operation/banner/list', parameter);
  },
  // 新增
  ajaxAdd: (parameter) => {
    return request('/operation/banner/add', parameter);
  },
  // 编辑详情
  ajaxInfo: (parameter) => {
    return request('/operation/banner/info', parameter);
  },
  // 编辑
  ajaxEdit: (parameter) => {
    return request('/operation/banner/update', parameter);
  },
  // 删除
  ajaxDel: (parameter) => {
    return request('/operation/banner/del', parameter);
  },
  // 下架
  ajaxStatus: (parameter) => {
    return request('/operation/banner/update-status', parameter);
  },
  // 上架状态下拉
  ajaxStatusList: (parameter) => {
    return request('/operation/banner/status-list', parameter);
  },
  // 租户下拉
  ajaxCorpList: (parameter) => {
    return request('/operation/banner/corp-list', parameter);
  },
  /** h5 */
  // 余杭列表
  ajaxLists: (parameter) => {
    return request('/operation/yuhang-banner/list', parameter);
  },
  // 余杭新增
  ajaxAdds: (parameter) => {
    return request('/operation/yuhang-banner/add', parameter);
  },
  // 余杭编辑详情
  ajaxInfos: (parameter) => {
    return request('/operation/yuhang-banner/info', parameter);
  },
  // 余杭编辑
  ajaxEdits: (parameter) => {
    return request('/operation/yuhang-banner/update', parameter);
  },
  // 余杭删除
  ajaxDels: (parameter) => {
    return request('/operation/yuhang-banner/del', parameter);
  },
  // 余杭下架
  ajaxStatuss: (parameter) => {
    return request('/operation/yuhang-banner/update-status', parameter);
  },
  // 余杭上架状态下拉
  ajaxStatusLists: (parameter) => {
    return request('/operation/yuhang-banner/status-list', parameter);
  },
  // 余杭租户下拉
  ajaxCorpLists: (parameter) => {
    return request('/operation/yuhang-banner/corp-list', parameter);
  },

};
export default PublicService;

