import queryString from 'query-string';
import PublicService from '../../services/Managed';
export default {
  namespace: 'ManagedDetailModel',
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
    /** 文明实践站列表 */
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
    },
    /** 志愿队伍列表 */
    *ajaxList2({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxTabList1, payload);
      if (code === 1) {
        let { list, totalSize } = data;
        yield put({
          type: 'concat',
          payload: {
            list2: list || [],
            paginationTotal2: totalSize || 0,
            params: payload,
          }
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        let levelId = queryString.parse(search).id;
        function initData() {
          let query = queryString.parse(search);
          dispatch({
            type: 'concat', payload: {
              levelId: query.id,
              tab: query.tab,
              name: query.name,
              levelType: 2,
              detail: {},
            }
          });
          dispatch({ type: 'init' });
        }
        let params = {
          pageNum: 1,
          pageSize: 10,
        };
        if (pathname === '/managedDetail') {
          initData();
          dispatch({ type: 'ajaxList', payload: { ...params, levelId, levelType: 2  } });
          dispatch({ type: 'ajaxList2', payload: { ...params, levelId, levelType: 2  } });
        }
      })
    }
  }
}
