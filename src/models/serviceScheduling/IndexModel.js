import { message } from 'antd';
import PublicService from '../../services/ServiceScheduling';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'ServiceSchedulingModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const states = {
        teamList: [],
        teamId: [],
        params: {
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
        disabled1: false,
        disabled2: false,
        disabled3: false,
        startTime1: '',
        endTime1: '',
        startTime2: '',
        endTime2: '',
        startTime3: '',
        endTime3: '',
        switchDisable1: false,
        switchDisable2: false,
        switchDisable3: false,
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxTeamList', payload: {} });
      // yield put({ type: 'ajaxList', payload: { ...states.params } });
      removeCacheData()
    },
    /** 队伍下拉 */
    *ajaxTeamList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxTeamList, payload);
      const { year, month } = yield select(state => state.ServiceSchedulingModel);
      if (code === 1) {
        let { list = [] } = data;
        let teamId = list && list.length > 0 ? list[0].key : '';
        yield put({
          type: 'concat',
          payload: {
            teamList: list,
            teamId
          }
        });
        yield put({ type: 'ajaxList', payload: { teamId, year: year + "", month: month + "" } });
      }
    },
    *ajaxList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxList, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            list: data.list || [],
            params: payload,
          }
        });
      }
    },
    /** 关联队伍 */
    *ajaxAdd({ payload, callback }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxAdd, payload);
      if (code === 1) {
        message.success("修改服务时间成功");
        const { params } = yield select(state => state.ServiceSchedulingModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params }
        })
        yield put({
          type: 'concat',
          payload: {
            visible: false
          }
        });
        callback && callback(data);
      }
    },
    *ajaxInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxInfo, payload);
      if (code === 1) {
        let { list = [] } = data;
        console.log("list:", list);
        let stateData = {
          disabled1: false,
          disabled2: false,
          disabled3: false,
          startTime1: '',
          endTime1: '',
          startTime2: '',
          endTime2: '',
          startTime3: '',
          endTime3: '',
          switchDisable1: false,
          switchDisable2: false,
          switchDisable3: false,
        }
        list && list.length > 0 ?
          list.map((item, index) => {
            if (item.timeType == 1) {
              if (item.serverStatus == 2 || item.serverStatus == 3) {
                stateData.disabled1 = false;
                stateData.switchDisable1 = true;
              } else {
                stateData.disabled1 = true;
                stateData.switchDisable1 = false;
              }
              stateData.startTime1 = item.startDate;
              stateData.endTime1 = item.endDate;
            }
            if (item.timeType == 2) {
              if (item.serverStatus == 2 || item.serverStatus == 3) {
                stateData.disabled2 = false;
                stateData.switchDisable2 = true;
              } else {
                stateData.disabled2 = true;
                stateData.switchDisable2 = false;
              }
              stateData.startTime2 = item.startDate;
              stateData.endTime2 = item.endDate;
            }
            if (item.timeType == 3) {
              if (item.serverStatus == 2 || item.serverStatus == 3) {
                stateData.disabled3 = false;
                stateData.switchDisable3 = true;
              } else {
                stateData.disabled3 = true;
                stateData.switchDisable3 = false;
              }
              stateData.startTime3 = item.startDate;
              stateData.endTime3 = item.endDate;
            }
          }) : ''
        yield put({
          type: 'concat',
          payload: {
            ...stateData
          }
        });
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/serviceScheduling') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
