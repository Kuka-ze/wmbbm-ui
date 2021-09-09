import { message } from 'antd';
import PublicService from '../../services/CooperativeApplet';
export default {
  namespace: 'CooperativeAppletModel',
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
    },
    /** 列表 */
    *ajaxList({ payload }, { call, put, select }) {
      // const { data, code } = {
      //   "data": {
      //     "list": [
      //       {
      //         "id": 1,
      //         "appletsName": "支付宝小程序名称",
      //         "icon": "https://static.elive99.com/img_2020031811401946.jpg"
      //       }
      //     ],
      //     "count": 20
      //   },
      //   "message": "",
      //   "code": 1
      // };
      const { data, code } = yield call(PublicService.ajaxList, payload);
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
    // 删除
    *ajaxDel({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxDel, payload);
      if (code == 1) {
        message.success("删除成功！");
        const { params, paginationTotal } = yield select(state => state.CooperativeAppletModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params, pageNum: +paginationTotal % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum }
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/cooperativeApplet') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
