import { message } from 'antd';
import ApprovalList from '../../services/ActivityManageService';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'ApprovalListModel',
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
          list: [],
          total: 0,
          childTotal: 0,
          is_reset: true,
          isPlaceFlag:false,
          isAllianceFlag:false,
          params: {
            pageNum: 1,
            pageSize: 10,
            activityName: "",
            activityTypeId: '',
            activityStatus: '',
            applyStatus: '',
            centerId: '',
            placeId: '',
            stationId: '',
            siteId: '',
            isAudit: '',
            ...getCacheData()
            // social_id: "",
            // socialList: [],
            // volunteer_number_begin: '',
            // volunteer_number_end: '',
            // create_time_begin: '',
            // create_time_end: ''
          },
          create_time_begin:'',
          create_time_end: '',
          listDrop: [],
          activityStatusDrop: [],
          applyStatusDrop: [],
          areaTree: [],
          placeList: [],
          allianceList:[],
          stationList: [],
          siteList: [],
        }
      });
      yield put({ type: 'getListDrop' });
      // yield put({ type: 'ajaxActivityStatusDrop' });
      yield put({ type: 'ajaxCenterDropFromActivityList' });
      yield put({ type: 'activityApplyStatus' });
      yield put({
        type: 'getApprovalList', payload: {
          pageNum: 1,
          pageSize: 10,
          activityName: "",
          activityTypeId: '',
          activityStatus: '',
          applyStatus: '',
          centerId: '',
          placeId: '',
          stationId: '',
          siteId: '',
          isAudit: '',
          ...getCacheData()
          // social_id: "",
          // volunteer_number_begin: '',
          // volunteer_number_end: '',
          // create_time_begin: '',
          // create_time_end: ''
        }
      });
      const states = yield select(state => state.ApprovalListModel);
      if (states.params.centerId) {
        yield put({ type: 'ajaxPlaceList', payload: { centerId: states.params.centerId } });
        yield put({ type: 'ajaxAllianceList', payload: { centerId: states.params.centerId } });
      }
      if (states.params.placeId) {
        yield put({ type: 'ajaxStationList', payload: { placeId: states.params.placeId } });
        yield put({type: 'concat', payload: {isAllianceFlag:true} })
      }
      if (states.params.stationId) {
        yield put({ type: 'ajaxSiteList', payload: { stationId: states.params.stationId, type: 2 } });
      }
      removeCacheData()
    },
    *getListDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(ApprovalList.getListDrop, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            listDrop: data.list || [],
          }
        });
      }
    },
    *ajaxActivityStatusDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(ApprovalList.ajaxActivityStatusDrop, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            activityStatusDrop: data.list || [],
          }
        });
      }
    },
    *getApprovalList({ payload }, { call, put, select }) {
      const { data, code } = yield call(ApprovalList.getApprovalList, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            list: data.list,
            total: data.totalSize,
            childTotal: data.childTotalSize
          }
        });
      }
    },
    // 删除
    *inspectDelete({ payload }, { call, put, select }) {
      const {params, total } = yield select(state => state.ApprovalListModel);
      const { code } = yield call(ApprovalList.inspectDelete, payload);
      if (code == 1) {
        message.success("删除成功！");
        yield put({ type: 'getApprovalList', payload: { ...params, pageNum: +total % params.pageSize == 1 ? (+(params.pageNum) - 1) : params.pageNum } });
      }
    },
    // 考核表下载
    *inspectDown({ payload }, { call, put, select }) {
      const { code, data } = yield call(ApprovalList.inspectDown, payload);
      if (code == 1) {
        if (data) {
          location.href = data.down_url
        }
      }
    },
    // 敦促表下载
    *inspectUrgeDown({ payload }, { call, put, select }) {
      const { code, data } = yield call(ApprovalList.inspectUrgeDown, payload);
      if (code == 1) {
        if (data) {
          location.href = data.down_url
        }
      }
    },
    // pc后台判断当前用户是不是中心，所，站, 点, 联盟管理员，已授权队长
    *ajaxIsAdministrators({ payload }, { call, put, select }) {
      const { code, data } = yield call(ApprovalList.ajaxIsAdministrators, payload);
      if (code == 1) {
        if(data.administratorsv == 1){
          window.location.href = '#addActivity';
        }else{
          message.info('您不是市级，中心，所，站，点，联盟管理员，已授权队长，请添加后再进入');
        }
      }
    },
    // 所属中心下拉列表
    *ajaxCenterDropFromActivityList({ payload }, { call, put, select }) {
      const { code, data } = yield call(ApprovalList.ajaxCenterDropFromActivityList, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            areaTree: data.list,
          }
        });
      }
    },
    /** 所属所 */
    *ajaxPlaceList({ payload }, { call, put, select }) {
      const { data, code } = yield call(ApprovalList.ajaxPlaceDropByCenterId, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            placeList: list || []
          }
        });
      }
    },
    /* 所属联盟 */ 
    *ajaxAllianceList({ payload }, { call, put, select }) {
      const { data, code } = yield call(ApprovalList.ajaxAllianceDropByCenterId, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            allianceList: list || []
          }
        });
      }
    },
    /** 所属站 */
    *ajaxStationList({ payload }, { call, put, select }) {
      const { data, code } = yield call(ApprovalList.ajaxStationDropByPlaceId, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            stationList: list || []
          }
        });
      }
    },
    /** 所属点 */
    *ajaxSiteList({ payload }, { call, put, select }) {
      const { data, code } = yield call(ApprovalList.ajaxSiteDropByStationId, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            siteList: list || []
          }
        });
      }
    },
    // 开启
    *ajaxActivityOpen({ payload }, { call, put, select }) {
      const params = yield select(state => state.ApprovalListModel.params);
      const { code } = yield call(ApprovalList.ajaxActivityOpen, payload);
      if (code == 1) {
        message.success("开启成功！");
        yield put({ type: 'getApprovalList', payload: params });
      }
    },
    // 取消
    *ajaxActivityCancel({ payload }, { call, put, select }) {
      const params = yield select(state => state.ApprovalListModel.params);
      const { code } = yield call(ApprovalList.ajaxActivityCancel, payload);
      if (code == 1) {
        message.success("取消成功！");
        yield put({ type: 'getApprovalList', payload: params });
      }
    },
    /** 所属点 */
    *activityApplyStatus({ payload }, { call, put, select }) {
      const { data, code } = yield call(ApprovalList.activityApplyStatus, payload);
      if (code === 1) {
        let { list = [] } = data;
        let { applyStatus = [], activityStatus = [] } = list;
        yield put({
          type: 'concat',
          payload: {
            applyStatusDrop: applyStatus || [],
            activityStatusDrop: activityStatus || [],
          }
        });
      }
    }


  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/approvalList') {
          dispatch({ type: 'init' });
        }
      });
    }
  },
};
