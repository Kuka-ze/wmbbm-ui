import queryString from 'query-string';
import PublicService from '../../services/PointManagement';
export default {
  namespace: 'PointManagementDetailModel',
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
        areaTree: []
      }
      yield put({ type: 'concat', payload: { ...states } });
    },
    /** 志愿队伍列表 */
    *ajaxList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxTabList, payload);
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
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        function initData() {
          dispatch({
            type: 'concat', payload: {
              levelId: query.id,
              name: query.name,
              levelType: 4,
              detail: {},
            }
          });
          dispatch({ type: 'init' });
        }
        let params = {
          pageNum: 1,
          pageSize: 10,
        };
        if (pathname === '/pointManagementDetail') {
          initData();
          if (query.id) {
            dispatch({ type: 'ajaxList', payload: { ...params, levelId: query.id, levelType: 4 } });
          }
        }
      })
    }
  }
}
