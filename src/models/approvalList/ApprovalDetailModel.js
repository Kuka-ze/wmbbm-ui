import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/ActivityManageService';
export default {
  namespace: 'ApprovalDetailModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
    },
    /** 省市区 */
    *ajaxVolunteerDetail({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxVolunteerDetail, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {}
          }
        });
      }
    },
    /** 系列活动 */
    *ajaxActivityManyDetail({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxActivityManyDetail, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            params: payload,
          }
        });
      }
    },
    /** 取消报名 */
    *ajaxVolunteerCancel({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxVolunteerCancel, payload);
      if (code == 1) {
        message.success('取消成功！');
        const { id } = yield select(state => state.ApprovalDetailModel);
        yield put({
          type: 'ajaxVolunteerDetail',
          payload: {id}
        })
      }
    },
    /** 发放文明时长 */
    *ajaxVolunteerTime({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxVolunteerTime, payload);
      if (code == 1) {
        message.success('文明时长发放成功！');
        const { id } = yield select(state => state.ApprovalDetailModel);
        yield put({
          type: 'ajaxVolunteerDetail',
          payload: {id}
        })
      }
    },
    /** 驳回 */
    *ajaxVolunteerReject({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxVolunteerReject, payload);
      if (code == 1) {
        message.success('已成功驳回！');
        const { id } = yield select(state => state.ApprovalDetailModel);
        yield put({
          type: 'ajaxVolunteerDetail',
          payload: {id}
        })
        yield put({
          type: 'concat',
          payload:{rejectVisible:false}
        })
      }
    },
    /** 撤销驳回 */
    *ajaxVolunteerJect({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxVolunteerJect, payload);
      if (code == 1) {
        message.success('已撤销驳回！');
        const { id } = yield select(state => state.ApprovalDetailModel);
        yield put({
          type: 'ajaxVolunteerDetail',
          payload: {id}
        })
      }
    },
     /** 驳回原因 */
     *ajaxVolunteerReason({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxVolunteerReason, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: { reasonVisible:true, feedbackCon:data.rejectedReason}
        })
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
              type: query.type,
              page: query.page,
              params: {
                pageNum: 1,
                pageSize: 10,
                id: query.id
              },
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/approvalDetail') {
          initData();
          if (query.id) {
            if(query.type == 1){
              dispatch({ type: 'ajaxVolunteerDetail', payload: { id: query.id } });
            }else if(query.type == 2){
              sessionStorage.setItem('pageId', query.id);
              dispatch({ type: 'ajaxActivityManyDetail', payload: { id: query.id, pageNum: 1, pageSize: 10 } });
            }
          }
        }
      })
    }
  }
}
