import request from '../utils/request';
const AccountManagement = {
    /** 账号管理 */
    // 其他文明市列表
    ajaxList: (parameter) => {
        return request('/operation/resume/list', parameter);
    },
    // 审核通过
    adopt: (parameter) => {
        return request('/operation/resume/adopt', parameter);
    },
    // 驳回
    reject: (parameter) => {
        return request('/operation/resume/reject', parameter);
    },

    // 驳回原因下拉列表
    rejectList: (parameter) => {
        return request('/operation/resume/reject-list', parameter);
    },
    // 状态(带全部)
    stateList: (parameter) => {
        return request('/operation/resume/state-list', parameter);
    },
    // pc后台判断当前用户是不是中心管理员
    ajaxIsAdministrators: (parameter) => {
        return request('/basics/center/center-administrators', parameter);
    },
    // 平台类别(带全部)
    platformList: (parameter) => {
        return request('/operation/resume/platform-list', parameter);
    },
    // 查看详情
    detailInfo: (parameter) => {
        return request('/operation/resume/info', parameter);
    },

    // 审核详情
    examineInfo: (parameter) => {
        return request('/operation/resume/update-info', parameter);
    },
};
export default AccountManagement;

