import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/publicitService.js';
import { getCacheData, removeCacheData } from '../../utils/util';
export default {
  namespace: 'publicityOverallModel',
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
        templateName: '',
        list: [],
        steps: [{
          title: '选择统筹点单人员',
          content: ''
        },
        {
          title: '完善活动信息',
          content: ''
        },
        {
          title: '活动创建成功',
          content: ''
        },
        ],
        paginationTotal: 0,
        stateList: [],
        is_reset: true,
        showTip: false,
        current: 0,
        detail: {},
        selectedRows: [],
        selectedRowKeys: "",
        address: '',
        map: '',
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'planInfo', payload: { id: payload.id } });
      yield put({ type: 'teamList', payload: { id: payload.id } });
      removeCacheData()
    },
    /** 列表 */
    *planInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.planInfo, payload);
      if (code === 1) {
        let { id, team, user, userCount } = data;
        yield put({
          type: 'concat',
          payload: {
            id: id || '',
            user: user || [],
            team: team || [],
            userCount: userCount || '0',
          }
        });
      }
    },

    /** 队伍下拉 */
    *teamList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.teamList, payload);
      if (code === 1) {
        let { list, totalSize } = data;
        yield put({
          type: 'concat',
          payload: {
            teamList: list || [],
          }
        });
      }
    },
    //新增统筹
    *planAdd({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.planAdd, payload);
      if (code === 1) {
        message.success('提交成功')
        yield put({
          type: 'concat',
          payload: {
            time: data.time || '',
            image: data.image || '',
            serviceAddress: data.serviceAddress || '',
            infoTeam: data.team || '',
            titleName: data.templateName || '',
            type: data.type || '',
            current: 2,
            map: data.lon || data.lat ? data.lon + ',' + data.lat : ',',
          }
        });
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname == '/publicitOverall') {
          dispatch({
            type: 'init', payload: {
              id: query.id,
              templateName: query.templateName,
            }
          })
          dispatch({
            type: 'concat', payload: {
              id: query.id,
              templateName: query.templateName,
            }
          })
        }
      })
    }
  }
}