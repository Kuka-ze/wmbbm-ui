import { message } from 'antd';
import PublicService from '../../services/CulturalVenues';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'CulturalVenuesModel',
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
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'ajaxAreaTree', payload: { type: 2 } });
      // yield put({ type: 'noticeTypeDrop', payload: { type: 2 } });
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
    /** 类型下拉 */
    *noticeTypeDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.noticeTypeDrop, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            typeDrop: list || []
          }
        });
      }
    },
    *ajaxDelete({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxDelete, payload);
      if (code === 1) {
        message.success("删除成功");
        const { params, paginationTotal } = yield select(state => state.CulturalVenuesModel);
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
          window.location.href = '#culturalVenuesAdd';
        } else {
          message.info('您不是市级、中心、所、站、点管理员，请添加后进入');
        }
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/culturalVenues') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
