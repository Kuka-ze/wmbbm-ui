import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, message, Select, Icon, Steps, TimePicker, DatePicker } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import Newlist from './components/Newlist';
import moment from 'moment';
import { getNowFormatDate } from '../../utils/util'
import './style.css'
const { Step } = Steps;
const FormItem = Form.Item;
function Index(props) {
  let { dispatch, form, current, templateName, steps, disabledCheck, detail = {}, id, team, user, userCount, selectedRows, selectedRowKeys, teamList = [] } = props;
  const { getFieldDecorator, validateFields, getFieldValue } = form;

  const image = props && props.image || ''
  const serviceAddress = props && props.serviceAddress || ''
  const infoTeam = props && props.infoTeam || ''
  const titleName = props && props.titleName || ''
  const time = props && props.time || ''
  const type = props && props.type || ''

  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 },
  }

  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '大家帮',
    }, {
      name: '公益池',
      href: 'welfarePool'
    }, {
      name: '统筹活动'
    }]
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: props.user,
    paginationTotal: props.userCount,
    params: props.params,
    selectedRows: selectedRows,
    selectedRowKeys: selectedRowKeys,
    onChangePage(pageNum) {
      dispatch({
        type: 'overallPlanningModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    // dispatch: props.dispatch,
    selected(selectedRowKeys, selectedRows) {
      //需提交的选择名单
      console.log('selectedRowKeys', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      dispatch({
        type: 'overallPlanningModel/concat',
        payload: {
          ...props.params,
          selectedRows, selectedRowKeys
        }
      })
    }
  }


  function nextStep() {
    console.log('selectedRowKeys---->', props.selectedRowKeys)
    console.log('selectedRows---->', props.selectedRows)
    if (props.selectedRows == undefined || props.selectedRows.length == 0) {
      message.error('请选择群众');
      return;
    }

    dispatch({
      type: 'overallPlanningModel/concat',
      payload: {
        current: current + 1,
        selectedRowKeys: props.selectedRowKeys,
        selectedRows: props.selectedRows
      }
    })
  }
  function backStep() {
    dispatch({
      type: 'overallPlanningModel/concat',
      payload: {
        current: current - 1,
        detail: props.form.getFieldsValue() || {}
      }
    })
    // console.log('selectedRowKeys---->', props.selectedRowKeys)
    // console.log('selectedRows---->', props.selectedRows)
  }

  function submitPool() {
    //提交
    validateFields((err, values) => {
      if (err) {
        return;
      }

      let startDate = values.startDate ? values.startDate.format('YYYY-MM-DD') : ''
      let startTime = values.startTime ? values.startTime.format('HH:mm') : ''
      let endDate = getNowFormatDate() //当前时间
      let endTime = values.endTime ? values.endTime.format('HH:mm') : ''

      /** 跨度不超过30天 */
      let begindate = new Date(Date.parse(startDate.replace(/-/g, "/"))); //将开始时间由字符串格式转换为日期格式
      let finishDate = new Date(Date.parse(endDate.replace(/-/g, "/"))); //将开始时间由字符串格式转换为日期格式


      let startDateSecond = begindate.getTime(); //将活动日期转换成毫秒 
      let endDateSecond = finishDate.getTime(); //将当前日期转换成毫秒 
      let day = parseInt((startDateSecond - endDateSecond) / 1000 / 3600 / 24); //结束日期减去当前日期后转换成天数

      if (day > 30) {
        message.error('活动日期跨度不能超过30天');
        return;
      } else {
        if (!dateCompare(startTime, endTime)) {
          // console.log('startTime', startTime, endTime)
          message.error('活动结束时间需大于活动开始时间');
          return;
        }
      }

      /** */
      function dateCompare(startdate, enddate) {
        let rowTimeBegin = (parseInt(((startdate).split(":"))[0])) * 60 * 60 + (parseInt(((startdate).split(":"))[1])) * 60;
        let rowTimeEnd = (parseInt(((enddate).split(":"))[0])) * 60 * 60 + (parseInt(((enddate).split(":"))[1])) * 60;
        if (rowTimeBegin >= rowTimeEnd) {
          return false;
        } else {
          return true;
        }
      }

      let data = {
        startTime: startDate + " " + startTime,
        endTime: startDate + " " + endTime,
        massesArr: props.selectedRows,
        teamId: values.teamId,
        id: id
      }
      /** 新增 */
      dispatch({
        type: 'overallPlanningModel/planAdd',
        payload: data
      });
      // nextStep()
    });
    // console.log('提交统筹')
  }
  function continuePool() {
    // console.log('继续统筹')
    dispatch({
      type: 'overallPlanningModel/concat',
      payload: {
        current: 0,
        selectedRows: [],
        selectedRowKeys: ''
      }
    })
    dispatch({
      type: 'overallPlanningModel/planInfo',
      payload: {
        id
      }
    })
  }
  function backPool() {
    // console.log('返回统筹公益池')
    window.location.href = `#/welfarePool`
    dispatch({
      type: 'overallPlanningModel/concat',
      payload: {
        current: 0,
        selectedRows: [],
        selectedRowKeys: ''
      }
    })

  }
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  function disabledDate(current) {
    return current && current < moment().endOf('day');
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return (
    <div>
      <div>
        <Breadcrumb {...breadcrumbProps} />
        <Card>
          <h1 className="title1">{templateName}</h1>
          <div>活动创建成功后，已统筹的群众即可收到活动信息。</div>
        </Card>
        <Card className="mt1">
          <Steps current={current} style={{ marginBottom: '20px' }}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          {

            current == 0 ? <div>
              <div className="poll-num">
                <Icon width="16" type="info-circle" theme="filled" className="icon-style" />
                <div className="overallStyle">已选择 <span style={{ color: "#008afa" }}>{selectedRows && selectedRows.length || 0}</span> 人,待统筹群众共计: <span style={{ color: '#41575a' }}> {props.userCount}</span> 人 </div>
              </div>
              <Newlist {...formListProps} />
            </div> : ''
          }
          {current == 1 ? <div>
            <Form.Item label="活动日期" {...formItemLayout}
              extra=""
              required={true}>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                {getFieldDecorator('startDate', {
                  initialValue: detail.startDate ? moment(detail.startDate, 'HH:mm') : undefined,
                  rules: [{ required: true, message: '请选择活动日期' }],
                })(<DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                />)}
              </Form.Item>
            </Form.Item>
          </div> : ''}
          {current == 1 ? <div>
            {
              disabledCheck == 'true' ?
                <FormItem label="活动时间" {...formItemLayout}>
                  <span>{detail.endDate && detail.endDate ? `${detail.endDate}   ~  ${detail.endDate}` : '-'}</span>
                </FormItem>
                :
                <Form.Item label="活动时间" {...formItemLayout}
                  extra=""
                  required={true}>
                  <Form.Item
                    style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                  >
                    {getFieldDecorator('startTime', {
                      initialValue: detail.startTime ? moment(detail.startTime, 'HH:mm') : undefined,
                      rules: [{ required: true, message: '请选择活动开始时间' }],
                    })(<TimePicker format={'HH:mm'} minuteStep={30} placeholder="请选择活动开始时间" style={{ width: '100%' }} />)}
                  </Form.Item>
                  <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    {getFieldDecorator('endTime', {
                      initialValue: detail.endTime ? moment(detail.endTime, 'HH:mm') : undefined,
                      rules: [{ required: true, message: '请选择活动结束时间' }],
                    })(<TimePicker format={'HH:mm'} minuteStep={30} placeholder="请选择活动结束时间" style={{ width: '100%' }} />)}
                  </Form.Item>
                </Form.Item>
            }
          </div> : ''}
          {current == 1 ? <div>
            {
              disabledCheck == 'true' ?
                <FormItem
                  label="选择执行队伍"
                  {...formItemLayout}
                >
                  <span>{detail.teamId}</span>
                </FormItem>
                :
                <Form.Item label="执行队伍" {...formItemLayout}>
                  {getFieldDecorator('teamId', {
                    initialValue: detail.teamId,
                    rules: [{ required: true, message: '请选择执行队伍' }],
                  })(
                    <Select placeholder="选择执行队伍" style={{ width: '100%' }}>
                      {team && team.length > 0 ? team.map((item, index) => <Select.Option value={item.teamId} key={index}>{item.teamName}</Select.Option>) : ''}
                    </Select>
                  )}
                </Form.Item>
            }
          </div> : ''}
          {
            current == 2 ? <div className="box-bottom">
              <Icon className="successIcon" type="check-circle" theme="filled" />
              <div className="successTxt">统筹成功</div>
              <div className="detailed">可在「大家帮-活动池」查看该项公益活动的开展情况</div>
              <div className="flex-center">
                <img className="overallImg" src={image}></img>
                <div className="flex-align">
                  <div className="title1">{titleName || "-"}</div>
                  <div style={{ display: 'flex' }}>
                    <div className="type-width">活动类型:{type || '-'}</div>
                    <div className="break-word">活动地点:{serviceAddress || '-'}</div>
                  </div>
                  <div style={{ display: 'flex' }} >
                    <div className="type-width">活动时间:{time || '-'}</div>
                    <div>执行队伍: {infoTeam || '-'}</div>
                  </div>
                </div>

              </div>
            </div> : ""
          }
          <div className="flex-center">
            {current == 0 ? <Button onClick={nextStep}>下一步</Button> : ''}
            {current == 1 ? <div>
              <Button className="btn-marin" onClick={submitPool}>提交</Button>
              <Button onClick={backStep}>上一步</Button>
            </div> : ''}
            {current == 2 ? <div>
              <Button className="btn-marin" onClick={continuePool}>继续统筹</Button>
              <Button onClick={backPool}>返回</Button>
            </div> : ''}
          </div>

        </Card></div>
    </div >
  )
}

function mapStateToProps(state) {
  return {
    ...state.overallPlanningModel,
    loading: state.loading.models.overallPlanningModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
