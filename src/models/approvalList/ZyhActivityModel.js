import { message } from 'antd';
import PublicService from '../../services/ZyhActivityService';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'ZyhActivityModel',
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
        areaList: [],
        typeList: [],
        is_reset: true,
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'ajaxAreaTree', payload: { type: 1 } });
      removeCacheData()
    },
    /** 所属区域 */
    *ajaxAreaTree({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxAreaTree, payload);
      if (code === 1) {
        let { areaList = [], typeList = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            areaList: areaList || [],
            typeList: typeList || []
          }
        });
      }
    },
    /** 志愿汇活动列表 */
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

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/ZyhActivity') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
