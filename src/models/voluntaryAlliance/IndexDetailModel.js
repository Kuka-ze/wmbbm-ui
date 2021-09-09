import queryString from 'query-string';
import PublicService from '../../services/VoluntaryAlliance';
export default {
  namespace: 'VoluntaryAllianceDetailModel',
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
              leagueId: query.id,
              name: query.name,
              detail: {},
            }
          });
          dispatch({ type: 'init' });
        }
        let params = {
          pageNum: 1,
          pageSize: 10,
        };
        if (pathname === '/voluntaryAllianceDetail') {
          initData();
          if (query.id) {
            dispatch({ type: 'ajaxList', payload: { ...params, leagueId: query.id } });
          }
        }
      })
    }
  }
}
