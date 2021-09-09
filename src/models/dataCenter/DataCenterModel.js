import { message } from 'antd';
import dataCenterService from './../../services/DataCenterService.js';
export default {
  namespace: 'DataCenterModel',
  state: {
  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      let property_company_id = '0';
      const states = {
        screenOneHour: {},
        screenTwelveHour: {},
        centerFiveSecond: {},
        mapData: {},
        mapDataJSON:{},
        mapMessage:[],
        mapList: [],
        placeList: [],
        areaList: [],
        colorList: [],
        civilizationGovernance:[],
        communityId: property_company_id,
        areaName: sessionStorage.getItem('property_company_name'),
        centerArea: [],
        screenCivilization: {},
        showLun: true
      }
      sessionStorage.setItem('communityId', property_company_id);
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'getCenterArea', payload: { center_id: property_company_id } });
      yield put({ type: 'centerFiveSecond', payload: { center_id: property_company_id } }); //大屏中间数据
      yield put({ type: 'mapData', payload: { center_id: property_company_id } }); //大屏地图数据 
      yield put({ type: 'mapDataJSON', payload: { center_id: property_company_id } });
      yield put({ type: 'mapMessage', payload: {center_id: property_company_id} }); 
      yield put({ type: 'mapList', payload: {center_id: property_company_id} }); 
      yield put({ type: 'screenOneHour', payload: {center_id: property_company_id} }); //热门活动
      yield put({ type: 'screenTwelveHour', payload: {center_id: property_company_id} }); //文明实践活动类型占比
      yield put({ type: 'civilizationGovernance', payload: {center_id: property_company_id} }); 
      yield put({ type: 'screenCivilization', payload: {center_id: property_company_id} }); 
    },
    /*热门活动 */
    *screenOneHour({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.screenOneHour, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            screenOneHour: data && data || {},
          }
        });
      }
    },
    /*文明实践活动类型占比 */
    *screenTwelveHour({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.screenTwelveHour, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            screenTwelveHour: data && data || {},
          }
        });
      }
    },
    /*大屏中间数据 */
    *centerFiveSecond({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.centerFiveSecond, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            centerFiveSecond: data && data || {},
          }
        });
      }
    },
    /*大屏地图数据-JSON */
    *mapDataJSON({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.mapDataJSON, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            mapDataJSON: data && data || {}
          }
        });
      }
    },
    /*大屏地图数据-获取中心下所列表 */
    *getPlace({ payload, callback }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.getPlace, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            placeList: data && data || {},
          }
        });
        callback && callback(data);
      }
    },
    /*大屏地图数据 */
    *mapData({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.mapData, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            mapData: data && data || {},
          }
        });
      }
    },
    /*信息数据 */
    *mapMessage({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.mapMessage, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            mapMessage: data && data.dtxx || [],
          }
        });
      }
    },
    /*地图图片 */
    *mapList({ payload, callback }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.mapList, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            mapList: data && data.list || [],
          }
        });
        callback && callback(data);
      }
    },
    /* 文明治理 */
    *civilizationGovernance({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.civilizationGovernance, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            civilizationGovernance: data && data.wmzl || [],
          }
        });
      }
    },
    /* 区 */
    *getCenterArea({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.getCenterArea, payload);
      if (code === 1) {
        let {list = []} = data;
        let lists = [...list ];
        yield put({
          type: 'concat',
          payload: {
            centerArea: lists || []
          }
        });
      }
    },
    /* 文明指数 */
    *screenCivilization({ payload }, { call, put, select }) {
      const { data, code } = yield call(dataCenterService.screenCivilization, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            screenCivilization: data || {},
          }
        });
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/dataCenters') {
          dispatch({ type: 'init' });
        }
      });
    }
  },
};

