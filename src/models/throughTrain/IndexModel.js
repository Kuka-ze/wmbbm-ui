import { message } from 'antd';
import PublicService from '../../services/ThroughTrain';
export default {
  namespace: 'ThroughTrainModel',
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
      //         "appletsName": "平台名称",
      //         "isOpen": 1,
      //         "templateNum": 3
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
    // 开启&关闭
    *ajaxOpen({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxOpen, payload);
      if (code == 1) {
        message.success(payload.isOpen == 1 ? "开启成功！" : "关闭成功！");
        yield put({ type: 'init' });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/throughTrain') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
