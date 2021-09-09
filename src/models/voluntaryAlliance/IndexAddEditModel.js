import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/VoluntaryAlliance';
export default {
  namespace: 'VoluntaryAllianceAddEditModel',
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
    },
    /** 新增 */
    *ajaxAdd({ payload }, { call, put, select }) {
      console.log(payload,'adddpayload')
      const { code } = yield call(PublicService.ajaxAdd, payload);
      if (code == 1) {
        message.success('新增成功！');
        history.go(-1);
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
        if(list.length > 100){
          options_ = list.slice(0,100)
        }else{
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
    *ajaxInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxInfo, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || [],
            address: data.address,
            map: data.lon || data.lat ? data.lon+','+data.lat : ',',
            userList: data.adminArr,
            uuid: data.adminArr && data.adminArr.length > 0 ? data.adminArr.length : 0
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
              options: [],
              userList: [],
              uuid: 1
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/voluntaryAllianceAdd') {
          initData();
        }else if(pathname === '/voluntaryAllianceEdit'){
          initData();
          dispatch({
            type: 'ajaxInfo', payload: {
              id: query.id,
            }
          });
        }
      })
    }
  }
}
