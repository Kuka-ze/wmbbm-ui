import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/VolunteerService';
export default {
  namespace: 'VolunteerIndexModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
    },
    /** 省市区 */
    *ajaxDetail({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxDetail, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {}
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
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/volunteerIndex') {
          initData();
          if (query.id) {
            dispatch({ type: 'ajaxDetail', payload: { id: query.id } });
          }
        }
      })
    }
  }
}
