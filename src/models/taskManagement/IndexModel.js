import { message } from 'antd';
import PublicService from '../../services/TaskManagement';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'TaskManagementModel',
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
          // type: 1,
          pageNum: 1,
          pageSize: 10,
          ...getCacheData()
        },
        list: [],
        paginationTotal: 0,
        areaTree: [],
        typeDrop: [],
        is_reset: true,
        implementList: [],
        visible1: false,
        visible2: false,
        volunteerList: [],
        adminType: ''
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'ajaxAreaTree', payload: { type: 2 } });
      removeCacheData()
    },
    *ajaxList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxList, payload);
      if (code === 1) {
        let { adminType, type } = data;
        yield put({
          type: 'concat',
          payload: {
            list: data.list || [],
            paginationTotal: data.totalSize || 0,
            params: { ...payload, type },
            adminType
          }
        });
      }
    },
    /** 所属中心 */
    *ajaxAreaTree({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.placeCenterList, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            areaTree: list || []
          }
        });
      }
    },
    // 执行详情
    *ajaxImplement({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxImplement, payload);
      if (code == 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            implementList: list || []
          }
        });
      }
    },
    *ajaxResponse({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxResponse, payload);
      if (code === 1) {
        message.success("响应成功");
        const { params } = yield select(state => state.TaskManagementModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params }
        })
      }
    },
    /** 队员下拉 */
    *ajaxVolunteerList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxVolunteerList, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            volunteerList: list || []
          }
        });
      }
    },
    // 指派
    *ajaxAssign({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxAssign, payload);
      if (code == 1) {
        message.success("指派成功");
        const { params } = yield select(state => state.TaskManagementModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params }
        })
        yield put({
          type: 'concat',
          payload: {
            visible2: false,
          }
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/taskManagement') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
