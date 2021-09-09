import request from '../utils/request';
const PilotApplication = {
    /** 通知宣传 */
    // 列表
    ajaxList: (parameter) => {
        return request('/decl/decl/list', parameter);
    },
    // 列表
    ajaxProList: (parameter) => {
        return request('/decl/decl/list-province', parameter);
    },
    // 区县下拉
    ajaxCounty: (parameter) => {
        return request('/decl/decl/center-list', parameter);
    },
    // 年度下拉
    ajaxYear: (parameter) => {
        return request('/decl/decl/year-list', parameter);
    },
    // 状态下拉
    ajaxState: (parameter) => {
        return request('/decl/decl/state-list', parameter);
    },
    // 所属地市下拉
    ajaxCity: (parameter) => {
        return request('/decl/decl/city-list', parameter);
    },
    // 列表
    ajaxProList: (parameter) => {
        return request('/decl/decl/list-province', parameter);
    },
    // 新增试点申报点击
    addInfo: (parameter) => {
        return request('/decl/declares/add-info', parameter);
    },
    // 编辑试点申报详情
    updateInfo: (parameter) => {
        return request('/decl/declares/update-info', parameter);
    },
    // 市、区县试点申报审核详情(
    examineInfo: (parameter) => {
        return request('/decl/declares/examine-info', parameter);
    },
    // 市、区县试点申报查看详情
    cityInfo: (parameter) => {
        return request('/decl/declares/info', parameter);
    },
    //省级试点申报查看详情
    provinceInfo: (parameter) => {
        return request('/decl/declares/province-info', parameter);
    },
    //省级试点申报审核详
    provinceExamineInfo: (parameter) => {
        return request('/decl/declares/province-examine-info', parameter);
    },
    // 试点申报审核-审核
    declaresAudit: (parameter) => {
        return request('/decl/audit/declares-audit', parameter);
    },
    // 驳回历史记录
    declaresAuditList: (parameter) => {
        return request('/decl/audit/declares-audit-list', parameter);
    },
    //试点申报评价-评价详情
    declaresEvalua: (parameter) => {
        return request('/decl/evalua/declares-evalua-detail', parameter);
    },
    //试点申报评级-更新
    ajaxEditEvaluate: (parameter) => {
        return request('/decl/evalua/declares-evalua-save', parameter);
    },
    // 七牛
    getQiniuToken: (parameter) => {
        return request('/common/image/get-token', parameter);
    },
    // 下载申报材料ƒ
    getPdf: (parameter) => {
        return request('/decl/declares/get-pdf', parameter);
    },
    // 试点申报管理-省级区县下拉列表
    provinceCenterList: (parameter) => {
        return request('/decl/decl/province-center-list', parameter);
    },
};
export default PilotApplication;


