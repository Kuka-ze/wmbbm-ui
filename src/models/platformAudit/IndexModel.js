import { message } from 'antd';
import PublicService from '../../services/platformAudit';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'platformAuditModel',
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
        list: [],
        paginationTotal: 0,
        areaTree: [],
        is_reset: true,
        stateList:[]
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'platformList', payload: {type: 2} });
      yield put({ type: 'stateList', payload: {type: 2} });
      removeCacheData()
    },
    /** 平台下拉列表 */
    *platformList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.platformList, payload);
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
    // 状态下拉列表
    *stateList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.stateList, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            stateList: list || []
          }
        });
      }
    },
    /** 其他文明时列表 */
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
    /** 删除 */
    // *ajaxDelete({ payload }, { call, put, select }) {
    //   const { code } = yield call(PublicService.ajaxDelete, payload);
    //   if (code === 1) {
    //     message.success("删除成功");
    //     const { params } = yield select(state => state.VoluntaryAllianceModel);
    //     yield put({
    //       type: 'ajaxList',
    //       payload: params
    //     })
    //   }
    // },
    // pc后台判断当前用户是不是中心，所，站点管理员
    // *ajaxIsAdministrators({ payload }, { call, put, select }) {
    //   const { code, data } = yield call(PublicService.ajaxIsAdministrators, payload);
    //   if (code == 1) {
    //     if(data.administratorsv == 1){
    //       window.location.href = '#voluntaryAllianceAdd';
    //     }else{
    //       message.info('您不是市级，中心管理员，请添加后再进入');
    //     }
    //   }
    // }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/platformAudit') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
