 
import { message } from 'antd';
import AddressManagement from './../../services/AddressManagement.js';

export default {
  namespace: 'rolesModel',
  state: {
    list:[],
    name:"",
    is_reset: false,
  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *init({ payload }, { call, put }) {
      yield put({
        type: 'concat',
        payload: {
          is_reset: true,
          list: []
        }
      })
      yield put({ type: 'roleList' });
    },
    *roleList({ payload }, { call, put }) {
      const { data,code } = yield call(AddressManagement.roleList, payload);
      //console.log(data)
      if(code == 1){
        yield put({
          type: 'concat', 
          payload: {
            list: data && data.result || [],
          }
        });
      }
    },
    // 删除
    *roleDel({ payload }, { call, put }) {
      const { code } = yield call(AddressManagement.roleDel, payload);
      if(code == 1){
        message.success("删除成功！");
        yield put({ type: 'roleList' });
      }
    },
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/roles') {
          dispatch({ type: 'init'});
        }
      });
    }
  },
};
