import { message } from 'antd';
import PublicService from '../../services/VentPool.js';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'VentPoolModel',
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
        stateList: [],
        is_reset: true,
        receiveVisible: false,
        rejectVisible: false,
        resolveVisible: false,
        showTip: false
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'ajaxState', payload: { type: 2 } });
      removeCacheData()
    },
    /** 类型 */
    *ajaxState({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxStateList, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            stateList: list || []
          }
        });
      }
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
    /**退回*/
    *onReject({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxReject, payload);
      if (code === 1) {
        message.success("退回成功");
        const { params, paginationTotal } = yield select(state => state.VentPoolModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params, pageNum: +paginationTotal % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum }
        })
        yield put({
          type: 'concat',
          payload: {
            rejectVisible: false
          }
        });
      }
    },
    /**接收问题-下级组织下拉*/
    *nextDrop({ payload }, { call, put }) {
      const { code, data } = yield call(PublicService.ajaxNextDrop, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            nextDrop: data.list,
            receiveVisible: true
          }
        });
      }
    },
    /**接收*/
    *onReceive({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxReceive, payload);
      if (code === 1) {
        message.success("接收成功");
        const { params, paginationTotal } = yield select(state => state.VentPoolModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params, pageNum: +paginationTotal % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum }
        })
        yield put({
          type: 'concat',
          payload: {
            receiveVisible: false
          }
        });
      }
    },
    /**解决*/
    *onResolve({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxResolve, payload);
      if (code === 1) {
        message.success("已解决");
        const { params, paginationTotal } = yield select(state => state.VentPoolModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params, pageNum: +paginationTotal % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum }
        })
        yield put({
          type: 'concat',
          payload: {
            resolveVisible: false
          }
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/ventPool') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
