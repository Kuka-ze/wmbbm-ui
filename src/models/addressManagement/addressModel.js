import { message } from 'antd';
import AddressManagement from './../../services/AddressManagement.js';

export default {
  namespace: 'addressModel',
  state: {
    add:"",
    list:[],
    status:true,
    deptId:"",
    pams:{
      deptId:"",
      pageNum:1,
      pageSize:10
    },
    disableds:false,
    branchInfos: {},
    is_reset: false,
    RadioGroupon:1,
    rootNodeName:"",
    branchList: [],
    selectedRowKeys:[],
    visible:false,
    addressSelectedKeys:[],
    visiblename:2,
    userList:[],
    totals:1,
    info:{},
    roleId:[],
    communityList:[],
    editId:"",
    selectedKeys:[],
    updateDepartmentSelectedKeys:[],  //迁移部门树
    updateDepartmentId:"", //部门ID
    departmentId:"", //要迁移的用户ID
    menuChecked:[],
    communityIofo:[],
    userLists:[],
    truenameId:""
  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload };
    },
    //roleIdName:[]
  },
  effects: {
    *init({ payload }, { call, put }) {
      yield put({
        type: 'concat',
        payload: {
          is_reset: true,
          branchList: [],
          status:true,
          selectedKeys:[],
          userType:false,
          userLists:[],
          pams:{
            deptId:"",
            pageNum:1,
            pageSize:10
          },
          disableds:false,
          userPhoneStatus: false,
          defaultExpandedKeys: []
        }
      })
      yield put({ type: 'branchLists' });
    },
    //部门列表
    *branchLists({ payload }, { call, put }) {
      const { data,code } = yield call(AddressManagement.branchLists, payload);
      if(code == 1){
        let {list} = data;
        let defaultExpandedKeys = [];
        if(list && list.length > 0 ){
          defaultExpandedKeys = [list[0].id]
        }
        yield put({
          type: 'concat', 
          payload: {
            branchList: data.list,
            defaultExpandedKeys
          }
        });
      }
    },
    //部门列表 新增
    *branchAdds({ payload }, { call, put }) {
      const { code } = yield call(AddressManagement.branchAdds, payload);
      if(code == 1){
        message.success("新增成功！");
        yield put({ type: 'branchLists' });
        yield put({
          type: 'concat',
          payload: {
            visible:false,
          }
        })
      }
    },
    //部门列表 编辑
    *branchEdits({ payload }, { call, put }) {
      const { code } = yield call(AddressManagement.branchEdits, payload);
      if(code == 1){
        message.success("编辑成功！");
        yield put({ type: 'branchLists' });
        yield put({
          type: 'concat',
          payload: {
            visible:false,
          }
        })
      }
    },
    //部门列表 详情
    *branchInfos({ payload }, { call, put ,select }) {
      const add = yield select(state=>state.addressModel.add);
      const { code,data } = yield call(AddressManagement.branchInfos, payload);
      // console.log(data)
      if(code == 1){
        if(add=="add"){
          yield put({
            type: 'concat', 
            payload: {
              branchInfos: data,
            }
          });
        }else{
          yield put({
            type: 'concat', 
            payload: {
              branchInfos: data,
              addressSelectedKeys:data && data.deptIds || [],
              RadioGroupon:data && data.type || 1,
            }
          });
        }
        
      }
    },
    //部门列表 删除
    *branchDelete({ payload }, { call, put }) {
      const { code } = yield call(AddressManagement.branchDelete, payload);
      if(code == 1){
        message.success("删除成功！");
        yield put({
          type: 'concat', 
          payload: {
            status:true
          }
        });
        yield put({ type: 'branchLists'});
      }
    },
    //角色列表
    *roleList1({ payload }, { call, put }) {
      const { data,code } = yield call(AddressManagement.roleList1, payload);
      if(code == 1){
        yield put({
          type: 'concat', 
          payload: {
            list: data && data.result
          }
        });
      }
    },
    //角色列表
    *userLists({ payload }, { call, put }) {
      const { data,code } = yield call(AddressManagement.userLists, payload);
      if(code == 1){
        yield put({
          type: 'concat', 
          payload: {
            userLists: data && data.list || []
          }
        });
      }
    },
    //用户列表
    *branchUserList({ payload }, { call, put,select}) {
      const params = yield select(state=>state.addressModel.pams);
      const newParams = Object.assign(params, payload);
      const { data,code } = yield call(AddressManagement.branchUserList, newParams);
      if(code == 1){
        yield put({
          type: 'concat', 
          payload: {
            userList: data && data.list || [],
            totals: data && data.totalSize || 1,
            pas:{
              ...newParams
            }
          }
        });
      }
    },
    //用户列表 新增
    *branchUserAdd({ payload }, { call, put,select }) {
      const params = yield select(state=>state.addressModel.pams);
      const { code, message: msg } = yield call(AddressManagement.branchUserAdd, payload);
      if(code == 1){
        message.success("新增成功！");
        yield put({
          type: 'concat',
          payload: {
            visible:false,
          }
        })
        yield put({ type: 'branchUserList',payload:{...params}});
      }else if(code == 40103){
        message.warning(msg);
        yield put({
          type: 'concat',
          payload: {
            visible:false,
          }
        })
      }
    },    
    //用户列表 编辑
    *branchUserUpdate({ payload }, { call, put ,select }) {
      const params = yield select(state=>state.addressModel.pams);
      const {code } = yield call(AddressManagement.branchUserUpdate, payload);
      if(code == 1){
        message.success("编辑成功！");
        yield put({
          type: 'concat',
          payload: {
            visible:false,
          }
        })
        yield put({ type: 'branchUserList',payload:{...params}});
      }
    },
    //用户列表 删除
    *branchUserDel({ payload }, { call, put ,select }) {
      const params = yield select(state=>state.addressModel.pams);
      const {code } = yield call(AddressManagement.branchUserDel, payload);
      if(code == 1){
        message.success("删除成功！");
        yield put({ type: 'branchUserList',payload:{...params}});
      }
    },
    //用户列表 详情
    *branchUserInfo({ payload }, { call, put ,select }) {
      const { data,code } = yield call(AddressManagement.branchUserInfo, payload);
      if(code == 1){
        yield put({
          type: 'concat', 
          payload: {
            info: data,
            roleIdName:data.roleIds || [],
            communityIofo:data.community || []
          }
        });
      }
    },
    //用户列表 查看用户详情
    *userDetail({ payload }, { call, put ,select }) {
      const { data,code } = yield call(AddressManagement.userDetail, payload);
      if(code == 1){
        yield put({
          type: 'concat', 
          payload: {
            info: data.result,
            roleIdName:data.result.roleIds || [],
            communityIofo:data.result.community || []
          }
        });
      }
    },
    //用户列表 小区列表
    *branchUserCommunity({ payload }, { call, put }) {
      const { data,code } = yield call(AddressManagement.branchUserCommunity, payload);
      if(code == 1){
        yield put({
          type: 'concat', 
          payload: {
            communityList: data && data.list || []
          }
        });
      }
    },
    //用户列表 迁移部门
    *branchUserDepartment({ payload }, { call, put ,select }) {
      const params = yield select(state=>state.addressModel.pams);
      const {code } = yield call(AddressManagement.branchUserDepartment, payload);
      if(code == 1){
        message.success("迁移部门成功！");
        yield put({
          type: 'concat',
          payload: {
            visible:false,
          }
        })
        yield put({ type: 'branchUserList',payload:{...params}});
      }
    },
    //用户列表 重置密码
    *resetPassword({ payload }, { call, put ,select }) {
      const params = yield select(state=>state.addressModel.pams);
      const {code } = yield call(AddressManagement.resetPassword, payload);
      if(code == 1){
        message.success("重置密码为初始密码：Wmdn123456");
        yield put({ type: 'branchUserList',payload:{...params}});
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/address') {
          dispatch({ type: 'init'});
        }
      });
    }
  },
};
