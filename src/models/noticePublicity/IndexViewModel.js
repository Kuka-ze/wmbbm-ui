import { message } from 'antd';
import queryString from 'query-string';
import NoticePublicity from '../../services/NoticePublicity';
export default {
  namespace: 'NoticeInfoModel',
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
    *noticeInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(NoticePublicity.ajaxDetail, payload);
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
        if (pathname === '/noticePublicityView') {
          dispatch({
            type: 'noticeInfo', payload: {
              id: query.id,
            }
          });
        }
      })
    }
  }
}
