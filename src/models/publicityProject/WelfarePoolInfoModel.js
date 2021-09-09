import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/publicitService.js';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'PropagandaModel',//宣讲详情model
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
        value: '01',
        list: [],
        paginationTotal: 0,
        stateList: [],
        is_reset: true,
        showTip: false,
        current: 0,
        detail: {
          activityBeginPoint: "",
          signModelMsg: ''
        }
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'welfareInfo', payload: { ...states.params, id: payload.id } });
      removeCacheData()
    },
    /** 列表 */
    *welfareInfo({ payload }, { call, put, select }) {
      console.log('payload', payload)
      const { data, code } = yield call(PublicService.welfareInfo, payload);
      if (code === 1) {
        let { list, totalSize } = data;
        yield put({
          type: 'concat',
          payload: {
            detailInfo: list || {},
            paginationTotal: totalSize || 0,
            params: payload,
          }
        });
      }
    },
    /** 关闭重启 */
    *updateAlipay({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.updateAlipay, payload);
      if (code == 1) {
        message.success('操作成功！');
        history.go(0);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname == '/publicityInfo') {
          dispatch({
            type: 'init', payload: {
              id: query.id
            }
          })
        }
      })
    }
  }
}