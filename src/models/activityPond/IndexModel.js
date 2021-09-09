import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/ActivityPond';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'ActivityPondModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { templateId } = yield select(state => state.ActivityPondModel);
      const states = {
        params: {
          pageNum: 1,
          pageSize: 10,
          templateId,
          ...getCacheData()
        },
        list: [],
        paginationTotal: 0,
        areaTree: [],
        is_reset: true,
        visible: false,
        volunteerList: [],
        infoService: [],
        activityId: '',
        massesArr: [],
        volunteerArr: []
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'ajaxAreaTree', payload: {} });
      removeCacheData()
    },
    /** 列表 */
    *ajaxList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxList, payload);
      if (code === 1) {
        let { list, totalSize } = data;
        yield put({
          type: 'concat',
          payload: {
            list: list || [],
            paginationTotal: totalSize || 0,
            params: payload,
          }
        });
      }
    },
    /** 下拉列表 */
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
    /** 取消 */
    *ajaxCancel({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxCancel, payload);
      if (code === 1) {
        message.success("取消成功");
        const { params, paginationTotal } = yield select(state => state.ActivityPondModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params, pageNum: +paginationTotal % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum }
        })
      }
    },
    /** 群众列表 */
    *ajaxInfoService({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxInfoService, payload);
      if (code === 1) {
        // let { list = [] } = {
        //   "list": [
        //     {
        //       "templateOrderId": "6",
        //       "appUserId": "186",
        //       "userName": "路洪宇",
        //       "createTime": "2020-12-07 16:37",
        //       "mobile": "手机"
        //     },
        //     {
        //       "templateOrderId": "7",
        //       "appUserId": "187",
        //       "userName": "路洪宇2",
        //       "createTime": "2020-12-07 16:37",
        //       "mobile": "手机2"
        //     }
        //   ]
        // }
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            infoService: list || []
          }
        });
        yield put({
          type: 'concat',
          payload: {
            infoServices: [] || []
          }
        });
      }
    },
    /** 志愿者列表 */
    *ajaxVolunteerList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxVolunteerList, payload);
      if (code === 1) {
        // let { list = [] } = {
        //   "list": [
        //     {
        //       "id": "1",
        //       "activityId": "1",
        //       "volunteer_name": "姓名",
        //       "volunteer_mobile": "手机号",
        //       "audit_duration": "应发时长",
        //       "type": "签到类型",
        //       "sign_time": "签到时间",
        //       "create_time": "响应时间"
        //     }
        //   ]
        // }
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            volunteerList: list || []
          }
        });
      }
    },
    /** 添加群众 */
    *ajaxMassesAdd({ payload, callback }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxMassesAdd, payload);
      if (code === 1) {
        message.success("添加群众成功");
        const { params, paginationTotal } = yield select(state => state.ActivityPondModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params, pageNum: +paginationTotal % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum }
        })
        callback && callback();
      }
    },
    /** 时长审核 */
    *ajaxAudit({ payload, callback }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxAudit, payload);
      if (code === 1) {
        message.success(payload.auditState == 1 ? "发放时长成功" : "驳回时长成功");
        const { params, paginationTotal } = yield select(state => state.ActivityPondModel);
        yield put({
          type: 'ajaxList',
          payload: { ...params, pageNum: +paginationTotal % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum }
        })
        callback && callback();
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/activityPond') {
          function initData() {
            dispatch({
              type: 'concat', payload: {
                templateId: query.id,
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
