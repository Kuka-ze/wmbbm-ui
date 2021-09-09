import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/WelfarePublicity';
export default {
  namespace: 'WelfarePublicityAddEditModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({ type: 'ajaxAreaTree', payload: {type:1} });
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
      if (data.welfareImg) {
        let obj = [{
            uid: 0,
            name: `img0`,
            status: 'done',
            url: data.welfareImg,
        }];
        data.welfareImg = obj;
      }
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            welfare_remark: data.remark || ''
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
              welfare_remark: ''
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/welfarePublicityAdd') {
          initData();
        } else if (pathname === '/welfarePublicityEdit') {
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
        }
      })
    }
  }
}
