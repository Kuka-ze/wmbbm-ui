import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/welfarePoolService';
export default {
  namespace: 'welfarePoolAddEditModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({ type: 'ajaxStateList', payload: {} });
      yield put({ type: 'teamList', payload: {} });

    },
    /** 关联队伍下拉 */
    *teamList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.teamList, payload);
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
    /** 新增 */
    *ajaxAdd({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxAdd, payload);
      if (code == 1) {
        message.success('新增成功！');
        history.go(-1);
      }
    },
    /** 编辑详情 */
    *ajaxEditInfo({ payload }, { call, put, select }) {
      const { code, data } = yield call(PublicService.ajaxEditInfo, payload);
      if (code == 1) {
        if (data.image) {
          let obj = [{
            uid: 0,
            name: `img0`,
            status: 'done',
            url: data.image,
          }];
          data.task_image = obj;
        }
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            address: data.address,
            map: data.lon || data.lat ? data.lon + ',' + data.lat : ',',
            userList: data.teamId || [],
            uuid: data.teamId && data.teamId.length > 0 ? data.teamId.length : 0
          }
        });
      }
    },
    /** 编辑 */
    *ajaxEdit({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxEdit, payload);
      if (code == 1) {
        message.success('编辑成功！');
        history.go(-1);
      }
    },
    /** 公益类型下拉 */
    *ajaxStateList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxStateList, payload);

      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            ajaxStateList: list || []
          }
        });
      }
    }
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
              map: '',
              address: '',
              userList: [],
              uuid: 1,
              editStatus: false,
              centerLevel: []
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/addWelfarePool') {
          initData();
          dispatch({
            type: 'concat', payload: {
              editStatus: true
            }
          });
          if (query.id) {
            dispatch({ type: 'ajaxEditInfo', payload: { id: query.id } });
          }
        }
      })
    }
  }
}
