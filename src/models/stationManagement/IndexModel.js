import PublicService from '../../services/StationManagement';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'StationManagementModel',
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
          pageNum: 1,
          pageSize: 10,
          ...getCacheData()
        },
        list: [],
        paginationTotal: 0,
        areaTree: [],
        placeList: [],
        is_reset: true,
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'ajaxAreaTree', payload: { endLevel: 2 } });
      if (states.params.centerId) {
        yield put({ type: 'ajaxPlaceList', payload: { centerId: states.params.centerId, type: 2, endLevel: 2 } });
      }
      removeCacheData()
    },
    /** 列表 */
    *ajaxList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxList, payload);
      if (code === 1) {
        let { list, totalSize } = data;
        yield put({
          type: 'concat',
          payload: {
            list: list || [],
            paginationTotal: totalSize || 0,
            params: payload,
          }
        });
      }
    },
    /** 所属中心 */
    *ajaxAreaTree({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxAreaTree, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            areaTree: list || []
          }
        });
      }
    },
    /** 所属所 */
    *ajaxPlaceList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxPlaceList, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            placeList: list || []
          }
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/stationManagement') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
