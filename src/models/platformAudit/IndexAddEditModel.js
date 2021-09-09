import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/platformAudit';
export default {
  namespace: 'platformDetailModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({ type: 'rejectList', payload: {} });
      // yield put({ type: 'ajaxUserList', payload: {} });
    },
    //驳回状态列表
    *rejectList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.rejectList, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            rejectList: list || []
          }
        });
      }
    },



    /** 点击审核通过 */
    *adopt({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.adopt, payload);
      if (code == 1) {
        message.success('审核通过成功！');
        history.go(-1);
      }
    },
    //驳回
    *reject({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.reject, payload);
      if (code == 1) {
        message.success('驳回操作成功');
        history.go(-1);
      }
    },
    //查看详情
    *ajaxInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.detailInfo, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || [],
            rejectVisible:false
          }
        });
      }
    },
    //审核详情
    *examineInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.examineInfo, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || []
          }
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        console.log('query', query)
        function initData() {
          dispatch({
            type: 'concat', payload: {
              id: query.id,
              disabled: query.disabled
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/platformDetail') {
          initData();
          if (query.disabled == 'true') {
            dispatch({
              type: 'examineInfo', payload: {
                id: query.id,
                rejectVisible:false
              }
            });
          } else {
            dispatch({
              type: 'ajaxInfo', payload: {
                id: query.id,
                rejectVisible:false
              }
            });
          }
        }
      })
    }
  }
}
