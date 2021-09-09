import commonInterface from './../services/CommonInterface';
import PublicService from './../services/Login';

import {
  routerRedux
} from 'dva/router';
export default {
  namespace: 'login',
  state: {
    token: ""
  },
  reducers: {
    concat(state, {
      payload
    }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    /** 城市列表 */
    * ajaxCityList({
      payload
    }, {
      call,
      put,
      select
    }) {
      const {
        data,
        code
      } = yield call(PublicService.ajaxList, payload);
      if (code === 1) {
        let {
          list
        } = data;
        yield put({
          type: 'concat',
          payload: {
            list: list || [],
            params: payload,
          }
        });
      }
    },
    * ajaxAppid({
      payload,
      callback
    }, {
      call,
      put,
      select
    }) {
      const {
        data,
        code
      } = yield call(PublicService.ajaxAppid, payload);
      if (code === 1) {
        let {
          appid,
          redirectUri
        } = data;
        yield put({
          type: 'concat',
          payload: {
            appid,
            redirectUri,
            params: payload,
          }
        });
        callback && callback(appid, redirectUri);
      }
    },
    * login({
      payload
    }, { 
      call,
      put
    }) {
      const {
        code,
        data
      } = yield call(commonInterface.login, payload);
      if (code == 1) {
        console.log('login-data----->', data)
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
        yield put({
          type: 'menuList',
          payload: {
            token: data.token
          }
        });
        yield put(routerRedux.push('/indexPage'));
      }
    },
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      return history.listen(({
        pathname,
        query
      }) => {
        if (pathname == '/') {
          dispatch({
            type: 'concat',
            payload: {
              keyTab: query && query.type ? query.type : '1'
            }
          });
          query && query.type && dispatch({
            type: 'ajaxCityList'
          })
        }
      })
    }
  },
};