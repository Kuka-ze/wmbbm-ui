
import AddressManagement from './../../services/AddressManagement.js';
import queryString from 'query-string';
export default {
  namespace: 'rolespersonnelModel',
  state: {
    list:[],
    is_reset: false,
    params:{
      roleId:"",
      userName:"",
      pageSize:10,
      pageNum:1,
      userPhone:""
    },
    totals:1
  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const params = yield select(state=>state.rolespersonnelModel.params);
      const newParams = Object.assign(params, payload);
      //console.log(newParams)
      yield put({
        type: 'concat', 
        payload: {
          roleId:"",
          userName:"",
          pageSize:10,
          pageNum:1,
          userPhone:""
        }
      })
      yield put({ type: 'roleUserList',payload:{...newParams,pageNum:1,userName:"",
        pageSize:10,
        userPhone:""}});
    },
    *roleUserList({ payload }, { call, put , select }) {
      const params = yield select(state=>state.rolespersonnelModel.params);
      const newParams = Object.assign(params, payload);
      const { data,code } = yield call(AddressManagement.roleUserList, {...newParams});
      if(code == 1){
        yield put({
          type: 'concat', 
          payload: {
            list: data && data.list || [],
            totals:data && data.count || 1,
            params:{
              ...newParams
            }
          }
        });
      }
    },    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/rolespersonnel') {
          dispatch({ type: 'init',payload:{id:query.id}});
        }
      });
    }
  },
};
