import request from '../utils/request';

const commonInterface = {
  /**二期接口 */
  //部门列表
  branchLists: (parameter) => {
    return request('/jurisdiction/department/list', parameter);
  },
  //新增部门
  branchAdds: (parameter) => {
    return request('/jurisdiction/department/add', parameter);
  },
  //编辑部门
  branchEdits: (parameter) => {
    return request('/jurisdiction/department/update', parameter);
  },
  //部门详情
  branchInfos: (parameter) => {
    return request('/jurisdiction/department/info', parameter);
  },
  //删除部门
  branchDelete: (parameter) => {
    return request('/jurisdiction/department/del', parameter);
  },

  
  //用户列表
  branchUserList: (parameter) => {
    return request('/jurisdiction/new-user/list', parameter);
  },
  //用户列表 新增
  branchUserAdd: (parameter) => {
    return request('/jurisdiction/new-user/add', parameter);
  },
  //用户列表 编辑
  branchUserUpdate: (parameter) => {
    return request('/jurisdiction/new-user/update', parameter);
  },
  //用户列表 删除
  branchUserDel: (parameter) => {
    return request('/jurisdiction/new-user/del', parameter);
  },
  //用户列表 详情
  branchUserInfo: (parameter) => {
    return request('/jurisdiction/new-user/info', parameter);
  },
  //用户列表 小区列表
  branchUserCommunity: (parameter) => {
    return request('/jurisdiction/new-user/see-list-new', parameter);
  },
  //用户列表 迁移部门
  branchUserDepartment: (parameter) => {
    return request('/jurisdiction/new-user/update-department', parameter);
  },
  //查看用户详情
  userDetail: (parameter) => {
    return request('/jurisdiction/new-user/detail', parameter);
  },
  //全局筛选用户列表
  userLists: (parameter) => {
    return request('/jurisdiction/new-user/user-list', parameter);
  },


  //角色管理列表
  roleList: (parameter) => {
    return request('/jurisdiction/role/list', parameter);
  },
  roleList1: (parameter) => {
    return request('/jurisdiction/role/user-role-list', parameter);
  },
  //角色管理列表删除
  roleDel: (parameter) => {
    return request('/jurisdiction/role/del', parameter);
  },
  //角色管理列表新增
  roleAdd: (parameter) => {
    return request('/jurisdiction/role/add', parameter);
  },
  //角色管理列表编辑
  roleUpdate: (parameter) => {
    return request('/jurisdiction/role/update', parameter);
  },
  //角色管理列表详情
  roleInfo: (parameter) => {
    return request('/jurisdiction/role/info', parameter);
  },
  //角色管理列表 获取树列表
  menuList: (parameter) => {
    return request('/jurisdiction/role/menu-list', parameter);
  },
  //角色管理列表 关联列表
  roleUserList: (parameter) => {
    return request('/jurisdiction/role/user-list', parameter);
  },
  //重置密码
  resetPassword: (parameter) => {
    return request('/jurisdiction/common/update-password', parameter);
  },
};
export default commonInterface;
