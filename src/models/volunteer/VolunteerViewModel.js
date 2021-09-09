import { message } from 'antd';
import queryString from 'query-string';
import VolunteerService from '../../services/VolunteerService';
export default {
  namespace: 'VolunteerViewModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const states = {
        params: {
          page: 1,
          rows: 10,
        },
        list: [],
        paginationTotal: 0,
        detail: {}
      }
      yield put({ type: 'concat', payload: { ...states } });
      let { id, mobile } = yield select(state => state.VolunteerViewModel);
      yield put({ type: 'volunteerInfo', payload: { ...states.params, id } });
    },
    *volunteerInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(VolunteerService.volunteerInfo, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            params: payload,
            list: data ? data.active_record ? data.active_record.result ? data.active_record.result : [] : [] : [],
            paginationTotal: data ? data.active_record ? data.active_record.count ? data.active_record.count : [] : [] : [],
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
              mobile: query.mobile,
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/volunteerView') {
          initData();
        }
      })
    }
  }
}
