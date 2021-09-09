import { message } from 'antd';
import PublicService from '../../services/CentralManagement';
export default {
  namespace: 'CentralManagementModel',
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
        },
        list: [],
        paginationTotal: 0,
        areaTree: [],
        is_reset: true,
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'ajaxAreaTree', payload: {} });
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
    /** 省市区 */
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
    }
    ,
    /** 开启关闭账号 */
    *ajaxUpdateStatus({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxUpdateStatus, payload);
      if (code === 1) {
        message.success("操作成功");
        const { params } = yield select(state => state.CentralManagementModel);
        yield put({
          type: 'ajaxList',
          payload: params
        })
      }
    },
    /** 重置密码 */
    *ajaxUpdatePwd({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxUpdatePwd, payload);
      if (code === 1) {
        message.success("重置密码成功");
        const { params } = yield select(state => state.CentralManagementModel);
        yield put({
          type: 'ajaxList',
          payload: params
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/centralManagement') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
