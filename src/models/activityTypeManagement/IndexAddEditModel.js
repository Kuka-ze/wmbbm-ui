import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/ActivityTypeManagement';
export default {
  namespace: 'ActivityTypeManagementAddEditModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
    },
    /** 新增 */
    *ajaxAdd({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxAdd, payload);
      if (code == 1) {
        message.success('新增成功！');
        history.go(-1);
      }
    },
    /* 编辑详情 */
    *ajaxActivityTypeEditDetail({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxActivityTypeEditDetail, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data.result || {}
          }
        });
      }
    },
    /* 编辑 */
    *ajaxActivityTypeEdit({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxActivityTypeEdit, payload);
      if (code == 1) {
        message.success('编辑成功！');
        history.go(-1);
      }
    },
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
              areaTree: [],
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/activityTypeManagementAdd') {
          initData();
        }else if (pathname === '/activityTypeManagementEdit'){
          initData();
          if (query.id) {
            dispatch(
              {
                type: 'ajaxActivityTypeEditDetail',
                payload: { id: query.id },

              })
          
          }
        }
      })
    }
  }
}
