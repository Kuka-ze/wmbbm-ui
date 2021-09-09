import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/BannerManagement';
export default {
  namespace: 'BannerManagementAddEditModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({ type: 'ajaxCorpList', payload: {} });
    },
    /** 新增 */
    *ajaxAdd({ payload }, { call, put, select }) {
      const { pageType } = yield select(state => state.BannerManagementAddEditModel);
      const { code } = yield call(pageType == "h5" ? PublicService.ajaxAdds : PublicService.ajaxAdd, payload);
      if (code == 1) {
        message.success('新增成功！');
        history.go(-1);
      }
    },
    /* 编辑详情 */
    *ajaxInfo({ payload }, { call, put, select }) {
      const { pageType } = yield select(state => state.BannerManagementAddEditModel);
      const { data, code } = yield call(pageType == "h5" ? PublicService.ajaxInfos : PublicService.ajaxInfo, payload);
      if (code === 1) {
        let { list = {} } = data;
        if (list.image) {
          let obj = [{
            uid: 0,
            name: `img0`,
            status: 'done',
            url: list.image,
          }];
          list.task_image = obj;
        }
        let typeUrlTit = ''
        if (list.type == 2) {
          typeUrlTit = '页面地址';
        } else if (list.type == 3) {
          typeUrlTit = '优酷视频地址';
        }
        yield put({
          type: 'concat',
          payload: {
            detail: list || {},
            type: list.type,
            typeUrlTit,
          }
        });
      }
    },
    /* 编辑 */
    *ajaxEdit({ payload }, { call, put, select }) {
      const { pageType } = yield select(state => state.BannerManagementAddEditModel);
      const { code } = yield call(pageType == "h5" ? PublicService.ajaxEdits : PublicService.ajaxEdit, payload);
      if (code == 1) {
        message.success('编辑成功！');
        history.go(-1);
      }
    },
    // 租户下拉
    *ajaxCorpList({ payload }, { call, put, select }) {
      const { pageType } = yield select(state => state.BannerManagementAddEditModel);
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
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        function initData() {
          dispatch({
            type: 'concat', payload: {
              id: query.id,
              detail: {},
              corpList: [],
              typeUrlTit: '',
              type: '',
              pageType: query.pageType
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/bannerManagementAdd') {
          initData();
        } else if (pathname === '/bannerManagementEdit') {
          initData();
          if (query.id) {
            dispatch(
              {
                type: 'ajaxInfo',
                payload: { id: query.id },

              })

          }
        }
      })
    }
  }
}
