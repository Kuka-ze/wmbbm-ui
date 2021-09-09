import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/PointManagement';
export default {
  namespace: 'PointManagementAddEditModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({ type: 'ajaxAreaTree', payload: {endLevel: 2} });
      yield put({ type: 'ajaxUserList', payload: {} });
      yield put({ type: 'ajaxSiteType', payload: {} });
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
    /** 所属所 */
    *ajaxPlaceList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxPlaceList, payload);
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
    /** 所属站 */
    *ajaxStationList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxStationList, payload);
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
    /** 点类型下拉 */
    *ajaxSiteType({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxSiteType, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            siteType: list || []
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
            map: data.lon || data.lat ? data.lon+','+data.lat : ',',
            userList: data.memberList,
            uuid: data.memberList && data.memberList.length > 0 ? data.memberList.length : ''
          }
        });
        yield put({ type: 'ajaxPlaceList', payload: {centerId: data.centerId, endLevel: 2} });
        yield put({ type: 'ajaxStationList', payload: {placeId: data.placeId, endLevel: 1} });
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
              placeList: [],
              stationList: [],
              siteType: [],
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/pointManagementAdd') {
          initData();
        }else if(pathname === '/pointManagementEdit'){
          initData();
          if (query.id) {
            dispatch({ type: 'ajaxEditInfo', payload: { id: query.id } });
          }
        }
      })
    }
  }
}
