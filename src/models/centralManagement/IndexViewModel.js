import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/CentralManagement';
export default {
  namespace: 'CentralManagementViewModel',
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
    /** 省市区 */
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
        yield put({
          type: 'concat',
          payload: {
            options: list || []
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
      const { code, data } = yield call(PublicService.ajaxInfo, payload);
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
            map: data.lon+','+data.lat,
            userList: data.memberList,
            uuid: data.memberList && data.memberList.length > 0 ? data.memberList.length + 1 : ''
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
			  previewVisible: false,
			  previewImage: '',
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/centralManagementAdd') {
          initData();
        }else if(pathname === '/centralManagementView'){
          initData();
          if (query.id) {
            dispatch({ type: 'ajaxEditInfo', payload: { id: query.id } });
          }
        }
      })
    }
  }
}
