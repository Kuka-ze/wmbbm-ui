import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/ThroughTrain';
export default {
  namespace: 'ThroughTrainManagementModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { params } = yield select(state => state.ThroughTrainManagementModel);
      const states = {
        params: {
          ...params
        },
        list: [],
        paginationTotal: 0,
        is_reset: true,
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
      //     "appletsId": 1,
      //     "list": [
      //       {
      //         "id": 1,
      //         "templateName": "模板名称",
      //         "icon": [
      //           "https://tfs.alipayobjects.com/images/partner/T1K0NCXnVXXXXXXXXX",
      //           "https://tfs.alipayobjects.com/images/partner/TB1ZZDLbnXGDuNjmf7YXXctaXXa"
      //         ],
      //         "corpName": "杭州市、合肥市"
      //       }
      //     ],
      //     "count": 20
      //   },
      //   "message": "",
      //   "code": 1
      // };
      const { data, code } = yield call(PublicService.ajaxList2, payload);
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
        const { params, paginationTotal } = yield select(state => state.ThroughTrainManagementModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params, pageNum: +paginationTotal % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum }
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/throughTrainManagement') {
          function initData() {
            dispatch({
              type: 'concat', payload: {
                params: {
                  pageNum: 1,
                  pageSize: 10,
                  appletsId: Number(query.id)
                },
                appletsName: query.appletsName
              }
            });
            dispatch({ type: 'init' });
          }
          initData();
        }
      })
    }
  }
}
