import { message } from 'antd';
import { getYesFormatDate, getMoutnFormatDate, getSixMoutnFormatDate, getYearFormatDate } from '../utils/util'
import CommonInterface from '../services/CommonInterface';

export default {
  namespace: 'MainLayoutModel',
  state: {
    menuList: [],
    visible: false,
  },
  reducers: {
    concat(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      let yesDate = getYesFormatDate(1, 'day');
      let weekDate = getYesFormatDate(7, 'day');
      let mouthDate = getMoutnFormatDate();
      let sixMouthDate = getSixMoutnFormatDate();
      let mondayDate = getYesFormatDate(1, 'week');  //上周一
      let sundayDate = getYesFormatDate(1 / 7, 'week');  //上周日
      let yearDate = getYearFormatDate();
      let sixWeek = getYesFormatDate(6, 'week');    //六周前的周一
      let oneMouth = getYesFormatDate(30, 'day');
      let thirtyMouth = getYesFormatDate(30, 'week');  //30周前的周一
      let lastYear = getYesFormatDate(1, 'year');  //1年前
      let fiveYear = getYesFormatDate(5, 'year');  //5年前
      const states = {
        yesDate,
        weekDate,
        mouthDate,
        sixMouthDate,
        checkChartId: 'all',
        itemIndex: 0,
        activeKey: '1',
        dateBase: yesDate,
        startTime: weekDate,
        endTime: yesDate,
        startTime1: yesDate,   //1.19.4
        dateMouth: mouthDate,
        startMouth: sixMouthDate,
        startMouth1: mouthDate,   //1.19.4
        endMouth: mouthDate,
        mode: ["month", "month"],
        activeKeyLevel: 'thisLevel',  //thisLevel=本级，lowLevel-下级
        tabType: '1',  //1新增  
        tabDM: '1',   //1日，2月
        visible: false,
        endOpen: false,
        endOpen1: false,
        activeLine: [],
        activeLine1: [],
        //数据概况
        today: yesDate,
        mondayDate,
        sundayDate,
        startTimeG: mondayDate,
        endTimeG: sundayDate,
        startTimeL: mondayDate,
        endTimeL: sundayDate,
        startTimeL1: weekDate,
        endTimeL1: yesDate,
        yearDate,
        nowYear: yearDate,
        nowYear1: yearDate,
        nowMouthDate: mouthDate,
        nowMouthDate1: mouthDate,
        sixWeek,
        oneMouth,
        thirtyMouth,
        lastYear,
        fiveYear,
        startOpenMonLine:sixMouthDate,
        startYearL:fiveYear
      }
      yield put({ type: 'menuList', payload: { systemType: 1 } });
      yield put({ type: 'concat', payload: { ...states } });
      yield put({ type: 'ajaxBaseList', payload: { date: yesDate } });
      yield put({ type: 'ajaxBaseLine', payload: { startTime: weekDate, endTime: yesDate, type: 1 } });
    },
    *loginOut({ payload }, { call, put }) {
      const { code } = yield call(CommonInterface.loginOut, payload);
      if (code == 1) {
        message.success('退出成功！');
        setTimeout(() => {
          location.href = "#/";
        }, 2000)
      }
    },
    *resetPassword({ payload }, { call, put }) {
      const { code } = yield call(CommonInterface.resetPassword, payload);
      if (code == 1) {
        message.success('密码修改成功，3秒后返回登录页');
        yield put({
          type: 'concat',
          payload: {
            visible: false
          }
        });
        setTimeout(() => {
          location.href = "#/";
        }, 2000)
      }
    },
    *menuList({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.menuList, payload);
      if (code == 1) {
        let { list = [] } = data;
        yield put({
          type: 'concat',
          payload: { menuList: list || [] }
        });
        sessionStorage.setItem('menus', JSON.stringify(list));
      }
    },
    // 首页-控制台
    //使用分析-列表
    *ajaxBaseList({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.baseList, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            numList: data.list, 
            isAdmin: data.isAdmin,
            showBtn: data.showBtn,
            levelName: data.levelName
          }
        });
      }
    },
    //使用分析-折线图
    *ajaxBaseLine({ payload }, { call, put, select }) {
      const { code, data } = yield call(CommonInterface.baseLine, payload);

      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            baseLine: data.list
          }
        });
      }
    },
    //使用分析-table
    *ajaxTable({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.ajaxTable, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            dataSource: data.list
          }
        });
      }
    },
    //使用分析导出-本级
    *getOut({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.getOut, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            scalar: data.scalar,
            outVisible: true
          }
        });
      }
    },
    //使用分析导出-下级
    *getOutLow({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.getOutLow, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            scalar: data.scalar,
            outVisible: true
          }
        });
      }
    },
    //志愿者分析-列表
    *ajaxNewPie({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.volList, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            pieList: data.list
          }
        });
      }
    },
    //志愿者分析-折线图
    *ajaxNewLine({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.volLine, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            lineList: data.list,
            channelKey: data.channelKey,
            channelName: data.channelName
          }
        });
      }
    },
    //志愿者分析-table
    *ajaxTable2({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.ajaxTable2, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            dataSource: data.list
          }
        });
      }
    },
    //志愿者分析导出-本级
    *getVolOut({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.getVolOut, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            scalar: data.scalar,
            outVisible: true
          }
        });
      }
    },
    //志愿者分析导出-下级
    *getVolOutLow({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.getVolOutLow, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            scalar: data.scalar,
            outVisible: true
          }
        });
      }
    },
    //活动分析-列表
    *ajaxActiveList({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.activeList, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            activeList: data.list,
            activePie: data.list[0].data,
            activePie1: data.list[1].data,
          }
        });
      }
    },
    //活动分析-折线图
    *ajaxActiveLine({ payload }, { call, put }) {
      const { type } = payload;
      const { code, data } = yield call(CommonInterface.activeLine, payload);
      if (code == 1) {
        if (type == '1') {
          yield put({
            type: 'concat',
            payload: {
              activeLine: data.list,
              activeLineName: data.name,
              activeLine1: []
            }
          });
        } else {
          yield put({
            type: 'concat',
            payload: {
              activeLine1: data.list,
              activeLineName: data.name,
              activeLine: []
            }
          });
        }
      }
    },
    //活动分析-table
    *ajaxTable3({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.ajaxTable3, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            dataSource: data.list
          }
        });
      }
    },
    //活动分析导出-本级
    *getAcOut({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.getAcOut, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            scalar: data.scalar,
            outVisible: true
          }
        });
      }
    },
    //活动分析导出-下级
    *getAcOutLow({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.getAcOutLow, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            scalar: data.scalar,
            outVisible: true
          }
        });
      }
    },
    //秀文明分析-列表
    *ajaxCiviPie({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.civiList, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            pieList1: data.list
          }
        });
      }
    },
    //秀文明分析-table
    *ajaxTable4({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.ajaxTable4, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            dataSource: data.list
          }
        });
      }
    },
    //秀文明分析导出-下级
    *getCiviOutLow({ payload }, { call, put }) {
      const { code, data } = yield call(CommonInterface.getCiviOutLow, payload);
      if (code == 1) {
        yield put({
          type: 'concat',
          payload: {
            scalar: data.scalar,
            outVisible: true
          }
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/IndexPage' || pathname === '/indexPage') {
          dispatch({ type: 'init' });
        }
      });
    }
  },
};

