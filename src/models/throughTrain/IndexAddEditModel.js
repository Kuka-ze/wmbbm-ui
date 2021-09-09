import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/ThroughTrain';
export default {
  namespace: 'ThroughTrainAddEditModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const query = yield select(state => state.ThroughTrainAddEditModel);
      const states = {
        detail: {},
        appletsLists: [],
        corpList: [],
        selectedApplets:[], 
        // optionalApplets:[], 
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxApplets', payload: { id: query.id } });
      yield put({ type: 'ajaxCorp', payload: { id: query.id, appletsId: query.appletsId } });
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
    *ajaxInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxInfo, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            selectedApplets: data.appletsList
          }
        });
      }
    },
    /* 编辑 */
    *ajaxEdit({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxEdit, payload);
      if (code == 1) {
        message.success('编辑成功！');
        history.go(-1);
      }
    },
    // 可选小程序列表
    *ajaxApplets({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxApplets, payload);
      if (code == 1) {
        let { list } = data;
        yield put({
          type: 'concat',
          payload: {
            appletsLists: list || [],
          }
        });
      }
    },
    // 应用租户列表
    *ajaxCorp({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxCorp, payload);
      if (code == 1) {
        let { list } = data;
        yield put({
          type: 'concat',
          payload: {
            corpList: list || [],
          }
        });
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
              appletsId: query.appletsId,
              appletsName: query.appletsName,
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/throughTrainAdd') {
          initData();
        } else if (pathname === '/throughTrainEdit') {
          initData();
          if (query.id) {
            dispatch(
              {
                type: 'ajaxInfo',
                payload: { id: query.id },
              })
          }
        }
      })
    }
  }
}
