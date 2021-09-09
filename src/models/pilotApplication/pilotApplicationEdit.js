import { message } from 'antd';
import queryString from 'query-string';
import PublicService from '../../services/PilotApplication';
import { download } from '../../utils/util';
export default {
  namespace: 'pilotApplicationEditModel',
  state: {
    activeEvaluateTab: 'a1'
  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { id, type, menberType, status } = payload;
      const states = {
        //以下为评价
        evaluateEdit: false,
        activeEvaluateTab: 'a1',
        declareUr: ''
      }
      yield put({ type: 'concat', payload: { ...states, id, type, menberType } });
      if (type != 1) {
        yield put({ type: 'declaresEvalua', payload: { id } })
      }
      if (menberType == 1) {
        //区县
        if (type == 1) {
          //新增试点申报点击
          yield put({ type: 'addInfo', payload: {} });
        } else if (type == 2) {
          //编辑试点申报详情
          yield put({ type: 'updateInfo', payload: { id } });
        } else {
          //市、区县试点申报审核详情
          yield put({ type: 'examineInfo', payload: { id } });
        }
      } else if (menberType == 2) {
        //市级
        if (type == 5) {
          yield put({ type: 'provinceExamineInfo', payload: { id } });
        } else {
          yield put({ type: 'examineInfo', payload: { id } });
        }
      } else if (menberType == 3) {
        //省试点申报审核详情
        yield put({ type: 'provinceExamineInfo', payload: { id } });
      }
      yield put({
        type: 'getQiniuToken', payload: {
          fileList: []
        }
      });

    },

    /** 点击审核通过 */
    *declaresAudit({ payload }, { call, put, select }) {
      console.log('点击审核的参数', payload)
      const { code } = yield call(PublicService.declaresAudit, payload);
      if (code == 1) {
        message.success('操作成功！');
        history.go(-1);
      }
    },
    //新增试点申报点击
    *addInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.addInfo, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {}
          }
        });
      }
    },
    //编辑试点申报详情
    *updateInfo({ payload }, { call, put, select }) {
      const { declareUrl } = yield select(state => state.pilotApplicationEditModel);
      const { data, code } = yield call(PublicService.updateInfo, payload);
      if (code === 1) {

        let fileList = [];
        if (data.declareUrl) {
          /**
            * 截取指定字符后的内容
            * @param url 路径
            * @param parameter 字符
            */
          function getCaption(url, parameter) {
            var index = url.lastIndexOf(parameter);
            url = url.substring(index + 1, url.length);
            return url;
          }
          let obj = [{
            uid: 0,
            name: '申报材料',
            // name: getCaption(data.organizationList, "/"),
            status: 'done',
            url: declareUrl ? declareUrl : data.declareUrl,
          }];
          fileList = obj;
        }

        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            fileList
          }
        });
      }
    },
    //市区县查看详情
    *examineInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.examineInfo, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {}
          }
        });
      }
    },

    //省查看详情
    *provinceExamineInfo({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.provinceExamineInfo, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            detail: data || {}
          }
        });
      }
    },
    //驳回历史记录
    *declaresAuditList({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.declaresAuditList, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            historyList: data.list || []
          }
        });
      }
    },
    //试点申报评价-评价详情
    *declaresEvalua({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.declaresEvalua, payload);
      if (code === 1) {
        yield put({
          type: 'concat',
          payload: {
            evaluateList: data.list || []
          }
        });
      }
    },
    /** 七牛 */
    *getQiniuToken({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.getQiniuToken, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            qiniuData: data,
          }
        });
      }
    },
    //试点申报评价-更新
    *ajaxEditEvaluate({ payload }, { call, put, select }) {
      const { id } = payload;
      const { data, code } = yield call(PublicService.ajaxEditEvaluate, payload);
      if (code === 1) {
        yield put({
          type: 'declaresEvalua',
          payload: {
            id
          }
        });
        yield put({
          type: 'concat',
          payload: {
            evaluateEdit: false
          }
        });
      }
    },
    /** 下载数据模版*/
    *getPdf({ payload }, { call, put, select }) {
      const { data, code } = yield call(PublicService.getPdf, payload);
      if (code == 1) {
        const { down_url } = data
        console.log('data,下载文件', data)
        download(down_url)
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        console.log('query', query)

        function initData() {
          let fileList = []
          if (query.declareUrl) {
            let obj = [{
              uid: 0,
              name: '申报材料',
              status: 'done',
              url: query.declareUrl || '',
            }];
            fileList = obj;
          }

          dispatch({
            type: 'concat', payload: {
              id: query.id || '',
              type: query.type,
              menberType: query.menberType || '',
              declareUrl: query.declareUrl || '',
              detail: {
                declareUrl: query.declareUrl || ''
              },
              fileList,
              qiniuData: {},
              status: query.status || '',
              statusName: query.statusName || ''
            }
          });
          dispatch({
            type: 'init', payload: {
              id: query.id || '',
              type: query.type || '',
              menberType: query.menberType || '',
              status: query.status || '',
              declareUrl: query.declareUrl || '',
              fileList,
              detail: {
                declareUrl: query.declareUrl || ''
              },
            }
          });
        }
        if (pathname === '/pilotApplicationEdit') {
          initData();

        } else if (pathname === '/rejectionRecord') {
          initData();
          dispatch({
            type: 'declaresAuditList', payload: {
              id: query.id || '',
              type: query.type || '',
              menberType: query.menberType || ''
            }
          });
        }
      })
    }
  }
}
