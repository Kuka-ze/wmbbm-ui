import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/MunicipalManagement';
export default {
  namespace: 'MunicipalManagementAddEditViewModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({ type: 'ajaxUserList', payload: {} });
    },
    /** 管理员 */
    *ajaxUserList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxUserList, payload);
      if (code === 1) {
        let { list = [] } = data;
        let options_ = [];
        if (list.length > 100) {
          options_ = list.slice(0, 100)
        } else {
          options_ = list
        }
        yield put({
          type: 'concat',
          payload: {
            options: options_ || [],
            optionsAll: list || []
          }
        });
      }
    },
    /** 编辑详情 */
    *ajaxEditInfo({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxEditInfo, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            userList: data.memberList,
            uuid: data.memberList && data.memberList.length > 0 ? data.memberList.length : 0
          }
        });
      }
    },
    /** 详情 */
    *ajaxInfo({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxInfo, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            userList: data.memberList,
            uuid: data.memberList && data.memberList.length > 0 ? data.memberList.length : 0
          }
        });
      }
    },
    /** 编辑 */
    *ajaxEdit({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxEdit, payload);
      if (code == 1) {
        message.success('编辑成功！');
        history.go(-1);
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
              detail: {},
              userList: [],
              uuid: 1,
              editStatus: false,
              pageType: ''
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/municipalManagementAdd') {

        } else if (pathname === '/municipalManagementEdit') {
          initData();
          if (query.id) {
            dispatch({ type: 'ajaxEditInfo', payload: { id: query.id } });
          }
          dispatch({
            type: 'concat', payload: {
              pageType: 'edit'
            }
          });
        } else if (pathname === '/municipalManagementView') {
          initData();
          if (query.id) {
            dispatch({ type: 'ajaxInfo', payload: { id: query.id } });
          }
          dispatch({
            type: 'concat', payload: {
              pageType: 'view'
            }
          });
        }
      })
    }
  }
}
