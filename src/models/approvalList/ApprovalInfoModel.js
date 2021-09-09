import ActivityList from '../../services/ActivityManageService';
import queryString from 'query-string';
import { message } from 'antd';
export default {
  namespace: 'ApprovalInfoModel',
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
          siteList: [],
          show: false,
          cityName: '杭州市',
          sign_range: [],
          sign_address: [],
          loading: false,
          detail_address: '',
          type: '',
          id: ''
        }
      });
    },

    *getEnterpriseSite({ payload }, { call, put, select }) {
      const { data, code } = yield call(ActivityList.getEnterpriseSite, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            siteList: data.result || [],
          }
        });
      }
    },

    *getOpenAndSign({ payload }, { call, put, select }) {
      const { data, code } = yield call(ActivityList.getOpenAndSign, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            sign_range: data.result && data.result.sign_range || []
          }
        });
      }
    },
    *activityInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(ActivityList.activityInfo, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            info: data.result || {},
            loading: true,
          }
        });
      }
    },
    *activityAudit({ payload }, { call, put, select }) {
      const { code } = yield call(ActivityList.activityAudit, payload);
      if (code == 1) {
        message.success('操作成功');
        window.location.href = '#approvalList';
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/approvalInfo') {
          dispatch({ type: 'init' });
          if (query.id) {
            dispatch({ type: 'concat', payload: { id: query.id } });
            dispatch({ type: 'activityInfo', payload: { id: query.id } });
            if (query.type == '2') {
              dispatch({ type: 'concat', payload: { type: query.type } });
              dispatch({
                type: 'getEnterpriseSite',
              });
              dispatch({
                type: 'getOpenAndSign',
              });

            }
          }
        }
      })
    }
  }
}
