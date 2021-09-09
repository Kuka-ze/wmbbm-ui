import PublicService from '../../services/VentPool.js';
import queryString from 'query-string';
import { message } from 'antd';
export default {
  namespace: 'VentPoolInfoModel',
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
          id: '',
          receiveVisible: false,
          rejectVisible: false,
          resolveVisible: false,
          showTip: false
        }
      });
    },
    *ventPoolInfo({ payload }, { call, put, select }) {
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
    /**退回*/
    *onReject({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxReject, payload);
      if (code === 1) {
        message.success("退回成功");
        const { id } = yield select(state => state.VentPoolInfoModel);
        yield put({
          type: 'ventPoolInfo',
          payload: { id }
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
        const { id } = yield select(state => state.VentPoolInfoModel);
        yield put({
          type: 'ventPoolInfo',
          payload: { id }
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
        const { id } = yield select(state => state.VentPoolInfoModel);
        yield put({
          type: 'ventPoolInfo',
          payload: { id }
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
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/ventPoolInfo') {
          dispatch({ type: 'init' });
          if (query.id) {
            dispatch({ type: 'ventPoolInfo', payload: { id: query.id } });
            dispatch({ type: 'concat', payload: { id: query.id } });
          }
        }
      })
    }
  }
}
