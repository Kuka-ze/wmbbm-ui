import EventCenter from '../../services/EventCenter';
import queryString from 'query-string';
import { message } from 'antd';
export default {
  namespace: 'EventCenterInfoModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({
        type: 'concat',
        payload: {
          info: {},
          previewVisible: false,
          previewImage: '',
          loading: false,
          type: '',
          id: ''
        }
      });
    },
    *eventCenterInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(EventCenter.ajaxDetail, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            info: data || {},
            loading: true,
          }
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/eventCenterInfo') {
          dispatch({ type: 'init' });
          if (query.id) {
            dispatch({ type: 'eventCenterInfo', payload: { id: query.id } });
          }
        }
      })
    }
  }
}
