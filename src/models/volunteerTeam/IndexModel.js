import { message } from 'antd';
import PublicService from '../../services/VolunteerTeam';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'VolunteerTeamModel',
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
        areaTree: [],
        teamType: [],
        teamBelong: [],
        inputStatus: true,
        is_reset: true,
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'ajaxAreaTree', payload: {} });
      if (states.params.centerId) {
        yield put({ type: 'ajaxTeamType', payload: {} });
        yield put({ type: 'concat', payload: { inputStatus: false } });
      }
      removeCacheData()
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
    /** 队伍类型下拉 */
    *ajaxTeamType({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxTeamTypea, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            teamType: list || []
          }
        });
      }
    },
    /** 队伍归属下拉 */
    *ajaxTeamBelong({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxTeamBelong, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            teamBelong: list || []
          }
        });
      }
    },
    /** 删除 */
    *ajaxDelete({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxDelete, payload);
      if (code === 1) {
        message.success("删除成功");
        const { params, paginationTotal } = yield select(state => state.VolunteerTeamModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params, pageNum: +paginationTotal % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum }
        })
      }
    },
    // pc后台判断当前用户是不是中心，所，站点管理员
    *ajaxIsAdministrators({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxIsAdministrators, payload);
      if (code == 1) {
        if (data.administratorsv == 1) {
          window.location.href = '#volunteerTeamAdd';
        } else {
          message.info('您不是市级，中心，所，站，点，联盟管理员，请添加后再进入');
        }
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/volunteerTeam') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
