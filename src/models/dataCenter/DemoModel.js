import dataCenterService from './../../services/DataCenterService.js';
export default {
  namespace: 'DemoModel',
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
      // yield put({ type: 'propertyAssessment', payload: {} });
    },
    /* 物业考核-首页 */
    *propertyAssessment({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.propertyAssessment, payload);
      if (code === 20000) {
        yield put({
          type: 'concat',
          payload: {
            test: data || {},
          }
        });
      }
    },
    *mapDataJSON({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.mapDataJSON, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            mapDataJSON: data && data || {}
          }
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/demo') {
          dispatch({ type: 'init' });
        }
      });
    }
  },
};

