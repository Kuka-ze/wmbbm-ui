import { message } from 'antd';
import queryString from 'query-string';
import AddressManagement from './../../services/AddressManagement.js';

export default {
  namespace: 'rolesAddModel',
  state: {
    branchList:[],
    menuChecked:[],
    info:{},
    id:""
  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *init({ payload }, { call, put }) {
      yield put({ type: 'menuList' });
      yield put({
        type: 'concat',
        payload: {
          id:"",
          info:{},
        }
      });
    },
    //新增
    *roleAdd({ payload }, { call, put }) {
      const { code } = yield call(AddressManagement.roleAdd, payload);
      if(code == 1){
        message.success("新增成功！");
        setTimeout(() => {
          location.href = "#/roles";
        }, 2000)
      }
    },
    //编辑
    *roleUpdate({ payload }, { call, put }) {
      const { code } = yield call(AddressManagement.roleUpdate, payload);
      if(code == 1){
        message.success("编辑成功！");
        setTimeout(() => {
          location.href = "#/roles";
        }, 2000)
      }
    },
    //获取详情
    *roleInfo({ payload }, { call, put }) {
      const { data,code } = yield call(AddressManagement.roleInfo, payload);
      if(code == 1){
        yield put({
          type: 'concat',
          payload: {
            info: data||{},
          }
        });
      }
    },
    //获取树列表
    *menuList({ payload }, { call, put }) {
      const { data,code } = yield call(AddressManagement.menuList, payload);
      //console.log(data)
      if(code == 1){
        yield put({
          type: 'concat',
          payload: {
            branchList: data && data.result || [],
          }
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/rolesAdd') {
          dispatch({ type: 'init'});
          if(query.id){
            dispatch({ type: 'concat' , payload:{id:query.id}});
            dispatch({ type: 'roleInfo', payload:{id:query.id}});
          }
        }
      });
    }
  },
};
