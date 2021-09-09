import { message } from 'antd';
import PublicService from '../../services/ActivityTypeManagement';
export default {
  namespace: 'ActivityTypeManagementModel',
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
        is_reset: true,
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
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
    // pc后台判断当前用户是不是中心，所，站点管理员
    *ajaxIsAdministrators({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxIsAdministrators, payload);
      if (code == 1) {
        if(data.administratorsv == 1){
          window.location.href = '#activityTypeManagementAdd';
        }else{
          message.info('您不是中心，所，站，点管理员，请添加后再进入');
        }
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/activityTypeManagement') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
