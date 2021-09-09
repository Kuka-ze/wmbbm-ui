import { message } from 'antd';
import PublicService from '../../services/AccountManagement';
export default {
  namespace: 'AccountManagementModel',
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
        visibleAlipay: false,
        detailAlipay: {},
        resetField: false
      }
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxList', payload: { ...states.params } });
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
    /** 开启关闭账号 */
    *ajaxUpdateStatus({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxUpdateStatus, payload);
      if (code === 1) {
        message.success("操作成功");
        const { params } = yield select(state => state.AccountManagementModel);
        yield put({
          type: 'ajaxList',
          payload: params
        })
      }
    },
    /** 重置密码 */
    *ajaxUpdatePwd({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxUpdatePwd, payload);
      if (code === 1) {
        message.success("重置密码成功");
        const { params } = yield select(state => state.AccountManagementModel);
        yield put({
          type: 'ajaxList',
          payload: params
        })
      }
    },
    //获取绑定钉钉详情
    *dingdingShow({ payload }, { call, put }) {
      const { data, code } = yield call(PublicService.dingdingShow, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            dingdingDetail: data ? data : {},
            id: payload.id
          }
        });
      }
    },
    //绑定钉钉 保存
    *saveDingding({ payload, callback }, { call, put }) {
      const { code } = yield call(PublicService.saveDingding, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            visible: false,
          }
        });
        message.destroy();
        message.success("绑定成功！");
        yield put({ type: 'init' });
        callback && callback();
      }
    },
    //绑定支付宝小程序编辑详情
    *updateAlipayInfo({ payload }, { call, put }) {
      const { data, code } = yield call(PublicService.updateAlipayInfo, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            detailAlipay: data ? data : {},
          }
        });
      }
    },
    //支付宝 保存
    *addAlipay({ payload, callback }, { call, put }) {
      const { code } = yield call(PublicService.addAlipay, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            visibleAlipay: false,
          }
        });
        message.destroy();
        message.success("绑定成功！");
        yield put({ type: 'init' });
        callback && callback();
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/accountManagement') {
          dispatch({ type: 'init' })
        }
      })
    }
  }
}
