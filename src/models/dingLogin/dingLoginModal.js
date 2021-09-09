import PublicService from './../../services/Login.js';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'DingLoginModel',
  state: {
  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      /** 进入初始化数据 */
      const states = {
        test: ''
      }
      yield put({ type: 'concat', payload: { ...states } });
    },
    *ajaxCode({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxCode, payload);
      if (code == 1) {
        sessionStorage.setItem('QXToken', data.token);
        sessionStorage.setItem('property_company_name', data.corpName);
        sessionStorage.setItem('property_company_id', data.corpId);
        sessionStorage.setItem('username', data.userName);
        sessionStorage.setItem('mobile', data.userPhone);
        sessionStorage.setItem('isAdmin', data.isAdmin);
        sessionStorage.setItem('departmentGs', data.departmentGs);
        sessionStorage.setItem('screenId', data.screenId);
        sessionStorage.setItem('screenCity', data.screenCity);
        sessionStorage.setItem('screenNamed', data.screenNamed);
        sessionStorage.removeItem('menusSusssss');
        sessionStorage.removeItem('current');
        sessionStorage.removeItem('menus');
        sessionStorage.removeItem('openKeys');
        yield put( {type: 'menuList',payload: {token:data.token}});
        yield put(routerRedux.push('/indexPage'));
      }else if (code === 0){
        // message.error('用户登录失败');
        yield put(routerRedux.push({pathname:'/',query:{type: '2'}}))
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let { search } = history.location;
      return history.listen(({ pathname, query }) => {
        function GetQueryValue(queryName) {
          let vars = search.split("?");
          for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == queryName) { return pair[1]; }
          }
        }
        if(pathname=='/dingLogin'){
          let city = GetQueryValue('city');
          let code = GetQueryValue('code').split("&")[0];
          let params = {
            city,
            code
          }
          dispatch({type: 'ajaxCode', payload: params})
        }
      });
    }
  },
};
