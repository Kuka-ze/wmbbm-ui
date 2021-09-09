import { message } from 'antd';
import PublicService from '../../services/BannerManagement';
export default {
  namespace: 'BannerManagementModel',
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
        },
        list: [],
        paginationTotal: 0,
        is_reset: true,
        corpList: [],
        statusList: [],
        previewVisible: false,
        previewImage: '',
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'ajaxCorpList', payload: {} });
      yield put({ type: 'ajaxStatusList', payload: { type: 1 } });
    },
    /** 列表 */
    *ajaxList({ payload }, { call, put, select }) {
      const { pageType } = yield select(state => state.BannerManagementModel);
      const { data, code } = yield call(pageType == "h5" ? PublicService.ajaxLists : PublicService.ajaxList, payload);
      if (code === 1) {
        let { list, count } = data;
        yield put({
          type: 'concat',
          payload: {
            list: list || [],
            paginationTotal: count || 0,
            params: payload,
          }
        });
      }
    },
    // 租户下拉
    *ajaxCorpList({ payload }, { call, put, select }) {
      const { pageType } = yield select(state => state.BannerManagementModel);
      const { code, data } = yield call(pageType == "h5" ? PublicService.ajaxCorpLists : PublicService.ajaxCorpList, payload);
      if (code == 1) {
        let { list } = data;
        yield put({
          type: 'concat',
          payload: {
            corpList: list || [],
          }
        });
      }
    },
    // 上架状态下拉
    *ajaxStatusList({ payload }, { call, put, select }) {
      const { pageType } = yield select(state => state.BannerManagementModel);
      const { code, data } = yield call(pageType == "h5" ? PublicService.ajaxStatusLists : PublicService.ajaxStatusList, payload);
      if (code == 1) {
        let { list } = data;
        yield put({
          type: 'concat',
          payload: {
            statusList: list || [],
          }
        });
      }
    },
    // 删除
    *ajaxDel({ payload }, { call, put, select }) {
      const { pageType } = yield select(state => state.BannerManagementModel);
      const { code } = yield call(pageType == "h5" ? PublicService.ajaxDels : PublicService.ajaxDel, payload);
      if (code == 1) {
        message.success("删除成功！");
        yield put({ type: 'init' });
      }
    },
    // 删除
    *ajaxStatus({ payload }, { call, put, select }) {
      const { pageType } = yield select(state => state.BannerManagementModel);
      const { code } = yield call(pageType == "h5" ? PublicService.ajaxStatuss : PublicService.ajaxStatus, payload);
      if (code == 1) {
        message.success("下架成功！");
        yield put({ type: 'init' });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/bannerManagement') {
          dispatch({
            type: 'concat', payload: {
              pageType: "program"
            }
          });
          dispatch({ type: 'init' })
        }else if(pathname === '/bannerManagements'){
          dispatch({
            type: 'concat', payload: {
              pageType: "h5"
            }
          });
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
