import { message } from 'antd';
import PublicService from '../../services/LabelTypeManagement';
export default {
  namespace: 'LabelTypeManagementModel',
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
        },
        list: [],
        paginationTotal: 0,
        startValue: null,
        endValue: null,
        areaTree: [],
        typeDrop: [],
        is_reset: true,
        detail:{},
        tipWord: ''
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
      yield put({ type: 'labelTypeDrop', payload: {type: 2} });
    },
    *ajaxList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.ajaxList, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            list: data.list || [],
            paginationTotal: data.count || 0,
            params: payload,
          }
        });
      }
    },
    //保存新增
    *ajaxAdd({ payload, callback }, { call, put }) {
      const { code } = yield call(PublicService.ajaxAdd, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            visible: false,
          }
        });
        message.destroy();
        message.success("新增成功！");
        yield put({ type: 'init' });
        callback && callback();
      }
    },
    //获取编辑详情
    *ajaxEditDetail({ payload }, { call, put }) {
      const { data, code } = yield call(PublicService.ajaxEditDetail, payload);
      if (code == 1) {
        const { type } = data;
        let tip;
        if(type==1){
          tip='本类别的标签同一用户只可存在一个或不存在'
        }else{
          tip = '本类别下的标签同一用户可存在多个'
        }
        yield put({
          type: 'concat',
          payload: {
            detail: data ? data : {},
            id: payload.id,
            visible: true,
            tipWord:tip
          }
        });
      }
    },
    //保存编辑
    *ajaxEdit({ payload, callback }, { call, put }) {
      const { code } = yield call(PublicService.ajaxEdit, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            visible: false,
          }
        });
        message.destroy();
        message.success("编辑成功！");
        yield put({ type: 'init' });
        callback && callback();
      }
    },
    //显示或隐藏标签类别
    *typeStatus({ payload, callback }, { call, put }) {
      const { code } = yield call(PublicService.ajaxTypeStatus, payload);
      if (code == 1) {
        yield put({
          type: 'concat'
        });
        message.destroy();
        message.success("操作成功！");
        yield put({ type: 'init' });
        callback && callback();
      }
    },
    /** 标签类别下拉 */
    *labelTypeDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.labelTypeDrop, payload);
      if (code === 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: {
            typeDrop: list || []
          }
        });
      }
    },
    /** 标签类别-删除 */
    *ajaxDelete({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxDelete, payload);
      if (code === 1) {
        message.success("删除成功");
        const { params } = yield select(state => state.LabelTypeManagementModel);
        yield put({
          type: 'ajaxList',
          payload: params
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/labelTypeManagement') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
