import PublicService from '../../services/VoluntaryAlliance';
import queryString from 'query-string';
import { message } from 'antd';
export default {
  namespace: 'AllianceInfoModel',
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
    *allianceInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxDetail, payload);
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
        if (pathname === '/allianceInfo') {
          dispatch({ type: 'init' });
          if (query.id) {
            dispatch({ type: 'allianceInfo', payload: { id: query.id } });
          }
        }
      })
    }
  }
}
