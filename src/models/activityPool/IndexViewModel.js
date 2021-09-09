import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/ActivityPool';
export default {
  namespace: 'ActivityPoolViewModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
    },
    /** 详情 */
    *ajaxInfo({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxInfo, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
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
          dispatch({
            type: 'concat', payload: {
              id: query.id,
              detail: {},
              previewVisible: false,
              previewImage: '',
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/activityPoolView') {
          initData();
          if (query.id) {
            dispatch({ type: 'ajaxInfo', payload: { activityId: query.id } });
          }
        }
      })
    }
  }
}
