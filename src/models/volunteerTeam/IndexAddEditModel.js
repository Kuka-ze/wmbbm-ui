import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/VolunteerTeam';
export default {
  namespace: 'VolunteerTeamAddEditModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({ type: 'ajaxAreaTree', payload: {} });
      yield put({ type: 'ajaxUserList', payload: {} });
      yield put({ type: 'teamTags', payload: {} })
      // yield put({ type: 'ajaxTeamType', payload: {} });
      // yield put({ type: 'ajaxTeamBelong', payload: {} });
      // yield put({ type: 'ajaxTeamBelong', payload: {centerId,positionType} });
    },
    /** 新增 */
    *ajaxAdd({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxAdd, payload);
      if (code == 1) {
        message.success('新增成功！');
        history.go(-1);
      }
    },
    /** 所属中心 */
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
    /** 管理员 */
    *ajaxUserList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxUserList, payload);
      if (code === 1) {
        let { list = [] } = data;
        let options_ = [];
        if (list.length > 100) {
          options_ = list.slice(0, 100)
        } else {
          options_ = list
        }
        yield put({
          type: 'concat',
          payload: {
            options: options_ || [],
            optionsAll: list || []
          }
        });
      }
    },
    /** 队伍类型下拉 */
    *ajaxTeamType({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxTeamType, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            teamType: list || []
          }
        });
      }
    },
    /** 队伍归属下拉 */
    *ajaxTeamBelong({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxTeamBelong, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            teamBelong: list || []
          }
        });
      }
    },
    /** 队伍标签下拉 */
    *teamTags({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.teamTags, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            teamTags: list || []
          }
        });
      }
    },
    /** 编辑详情 */
    *ajaxTeamInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxTeamInfo, payload);
      if (code === 1) {
        if (data.teamImg) {
          let obj = [{
            uid: 0,
            name: `img0`,
            status: 'done',
            url: data.teamImg,
          }];
          data.task_image = obj;
        }
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            centerId: data.centerId
          }
        });
        yield put({ type: 'ajaxTeamType', payload: {} })
        yield put({ type: 'ajaxTeamBelong', payload: { centerId: data.centerId, positionType: data.positionType } })
      }
    },
    /* 编辑 */
    *ajaxTeamEdit({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxTeamEdit, payload);
      if (code == 1) {
        message.success('编辑成功！');
        history.go(-1);
      }
    },
    /* 编辑 */
    *teamGrant({ payload }, { call, put, select }) {
      const { id } = yield select(state => state.VolunteerTeamAddEditModel);
      const { code } = yield call(PublicService.teamGrant, payload);
      if (code == 1) {
        message.success('操作成功！');
        yield put({ type: 'ajaxTeamInfo', payload: { id } })
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
              areaTree: [],
              options: [],
              teamType: [],
              teamBelong: [],
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/volunteerTeamAdd') {
          initData();
        } else if (pathname === '/volunteerTeamEdit' || pathname === '/volunteerTeamDetail') {
          initData();
          if (query.id) {
            dispatch(
              {
                type: 'ajaxTeamInfo',
                payload: { id: query.id },

              })

          }
        }
      })
    }
  }
}