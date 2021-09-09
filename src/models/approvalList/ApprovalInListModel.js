import { message } from 'antd';
import queryString from 'query-string';
import ApprovalList from '../../services/ActivityManageService';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'ApprovalInListModel',
  state: {

  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({
        type: 'concat',
        payload: {
        }
      });
    },
    *getApprovalList({ payload }, { call, put, select }) {
      const { data, code } = yield call(ApprovalList.getApprovalInList, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            list: data.list,
            total: data.totalSize
          }
        });
      }
    },
    *getOut({ payload }, { call, put, select }) {
      const { params } = yield select(state => state.ApprovalInListModel);
      const { data, code } = yield call(ApprovalList.getApprovalInListOut, params);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            scalar: data.scalar,
            outVisible: true
          }
        });
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        let params = {
          pageNum: 1,
          pageSize: 20,
          levelId: query.levelId,
          dateType: query.dateType,
          type: query.type,
          endTime: query.endTime,
          levelType: query.levelType,
          startTime: query.startTime,
          style: query.style
        }
        function initData() {
          dispatch({
            type: 'concat', payload: {params}
          });
        }
        if (pathname === '/approvalInList') {
          initData();
          dispatch({ type: 'init' });
          dispatch({ type: 'getApprovalList', payload: params });
        }
      });
    }
  },
};
