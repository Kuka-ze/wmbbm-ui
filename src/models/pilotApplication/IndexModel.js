import { message } from 'antd';
import PublicService from '../../services/PilotApplication';
import { getCacheData, removeCacheData } from '../../utils/util';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'PilotApplicationModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const isAdmin = sessionStorage.getItem('isAdmin');  //10省级管理员
      const states = {
        params: {
          pageNum: 1,
          pageSize: 10,
          ...getCacheData()
        },
        list: [],
        paginationTotal: 0,
        startValue: null,
        endValue: null,
        countyDrop: [], stateDrop: [], yearDrop: [], cityDrop: [],
        commitTime: '',
        is_reset: true,
        isAdmin,
      }
      yield put({ type: 'concat', payload: { ...states } });
      if (isAdmin == 10) {
        yield put({ type: 'ajaxProList', payload: { ...states.params } });
      } else {
        yield put({ type: 'ajaxList', payload: { ...states.params } });
      }
      yield put({ type: 'ajaxCounty', payload: { type: 2 } });
      yield put({ type: 'ajaxYear', payload: {} });
      yield put({ type: 'ajaxState', payload: {} });
      yield put({ type: 'ajaxCity', payload: { type: 2 } });
      removeCacheData()
    },
    *ajaxList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxList, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            list: data.list || [],
            paginationTotal: data.totalSize || 0,
            params: payload,
            memberType: data.memberType
          }
        });
      }
    },
    *ajaxProList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxProList, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            list: data.list || [],
            paginationTotal: data.totalSize || 0,
            params: payload,
            memberType: 3
          }
        });
      }
    },
    //新增试点是否已申报
    *addInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.addInfo, payload);
      if (code === 1) {
        yield put(routerRedux.push('/pilotApplicationEdit?type=1&&menberType=1'));
      }
    },
    /** 地市下拉 */
    *ajaxCity({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxCity, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            cityDrop: list || []
          }
        });
      }
    },
    /** 区县下拉 */
    *ajaxCounty({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxCounty, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            countyDrop: list || []
          }
        });
      }
    },
    /** 年度下拉 */
    *ajaxYear({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxYear, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            yearDrop: list || []
          }
        });
      }
    },
    /** 状态下拉 */
    *ajaxState({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxState, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            stateDrop: list || []
          }
        });
      }
    },
    /** 区县下拉 */
    *provinceCenterList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.provinceCenterList, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            countyDrop: list || []
          }
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/pilotApplication') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
