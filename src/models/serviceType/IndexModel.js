import { message } from 'antd';
import PublicService from '../../services/ServiceType';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'ServiceTypeModel',
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
          ...getCacheData()
        },
        list: [],
        paginationTotal: 0,
        startValue: null,
        endValue: null,
        areaTree: [],
        typeDrop: [],
        is_reset: true,
        visible: false,
        mockData: [],
        targetKeys: [],
        selectedKeys: []
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      removeCacheData()
    },
    *ajaxList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxList, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            list: data.list || [],
            paginationTotal: data.totalSize || 0,
            params: payload,
          }
        });
      }
    },
    /** 服务类型-关联队伍-未关联已关联队伍列表 */
    *serverTeamDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.serverTeamDrop, payload);
      if (code === 1) {
        let { selected = [], target = [] } = data;
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < selected.length; i++) {
          const data = {
            key: selected[i].key,
            title: selected[i].value,
          };
          mockData.push(data);
          targetKeys.push(selected[i].key);
        }
        for (let i = 0; i < target.length; i++) {
          const data = {
            key: target[i].key,
            title: target[i].value,
          };
          mockData.push(data);
        }
        yield put({
          type: 'concat',
          payload: {
            mockData, targetKeys
          }
        });
      }
    },
    /** 服务类型-关联队伍-未关联队伍列表所有 */
    *serverTeamTargetAll({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.serverTeamTargetAll, payload);
      // const { mockData } = yield select(state => state.ServiceTypeModel);
      if (code === 1) {
        let { list = [] } = data;
        let mockData = [];
        for (let i = 0; i < list.length; i++) {
          const data = {
            key: list[i].key,
            title: list[i].value,
          };
          mockData.push(data);
        }
        yield put({
          type: 'concat',
          payload: {
            mockData
          }
        });
      }
    },
    /** 服务类型-关联队伍-已关联队伍列表所有 */
    *serverTeamSelectedAll({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.serverTeamSelectedAll, payload);
      // const { mockData } = yield select(state => state.ServiceTypeModel);
      if (code === 1) {
        let { list = [] } = data;
        let targetKeys = [];
        for (let i = 0; i < list.length; i++) {
          const data = {
            key: list[i].key,
            title: list[i].value,
          };
          // mockData.push(data);
          targetKeys.push(list[i].key);
        }
        yield put({
          type: 'concat',
          payload: {
            targetKeys
          }
        });
      }
    },
    /** 关联队伍 */
    *ajaxAdd({ payload, callback }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxAdd, payload);
      if (code === 1) {
        message.success("关联队伍成功");
        const { params } = yield select(state => state.ServiceTypeModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params }
        })
        callback && callback(data);
        yield put({
          type: 'concat',
          payload: {
            visible: false,
            selectedKeys: []
          }
        });
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/serviceType') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
