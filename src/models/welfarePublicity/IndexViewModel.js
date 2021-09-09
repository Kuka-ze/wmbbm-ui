import { message } from 'antd';
import queryString from 'query-string';
import WelfarePublicity from '../../services/WelfarePublicity';
export default {
  namespace: 'WelfareInfoModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const states = {
        id: '',
        info: {}
      }
      yield put({ type: 'concat', payload: { ...states } });
    },
    *welfareInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(WelfarePublicity.ajaxDetail, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            info: data || {},
          }
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        function initData() {
          dispatch({ type: 'init' });
          dispatch({
            type: 'concat', payload: {
              id: query.id,
            }
          });
        }
        initData();
        if (pathname === '/welfarePublicityView') {
          dispatch({
            type: 'welfareInfo', payload: {
              id: query.id,
            }
          });
        }
      })
    }
  }
}
