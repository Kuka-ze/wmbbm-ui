import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/CooperativeApplet';
export default {
  namespace: 'CooperativeAppletAddEditModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
    },
    /** 新增 */
    *ajaxAdd({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxAdd, payload);
      if (code == 1) {
        message.success('新增成功！');
        history.go(-1);
      }
    },
    /* 编辑详情 */
    *ajaxInfo({ payload }, { call, put, select }) {
      // const { data, code } = {
      //   "data": {
      //     "id": 1,
      //     "appletsName": "支付宝小程序名称",
      //     "url": "url",
      //     "domain": "小程序接口域名",
      //     "icon": "https://static.elive99.com/img_2020072911330742.jpeg",
      //     "appkey": "小程序appkey",
      //     "sign": "小程序标志"
      //   },
      //   "message": "",
      //   "code": 1
      // };
      const { data, code } = yield call(PublicService.ajaxInfo, payload);
      if (code === 1) {
        if (data.icon) {
          let obj = [{
            uid: 0,
            name: `img0`,
            status: 'done',
            url: data.icon,
          }];
          data.task_image = obj;
        }
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
          }
        });
      }
    },
    /* 编辑 */
    *ajaxEdit({ payload }, { call, put, select }) {
      const { code } = yield call(PublicService.ajaxEdit, payload);
      if (code == 1) {
        message.success('编辑成功！');
        history.go(-1);
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
              corpList: [],
              typeUrlTit: '',
              type: ''
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/cooperativeAppletAdd') {
          initData();
        } else if (pathname === '/cooperativeAppletEdit') {
          initData();
          if (query.id) {
            dispatch(
              {
                type: 'ajaxInfo',
                payload: { id: query.id },
              })
          }
        }
      })
    }
  }
}
