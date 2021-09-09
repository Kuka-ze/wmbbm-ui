import React from 'react';
import { message, Modal } from 'antd';
import ActivityList from '../../services/ActivityManageService';
import queryString from 'query-string';
export default {
  namespace: 'AddActivityModel',
  state: {},
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({
        type: 'concat',
        payload: {
          loading: false,
          communityList: [],
          community_name: '',
          image: [],
          location_name: [],
          cityName: '',
          show: false,
          sign_address: [],
          changeMap: '',
          address_type: '1',
          social_list: [],
          levelName_list: [],
          activityRemark: '',
          formula_time: '',
          apply_deadline: '',
          time: '',
          disabled_date: '',
          centerDataDrop: {},
          sign_model: 1,
          style: 1
        }
      });
      yield put({ type: 'ajaxActivityCenterDataDrop' });
      yield put({ type: 'getListDrop' });
      yield put({ type: 'getLevelListDrop' });
      yield put({ type: 'getOpenAndSign' });
    },
    *ajaxActivityCenterDataDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(ActivityList.ajaxActivityCenterDataDrop, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            centerDataDrop: data || {}
          }
        });
      }
    },
    *getListDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(ActivityList.getListDrop, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            social_list: data.list || []
          }
        });
      }
    },
    *getLevelListDrop({ payload }, { call, put, select }) {
      const { data, code } = yield call(ActivityList.getLevelListDrop, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            levelName_list: data.list || []
          }
        });
      }
    },
    *getOpenAndSign({ payload }, { call, put, select }) {
      const { data, code } = yield call(ActivityList.getOpenAndSign, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            sign_range: data && data.list || []
          }
        });
      }
    },
    *activityAdd({ payload }, { call, put, select }) {
      const { code } = yield call(ActivityList.activityAdd, payload);
      if (code == 1) {
        message.success('新增成功');
        window.location.href = '#approvalList';
      }
    },
    *activityAddMany({ payload }, { call, put, select }) {
      const { code } = yield call(ActivityList.activityAddMany, payload);
      if (code == 1) {
        message.success('新增成功');
        window.location.href = '#approvalList';
      }
    },
    // 编辑详情
    *activityEditDetail({ payload }, { call, put, select }) {
      const { data, code } = yield call(ActivityList.activityEditDetail, payload);
      if (code === 1) {
        if (data.activityImg) {
          let obj = [{
            uid: 0,
            name: `img0`,
            status: 'done',
            url: data.activityImg,
          }];
          data.activityImg = obj;

        }
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            activity_remark: data.activityRemark || null,
            sign_model: data.signModel,
            sign_address: data.signAddress ? data.signAddress :[] ,
            image: data.activityImg,
            style: data && data.style
          }
        });
        if(data&&data.signModel == 1){
          Modal.info({
            title: '活动',
            content: <div>您好，为规范活动参与流程，根据相关规则，<span style={{color: '#F9A101'}}>此活动签到类型将自动调整为签到+签退，</span>谢谢您对于平台的反馈与支持。</div>,
            onOk() {},
          });
        }
      }
    },
    // 详情
    *activityDetail({ payload }, { call, put, select }) {
      const { data, code } = yield call(ActivityList.activityDetail, payload);
      if (code === 1) {
        if (data.activityImg) {
          let obj = [{
            uid: 0,
            name: `img0`,
            status: 'done',
            url: data.activityImg,
          }];
          data.activityImg = obj;
        }
        yield put({
          type: 'concat',
          payload: {
            detail: data || {},
            style: data && data.style
          }
        });
      }
    },
    // 编辑
    *activityEdit({ payload }, { call, put, select }) {
      const { code } = yield call(ActivityList.activityEdit, payload);
      if (code == 1) {
        message.success('编辑成功');
        window.location.href = '#approvalList';
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
              enterpriseType: [],
              detail: {},
              sex: '',
              age: '',
              current: 0,
              disabledName: false,
              options: [],
              uuid: 1,
            }
          });
          dispatch({ type: 'init' });
        }
        if (pathname === '/addActivity') {
          initData();
        } else if (pathname === '/editActivity') {
          initData();
          if (query.id) {
            dispatch({
              type: 'activityEditDetail',
              payload: { id: query.id }
            })
          }
        }
        else if (pathname === '/detailActivity') {
          initData();
          if (query.id) {
            dispatch({
              type: 'activityDetail',
              payload: { id: query.id }
            })
          }
        }
      })
    }
  }
}
