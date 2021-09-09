import { message } from 'antd';
import cockpitService from './../../services/CockpitService.js';
export default {
  namespace: 'CockpitModel',
  state: {
  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      let property_company_id = sessionStorage.getItem('screenId')
      const states = {
        screenCity: sessionStorage.getItem('screenCity'),
        communityId: property_company_id,
        areaName: sessionStorage.getItem('screenNamed'),
        mapDataJSON: {},
        centerFiveSecond: {},
        oneMinute: {},
        oneHour: {},
        styleList: [], //活动类型按发布数Top5
        applyList: [], //活动类型按报名人数Top5
        hotList: [],     //本月热门活动Top5
        cityLp: false // 是否显示临平
      }
      sessionStorage.setItem('communityId', property_company_id);
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'mapDataJSON', payload: { centerId: property_company_id } });

      yield put({ type: 'getCenterArea', payload: { center_id: property_company_id } });
      yield put({ type: 'centerFiveSecond', payload: { centerId: property_company_id } }); //大屏中间数据
      yield put({ type: 'activityRank', payload: { centerId: property_company_id } });  //活动专题排行
      yield put({ type: 'oneHour', payload: { centerId: property_company_id } });  //每一小时获取一下数据 文化场馆
      yield put({ type: 'oneMinute', payload: { center_id: property_company_id } });
    },
    /*大屏地图数据-JSON */
    *mapDataJSON({ payload }, { call, put, select }) {
      const { data, code } = yield call(cockpitService.mapDataJSON, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            mapDataJSON: data && data || {}
          }
        });
      }
    },
    /*大屏中间数据 */
    *centerFiveSecond({ payload }, { call, put, select }) {
      const { data, code } = yield call(cockpitService.centerFiveSecond, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            centerFiveSecond: data && data || {},
          }
        });
      }
    },

    /* 区 */
    *getCenterArea({ payload }, { call, put, select }) {
      const { data, code } = yield call(cockpitService.getCenterArea, payload);
      if (code === 1) {
        let { list = [] } = data;
        let lists = [...list];
        yield put({
          type: 'concat',
          payload: {
            centerArea: lists || []
          }
        });
      }
    },
    /* 每分钟刷新一次接口 */
    *oneMinute({ payload }, { call, put, select }) {
      const { data, code } = yield call(cockpitService.oneMinute, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            oneMinute: data || [],
          }
        });
      }
    },
    /*  活动专题排行 */
    *activityRank({ payload }, { call, put, select }) {
      const { data, code } = yield call(cockpitService.activityRank, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            styleList: data.styleList || [], //活动类型按发布数Top5
            applyList: data.applyList || [], //活动类型按报名人数Top5
            hotList: data.hotList || [],     //本月热门活动Top5
          }
        });
      }
    },
    /* 每小时刷新一次接口 */
    *oneHour({ payload }, { call, put, select }) {
      const { data, code } = yield call(cockpitService.oneHour, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            oneHour: data && data || {},
          }
        });
      }
    },


  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/dataCenter') {
          dispatch({ type: 'init' });
        }
      });
    }
  },
};

