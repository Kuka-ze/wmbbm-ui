import { message } from 'antd';
import PublicService from '../../services/CivilizationShow';
export default {
  namespace: 'CivilizationShowModel',
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
          pageSize: 2,
        },
        list: [],
        paginationTotal: 0,
        startValue: null,
        endValue: null,
        areaTree: [],
        typeDrop: [],
        previewVisible: false,
        previewImage: '',
        is_reset: true,
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'civilizationShowTypeDrop', payload: {type: 2} });
      yield put({ type: 'ajaxAreaTree', payload: {type: 2} });
      // yield put({ type: 'noticeTypeDrop', payload: {type: 2} });
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
    // *noticeTypeDrop({ payload }, { call, put, select }) {
    //   const { data, code } = yield call(PublicService.noticeTypeDrop, payload);
    //   if (code === 1) {
    //     let { list = [] } = data;
    //     yield put({
    //       type: 'concat',
    //       payload: {
    //         typeDrop: list || []
    //       }
    //     });
    //   }
    // },
    *civilizationShowTypeDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.civilizationShowTypeDrop, payload);
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
        const { params, paginationTotal } = yield select(state => state.CivilizationShowModel);
        yield put({
          type: 'ajaxList',
          payload: params
        })
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/civilizationShow') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
