import { message } from 'antd';
import VolunteerService from '../../services/VolunteerService';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'VolunteerModel',
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
        teamType: [],
        teamBelong: [],
        teamDrop: [],
        inputStatus: true,
        is_reset: true,
        visibleExImport: false,
        resetField: false,
        visibleTeam: false,
        options: [],
        typeDrop: []
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'volunteerList', payload: { ...states.params } });
      yield put({ type: 'ajaxAreaTree', payload: {} });
      yield put({ type: 'labelTypeDrop', payload: { type: 2} });
      if (states.params.centerId) {
        yield put({ type: 'ajaxTeamType', payload: { } });
      }
      removeCacheData()
    },
    *volunteerList({ payload }, { call, put, select }) {
      const { data, code } = yield call(VolunteerService.volunteerList, payload);
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
    *volunteerRemove({ payload }, { call, put, select }) {
      const { code } = yield call(VolunteerService.volunteerRemove, payload);
      if (code === 1) {
        message.success("删除成功");
        const { params, paginationTotal } = yield select(state => state.VolunteerModel);
        yield put({
          type: 'volunteerList',
          payload: { ...params, pageNum: +paginationTotal % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum }
        })
      }
    },
    /** 所属中心 */
    *ajaxAreaTree({ payload }, { call, put, select }) {
      const { data, code } = yield call(VolunteerService.placeCenterList, payload);
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
    /** 队伍类型下拉 */
    *ajaxTeamType({ payload }, { call, put, select }) {
      const { data, code } = yield call(VolunteerService.ajaxTeamType, payload);
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
      const { data, code } = yield call(VolunteerService.ajaxTeamBelong, payload);
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
    /** 队伍下拉列表 */
    *ajaxTeamDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(VolunteerService.ajaxTeamDrop, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            teamDrop: list || []
          }
        });
      }
    },
    // pc后台判断当前用户是不是中心，所，站点管理员
    *ajaxIsAdministrators({ payload }, { call, put, select }) {
      const { code, data } = yield call(VolunteerService.ajaxIsAdministrators, payload);
      if (code == 1) {
        if (data.administratorsv == 1) {
          window.location.href = '#volunteerAdd';
        } else {
          message.info('您不是中心，所，站，点，联盟管理员，请添加后再进入');
        }
      }
    },
    *ajaxCenterTeamDrop({ payload }, { call, put, select }) {
      const { code, data } = yield call(VolunteerService.ajaxCenterTeamDrop, payload);
      if (code == 1) {
        const { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            options: list || [],
          }
        });
      }
    },
    *getExcel({ payload, callback }, { call, put, select }) {
      const { code, data } = yield call(VolunteerService.getExcel, payload);
      if (code == 1) {
        const { down_url = '' } = data;
        callback && callback(down_url);
      }
    },
    /** 标签类别下拉 */
    *labelTypeDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(VolunteerService.labelTypeDrop, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            typeDrop: list || []
          }
        });
      }else{
        let data = {
          "list": [
            {
              "key": "1",
              "value": "职业1"
            },
            {
              "key": "2",
              "value": "职业2"
            },
            {
              "key": "3",
              "value": "职业3"
            }
          ]
        }
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            typeDrop: list || []
          }
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/volunteer') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
