import { message } from 'antd';
import PublicService from '../../services/PointManagement';
import {getCacheData, removeCacheData, download} from '../../utils/util';
export default {
  namespace: 'PointManagementModel',
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
        placeList: [],
        stationList: [],
        siteType: [],
        is_reset: true,
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'ajaxAreaTree', payload: {endLevel: 2} });
      yield put({ type: 'ajaxSiteType', payload: {type: 2} });
      if(states.params.centerId){
        yield put({ type: 'ajaxPlaceList', payload: {centerId: states.params.centerId, endLevel: 2} });
      }
      if(states.params.placeId){
        yield put({ type: 'ajaxStationList', payload: {placeId: states.params.placeId, type: 2, endLevel: 2} });
      }
      removeCacheData()
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
    /** 所属中心 */
    *ajaxAreaTree({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxAreaTree, payload);
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
    /** 所属所 */
    *ajaxPlaceList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxPlaceList, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            placeList: list || []
          }
        });
      }
    },
    /** 所属站 */
    *ajaxStationList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxStationList, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            stationList: list || []
          }
        });
      }
    },
    /** 点类型下拉 */
    *ajaxSiteType({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxSiteType, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            siteType: list || []
          }
        });
      }
    },
    /** 小区数据导出 */
    *ajaxExcelIndex({ payload, callback }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxExcelIndex, payload);
      if (code === 1) {
        let { url = '' } = data;
        message.success('导出成功！');
        download(url)
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/pointManagement') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
