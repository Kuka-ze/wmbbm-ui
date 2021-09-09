import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/ZyhActivityService';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'ZyhActivityInfoModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const states = {
        paginationTotal: 0,
        detail: [],
        id: '',
        is_reset: true,
      }
      yield put({ type: 'concat', payload: { ...states } });
      removeCacheData()
    },
    /** 详情 */
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
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/ZyhActivityInfo') {
          dispatch({ type: 'concat', payload: { id: query.id } });
          dispatch({ type: 'init' })
          dispatch({ type: 'ajaxDetail', payload: { id: query.id } });
        }
      })
    }
  }
}
