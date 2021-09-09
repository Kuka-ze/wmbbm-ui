import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/CulturalVenues';
export default {
  namespace: 'CulturalVenuesAddEditViewModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({ type: 'ajaxAreaTree', payload: { type: 1 } });
      yield put({ type: 'noticeTypeDrop', payload: {} });
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
    /** 新增 */
    *ajaxAdd({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxAdd, payload);
      if (code == 1) {
        message.success('新增成功！');
        history.go(-1);
      }
    },
    /** 编辑 */
    *ajaxEdit({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxEdit, payload);
      if (code == 1) {
        message.success('编辑成功！');
        history.go(-1);
      }
    },
    /** 编辑详情 */
    *ajaxEditDetail({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxEditDetail, payload);
      if (code === 1) {
        if (data.venueImage) {
          let obj = [{
            uid: 0,
            name: `img0`,
            status: 'done',
            url: data.venueImage,
          }];
          data.task_image = obj;
        }
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            notice_remark: data.venueContent || '',
            address: data.address,
            map: data.lng || data.lat ? data.lng + ',' + data.lat : ',',
          }
        });
      }
    },
    /** 详情 */
    *ajaxDetail({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxDetail, payload);
      if (code === 1) {
        if (data.venueImage) {
          let obj = [{
            uid: 0,
            name: `img0`,
            status: 'done',
            url: data.venueImage,
          }];
          data.task_image = obj;
        }
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            notice_remark: data.venueContent || '',
            address: data.address,
            map: data.lng || data.lat ? data.lng + ',' + data.lat : ',',
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
              id: '',
              enterpriseType: [],
              detail: {},
              sex: '',
              age: '',
              current: 0,
              disabledName: false,
              areaTree: [],
              typeDrop: [],
              notice_remark: '',
              typeImgs: "1",
              pageType: '',
              previewVisible: false,
              previewImage: '',
              map: '',
              address: '',
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/culturalVenuesAdd') {
          initData();
        } else if (pathname === '/culturalVenuesEdit') {
          initData();
          if (query.id) {
            dispatch({
              type: 'concat', payload: {
                id: query.id,
              }
            });
            dispatch({
              type: 'ajaxEditDetail', payload: {
                id: query.id,
              }
            });
          }
          dispatch({
            type: 'concat', payload: {
              pageType: 'edit'
            }
          });
        } else if (pathname === '/culturalVenuesView') {
          initData();
          if (query.id) {
            dispatch({
              type: 'concat', payload: {
                id: query.id,
              }
            });
            dispatch({
              type: 'ajaxDetail', payload: {
                id: query.id,
              }
            });
          }
          dispatch({
            type: 'concat', payload: {
              pageType: 'view'
            }
          });
        }
      })
    }
  }
}
