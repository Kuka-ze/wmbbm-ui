import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon, message } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormList from './components/FormList';
import ServiceTimeEdit from './components/ServiceTimeEdit';
import { authority } from '../../utils/util';
function Index(props) {
  let { form, dispatch, params = {} } = props;
  console.log("props:", props);
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '精准帮扶',
    }, {
      name: '服务排期',
    }]
  }
  /** 列表 */
  let formListProps = {
    teamList: props.teamList,
    teamId: props.teamId,
    list: props.list,
    handleChange(value) {
      dispatch({
        type: 'ServiceSchedulingModel/ajaxList',
        payload: { ...props.params, teamId: value }
      })
      dispatch({
        type: 'ServiceSchedulingModel/concat',
        payload: { teamId: value }
      })
    },
    onHeaderRender(year, month) {
      function addZero(num) {
        if (parseInt(num) < 10) {
          num = '0' + num
        }
        return num
      }
      dispatch({
        type: 'ServiceSchedulingModel/concat',
        payload: {
          year: year + "",
          month: (addZero(month + 1)) + "",
        }
      })
    },
    onChanges(value) {
      let year = value ? value.format('YYYY') : '';
      let month = value ? value.format('MM') : '';
      dispatch({
        type: 'ServiceSchedulingModel/ajaxList',
        payload: { ...props.params, year: year, month: month }
      })
    },
    onSelectFun(value) {
      let year = value ? value.format('YYYY') : '';
      let month = value ? value.format('MM') : '';
      function tab(date1, date2) {
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);
        if (oDate1.getTime() >= oDate2.getTime()) {
          return true;
        } else {
          return false;
        }
      }
      let selectedValue = value ? value.format('YYYY-MM-DD') : '';
      let date = new Date().toLocaleDateString().split('/').join('-');
      if (tab(selectedValue, date)) {
        dispatch({
          type: 'ServiceSchedulingModel/concat',
          payload: {
            visible: true,
            selectedValue,
            disabled1: false,
            disabled2: false,
            disabled3: false,
            startTime1: '',
            endTime1: '',
            startTime2: '',
            endTime2: '',
            startTime3: '',
            endTime3: '',
          }
        })
        dispatch({
          type: 'ServiceSchedulingModel/ajaxInfo',
          payload: {
            teamId: props.teamId,
            configTime: selectedValue
          }
        })
        dispatch({
          type: 'ServiceSchedulingModel/ajaxList',
          payload: { ...props.params, year, month }
        })
      }else{
        message.error('不能修改早于当前时间的排期');
        return;
      }
    }
  }
  /** 关联队伍 */
  let serviceTimeEditProps = {
    visible: props.visible,
    mockData: props.mockData,
    targetKeys: props.targetKeys,
    disabled1: props.disabled1,
    disabled2: props.disabled2,
    disabled3: props.disabled3,
    startTime1: props.startTime1,
    endTime1: props.endTime1,
    startTime2: props.startTime2,
    endTime2: props.endTime2,
    startTime3: props.startTime3,
    endTime3: props.endTime3,
    switchDisable1: props.switchDisable1,
    switchDisable2: props.switchDisable2,
    switchDisable3: props.switchDisable3,
    selectedValue: props.selectedValue,
    handleOk() {
      let serverTimeArr = [];
      if (props.disabled1) {
        if (props.startTime1 && props.endTime1) {
          let data = {
            timeType: "1",
            startTime: props.startTime1,
            endTime: props.endTime1
          }
          serverTimeArr.push(data);
        } else {
          message.error('请选择上午服务时段');
          return;
        }
      }
      if (props.disabled2) {
        if (props.startTime2 && props.endTime2) {
          let data = {
            timeType: "2",
            startTime: props.startTime2,
            endTime: props.endTime2
          }
          serverTimeArr.push(data);
        } else {
          message.error('请选择下午服务时段');
          return;
        }
      }
      if (props.disabled3) {
        if (props.startTime3 && props.endTime3) {
          let data = {
            timeType: "3",
            startTime: props.startTime3,
            endTime: props.endTime3
          }
          serverTimeArr.push(data);
        } else {
          message.error('请选择夜间服务时段');
          return;
        }
      }
      let datas = {
        teamId: props.teamId,
        serverTimeArr: serverTimeArr
      }
      if (!props.disabled1 && !props.disabled2 && !props.disabled3) {
        datas.configTime = props.selectedValue
        // message.error('请选择服务时间');
        // return;
      }
      console.log("datas:", datas);
      dispatch({
        type: 'ServiceSchedulingModel/ajaxAdd',
        payload: datas,
      })
    },
    handleCancel() {
      dispatch({
        type: 'ServiceSchedulingModel/concat',
        payload: { visible: false }
      })
    },
    onChange(name, checked) {
      dispatch({
        type: 'ServiceSchedulingModel/concat',
        payload: { [name]: checked }
      })
    },
    onChangeRadios(name, time) {
      dispatch({
        type: 'ServiceSchedulingModel/concat',
        payload: { [name]: time }
      })
    }
  }

  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <Card>
          <FormList {...formListProps} />
        </Card>
        <ServiceTimeEdit {...serviceTimeEditProps} />
      </div>
        : <div className="kong-tu">
          <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
        </div>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.ServiceSchedulingModel,
    loading: state.loading.models.ServiceSchedulingModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
