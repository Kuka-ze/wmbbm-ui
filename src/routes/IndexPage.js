import React from 'react';
import { connect } from 'dva';
import { DatePicker, Row, Col, Icon, Button, Popover, Tabs, Select, Radio, Table, Card, Modal, message } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import "./IndexPage.css";

const { TabPane } = Tabs;
const { RangePicker, MonthPicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const mouthFormat = 'YYYY-MM';

function IndexPage(props) {
  // let property_company_name = "文明大脑";
  const property_company_name = sessionStorage.getItem('property_company_name') != 'null' ? sessionStorage.getItem('property_company_name') : '文明大脑';
  const { dispatch, activeKey, activeKeyLevel, tabType, tabDM, dataSource, isAdmin, showBtn, levelName, endOpen,
    yesDate, dateBase, weekDate, startTime, startTime1, endTime, mouthDate, dateMouth, sixMouthDate, startMouth, startMouth1, endMouth,
    numList, baseLine, pieList, pieList1, lineList, channelKey, channelName, itemIndex, activeList, activeLine, activeLineName, activeLine1, activePie, activePie1, endOpen2 = false, endOpen3 = false, endOpenTime = false, endOpenTime1 = false, endOpenTime3 = false, endOpenTimeL = false, endOpenTimeT = false,
    today, mondayDate, sundayDate, startTimeG, endTimeG, yearDate, nowYear, nowYear1, nowMouthDate, nowMouthDate1, startOpenMonLine, startYearL, sixWeek, startTimeL, endTimeL, startTimeL1, endTimeL1, oneMouth,
    nowYearShow = false, nowYearShow1 = false, nowYearShow2 = false, nowYearShow3 = false, endOpenM1 = false, thirtyMouth, lastYear, fiveYear, openLj1 = false, openMZX = false } = props;
  function disabledDate(current) {
    // 不能选择今天及之后
    return current && current >= moment().startOf('day');
  }

  function disabledDate1(current) {
    // 不能选择今天及之后, 且不能跨30天
    const now = moment(moment().add(0, 'day').format(dateFormat), dateFormat);
    let pd2 = current < moment(startTime1);   //<=不能选择和开始时间同一个天， <可以
    const oneMouth = moment(moment(startTime1).add(30, "days").format(dateFormat), dateFormat);
    let pd3;
    if (now.valueOf() > oneMouth.valueOf()) {
      pd3 = current >= oneMouth;
    } else {
      pd3 = current >= moment().startOf('day');
    }
    return current ? pd2 || pd3 : false
  }
  function disabledMonthDate(current) {
    // 不能选择本月及之后
    const nowMonth = moment(moment().add(0, 'months').format(mouthFormat), mouthFormat); //-1不能选择和开始时间同一个月， 0可以
    return current ? current >= nowMonth : false
  }
  function disabledStartDate(current) {
    // 不能选择本月及之后
    const nowMonth = moment(moment().add(-1, 'months').format(mouthFormat), mouthFormat); //-1不能选择和开始时间同一个月， 0可以
    return current ? current >= nowMonth : false
  }
  function disabledEndDate(current) {
    // 不能选择开始月份及之前和本月及之后
    const nowMonth = moment(moment().add(0, 'months').format(mouthFormat), mouthFormat);
    let pd2 = current.valueOf() <= moment(startMouth).valueOf();   //<=不能选择和开始时间同一个月， <可以
    let pd3 = current.valueOf() >= nowMonth.valueOf();
    return current ? pd2 || pd3 : false
  }
  function disabledStartDate1(current) {
    // 不能选择本月及之后
    const nowMonth = moment(moment().add(0, 'months').format(mouthFormat), mouthFormat); //-1不能选择和开始时间同一个月， 0可以
    return current ? current >= nowMonth : false
  }
  function disabledEndDate1(current) {
    // 不能选择开始月份及之前和本月及之后，且不能跨12个月
    const nowMonth = moment(moment().add(0, 'months').format(mouthFormat), mouthFormat);
    let pd2 = current.valueOf() < moment(startMouth1).valueOf();   //<=不能选择和开始时间同一个月， <可以
    const oneYear = moment(moment(startMouth1).add(1, "years").format(mouthFormat), mouthFormat);
    let pd3;
    if (nowMonth.valueOf() > oneYear.valueOf()) {
      pd3 = current.valueOf() >= oneYear.valueOf();
    } else {
      pd3 = current.valueOf() >= nowMonth.valueOf()
    }
    return current ? pd2 || pd3 : false
  }
  //数据概况-开始
  function disabledDate3(current) {
    // 近一年
    let pd = current.valueOf() < moment(lastYear).valueOf();
    return (current && current >= moment().startOf('day')) || pd;
  }
  function disabledDate4(current) {
    // 近30天
    let pd = current.valueOf() < moment(oneMouth).valueOf();
    return (current && current >= moment().startOf('day')) || pd;
  }
  function disabledDate5(current) {
    //近30周
    let pd = current.valueOf() < moment(thirtyMouth).valueOf();
    return (current && current >= moment().startOf('day')) || pd;
  }
  function disabledEndDate3(current) {
    // 不能选择及今天之后 及开始时间之前
    let pd = current.valueOf() < moment(startTimeG).valueOf();   //<=不能选择和开始时间同一个天， <可以
    return (current && current >= moment().startOf('day')) || pd;   //>能选择今天，>=不能选择今天
  }
  function disabledEndDate4(current) {
    // 不能选择及今天之后 及开始时间之前
    let pd = current.valueOf() < moment(startTimeL1).valueOf();   //<=不能选择和开始时间同一个天， <可以
    return (current && current >= moment().startOf('day')) || pd; //>能选择今天，>=不能选择今天
  }
  function disabledEndDate5(current) {
    // 不能选择今天之后 及开始时间之前
    let pd = current.valueOf() < moment(startTimeL).valueOf();   //<=不能选择和开始时间同一个天， <可以
    return (current && current > moment().startOf('day')) || pd;
  }
  function disabledMonthDate4(current) {
    // 不能选择本月及之后 以及去年
    let pd = current < moment(moment().add(-6, 'months').format(mouthFormat), mouthFormat);
    const nowMonth = moment(moment().add(-1, 'months').format(mouthFormat), mouthFormat);
    return current ? current > nowMonth || pd : false
  }
  function changeYear(e, name, date) {
    console.log('e, ', e)
    console.log('name', name)
    console.log('date', moment(date).format('yyyy'))

    //当选择非五年内的日期时给提示
    if (moment(date).format('yyyy') > yearDate || moment(date).format('yyyy') < (yearDate - 4)) {
      message.warning(`请选择${(yearDate - 4)}~${yearDate}年的数据进行查看`);
      return;
    }

    dispatch({
      type: "MainLayoutModel/concat",
      payload: {
        [e]: moment(date).format('yyyy'),
        [name]: false
      }
    })

    let params = name == 'nowYearShow1' ? {
      startTime: moment(date).format('yyyy'),
      endTime: nowYear1,
      dateType: tabDM
    } : {
        startTime: startYearL,
        endTime: moment(date).format('yyyy'),
        dateType: tabDM
      }
    let paramsXj = {
      date: moment(date).format('yyyy'),
      dateType: tabDM
    }
    if (name == 'nowYearShow') {//本级列表按年选择
      dispatch({
        type: "MainLayoutModel/ajaxBaseList",
        payload: paramsXj
      })
    } else if (name == 'nowYearShow3' || name == 'nowYearShow1') {//本级折线图按年选择
      dispatch({
        type: "MainLayoutModel/ajaxBaseLine",
        payload: { ...params, type: itemIndex + 1 }
      })
    } else if (name == 'nowYearShow2') {//下级列表 按年
      dispatch({
        type: "MainLayoutModel/ajaxTable",
        payload: paramsXj
      })
    }
  }
  function handleYearOpenChange(name, open) {
    if (open) {
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          [name]: true
        }
      })
    } else {
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          [name]: false
        }
      })
    }
  }


  //数据概况-结束
  function handleStartOpenChange(name, open) {
    console.log('按月1111', name)
    console.log('按月2222', open)

    if (!open) {
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          [name]: true
        }
      })
    }

  }
  function handleEndOpenChange(name, open) {
    console.log('关闭1111', name)
    console.log('关闭2222', open)
    if (name == 'openLj1') {
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          [name]: open,
          endOpenTime: false
        }
      })
    } else if (name == 'openMZX') {
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          [name]: open,
          endOpenM1: false
        }
      })
    } else {
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          [name]: open,
          endOpenTime: false
        }
      })
    }
  }

  function closeDatePicker() {
    console.log('22222222', nowYearShow)
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        [nowYearShow]: false,
        nowYearShow: false,
        endOpen2: false,
        endOpen3: false,
        endOpenM1: false,
        endOpenTime: false,
        endOpenTime1: false,
        endOpenTimeL: false,
        endOpenTimeT: false,
        endOpenTime3: false,
        nowYearShow1: false,
        nowYearShow2: false,
        nowYearShow3: false,
        openMZX: false
      }
    })
    console.log('333333', nowYearShow)
  }

  function changeDate(date, dateString) {
    let params = {
      type: tabType,
      dateType: tabDM
    }
    if (activeKey == '1') {
      //使用分析
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          today: dateString
        }
      })
      if (activeKeyLevel == 'thisLevel') {
        //本级
        dispatch({
          type: "MainLayoutModel/ajaxBaseList",
          payload: {
            dateType: tabDM,
            date: dateString
          }
        })
      } else {
        //下级
        dispatch({
          type: 'MainLayoutModel/ajaxTable',
          payload: {
            dateType: tabDM,
            date: dateString
          }
        })
      }
    } else if (activeKey == '2') {
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          dateBase: dateString
        }
      })
      //志愿者分析
      if (activeKeyLevel == 'thisLevel') {
        //本级
        dispatch({
          type: "MainLayoutModel/ajaxNewPie",
          payload: {
            dateTime: dateString,
            dateType: '1'
          }
        })
      } else {
        //下级
        dispatch({
          type: 'MainLayoutModel/ajaxTable2',
          payload: { ...params, dateTime: dateString }
        })
      }
    } else if (activeKey == '3') {
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          dateBase: dateString
        }
      })
      //活动分析
      if (activeKeyLevel == 'thisLevel') {
        //本级
        dispatch({
          type: "MainLayoutModel/ajaxActiveList",
          payload: {
            dateTime: dateString,
            dateType: '1'
          }
        })
      } else {
        //下级
        dispatch({
          type: 'MainLayoutModel/ajaxTable3',
          payload: { ...params, dateTime: dateString }
        })
      }
    } else {
      //秀文明分析
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          dateBase: dateString
        }
      })
      if (activeKeyLevel == 'thisLevel') {
        //本级
        dispatch({
          type: "MainLayoutModel/ajaxCiviPie",
          payload: {
            date: dateString
          }
        })
      } else {
        //下级
        dispatch({
          type: 'MainLayoutModel/ajaxTable4',
          payload: { ...params, date: dateString }
        })
      }
    }
  }
  function changeRange(date, dateString) {
    let params = {
      startTime: dateString[0],
      endTime: dateString[1]
    }

    if (activeKey == '1') {
      //使用分析
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: { ...params, startTimeG: dateString[0], endTimeG: dateString[1] }
      })
      dispatch({
        type: "MainLayoutModel/ajaxBaseLine",
        payload: {
          ...params,
          type: itemIndex + 1
        }
      })
    } else if (activeKey == '2') {
      //志愿者分析
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: { ...params, startTime1: dateString[0] }
      })
      dispatch({
        type: "MainLayoutModel/ajaxNewLine",
        payload: {
          ...params,
          dateType: tabDM,
          type: itemIndex + 1
        }
      })
    } else {
      //活动分析
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: { ...params, startTime1: dateString[0] }
      })
      if (activeKeyLevel == 'thisLevel') {
        dispatch({
          type: 'MainLayoutModel/ajaxActiveList',
          payload: {
            ...params,
            dateType: tabDM
          }
        });
        dispatch({
          type: "MainLayoutModel/ajaxActiveLine",
          payload: {
            ...params,
            dateType: tabDM,
            type: itemIndex + 1
          }
        })
      } else {
        dispatch({
          type: 'MainLayoutModel/concat',
          payload: { ...params, startTime1: dateString[0] }
        })
        dispatch({
          type: 'MainLayoutModel/ajaxTable3',
          payload: {
            ...params,
            type: tabType,
            dateType: tabDM
          }
        });
      }
    }
  }
  //改变月份
  function changeMonth(e, date, dateString) {
    if (activeKey == '1') {
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          [e]: dateString
        }
      })
    } else {
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          dateMouth: dateString
        }
      })
    }
    let params = {
      type: itemIndex + 1,
      dateType: tabDM
    }
    if (activeKey == '1') {
      //数据概况分析
      if (activeKeyLevel == 'thisLevel') {
        if (e == 'nowMouthDate') {
          delete params.type;
          dispatch({
            type: "MainLayoutModel/ajaxBaseList",
            payload: { ...params, date: dateString }
          })
        } else {
          dispatch({
            type: "MainLayoutModel/ajaxBaseLine",
            payload: { ...params, date: dateString }
          })
        }
      } else {
        delete params.type;
        dispatch({
          type: "MainLayoutModel/ajaxTable",
          payload: { ...params, date: dateString }
        })
      }
    } else if (activeKey == '2') {
      //志愿者分析
      if (activeKeyLevel == 'thisLevel') {
        dispatch({
          type: "MainLayoutModel/ajaxNewPie",
          payload: {
            dateTime: dateString,
            dateType: '2'
          }
        })
      } else {
        dispatch({
          type: "MainLayoutModel/ajaxTable2",
          payload: { ...params, dateTime: dateString }
        })
      }
    } else {
      //活动分析
      if (activeKeyLevel == 'thisLevel') {
        dispatch({
          type: "MainLayoutModel/ajaxActiveList",
          payload: {
            dateTime: dateString,
            dateType: '2'
          }
        })
      } else {
        dispatch({
          type: "MainLayoutModel/ajaxTable3",
          payload: { ...params, dateTime: dateString }
        })
      }
    }
  }
  function changeMonthDate(e, date, dateString) {
    if (e == 'endMouth') {
      dispatch({
        type: "MainLayoutModel/concat",
        payload: {
          [e]: dateString
        }
      })
      let params = {
        dateType: tabDM,
        startTime: startMouth,
        endTime: dateString
      }
      let params1 = {
        dateType: tabDM,
        startTime: startMouth1,
        endTime: dateString
      }
      let paramsMonLine = {
        dateType: tabDM,
        startTime: startOpenMonLine,
        endTime: dateString
      }
      if (activeKey == '1') {
        dispatch({
          type: "MainLayoutModel/concat",
          payload: {
            [e]: dateString,
            itemIndex: 0  //重置itemIndex
          }
        })
        // 这里是按月份选择的折线图方法
        dispatch({
          type: 'MainLayoutModel/ajaxBaseLine',
          payload: paramsMonLine
        })
      }
      else if (activeKey == '2') {
        //志愿者分析
        dispatch({
          type: "MainLayoutModel/ajaxNewLine",
          payload: {
            ...params,
            dateType: tabDM,
            type: itemIndex + 1
          }
        })
      } else {
        //活动分析
        if (activeKeyLevel == 'thisLevel') {
          dispatch({
            type: "MainLayoutModel/concat",
            payload: {
              [e]: dateString,
              itemIndex: 0  //重置itemIndex
            }
          })
          dispatch({
            type: "MainLayoutModel/ajaxActiveList",
            payload: {
              ...params1,
              dateType: tabDM
            }
          })
          dispatch({
            type: "MainLayoutModel/ajaxActiveLine",
            payload: {
              ...params1,
              dateType: tabDM,
              type: 1
            }
          })
        } else {
          dispatch({
            type: 'MainLayoutModel/ajaxTable3',
            payload: {
              ...params1,
              type: tabType,
              dateType: tabDM
            }
          });
        }
      }
    } else {
      dispatch({
        type: "MainLayoutModel/concat",
        payload: {
          [e]: dateString
        }
      })
    }
  }
  function changeTimeDate(e, date, dateString) {
    if (e == 'endMonLine') {
      dispatch({
        type: "MainLayoutModel/concat",
        payload: {
          [e]: dateString,
          itemIndex: 0  //重置itemIndex
        }
      })

      let params = {
        startTime: startTime1,
        endTime: dateString,
        dateType: tabDM
      }
      if (activeKeyLevel == 'lowLevel') {
        //数据概况-下级-数据
        dispatch({
          type: "MainLayoutModel/ajaxTable",
          payload: {
            ...params,
            dateType: tabDM
          }
        })
      } else {
        //数据概况-上级-数据
        dispatch({
          type: "MainLayoutModel/ajaxBaseList",
          payload: {
            ...params,
            dateType: tabDM
          }
        })
      }

    } else if (e == 'endTime') {
      dispatch({
        type: "MainLayoutModel/concat",
        payload: {
          [e]: dateString,
          itemIndex: 0  //重置itemIndex
        }
      })
      let params = {
        startTime: startTime1,
        endTime: dateString
      }
      //活动分析
      if (activeKeyLevel == 'thisLevel') {
        dispatch({
          type: "MainLayoutModel/ajaxActiveList",
          payload: {
            ...params,
            dateType: tabDM
          }
        })
        dispatch({
          type: "MainLayoutModel/ajaxActiveLine",
          payload: {
            ...params,
            dateType: tabDM,
            type: 1
          }
        })
      } else {
        dispatch({
          type: 'MainLayoutModel/ajaxTable3',
          payload: {
            ...params,
            type: tabType,
            dateType: tabDM
          }
        });
      }
    } else if (e == 'endTimeG') {
      dispatch({
        type: "MainLayoutModel/concat",
        payload: {
          [e]: dateString,
          itemIndex: 0  //重置itemIndex
        }
      })
      let params = {
        startTime: startTimeG,
        endTime: dateString
      }
      if (activeKeyLevel == 'lowLevel') {
        //数据概况-下级-数据
        dispatch({
          type: "MainLayoutModel/ajaxTable",
          payload: {
            ...params,
            dateType: tabDM
          }
        })
      } else {
        //数据概况-上级-数据
        dispatch({
          type: "MainLayoutModel/ajaxBaseList",
          payload: {
            ...params,
            dateType: tabDM
          }
        })
      }
    } else if (e == 'endTimeL' || e == 'endTimeL1') { //这是按月来的
      dispatch({
        type: "MainLayoutModel/concat",
        payload: {
          [e]: dateString
        }
      })
      let params = {
        startTime: e == 'endTimeL' ? startTimeL : startTimeL1,
        endTime: dateString
      }
      //数据分析-折线
      dispatch({
        type: "MainLayoutModel/ajaxBaseLine",
        payload: {
          ...params,
          type: itemIndex + 1,
          dateType: tabDM
        }
      })
    } else {
      dispatch({
        type: "MainLayoutModel/concat",
        payload: {
          [e]: dateString
        }
      })
    }
  }
  //1、头部三个tab   2、本级-下级
  function tabChange(name, key) {
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        endOpenTime: false,
      }
    })

    setTimeout(() => {
      closeDatePicker()
    }, 100);

    //关闭弹出框
    console.log('endOpenTime222222----->', endOpenTime)
    if (name == 'activeKeyLevel' && key == 'lowLevel') { //当为下级时
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          [name]: key,
          activeKeyLevel: 'lowLevel',
          tabDM: '1',
          dateBase: yesDate,
          dateMouth: mouthDate,
          startTime1: yesDate,
          endTime: yesDate,
          today: yesDate
        }
      });
      let params = {
        type: '1',
        dateType: '1'
      }
      if (activeKey == '1') {  //使用分析
        dispatch({
          type: 'MainLayoutModel/ajaxTable',
          payload: { dateType: '1', date: yesDate }
        })
      } else if (activeKey == '2') {  //志愿者分析
        dispatch({
          type: 'MainLayoutModel/ajaxTable2',
          payload: { ...params, dateTime: yesDate }
        })
      } else if (activeKey == '3') {  //活动分析
        dispatch({
          type: 'MainLayoutModel/ajaxTable3',
          payload: { ...params, startTime: yesDate, endTime: yesDate }
        })
      } else { //秀文明分析
        dispatch({
          type: 'MainLayoutModel/ajaxTable4',
          payload: { ...params, date: yesDate }
        })
      }
    } else {  //为本级时
      dispatch({
        type: 'MainLayoutModel/concat',
        payload: {
          [name]: key,
          dateBase: yesDate,
          today: yesDate,
          dateMouth: mouthDate,
          startTime: weekDate,
          endTime: yesDate,
          startMouth: sixMouthDate,
          endMouth: mouthDate,
          activeKeyLevel: 'thisLevel',  //thisLevel=本级，lowLevel-下级
          startTime1: yesDate,
          tabType: '1',  //1新增  
          tabDM: '1',   //1日，2月
          itemIndex: 0,
        }
      })
      if ((name == 'activeKeyLevel' && activeKey == '1') || (name == 'activeKey' && key == '1')) {  //使用分析
        dispatch({
          type: 'MainLayoutModel/ajaxBaseList',
          payload: {
            date: yesDate,
            type: 1,
            dateType: 1
          }
        });
        dispatch({
          type: 'MainLayoutModel/ajaxBaseLine',
          payload: {
            startTime: weekDate,
            endTime: yesDate,
            type: 1,
            dateType: 1
          }
        });
      } else if ((name == 'activeKeyLevel' && activeKey == '2') || (name == 'activeKey' && key == '2')) {  //志愿者分析
        dispatch({
          type: 'MainLayoutModel/ajaxNewPie',
          payload: {
            dateTime: yesDate,
            dateType: 1
          }
        });
        dispatch({
          type: 'MainLayoutModel/ajaxNewLine',
          payload: {
            startTime: weekDate,
            endTime: yesDate,
            dateType: '1',
            type: 1
          }
        });
      } else if ((name == 'activeKeyLevel' && activeKey == '3') || (name == 'activeKey' && key == '3')) {  //活动分析
        dispatch({
          type: 'MainLayoutModel/ajaxActiveList',
          payload: {
            startTime: yesDate,
            endTime: yesDate,
            dateType: '1',
          }
        });
        dispatch({
          type: 'MainLayoutModel/ajaxActiveLine',
          payload: {
            startTime: yesDate,
            endTime: yesDate,
            dateType: '1',
            type: 1
          }
        });
      } else {
        //秀文明分析
        dispatch({
          type: 'MainLayoutModel/ajaxCiviPie',
          payload: {
            date: yesDate
          }
        });
      }
    }
  }
  //新增-历史
  function handleChangeType(name, value) {
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        [name]: value,
        tabDM: '1',
        dateBase: yesDate,
        dateMouth: mouthDate,
        startTime1: yesDate,
        endTime: yesDate,
        startMouth1: mouthDate,
        endMouth: mouthDate
      }
    });
    let params = {
      dateType: '1',
      type: value
    }
    if (activeKey == '1') {
      //使用分析
      dispatch({
        type: 'MainLayoutModel/ajaxTable',
        payload: { ...params, date: yesDate }
      })
    } else if (activeKey == '2') {
      //志愿者分析
      dispatch({
        type: 'MainLayoutModel/ajaxTable2',
        payload: { ...params, dateTime: yesDate }
      })
    } else if (activeKey == '3') {
      //活动分析
      dispatch({
        type: 'MainLayoutModel/ajaxTable3',
        payload: { ...params, startTime: yesDate, endTime: yesDate }
      })
    } else {
      //秀文明分析
      dispatch({
        type: 'MainLayoutModel/ajaxTable4',
        payload: { ...params, date: yesDate }
      })
    }
  }
  //日-月
  function handleChangeYM(name, e) {
    let { value } = e.target;
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        [name]: value,
        dateBase: yesDate,
        dateMouth: mouthDate,
        startMouth: sixMouthDate,
        endMouth: mouthDate,
        startTime: weekDate,
        endTime: yesDate,
        startTime1: yesDate,
        startMouth1: mouthDate,
        itemIndex: 0  //切换日月重置itemIndex
      }
    });
    //1.19.4活动分析-本级
    let params4 = (value == '1') ? {
      startTime: yesDate,
      endTime: yesDate,
      dateType: '1'
    } : {
        startTime: mouthDate,
        endTime: mouthDate,
        dateType: '2'
      }
    //下级-活动 分析
    let params3 = (value == '1') ? {
      type: tabType,
      startTime: yesDate,
      endTime: yesDate,
      dateType: '1'
    } : {
        type: tabType,
        startTime: mouthDate,
        endTime: mouthDate,
        dateType: '2'
      }
    //下级-志愿者 分析
    let params5 = (value == '1') ? {
      type: tabType,
      dateTime: yesDate,
      dateType: '1'
    } : {
        type: tabType,
        dateTime: mouthDate,
        dateType: '2'
      }
    //本级 - 上面列表
    let params1 = (value == '1') ? {
      dateTime: yesDate,
      dateType: '1'
    } : {
        dateTime: mouthDate,
        dateType: '2'
      }
    //本级折线
    let params2 = (value == '1') ? {
      startTime: weekDate,
      endTime: yesDate,
      dateType: '1',
      type: '1'
    } : {
        startTime: sixMouthDate,
        endTime: mouthDate,
        dateType: '2',
        type: '1'
      }

    if (activeKey == '2') {
      //志愿者分析
      if (activeKeyLevel == 'thisLevel') {
        dispatch({
          type: 'MainLayoutModel/ajaxNewPie',
          payload: params1
        })
        dispatch({
          type: 'MainLayoutModel/ajaxNewLine',
          payload: params2
        })
      } else {
        dispatch({
          type: 'MainLayoutModel/ajaxTable2',
          payload: params5
        })
      }
    } else if (activeKey == '3') {
      //活动分析
      if (activeKeyLevel == 'thisLevel') {
        dispatch({
          type: 'MainLayoutModel/ajaxActiveList',
          payload: params4
        });
        dispatch({
          type: 'MainLayoutModel/ajaxActiveLine',
          payload: { ...params4, type: '1' }
        })
      } else {
        dispatch({
          type: 'MainLayoutModel/ajaxTable3',
          payload: params3
        })
      }
    } else {
      //秀文明分析-  payload需修改
      if (activeKeyLevel == 'thisLevel') {
        dispatch({
          type: 'MainLayoutModel/ajaxCiviPie',
          payload: { date: yesDate }
        })
      } else {
        dispatch({
          type: 'MainLayoutModel/ajaxTable4',
          payload: params3
        })
      }
    }
  }
  //日-月-周-年-数据概况
  function handleChangeYMW(name, e) {
    closeDatePicker()
    let { value } = e.target;
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        [name]: value,
        endMouth: mouthDate,
        today: yesDate,
        startTimeG: mondayDate,
        endTimeG: sundayDate,
        startTimeL: sixWeek,
        endTimeL: sundayDate,
        startTimeL1: weekDate,
        endTimeL1: yesDate,
        nowYear: yearDate,
        nowYear1: yearDate,
        nowMouthDate: mouthDate,
        nowMouthDate1: mouthDate,
        sixWeekDate: sixWeek,
        startYearL: fiveYear,
        itemIndex: 0  //切换日月重置itemIndex,
      }
    });

    //本级 - 上面列表  下级
    let params1 = (value == '1' || value == '2') ? {
      dateTime: yesDate,
      dateType: value
    } : value == '3' ? {
      startTime: mondayDate,
      endTime: sundayDate,
      dateType: value
    } : value == '4' ? {
      date: mouthDate,
      dateType: value
    } : {
            date: yearDate,
            dateType: value
          }
    //本级折线
    let params2 = (value == '1' || value == '2') ? {
      startTime: weekDate,
      endTime: yesDate,
      dateType: value,
      type: '1'
    } : value == '3' ? {
      startTime: sixWeek,
      endTime: sundayDate,
      dateType: value,
      type: '1'
    } : value == '4' ? {
      // date: mouthDate,
      startTime: sixMouthDate,
      endTime: mouthDate,
      dateType: value,
      type: '1'
    } : {
            // date: yearDate,
            startTime: fiveYear,//开始默认5年前
            endTime: yearDate,
            dateType: value,
            type: '1'
          }
    if (activeKeyLevel == 'thisLevel') {
      //本级
      dispatch({
        type: 'MainLayoutModel/ajaxBaseList',
        payload: params1
      })
      dispatch({
        type: 'MainLayoutModel/ajaxBaseLine',
        payload: params2
      })
    } else {
      //下级
      dispatch({
        type: 'MainLayoutModel/ajaxTable',
        payload: params1
      })
    }
  }
  //切换item
  function checkItem(itemIndex) {
    closeDatePicker()
    let params1 = (tabDM == '1' || tabDM == '2') ? {
      startTime: startTimeL1,
      endTime: endTimeL1
    } : tabDM == '3' ? {
      startTime: startTimeL,
      endTime: endTimeL
    } : tabDM == '4' ? {
      startTime: startOpenMonLine,
      endTime: endMouth,
    } : {
            startTime: startYearL,//开始默认5年前
            endTime: nowYear1,
          }
    //1.19.4活动分析
    let params2 = tabDM == '2' ? {
      startTime: props.activeKey == 3 ? startMouth1 : startMouth,
      endTime: endMouth
    } : {
        startTime: props.activeKey == 3 ? startTime1 : startTime,
        endTime,
      }
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        itemIndex,
      }
    });
    if (activeKey == '1') {
      //使用分析
      dispatch({
        type: "MainLayoutModel/ajaxBaseLine",
        payload: {
          ...params1,
          dateType: tabDM,
          type: itemIndex + 1
        }
      })
    } else if (activeKey == '2') {
      //志愿者分析
      dispatch({
        type: "MainLayoutModel/ajaxNewLine",
        payload: {
          ...params2,
          dateType: tabDM,
          type: itemIndex + 1
        }
      })
    } else if (activeKey == '3') {
      //活动分析
      dispatch({
        type: 'MainLayoutModel/ajaxActiveLine',
        payload: {
          ...params2,
          dateType: tabDM,
          type: itemIndex + 1
        }
      });
    }
  }
  //数据概况-趋势图
  const optionBaseLine = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: baseLine && baseLine.length > 0 && baseLine.map((item, index) => {
        return item.date
      })
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: numList && numList.length > 0 && numList[itemIndex].name,
      data: baseLine && baseLine.length > 0 && baseLine.map((item, index) => {
        return item.num
      }),
      type: 'line',
      itemStyle: {
        color: '#1890ff'
      },
      areaStyle: {
        normal: {
          color: '#1890ff'
        },
      },
    }]
  };
  //使用分析-table
  const columns = [
    {
      title: '组织名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: tabType == '1' ? '志愿者数' : '新增志愿者数',
      dataIndex: 'volunteerCount',
      key: 'volunteerCount',
    },
    {
      title: tabType == '1' ? '活跃志愿者数' : '新增活跃志愿者数',
      dataIndex: 'activeCount',
      key: 'activeCount',
    },
    {
      title: tabType == '1' ? '志愿队伍数' : '新增志愿队伍数',
      dataIndex: 'teamCount',
      key: 'teamCount',
    },
    {
      title: tabType == '1' ? '发布活动数' : '新增发布活动数',
      dataIndex: 'activityCount',
      key: 'activityCount',
    },
    {
      title: tabType == '1' ? '开展活动数' : '新增开展活动数',
      dataIndex: 'startCount',
      key: 'startCount',
    },
    {
      title: tabType == '1' ? '有效活动数' : '新增有效活动数',
      dataIndex: 'effectiveCount',
      key: 'effectiveCount',
    },
    {
      title: tabType == '1' ? '无效活动数' : '新增无效活动数',
      dataIndex: 'invalidCount',
      key: 'invalidCount',
    },
    {
      title: tabType == '1' ? '秀文明数' : '秀文明数',
      dataIndex: 'civilizationCount',
      key: 'civilizationCount',
    },
    {
      title: tabType == '1' ? '活动秀数' : '活动秀数',
      dataIndex: 'civilizationTypeCount',
      key: 'civilizationTypeCount',
    },
    {
      title: tabType == '1' ? '文明时长' : '新增文明时长',
      dataIndex: 'durationCount',
      key: 'durationCount',
    },
  ];
  //志愿者分析-饼图
  let newPieList = pieList && pieList.length > 0 && pieList.map((item, index) => {
    let optionItem = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%'
        // formatter: '{a} <br/>{b}: {d}%'
      },
      color: ['#3F6AF5', '#1EC1A8', '#20B0F8', '#d48265', '#91c7ae', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#28B0a8'],
      series: [
        {
          name: index == 0 ? '活跃志愿者' : '新增志愿者数',
          type: 'pie',
          id: index,
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '14'
            }
          },
          labelLine: {
            show: false
          },
          data: item.data
        }
      ]
    };
    let newItem = { ...item, optionItem }
    return newItem
  });
  //志愿者分析-折线图
  const optionLine = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: channelName
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: lineList && lineList.length > 0 && lineList.map((item, index) => {
        return item.date
      })
    },
    yAxis: {
      type: 'value'
    },
    color: ['#26B0F8', '#1EC1A8', '#3F6AF5'],
    series: channelName && channelName.length > 0 && channelName.map((item, index) => {
      let key = channelKey[index]
      return {
        name: item,
        type: 'line',
        data: lineList && lineList.length > 0 && lineList.map((item, index) => {
          return item[key]
        })
      }
    })
  };
  //志愿者分析-table
  const columns2 = [
    {
      title: '组织名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: tabType == '1' ? '活跃志愿者' : '新增志愿者',
      dataIndex: 'volunteerCount',
      key: 'volunteerCount',
    },
    {
      title: '队伍码',
      dataIndex: 'ed94cb6790f9a4aef5dd9072fedd2fb2',
      key: 'ed94cb6790f9a4aef5dd9072fedd2fb2',
    },
    {
      title: '队伍码占比',
      dataIndex: 'ed94cb6790f9a4aef5dd9072fedd2fb2Percent',
      key: 'ed94cb6790f9a4aef5dd9072fedd2fb2Percent',
      render: text => <p>{text}%</p>,
    },
    {
      title: '志愿者邀请',
      dataIndex: 'a4f9a3e7a1882cae22876a3645be282d',
      key: 'a4f9a3e7a1882cae22876a3645be282d',
    },
    {
      title: '志愿者邀请占比',
      dataIndex: 'a4f9a3e7a1882cae22876a3645be282dPercent',
      key: 'a4f9a3e7a1882cae22876a3645be282dPercent',
      render: text => <p>{text}%</p>,
    },
    {
      title: '小区码',
      dataIndex: '2567a7ca3664233427709c24f56dab4e',
      key: '2567a7ca3664233427709c24f56dab4e',
    },
    {
      title: '小区码占比',
      dataIndex: '2567a7ca3664233427709c24f56dab4ePercent',
      key: '2567a7ca3664233427709c24f56dab4ePercent',
      render: text => <p>{text}%</p>,
    },
    {
      title: '普通注册',
      dataIndex: 'b92aef95804d59b5f7d762417549775d',
      key: 'b92aef95804d59b5f7d762417549775d',
    },
    {
      title: '普通注册占比',
      dataIndex: 'b92aef95804d59b5f7d762417549775dPercent',
      key: 'b92aef95804d59b5f7d762417549775dPercent',
      render: text => <p>{text}%</p>,
    },
    {
      title: '其他',
      dataIndex: 'other',
      key: 'other',
    },
    {
      title: '其他占比',
      dataIndex: 'otherPercent',
      key: 'otherPercent',
      render: text => <p>{text}%</p>,
    }
  ];
  //活动分析-饼图
  const optionPieActive = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%'
      // formatter: '{b}: {c} ({d}%)'
    },
    color: ['#26B0F8', '#1EC1A8'],
    legend: {
      orient: 'horizontal',
      bottom: 0,
      left: 'center',
      data: ['有效开展的活动', '无效开展的活动']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14'
          }
        },
        labelLine: {
          show: false
        },
        data: activePie
      }
    ]
  }
  //活动分析-漏斗图
  const optionFunnel = {
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c}%"
    },
    color: ['#26B0F8', '#1EC1A8', '#3F6AF5', '#26B0B2'],
    legend: {
      data: ['活动需求人数', '活动报名人数', '活动签到人数', '活动完成人数']
    },
    series: [
      {
        name: '',
        type: 'funnel',
        left: '10%',
        top: 60,
        //x2: 80,
        bottom: 60,
        width: '80%',
        // height: {totalHeight} - y - y2,
        min: 0,
        max: 100,
        minSize: '20%',
        maxSize: '100%',
        sort: 'descending',
        gap: 1,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: activePie1
      }
    ]
  };
  //活动分析-table
  let hostName = location.hostname;
  const columns3 = tabType == '1' ? [
    {
      title: '组织名称',
      dataIndex: 'levelName',
      key: 'levelName',
    },
    {
      title: '开展的活动数',
      dataIndex: 'startTotals',
      key: 'startTotals',
      render: (text, record) => {

        return tabDM == 1 ? <a target="_blank" href={`/#/approvalInList?levelId=${record.levelId}&levelType=${record.levelType}&type=${tabType}&dateType=${tabDM}&style=1&startTime=${startTime1}&endTime=${endTime}`}>{record.startTotals}</a> :
          <a target="_blank" href={`/#/approvalInList?levelId=${record.levelId}&levelType=${record.levelType}&type=${tabType}&dateType=${tabDM}&style=1&startTime=${startMouth1}&endTime=${endMouth}`}>{record.startTotals}</a>
      }
    },
    {
      title: '有效开展的活动数',
      dataIndex: 'personTotals',
      key: 'personTotals',
      render: (text, record) => {
        return tabDM == 1 ? <a target="_blank" href={`/#/approvalInList?levelId=${record.levelId}&levelType=${record.levelType}&type=${tabType}&dateType=${tabDM}&style=2&startTime=${startTime1}&endTime=${endTime}`}>{record.personTotals}</a> :
          <a target="_blank" href={`/#/approvalInList?levelId=${record.levelId}&levelType=${record.levelType}&type=${tabType}&dateType=${tabDM}&style=2&startTime=${startMouth1}&endTime=${endMouth}`}>{record.personTotals}</a>
      }
    },
    {
      title: '有效率',
      dataIndex: 'personRate',
      key: 'personRate',
    },
    {
      title: '无效开展的活动数',
      dataIndex: 'noPersonTotals',
      key: 'noPersonTotals',
      render: (text, record) => {
        return tabDM == 1 ? <a target="_blank" href={`/#/approvalInList?levelId=${record.levelId}&levelType=${record.levelType}&type=${tabType}&dateType=${tabDM}&style=3&startTime=${startTime1}&endTime=${endTime}`}>{record.noPersonTotals}</a> :
          <a target="_blank" href={`/#/approvalInList?levelId=${record.levelId}&levelType=${record.levelType}&type=${tabType}&dateType=${tabDM}&style=3&startTime=${startMouth1}&endTime=${endMouth}`}>{record.noPersonTotals}</a>
      }
    },
    {
      title: '无效率',
      dataIndex: 'noPersonRate',
      key: 'noPersonRate',
    }
  ] : [
      {
        title: '层级名称',
        dataIndex: 'levelName',
        key: 'levelName',
      },
      {
        title: '活动需求人数',
        dataIndex: 'numberTotals',
        key: 'numberTotals',
      },
      {
        title: '活动报名人数',
        dataIndex: 'applyTotals',
        key: 'applyTotals',
      },
      {
        title: '报名率',
        dataIndex: 'applyRate',
        key: 'applyRate',
      },
      {
        title: '活动签到人数',
        dataIndex: 'signTotals',
        key: 'signTotals',
      },
      {
        title: '签到率',
        dataIndex: 'signRate',
        key: 'signRate',
      },
      {
        title: '活动完成人数',
        dataIndex: 'joinTotals',
        key: 'joinTotals',
      },
      {
        title: '完成率',
        dataIndex: 'joinRate',
        key: 'joinRate',
      }
    ];
  //活动分析-折线图
  const optionActiveLine = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: activeLineName
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: activeLine && activeLine.length > 0 && activeLine.map((item, index) => {
        return item.date
      })
    },
    yAxis: {
      type: 'value'
    },
    color: ['#26B0F8', '#1EC1A8', '#3F6AF5'],
    series: activeLineName && activeLineName.length > 0 && activeLineName.map((item, index) => {
      let key = activeLineName[index]
      return {
        name: item,
        type: 'line',
        data: activeLine && activeLine.length > 0 && activeLine.map((item, index) => {
          return item[key]
        })
      }
    })
  };
  const optionActiveLine1 = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: activeLineName
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: activeLine1 && activeLine1.length > 0 && activeLine1.map((item, index) => {
        return item.date
      })
    },
    yAxis: {
      type: 'value'
    },
    color: ['#26B0F8', '#1EC1A8', '#3F6AF5', '#3F6Aa3'],
    series: activeLineName && activeLineName.length > 0 && activeLineName.map((item, index) => {
      let key = activeLineName[index]
      return {
        name: item,
        type: 'line',
        data: activeLine1 && activeLine1.length > 0 && activeLine1.map((item, index) => {
          return item[key]
        })
      }
    })
  };
  //秀文明分析-饼图
  let newPieList1 = pieList1 && pieList1.length > 0 && pieList1.map((item, index) => {
    let optionItem = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%'
        // formatter: '{a} <br/>{b}: {d}%'
      },
      color: ['#3F6AF5', '#1EC1A8', '#20B0F8', '#d48265', '#91c7ae', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#28B0a8'],
      series: [
        {
          name: index == 0 ? '活跃志愿者' : '新增志愿者数',
          type: 'pie',
          id: index,
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '14'
            }
          },
          labelLine: {
            show: false
          },
          data: item.data
        }
      ]
    };
    let newItem = { ...item, optionItem }
    return newItem
  });
  //秀文明分析-table
  const columns4 = [
    {
      title: '组织名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: tabType == '1' ? '累计秀文明数' : '新增秀文明数',
      dataIndex: 'civilizationCount',
      key: 'civilizationCount',
    },
    {
      title: tabType == '1' ? '累计活动秀数' : '新增活动秀数',
      dataIndex: 'activityCount',
      key: 'activityCount',
    },
    {
      title: tabType == '1' ? '累计活动秀数占比' : '新增活动秀数占比',
      dataIndex: 'activityProportion',
      key: 'activityProportion'
    },
    {
      title: tabType == '1' ? '累计想秀就秀数' : '新增想秀就秀数',
      dataIndex: 'thinkCount',
      key: 'thinkCount',
    },
    {
      title: tabType == '1' ? '累计想秀就秀数占比' : '新增想秀就秀数占比',
      dataIndex: 'thinkProportion',
      key: 'thinkProportion'
    }
  ];
  //导出
  function getOut() {
    console.log('startYearL', moment(startYearL).format('yyyy'))
    console.log('nowYear1', nowYear1)
    if (activeKey == 1) {
      //使用分析
      if (activeKeyLevel == 'thisLevel') {
        let paramsDown = tabDM == '1' ? {
          startTime: startTimeL1,
          endTime: endTimeL1
        } : tabDM == '2' ? {
          // 按日下载
          startTime: startTimeL1,
          endTime: endTimeL1
        } : tabDM == '3' ? {
          // 按周下载
          startTime: startTimeL,
          endTime: endTimeL
        } : tabDM == '4' ? {
          // 按月下载
          startTime: startOpenMonLine,
          endTime: endMouth
        } : {
                  //按年下载
                  startTime: moment(startYearL).format('yyyy'),
                  endTime: nowYear1
                }
        //这里要增加判断,把通过时间选择器选择的数据拿到,然后下面要增加新的判断 根据 tabDM判断穿什么数据
        dispatch({
          type: 'MainLayoutModel/getOut',
          payload: {
            ...paramsDown,
            dateType: tabDM
          }
        })
      } else {
        //数据概况下级导出
        let paramsDown = tabDM == '1' ? {
          // startTime:startTimeL1,
          // endTime:endTimeL1
          date: today
        } : tabDM == '2' ? {
          // 按日下载
          date: today
        } : tabDM == '3' ? {
          // 按周下载
          // date:startTimeG
        } : tabDM == '4' ? {
          // 按月下载
          date: nowMouthDate
        } : {
                  //按年下载
                  date: nowYear
                }
        dispatch({
          type: 'MainLayoutModel/getOutLow',
          payload: {
            ...paramsDown,
            dateType: tabDM,
            type: tabType
          }
        })
      }
    } else if (activeKey == 2) {
      //志愿者分析
      if (activeKeyLevel == 'thisLevel') {
        let params = tabDM == '1' ? {
          startTime,
          endTime
        } : {
            startTime: startMouth,
            endTime: endMouth
          }
        dispatch({
          type: 'MainLayoutModel/getVolOut',
          payload: {
            ...params,
            dateType: tabDM
          }
        })
      } else {
        let params = tabDM == '1' ? {
          dateTime: dateBase
        } : {
            dateTime: dateMouth
          }
        dispatch({
          type: 'MainLayoutModel/getVolOutLow',
          payload: {
            ...params,
            dateType: tabDM,
            type: tabType
          }
        })
      }
    } else if (activeKey == 3) {
      //活动分析
      let params = tabDM == '1' ? {
        startTime: startTime1,
        endTime
      } : {
          startTime: startMouth1,
          endTime: endMouth
        }
      if (activeKeyLevel == 'thisLevel') {
        dispatch({
          type: 'MainLayoutModel/getAcOut',
          payload: {
            ...params,
            dateType: tabDM
          }
        })
      } else {
        dispatch({
          type: 'MainLayoutModel/getAcOutLow',
          payload: {
            ...params,
            dateType: tabDM,
            type: tabType
          }
        })
      }
    } else {
      //秀文明分析
      if (activeKeyLevel == 'thisLevel') {
      } else {
        let params = {
          date: dateBase
        }
        dispatch({
          type: 'MainLayoutModel/getCiviOutLow',
          payload: {
            ...params,
            dateType: 1,  //实际不要
            type: tabType
          }
        })
      }
    }
  }
  function handleOk() {
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        outVisible: false
      }
    })
    window.location.href = props.scalar
  }
  function handleCancel() {
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        outVisible: false
      }
    })
  }
  return (
    <div className="home-box">
      {isAdmin == 1 ? <div className="home-item">
        <Tabs activeKey={activeKey} onChange={tabChange.bind(this, 'activeKey')}>
          <TabPane tab="数据概况" key="1">
            <Tabs activeKey={activeKeyLevel} onChange={tabChange.bind(this, 'activeKeyLevel')} className="child-tabs">
              <TabPane tab="本级" key="thisLevel">
                <div className="title" style={{ paddingTop: 0 }}>
                  <span>{levelName}</span>
                </div>
                <div style={{ paddingBottom: '20px' }}>
                  <Radio.Group value={tabDM} buttonStyle="solid"
                    onChange={handleChangeYMW.bind(this, 'tabDM')}
                  >
                    <Radio.Button value="1">累计</Radio.Button>
                    <Radio.Button value="2">按日</Radio.Button>
                    <Radio.Button value="3">按周</Radio.Button>
                    <Radio.Button value="4">按月</Radio.Button>
                    <Radio.Button value="5">按年</Radio.Button>
                  </Radio.Group>
                  <div style={{ marginLeft: '16px', float: 'right' }}>
                    {tabDM == 1 || tabDM == 2 ? <DatePicker allowClear={false} disabledDate={tabDM == 1 ? disabledDate3 : disabledDate4} onOpenChange={handleEndOpenChange.bind(this, 'openLj1')} open={openLj1} onChange={changeDate} value={moment(today, dateFormat)} className="right" /> :
                      tabDM == 3 ? <div className="right">
                        <DatePicker disabled onChange={changeTimeDate.bind(this, 'startTimeG')}
                          disabledDate={disabledDate5}
                          value={moment(startTimeG, dateFormat)}
                          onOpenChange={handleStartOpenChange.bind(this, 'endOpenTime')}
                          format={dateFormat} style={{ marginRight: '16px' }}
                          allowClear={false} />
                        <DatePicker disabled onChange={changeTimeDate.bind(this, 'endTimeG')}
                          disabledDate={disabledEndDate3}
                          onOpenChange={handleEndOpenChange.bind(this, 'endOpenTime')}
                          open={endOpenTime}
                          value={moment(endTimeG, dateFormat)}
                          allowClear={false} />
                      </div> :
                        tabDM == 4 ? <MonthPicker allowClear={false} disabledDate={disabledMonthDate4} onOpenChange={handleEndOpenChange.bind(this, 'openMZX')} open={openMZX} onChange={changeMonth.bind(this, 'nowMouthDate')} value={moment(nowMouthDate, mouthFormat)} className="right" /> :
                          <DatePicker mode="year" format="yyyy" allowClear={false} open={nowYearShow} onOpenChange={handleYearOpenChange.bind(this, 'nowYearShow')} onPanelChange={changeYear.bind(this, 'nowYear', 'nowYearShow')} value={moment(nowYear, 'yyyy')} className="right" />}
                  </div>
                </div>
                <Row gutter={16}>
                  {numList && numList.length > 0 && numList.map((item, index) => {
                    //   style={{width:'20%'}}
                    return (<Col span={6} key={index} style={{ width: '20%' }}>
                      <div className="gutter-box" onClick={checkItem.bind(this, index)} style={{ borderColor: itemIndex == index ? '#1890ff' : '#e1e2e3' }}>
                        <p>{item.name}</p>
                        <h1>{item.num}</h1>
                        {/* <Popover content={item.tooltip}>
                          <Icon type="exclamation-circle" />
                        </Popover> */}
                      </div>
                    </Col>)
                  })}
                </Row>
                <div className="title">
                  <span className="title-text">{numList && numList.length > 0 && numList[itemIndex].name}趋势图</span>
                  {tabDM == 1 || tabDM == 2 ? <div className="right">
                    <DatePicker onChange={changeTimeDate.bind(this, 'startTimeL1')}
                      disabledDate={tabDM == 1 ? disabledDate3 : disabledDate4}
                      value={moment(startTimeL1, dateFormat)}
                      onOpenChange={handleStartOpenChange.bind(this, 'endOpenTime')}
                      format={dateFormat} style={{ marginRight: '16px' }}
                      allowClear={false} />
                    <DatePicker onChange={changeTimeDate.bind(this, 'endTimeL1')}
                      disabledDate={disabledEndDate4}
                      onOpenChange={handleEndOpenChange.bind(this, 'endOpenTime')}
                      open={endOpenTime}
                      value={moment(endTimeL1, dateFormat)}
                      allowClear={false} />
                  </div> : tabDM == 3 ? <div className="right">
                    <DatePicker disabled onChange={changeTimeDate.bind(this, 'startTimeL')}
                      disabledDate={disabledDate5}
                      value={moment(startTimeL, dateFormat)}
                      onOpenChange={handleStartOpenChange.bind(this, 'endOpenTimeL')}
                      format={dateFormat} style={{ marginRight: '16px' }}
                      allowClear={false} />
                    <DatePicker disabled onChange={changeTimeDate.bind(this, 'endTimeL')}
                      disabledDate={disabledEndDate5}
                      onOpenChange={handleEndOpenChange.bind(this, 'endOpenTimeL')}
                      open={endOpenTimeL}
                      value={moment(endTimeL, dateFormat)}
                      allowClear={false} />
                  </div> :
                      tabDM == 4 ?
                        <div className="right">
                          <MonthPicker onChange={changeMonthDate.bind(this, 'startOpenMonLine')}
                            disabledDate={disabledMonthDate4}
                            value={moment(startOpenMonLine, mouthFormat)}
                            onOpenChange={handleStartOpenChange.bind(this, 'endOpenM1')}
                            format={mouthFormat} style={{ marginRight: '16px' }}
                            allowClear={false} />
                          <MonthPicker onChange={changeMonthDate.bind(this, 'endMouth')}
                            disabledDate={disabledMonthDate4}
                            onOpenChange={handleEndOpenChange.bind(this, 'endOpenM1')}
                            open={endOpenM1}
                            value={moment(endMouth, mouthFormat)}
                            allowClear={false} />
                        </div>
                        :
                        //  按年展示折线图 
                        <div className="right">
                          <DatePicker
                            mode="year"
                            format="yyyy"
                            onPanelChange={changeYear.bind(this, 'startYearL', 'nowYearShow1')} //相当于onchange
                            onOpenChange={handleYearOpenChange.bind(this, 'nowYearShow1')}
                            value={moment(startYearL, 'yyyy')}
                            style={{ marginRight: '16px' }}
                            open={nowYearShow1}
                            allowClear={false} />
                          <DatePicker
                            mode="year"
                            format="yyyy"
                            onPanelChange={changeYear.bind(this, 'nowYear1', 'nowYearShow3')}
                            onOpenChange={handleEndOpenChange.bind(this, 'nowYearShow3')}
                            open={nowYearShow3}
                            value={moment(nowYear1, 'yyyy')}
                            allowClear={false} />
                        </div>
                  }
                  <Button type="primary" className="right" onClick={getOut}>导出</Button>
                </div>
                <p className="line-in-title"><i className="circle-line" />{numList && numList.length > 0 && numList[itemIndex].name}</p>
                <ReactEcharts option={optionBaseLine} />
              </TabPane>
              {showBtn == 1 && <TabPane tab="下级" key="lowLevel">
                <div className="title" style={{ paddingTop: 0 }}>
                  <Radio.Group value={tabDM} buttonStyle="solid"
                    onChange={handleChangeYMW.bind(this, 'tabDM')}
                  >
                    <Radio.Button value="1">累计</Radio.Button>
                    <Radio.Button value="2">按日</Radio.Button>
                    <Radio.Button value="3">按周</Radio.Button>
                    <Radio.Button value="4">按月</Radio.Button>
                    <Radio.Button value="5">按年</Radio.Button>
                  </Radio.Group>
                  {tabDM == 1 || tabDM == 2 ? <DatePicker allowClear={false} disabledDate={tabDM == 1 ? disabledDate3 : disabledDate4} onChange={changeDate} value={moment(today, dateFormat)} className="right" /> :
                    tabDM == 3 ? <div className="right">
                      <DatePicker disabled onChange={changeTimeDate.bind(this, 'startTimeG')}
                        disabledDate={disabledDate5}
                        value={moment(startTimeG, dateFormat)}
                        onOpenChange={handleStartOpenChange.bind(this, 'endOpenTimeT')}
                        format={dateFormat} style={{ marginRight: '16px' }}
                        allowClear={false} />
                      <DatePicker disabled onChange={changeTimeDate.bind(this, 'endTimeG')}
                        disabledDate={disabledEndDate3}
                        onOpenChange={handleEndOpenChange.bind(this, 'endOpenTimeT')}
                        open={endOpenTimeT}
                        value={moment(endTimeG, dateFormat)}
                        allowClear={false} />
                    </div> :
                      tabDM == 4 ? <MonthPicker allowClear={false} disabledDate={disabledMonthDate4} onChange={changeMonth.bind(this, 'nowMouthDate')} value={moment(nowMouthDate, mouthFormat)} className="right" /> :
                        <DatePicker mode="year" format="yyyy" allowClear={false} open={nowYearShow2} onOpenChange={handleYearOpenChange.bind(this, 'nowYearShow2')} onPanelChange={changeYear.bind(this, 'nowYear', 'nowYearShow2')} value={moment(nowYear, 'yyyy')} className="right" />}

                  <Button type="primary" className="right" onClick={getOut}>导出</Button>
                </div>
                <Table rowKey={record => record.id} dataSource={dataSource} columns={columns} pagination={false} style={{ marginBottom: '32px' }} />
              </TabPane>}
            </Tabs>
          </TabPane>
          <TabPane tab="志愿者分析" key="2">
            <Tabs activeKey={activeKeyLevel} onChange={tabChange.bind(this, 'activeKeyLevel')} className="child-tabs">
              <TabPane tab="本级" key="thisLevel">
                <div className="title" style={{ paddingTop: 0 }}>
                  <span>{levelName}</span>
                  {tabDM == '1' ? <DatePicker allowClear={false} disabledDate={disabledDate} onChange={changeDate} value={moment(dateBase, dateFormat)} className="right" />
                    : <MonthPicker allowClear={false} disabledDate={disabledMonthDate} onChange={changeMonth} value={moment(dateMouth, mouthFormat)} className="right" />}
                  <Radio.Group value={tabDM} buttonStyle="solid"
                    onChange={handleChangeYM.bind(this, 'tabDM')}
                    style={{ marginLeft: '16px', float: 'right' }}
                  >
                    <Radio.Button value="1">日</Radio.Button>
                    <Radio.Button value="2">月</Radio.Button>
                  </Radio.Group>
                </div>
                <Row gutter={16}>
                  {newPieList && newPieList.length > 0 && newPieList.map((item, index) => {
                    return (<Col span={6} key={index}>
                      <div className="gutter-box pieItem" onClick={checkItem.bind(this, index)} style={{ borderColor: itemIndex == index ? '#1890ff' : '#e1e2e3' }}>
                        <h4>{item.name}</h4>
                        <Popover content={item.tooltip}>
                          <Icon type="exclamation-circle" />
                        </Popover>
                        <h3>{item.num}人</h3>
                        <ReactEcharts option={item.optionItem} style={{ width: '100px', height: '100px' }} />
                      </div>
                    </Col>
                    )
                  })}
                </Row>
                <div className="title">
                  <span className="title-text">{itemIndex == '0' ? '活跃志愿者趋势图' : '新增志愿者趋势图'}</span>
                  {tabDM == '1' ? <RangePicker allowClear={false} disabledDate={disabledDate}
                    onChange={changeRange}
                    value={[moment(startTime, dateFormat), moment(endTime, dateFormat)]}
                    className="right"
                  /> : <div className="right">
                      <MonthPicker onChange={changeMonthDate.bind(this, 'startMouth')}
                        disabledDate={disabledStartDate}
                        value={moment(startMouth, mouthFormat)}
                        onOpenChange={handleStartOpenChange.bind(this, 'endOpen')}
                        format={mouthFormat} style={{ marginRight: '16px' }}
                        allowClear={false} />
                      <MonthPicker onChange={changeMonthDate.bind(this, 'endMouth')}
                        disabledDate={disabledEndDate}
                        onOpenChange={handleEndOpenChange.bind(this, 'endOpen')}
                        open={endOpen}
                        value={moment(endMouth, mouthFormat)}
                        allowClear={false} />
                    </div>}
                  <Button type="primary" className="right" onClick={getOut}>导出</Button>
                </div>
                <ReactEcharts option={optionLine} />
              </TabPane>
              {showBtn == 1 && <TabPane tab="下级" key="lowLevel">
                <div className="title" style={{ paddingTop: 0 }}>
                  <Select value={tabType} style={{ width: 120 }} onChange={handleChangeType.bind(this, 'tabType')}>
                    <Option value="1">活跃</Option>
                    <Option value="2">新增</Option>
                  </Select>
                  <Radio.Group value={tabDM} buttonStyle="solid"
                    onChange={handleChangeYM.bind(this, 'tabDM')}
                    style={{ marginLeft: '16px' }}
                  >
                    <Radio.Button value="1">日</Radio.Button>
                    <Radio.Button value="2">月</Radio.Button>
                  </Radio.Group>
                  {tabDM == '1' ? <DatePicker allowClear={false} disabledDate={disabledDate} onChange={changeDate} value={moment(dateBase, dateFormat)} className="right" />
                    : <MonthPicker allowClear={false} disabledDate={disabledMonthDate} onChange={changeMonth} value={moment(dateMouth, mouthFormat)} className="right" />}
                  <Button type="primary" className="right" onClick={getOut}>导出</Button>
                </div>
                <Table rowKey={record => record.id} dataSource={dataSource} columns={columns2} pagination={false} style={{ marginBottom: '32px' }} />
              </TabPane>}
            </Tabs>
          </TabPane>
          <TabPane tab="活动分析" key="3">
            <Tabs activeKey={activeKeyLevel} onChange={tabChange.bind(this, 'activeKeyLevel')} className="child-tabs">
              <TabPane tab="本级" key="thisLevel">
                <div className="title" style={{ paddingTop: 0, position: 'relative', zIndex: '9' }}>
                  <span>{levelName}</span>
                  {tabDM == '1' ? <div className="right">
                    <DatePicker onChange={changeTimeDate.bind(this, 'startTime1')}
                      disabledDate={disabledDate}
                      value={moment(startTime1, dateFormat)}
                      onOpenChange={handleStartOpenChange.bind(this, 'endOpenTime3')}
                      format={dateFormat} style={{ marginRight: '16px' }}
                      allowClear={false} />
                    <DatePicker onChange={changeTimeDate.bind(this, 'endTime')}
                      disabledDate={disabledDate1}
                      onOpenChange={handleEndOpenChange.bind(this, 'endOpenTime3')}
                      open={endOpenTime3}
                      value={moment(endTime, dateFormat)}
                      allowClear={false} />
                    {/* bug */}
                  </div> : <div className="right">
                      <MonthPicker onChange={changeMonthDate.bind(this, 'startMouth1')}
                        disabledDate={disabledStartDate1}
                        value={moment(startMouth1, mouthFormat)}
                        onOpenChange={handleStartOpenChange.bind(this, 'endOpen2')}
                        format={mouthFormat} style={{ marginRight: '16px' }}
                        allowClear={false} />
                      <MonthPicker onChange={changeMonthDate.bind(this, 'endMouth')}
                        disabledDate={disabledEndDate1}
                        onOpenChange={handleEndOpenChange.bind(this, 'endOpen2')}
                        open={endOpen2}
                        value={moment(endMouth, mouthFormat)}
                        allowClear={false} />
                    </div>}
                  <Radio.Group value={tabDM} buttonStyle="solid"
                    onChange={handleChangeYM.bind(this, 'tabDM')}
                    style={{ marginLeft: '16px', float: 'right' }}
                  >
                    <Radio.Button value="1">日</Radio.Button>
                    <Radio.Button value="2">月</Radio.Button>
                  </Radio.Group>
                </div>
                <Row gutter={16}>
                  <Col span={6}>
                    {activeList && activeList.length > 0 && activeList.map((item, index) => {
                      return (<div className="gutter-box" key={index} onClick={checkItem.bind(this, index)} style={{ marginBottom: '16px', borderColor: itemIndex == index ? '#1890ff' : '#e1e2e3' }}>
                        <h4>{item.name}</h4>
                        <Popover content={item.tooltip}>
                          <Icon type="exclamation-circle" />
                        </Popover>
                        <h3>{item.num}{item.name == '开展的活动数' ? '' : '人'}</h3>
                      </div>
                      )
                    })}
                  </Col>
                  <Col span={18}>
                    {itemIndex == '0' ? <ReactEcharts option={optionPieActive} style={{ width: '100%', position: 'relative', marginTop: '-6%' }} /> :
                      <ReactEcharts option={optionFunnel} style={{ width: '100%', position: 'relative', marginTop: '-6%' }} />}
                  </Col>
                </Row>
                <div className="title">
                  <span className="title-text">{itemIndex == '0' ? '活动开展趋势图' : '活动需求人数趋势图'}</span>
                  <Button type="primary" className="right" onClick={getOut}>导出</Button>
                </div>
                {/* {itemIndex=='0'?<ReactEcharts option={optionActiveLine}/>:<ReactEcharts option={optionActiveLine1}/>} */}
                {itemIndex == '0' && activeLine && <ReactEcharts option={optionActiveLine} />}
                {itemIndex == '1' && activeLine1 && <ReactEcharts option={optionActiveLine1} />}
              </TabPane>
              {showBtn == 1 && <TabPane tab="下级" key="lowLevel">
                <div className="title" style={{ paddingTop: 0 }}>
                  <Select value={tabType} style={{ width: 120 }} onChange={handleChangeType.bind(this, 'tabType')}>
                    <Option value="1">活动开展</Option>
                    <Option value="2">活动人员</Option>
                  </Select>
                  <Radio.Group value={tabDM} buttonStyle="solid"
                    onChange={handleChangeYM.bind(this, 'tabDM')}
                    style={{ marginLeft: '16px' }}
                  >
                    <Radio.Button value="1">日</Radio.Button>
                    <Radio.Button value="2">月</Radio.Button>
                  </Radio.Group>
                  {tabDM == '1' ? <div className="right">
                    <DatePicker onChange={changeTimeDate.bind(this, 'startTime1')}
                      disabledDate={disabledDate}
                      value={moment(startTime1, dateFormat)}
                      onOpenChange={handleStartOpenChange.bind(this, 'endOpenTime1')}
                      format={dateFormat} style={{ marginRight: '16px' }}
                      allowClear={false} />
                    <DatePicker onChange={changeTimeDate.bind(this, 'endTime')}
                      disabledDate={disabledDate1}
                      onOpenChange={handleEndOpenChange.bind(this, 'endOpenTime1')}
                      open={endOpenTime1}
                      value={moment(endTime, dateFormat)}
                      allowClear={false} />
                  </div> : <div className="right">
                      <MonthPicker onChange={changeMonthDate.bind(this, 'startMouth1')}
                        disabledDate={disabledStartDate1}
                        value={moment(startMouth1, mouthFormat)}
                        onOpenChange={handleStartOpenChange.bind(this, 'endOpen3')}
                        format={mouthFormat} style={{ marginRight: '16px' }}
                        allowClear={false} />
                      <MonthPicker onChange={changeMonthDate.bind(this, 'endMouth')}
                        disabledDate={disabledEndDate1}
                        onOpenChange={handleEndOpenChange.bind(this, 'endOpen3')}
                        open={endOpen3}
                        value={moment(endMouth, mouthFormat)}
                        allowClear={false} />
                    </div>}
                  <Button type="primary" className="right" onClick={getOut}>导出</Button>
                </div>
                <Table rowKey={record => record.id} dataSource={dataSource} columns={columns3} pagination={false} style={{ marginBottom: '32px' }} />
              </TabPane>}
            </Tabs>
          </TabPane>
          <TabPane tab="秀文明分析" key="4">
            <Tabs activeKey={activeKeyLevel} onChange={tabChange.bind(this, 'activeKeyLevel')} className="child-tabs">
              <TabPane tab="本级" key="thisLevel">
                <div className="title" style={{ paddingTop: 0 }}>
                  <span>{levelName}</span>
                  <DatePicker allowClear={false} disabledDate={disabledDate} onChange={changeDate} value={moment(dateBase, dateFormat)} className="right" />
                </div>
                <Row gutter={16}>
                  {newPieList1 && newPieList1.length > 0 && newPieList1.map((item, index) => {
                    return (<Col span={6} key={index}>
                      <div className="gutter-box pieItem">
                        <h4>{item.name}</h4>
                        <Popover content={item.tooltip}>
                          <Icon type="exclamation-circle" />
                        </Popover>
                        <h3>{item.num}条</h3>
                        <ReactEcharts option={item.optionItem} style={{ width: '100px', height: '100px' }} />
                      </div>
                    </Col>
                    )
                  })}
                </Row>
              </TabPane>
              {showBtn == 1 && <TabPane tab="下级" key="lowLevel">
                <div className="title" style={{ paddingTop: 0 }}>
                  <Select value={tabType} style={{ width: 120 }} onChange={handleChangeType.bind(this, 'tabType')}>
                    <Option value="1">累计</Option>
                    <Option value="2">新增</Option>
                  </Select>
                  <DatePicker allowClear={false} disabledDate={disabledDate} onChange={changeDate} value={moment(dateBase, dateFormat)} className="right" />
                  <Button type="primary" className="right" onClick={getOut}>导出</Button>
                </div>
                <Table rowKey={record => record.id} dataSource={dataSource} columns={columns4} pagination={false} style={{ marginBottom: '32px' }} />
              </TabPane>}
            </Tabs>
          </TabPane>
        </Tabs>
      </div> :
        <div>
          <Card className="mt1">
            <div>欢迎使用{property_company_name || "-"}</div>
          </Card>
          <Card className="mt1 question">
            <div className="info">文明帮帮码即将推出“点派单”服务，现请<span className="name">各层级管理员</span>及<span className="name">各志愿队队长</span>点击以下链接参与需求调研，我们一起完善流程吧~</div>
            <a className="link" href="https://www.wjx.cn/jq/90067586.aspx" target="_blank">https://www.wjx.cn/jq/90067586.aspx</a>
          </Card>
        </div>}
      <Modal
        title="下载文件"
        visible={props.outVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>确定要下载吗</p>
        <a href={props.scalar} download=""></a>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.MainLayoutModel,
    loading: state.loading.models.MainLayoutModel,
  }
}

export default connect(mapStateToProps)(IndexPage);
