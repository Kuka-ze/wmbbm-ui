import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Breadcrumb, Form, Button, Input, Col, Row, Card, Select, DatePicker, message, Modal, Radio, TimePicker, Checkbox } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;
import moment from 'moment';
import { checkTel } from '../../utils/util';
import ImageModal from '../../components/Image/';
//import Ueditor from '../../components/Ueditor/';
import WangEditor from '../../components/wangEditor';
import Map from '../../components/Map/index.js';
import queryString from 'query-string';
import '../../index.css';
function AddActivity(props) {
  let { dispatch, form, social_list, levelName_list, loading, show, sign_address, formula_time, cityName, activity_remark, sign_range, image, previewVisible, previewImage, centerDataDrop, detail, style } = props;
  const disabledCheck = queryString.parse(props.history.location.search).disabled
  const disabledId = queryString.parse(props.history.location.search).id
  const formItemLayout = {
    labelCol: {
      span: 3
    },
    wrapperCol: {
      span: 8
    }
  }
  const formItemLayout1 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };

  const { getFieldDecorator } = form;
  let property_company_name = sessionStorage.getItem('property_company_name')
  let isHangZhou = property_company_name.indexOf("杭州") != -1

  function formatDate(now) {
    let year = now.getFullYear();
    let month = (now.getMonth() + 1) >= 10 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
    let date = now.getDate() >= 10 ? now.getDate() : '0' + now.getDate();
    let hour = now.getHours() >= 10 ? now.getHours() : '0' + now.getHours();
    let minute = now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes();
    // let second=now.getSeconds(); 
    // console.log(hour, now.getHours())
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  }

  function handSubmit(e) {

    form.validateFields((err, values) => {
      console.log(values, 'vvv')
      // let index = levelName_list.map((item,index)=>{
      //   console.log(item.level_name, '--',values.level_name)
      //   if(item.level_name==values.level_name){
      //     return index
      //   }
      // })
      // console.log(index,'index')
      if (err) {
        return;
      }
      if (!activity_remark) {
        message.error('请输入活动说明');
        return;
      }
      if (props.sign_model != 3 && !sign_address.length) {
        message.error('请添加签到地址');
        return;
      }
      // if (values.activityBeginDate.valueOf() < new Date().valueOf()) {
      //   message.error('活动开始时间不能早于当前时间');
      //   return;
      // }
      // if (values.time && values.time[1]) {
      //   if (values.time[0].format('YYYY-MM-DD HH:mm') == values.time[1].format('YYYY-MM-DD HH:mm')) {
      //     message.error('活动开始时间不能大于或等于活动结束时间');
      //     return;
      //   }
      //   // if((values.time[0].valueOf()+43200000) <values.time[1].valueOf()){
      //   //   message.error('单次活动时间不能超过12小时');
      //   //   return;
      //   // }
      // } else {
      //   message.error('请选择活动结束时间');
      //   return;
      // }
      if (values.apply_deadline) {
        if (values.apply_deadline.valueOf() < new Date().valueOf()) {
          message.error('报名截止时间不能早于当前时间');
          return;
        }
      } else {
        message.error('请选择报名截止时间');
        return;
      }

      let task_image = [];


      let imgsLen = image && image.length;
      if (image !== undefined && imgsLen !== 0) {
        for (let i = 0; i < imgsLen; i++) {
          if (image[i].response) {
            task_image[i] = image[i].response.data.filepath
          } else {
            task_image[i] = image[i].url
          }
        }
      }

      let { level_name } = values;
      let id1, type1;
      if (levelName_list[level_name]) {
        id1 = levelName_list[level_name].level_id;
        type1 = levelName_list[level_name].level_type
      } else {
        if (disabledId) {
          id1 = detail.levelSelect.levelId;
          type1 = detail.levelSelect.levelType
        } else {
          id1 = levelName_list[0].level_id;
          type1 = levelName_list[0].level_type
        }
      }
      /** 跨度不超过31天 */
      let begindate = values.times && values.times[0] ? values.times[0].format('YYYY-MM-DD') : '';
      begindate = new Date(Date.parse(begindate.replace(/-/g, "/"))); //将开始时间由字符串格式转换为日期格式
      let enddate = values.times && values.times[1] ? values.times[1].format('YYYY-MM-DD') : '';
      enddate = new Date(Date.parse(enddate.replace(/-/g, "/"))); //将开始时间由字符串格式转换为日期格式
      let startDate = begindate.getTime(); //将开始日期转换成毫秒 
      let endDate = enddate.getTime(); //将结束日期转换成毫秒 
      let day = parseInt((endDate - startDate) / 1000 / 3600 / 24); //结束日期减去开始日期后转换成天数
      if (day >= 31) {
        message.error('活动日期跨度不能超过31天');
        return;
      }
      /** */
      function dateCompare(startdate, enddate) {
        var rowTimeBegin = (parseInt(((startdate).split(":"))[0])) * 60 * 60 + (parseInt(((startdate).split(":"))[1])) * 60;
        var rowTimeEnd = (parseInt(((enddate).split(":"))[0])) * 60 * 60 + (parseInt(((enddate).split(":"))[1])) * 60;
        if (rowTimeBegin >= rowTimeEnd) {
          return false;
        } else {
          return true;
        }
      }
      if (!dateCompare(values.activityBeginPoint.format('HH:mm'), values.activityEndPoint.format('HH:mm'))) {
        message.error('活动结束时间需大于活动开始时间');
        return;
      }
      let data = {
        style: style,
        levelId: id1,
        levelType: type1,
        activityName: values.activity_name,
        activityTypeId: values.activityTypeId,
        activityImg: task_image.length && task_image[0],
        activityRemark: activity_remark,
        openModel: values.open_model,
        volunteerNumber: values.volunteerNumber,
        detailAddress: values.detail_address,
        applyDeadline: values.apply_deadline ? values.apply_deadline.format('YYYY-MM-DD HH:mm') : '',
        contractPerson: values.contract_person,
        contractPhone: values.contract_phone,
        signModel: values.sign_model,
        signAddress: sign_address,
        signRange: values.sign_range,
        id: disabledId && disabledId,
        activityBeginPoint: values.activityBeginPoint ? values.activityBeginPoint.format('HH:mm') : '',
        activityEndPoint: values.activityEndPoint ? values.activityEndPoint.format('HH:mm') : '',
        isSynch: values.isSynch
      }
      if (style == 1) {
        data.activityBeginDate = values.activityBeginDate ? values.activityBeginDate.format('YYYY-MM-DD') : '';
        data.activityEndDate = values.activityBeginDate ? values.activityBeginDate.format('YYYY-MM-DD') : '';
      } else if (style == 2) {
        data.activityBeginDate = values.times && values.times[0] ? values.times[0].format('YYYY-MM-DD') : '';
        data.activityEndDate = values.times && values.times[1] ? values.times[1].format('YYYY-MM-DD') : '';
      } else if (style == 3) {
        data.activityBeginDate = values.times && values.times[0] ? values.times[0].format('YYYY-MM-DD') : '';
        data.activityEndDate = values.times && values.times[1] ? values.times[1].format('YYYY-MM-DD') : '';
        data.weekDay = values.weekDay;
      }
      if (disabledId) {
        if (style == 1) {
          dispatch({
            type: 'AddActivityModel/activityEdit',
            payload: data
          })
        } else if (style == 2 || style == 3) {
          //系列活动编辑
        }
      } else {
        if (style == 1) {
          dispatch({
            type: 'AddActivityModel/activityAdd',
            payload: data
          })
        } else if (style == 2 || style == 3) {
          dispatch({
            type: 'AddActivityModel/activityAddMany',
            payload: data
          })
        }
      }
    })
  }

  function handBack() {
    history.go(-1);
  }


  function handleCancel() {
    dispatch({
      type: 'AddActivityModel/concat',
      payload: {
        previewVisible: false
      }
    })
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
  }

  function remove(k) {
    let newAddress = sign_address && sign_address.length && sign_address.filter((item, i) => {
      return k != i
    })
    dispatch({
      type: 'AddActivityModel/concat',
      payload: {
        sign_address: newAddress
      }
    })

  }

  // 图片改变时
  function handleImage(id, e) {
    if (id == 'image') {
      if (e.length > 0) {
        form.setFieldsValue({ 'image': e[0].response ? e[0].response.data.filepath : '' });
        dispatch({
          type: 'AddActivityModel/concat',
          payload: {
            image: e,
            change_image: true,
          }
        });
      } else {
        form.setFieldsValue({ 'image': '' });
        form.validateFields(['image'], (err, values) => {
          if (err) {
            return;
          }
        })
        dispatch({
          type: 'AddActivityModel/concat',
          payload: {
            image: [],
            change_image: true,
          }
        });
      }
    }
  }

  function onDeadLineChange(models) {
    // console.log(arguments)
    let str = models && models.format('YYYY-MM-DD HH:mm')
    // console.log(str, 'str')
    dispatch({
      type: 'AddActivityModel/concat',
      payload: {
        apply_deadline: str || '',
      }
    });
    let time = ''
    if (str && formula_time) {
      time = formatDate(new Date(new Date(str).getTime() + parseInt(formula_time) * 60 * 60 * 1000));
      dispatch({
        type: 'AddActivityModel/concat',
        payload: {
          disabled_date: time || '',
        }
      });
      form.setFieldsValue({ 'time': [moment(time, "YYYY-MM-DD HH:mm"), ''] });
    }
  }

  // function onOpenChange(status){
  //   if(!status){
  //     console.log(form.getFieldValue('apply_deadline'))
  //     dispatch({
  //       type: 'AddActivityModel/concat',
  //       payload: {
  //         apply_deadline: form.getFieldValue('apply_deadline') || '',
  //       }
  //     });
  //   }
  // }

  /** 地图 */
  //地图显示
  function handleClick(e) {
    dispatch({
      type: 'AddActivityModel/concat',
      payload: {
        show: Math.random(),
      }
    });
  }

  function handleMap(e, name) {

    let obj = {};
    obj.lon = e && e.split(',')[0];
    obj.lat = e && e.split(',')[1];
    obj.address = name;
    sign_address && sign_address.push(obj);
    dispatch({
      type: 'AddActivityModel/concat',
      payload: {
        sign_address,
        changeMap: Math.random(),
        // uuid: uuid,
      }
    });
  }

  // 获取富文本编辑器输入的内容
  // function getContent(val) {
  //   dispatch({
  //     type: 'AddActivityModel/concat',
  //     payload: {
  //       activity_remark: val
  //     }
  //   })
  // }
  // const ueadd = (
  //   <div>
  //     <Ueditor id="editor" height="500px" getValues={getContent.bind(this)} />
  //   </div>
  // );
  const getValues = {
    getValues: (value) => {
      //console.log(value,"concat")
      dispatch({
        type: "AddActivityModel/concat",
        payload: {
          activity_remark: value
        }
      })
    },
    content: "",
    imgSize: 3 //默认限制图片大小是 3M
  }

  function onChangeRadio(e) {
    dispatch({
      type: "AddActivityModel/concat",
      payload: {
        sign_model: e.target.value
      }
    })
  }
  //是否同步到志愿汇平台
  function onChangeSynchronization(e) {
    dispatch({
      type: "AddActivityModel/concat",
      payload: {
        isSynch: e.target.value
      }
    })
  }

  let levelName = '';
  if (detail.centerName) {
    levelName = detail.centerName;
  }
  if (detail.placeName) {
    levelName += '>' + detail.placeName;
  }
  if (detail.stationName) {
    levelName += '>' + detail.stationName;
  }
  if (detail.siteName) {
    levelName += '>' + detail.siteName;
  }
  /** 活动屏次选择 */
  function handleChange(value) {
    dispatch({
      type: "AddActivityModel/concat",
      payload: {
        style: value
      }
    })
  }
  /** 无法选择今天之前的几天 */
  function disabledDate(current) {
    return current && current < (moment().endOf('day') - (24 * 60 * 60 * 1000));
  }

  return (
    <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>活动管理</Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/approvalList">活动管理</Link></Breadcrumb.Item>
        {
          disabledId ?
            disabledCheck == 'true' ?
              <Breadcrumb.Item>详情</Breadcrumb.Item>
              :
              <Breadcrumb.Item>编辑</Breadcrumb.Item>

            :
            <Breadcrumb.Item>新增活动</Breadcrumb.Item>

        }
      </Breadcrumb>
      <Card className="section">
        <Form>
          <Row>
            {
              disabledCheck == 'true' ?
                <FormItem label="所属中心/所/联盟/站/点" {...formItemLayout}>
                  <span>{levelName}</span>
                </FormItem>
                :
                <FormItem label="所属中心/所/联盟/站/点" {...formItemLayout}>
                  {getFieldDecorator('level_name', {
                    // initialValue: centerDataDrop.level_name,
                    initialValue: disabledId ? detail && detail.levelSelect && detail.levelSelect.levelName : levelName_list && levelName_list[0] && levelName_list[0].level_name,
                    rules: [
                      { required: true, message: '请选择所属中心/所/站/点' }
                    ]
                  })(
                    <Select placeholder="请选择" showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {
                        levelName_list && levelName_list.length > 0 && levelName_list.map((item, index) => {
                          return <Option key={item.level_id} value={index}>{item.level_name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
            }
            {
              disabledCheck == 'true' ?
                <FormItem label="活动名称" {...formItemLayout}>
                  <span>{detail.activityName}</span>

                </FormItem>
                :
                <FormItem label="活动名称" {...formItemLayout}>
                  {getFieldDecorator('activity_name', {
                    initialValue: detail && detail.activityName,
                    rules: [
                      { required: true, message: '请输入活动名称' },
                    ]
                  })(<Input placeholder="请输入活动名称" maxLength={30} />)}
                </FormItem>
            }
            {
              disabledCheck == 'true' ?
                <FormItem label="活动类型" {...formItemLayout}>
                  <span>{detail.typeName}</span>
                </FormItem>
                :
                <FormItem label="活动类型" {...formItemLayout}>
                  {getFieldDecorator('activityTypeId', {
                    // initialValue: detail && { key: detail.activityTypeId, label: detail.typeName },
                    initialValue: detail.activityTypeId ? detail.activityTypeId : undefined,
                    rules: [
                      { required: true, message: '请选择活动类型' }
                    ]
                  })(
                    <Select placeholder="请选择活动类型"
                      showSearch
                      optionFilterProp="children"
                      // labelInValue
                      // onSelect={handleSelect.bind(this)}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {
                        social_list && social_list.length && social_list.map((item, index) => {
                          return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
            }

            <FormItem label="活动封面" {...formItemLayout} >
              {getFieldDecorator('image', {
                initialValue: detail && detail.activityImg,
                rules: [{
                  required: disabledCheck == 'true' ? false : true,
                  message: '请上传活动封面!',
                }],
              })(
                <ImageModal id="image"
                  file={detail && detail.activityImg ? detail.activityImg : []}
                  handleImage={handleImage.bind(this)} size={1} disabled={disabledCheck == 'true' ? true : false} />
              )}
              {
                disabledCheck ?
                  null :
                  <div>建议封面尺寸760x350px</div>
              }
            </FormItem>
            {
              disabledCheck == 'true' ?
                <FormItem {...formItemLayout} label="活动说明" >
                  {/* <span>{detail.activityRemark}</span> */}
                  <div dangerouslySetInnerHTML={{ __html: detail && detail.activityRemark }} className="activity-editor" />
                </FormItem>
                :
                <FormItem {...formItemLayout1} label="活动说明" required>
                  {getFieldDecorator('activity_remark', {
                    initialValue: detail.activityRemark,

                    // rules: [{
                    //   required: true,
                    //   message: '请输入活动说明!',
                    // }],
                  })(
                    <div>
                      <div style={{ color: '#333' }}>如需粘贴文案到此处，请务必选择<span style={{ color: 'red' }}>右键粘贴为纯文本</span>，图片请使用下方按钮进行上传。</div>
                      <WangEditor {...getValues} content={detail.activityRemark || ''} />
                    </div>
                  )}
                </FormItem>
            }
            {
              disabledCheck == 'true' ?
                <Form.Item label="报名对象" {...formItemLayout}>
                  {/* <span>{detail.openModel === 1 ? '全部 ' : '本级及本级以下队伍'}</span> */}
                  <span>{detail && detail.openModelMsg}</span>
                </Form.Item>
                :
                <Form.Item label="报名对象" {...formItemLayout}>
                  {getFieldDecorator(`open_model`, {
                    initialValue: detail.openModel,
                    rules: [{ required: true, message: '请选择报名对象!' }]

                  })(
                    <Radio.Group>
                      <Radio value="1">全部</Radio>
                      <Radio value="2">本级及以下队伍</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
            }
            {
              disabledCheck == 'true' ?
                <FormItem label="限报人数" {...formItemLayout}>
                  <span>{detail.volunteerNumber}</span>

                </FormItem>
                :
                <FormItem label="限报人数" {...formItemLayout}>
                  {getFieldDecorator('volunteerNumber', {
                    initialValue: detail.volunteerNumber,
                    rules: [{ required: true, message: style == 1 ? '请输入' : '请输入每天活动限报人数' }, { pattern: /^[1-9][0-9]{0,4}$/, message: '请输入1~99999的正整数' }]
                  })(<Input placeholder={style == 1 ? '请输入' : '请输入每天活动限报人数'} addonAfter="人" />)}
                </FormItem>
            }
            {
              disabledCheck == 'true' ?
                <FormItem label="活动地点" {...formItemLayout}>
                  <span>{detail.detailAddress || '-'}</span>

                </FormItem>
                :
                <FormItem label="活动地点" {...formItemLayout}>
                  {getFieldDecorator('detail_address', {
                    initialValue: detail.detailAddress,
                    rules: [{ required: true, message: '请输入活动地点' }]
                  })(<Input placeholder="请输入活动地点" maxLength={100} />)}
                </FormItem>
            }
            {
              disabledCheck == 'true' ?
                <FormItem label="活动频次" {...formItemLayout}>
                  <span>{detail.style ? detail.style == 1 ? '单次活动' : detail.style == 2 ? '多天活动' : '每周定时' : '-'}</span>
                </FormItem>
                :
                <FormItem label="活动频次" {...formItemLayout}>
                  {getFieldDecorator('style', {
                    initialValue: style ? +style : 1,
                    rules: [{ required: true, message: '请选择活动频次' }]
                  })(
                    <Select placeholder="请选择" onChange={handleChange} disabled={props.id ? true : false}>
                      <Option value={1}>单次活动</Option>
                      <Option value={2}>多天活动</Option>
                      <Option value={3}>每周定时</Option>
                    </Select>)}
                </FormItem>
            }
            {style == 1 ?
              disabledCheck == 'true' ?
                <FormItem label="活动日期" {...formItemLayout}>
                  <span>{detail.activityBeginDate || '-'}</span>
                </FormItem>
                :
                <FormItem label="活动日期" {...formItemLayout}>
                  {getFieldDecorator('activityBeginDate', {
                    initialValue: detail.activityBeginDate ? moment(detail.activityBeginDate) : undefined,
                    rules: [{ required: true, message: '请选择活动日期' }]
                  })(<DatePicker placeholder="请选择活动日期" />)}
                </FormItem>
              : disabledCheck == 'true' ?
                <FormItem label="活动日期" {...formItemLayout}>
                  <span>{`${detail.activityBeginDate}   ~  ${detail.activityEndDate}`}</span>
                </FormItem>
                :
                <FormItem label="活动日期" {...formItemLayout}>
                  {getFieldDecorator('times', {
                    initialValue: disabledId ? [moment(detail.activityBeginDate), moment(detail.activityEndDate)] : null,
                    rules: [{ required: true, message: '请选择活动日期' }]
                  })(<RangePicker disabledDate={disabledDate} placeholder="请选择活动日期" />)}
                </FormItem>}
            {style == 3 ? disabledCheck == 'true' ?
              <FormItem label="每周定时" {...formItemLayout}>
                <span>{detail.weekDayMsg && detail.weekDayMsg.length > 0 ? detail.weekDayMsg.join("，") : '-'}</span>
              </FormItem>
              :
              <FormItem label="每周定时" {...formItemLayout}>
                {getFieldDecorator('weekDay', {
                  initialValue: detail.weekDay,
                  rules: [{ required: true, message: '请选择每周定时' }]
                })(<Checkbox.Group
                  options={[
                    { label: '周一', value: '1' },
                    { label: '周二', value: '2' },
                    { label: '周三', value: '3' },
                    { label: '周四', value: '4' },
                    { label: '周五', value: '5' },
                    { label: '周六', value: '6' },
                    { label: '周日', value: '0' },
                  ]}
                />)}
              </FormItem> : ''}
            {
              disabledCheck == 'true' ?
                <FormItem label="活动时间" {...formItemLayout}>
                  <span>{detail.activityBeginPoint && detail.activityBeginPoint ? `${detail.activityBeginPoint}   ~  ${detail.activityEndPoint}` : '-'}</span>
                </FormItem>
                :
                <Form.Item label="活动时间" {...formItemLayout}
                  extra="单次活动每位志愿者获得的文明时长不得超过12小时，活动开始前1小时至活动结束前均可签到，活动开始后及活动结束后1小时均可签退。"
                  required={true}>
                  <Form.Item
                    style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                  >
                    {getFieldDecorator('activityBeginPoint', {
                      initialValue: detail.activityBeginPoint ? moment(detail.activityBeginPoint, 'HH:mm') : undefined,
                      rules: [{ required: true, message: '请选择活动开始时间' }],
                    })(<TimePicker format={'HH:mm'} placeholder="请选择活动开始时间" style={{ width: '100%' }} />)}
                  </Form.Item>
                  <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    {getFieldDecorator('activityEndPoint', {
                      initialValue: detail.activityEndPoint ? moment(detail.activityEndPoint, 'HH:mm') : undefined,
                      rules: [{ required: true, message: '请选择活动结束时间' }],
                    })(<TimePicker format={'HH:mm'} placeholder="请选择活动结束时间" style={{ width: '100%' }} />)}
                  </Form.Item>
                </Form.Item>
            }
            {/* {
              disabledCheck == 'true' ?
                <FormItem label="活动时间" {...formItemLayout}>
                  <span>{`${detail.activityBeginTime}   ~  ${detail.activityEndTime}`}</span>
                </FormItem>
                :
                <FormItem label="活动时间" {...formItemLayout} extra="单次活动每位志愿者获得的文明时长不得超过12小时">
                  {getFieldDecorator('time', {
                    rules: [{ type: 'array', required: true, message: '请选择活动时间' }],
                    // initialValue:[detail.activityBeginTime,detail.activityEndTime],
                    initialValue: disabledId ? [moment(detail.activityBeginTime), moment(detail.activityEndTime)] : null
                    // initialValue:time ? [moment(detail.activityBeginTime),''] : [moment(detail.activityEndTime),'']
                  })(
                    <RangePicker
                      showTime={{
                        hideDisabledOptions: true, defaultValue: moment('00:00:00', 'HH:mm:ss')
                      }}
                      format="YYYY-MM-DD HH:mm"
                      // disabledDate={disabledDate.bind(this, '2')} 
                      disabledDate={disabledDate}
                    // disabledTime={disabledRangeTime}
                    />
                  )}
                </FormItem>
            } */}
            {
              disabledCheck == 'true' ?
                <FormItem
                  label="报名截止时间"
                  {...formItemLayout}
                >
                  <span>{detail.applyDeadline}</span>
                </FormItem>
                :
                <FormItem
                  label="报名截止时间"
                  {...formItemLayout}
                >
                  {getFieldDecorator('apply_deadline', {
                    initialValue: disabledId ? moment(detail.applyDeadline) : null,
                    rules: [{ type: 'object', required: true, message: '请选择报名截止时间' }],
                  })(
                    <DatePicker
                      onChange={onDeadLineChange}
                      placeholder="请选择报名截止时间"
                      disabledDate={disabledDate}
                      showTime={{
                        hideDisabledOptions: true,
                        defaultValue: moment('00:00:00', 'HH:mm:ss')
                      }}
                      format="YYYY-MM-DD HH:mm:ss"
                    // showToday={false} 
                    />
                  )}
                </FormItem>
            }
            {
              disabledCheck == 'true' ?
                <FormItem label="活动联系人" {...formItemLayout}>
                  {/* <span>{sessionStorage.getItem('username')}</span> */}
                  <span>{detail && detail.contractPerson}</span>

                </FormItem>
                :
                <FormItem label="活动联系人" {...formItemLayout}>
                  {getFieldDecorator('contract_person', {
                    rules: [{ required: true, message: '请输入活动联系人' }, {
                      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
                      message: '请输入10字以内中英文数字'
                    }],
                    // initialValue: sessionStorage.getItem('username')
                    initialValue: disabledId ? detail && detail.contractPerson : sessionStorage.getItem('username')
                  })(<Input placeholder="请输入" maxLength={10} />)}
                </FormItem>
            }
            {
              disabledCheck == 'true' ?
                <FormItem label="联系电话" {...formItemLayout}>
                  {/* <span>{sessionStorage.getItem('mobile')}</span> */}
                  <span>{detail && detail.contractPhone}</span>


                </FormItem>
                :
                <FormItem label="联系电话" {...formItemLayout}>
                  {getFieldDecorator('contract_phone', {
                    rules: [{ required: true, message: '请输入联系电话' }, { validator: checkTel.bind(this) }],
                    initialValue: disabledId ? detail && detail.contractPhone : sessionStorage.getItem('mobile'),
                    // initialValue: sessionStorage.getItem('mobile'),

                  })(<Input placeholder="请输入" maxLength={15} />)}
                </FormItem>
            }
            {
              disabledCheck == 'true' ?
                <FormItem
                  label="签到模式"
                  {...formItemLayout}
                >
                  <span>{detail.signModelMsg}</span>
                </FormItem>
                :
                <FormItem
                  label="签到模式"
                  {...formItemLayout}
                >
                  {getFieldDecorator('sign_model', {
                    rules: [
                      { required: true, message: '请选择签到模式' }
                    ],
                    initialValue: detail && detail.signModel ? detail.signModel == "1" ? "2" : detail.signModel : '2'
                  })(
                    <Radio.Group onChange={onChangeRadio}>
                      <Radio value="2">签到+签退</Radio>
                      {/* <Radio value="1">仅签到</Radio> */}
                      {/*<Radio value="3">不需签到</Radio>*/}
                    </Radio.Group>
                  )}
                </FormItem>
            }
            {
              disabledCheck == 'true' ?
                <div>
                  {
                    detail && detail.signModel != 3 ?
                      <div>
                        <Form.Item label="签到地址" {...formItemLayout} >
                          {/* <span>{detail && detail.signAddress && detail.signAddress[0].address}</span> */}
                          {
                            detail && detail.signAddress && detail.signAddress.length > 0 && detail.signAddress.map((item, index) => {
                              return <div key={index}><span>{item.address}</span><br></br></div>
                            })
                          }

                        </Form.Item>
                        <FormItem label="签到范围" {...formItemLayout}>
                          <span>{detail.signRangeMsg}</span>
                        </FormItem>
                      </div>
                      : ''
                  }
                </div>
                :
                <div>
                  {
                    props.sign_model != 3 ?
                      <div>
                        <Form.Item label="签到地址" {...formItemLayout} required>
                          {getFieldDecorator('sign_address', {
                          })(
                            <Button type="primary" onClick={handleClick}>添加地址</Button>
                          )}
                          <div>
                            {sign_address && sign_address.length ? sign_address.map((item, index) => {
                              return (
                                <div key={index}>
                                  <span>{item.address}</span>
                                  <span onClick={() => remove(index)} style={{ color: 'rgb(24, 144, 255)', cursor: 'pointer', marginLeft: '16px' }}>删除</span>
                                </div>
                              )
                            }) : ''}
                          </div >
                        </Form.Item>
                        <FormItem label="签到范围" {...formItemLayout}>
                          {getFieldDecorator('sign_range', {
                            rules: [
                              { required: true, message: '请选择签到范围' }
                            ],
                            // initialValue: "2"
                            // initialValue:detail&&detail.signRangeMsg
                            initialValue: disabledId ? detail && detail.signRange : '1'
                          })(
                            <Select placeholder="请选择" showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                              {
                                sign_range && sign_range.length && sign_range.map((item, index) => {
                                  return <Option key={item.key} value={item.key}>{item.value}</Option>
                                })
                              }
                            </Select>
                          )}
                        </FormItem>
                      </div>
                      : ''
                  }
                </div>
            }
            {isHangZhou ?
              disabledCheck == 'true' ?
                <FormItem
                  label="活动同步到志愿汇平台"
                  {...formItemLayout}
                >
                  <span>{detail && detail.isSynch == 1 ? '同步' : '不同步'}</span>
                </FormItem>
                :
                <FormItem
                  label="活动同步到志愿汇平台"
                  {...formItemLayout}
                >
                  {getFieldDecorator('isSynch', {
                    rules: [
                      { required: true, message: '请选择是否同步' }
                    ],
                    initialValue: detail && detail.isSynch ? detail.isSynch == "1" ? "1" : detail.isSynch : '2'
                  })(
                    <Radio.Group onChange={onChangeSynchronization} disabled={disabledId ? true : false}>
                      <Radio value="2">不同步</Radio>
                      <Radio value="1">同步</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
              : ''}
            {isHangZhou ?
              disabledCheck == 'true' ?
                <FormItem
                  label="审核反馈"
                  {...formItemLayout}
                >
                  <span>{detail.auditFeedback || ''}</span>
                </FormItem>
                : ''
              : ''}
            <Col style={{ width: '200px', margin: '0 auto' }}>
              {
                disabledCheck == 'true' ?
                  <Button type="ghost" onClick={handBack}>返回</Button>
                  :
                  <div>
                    <Button type="primary" className="mr1" loading={loading} onClick={handSubmit}>保存</Button>
                    <Button type="ghost" onClick={handBack}>取消</Button>
                  </div>
              }

            </Col>
          </Row>
        </Form>
      </Card>
      <Map type={show} data={'杭州市|一号线'} cityName={cityName} handleMap={handleMap} />
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    ...state.AddActivityModel,
    loading: state.loading.models.AddActivityModel,
  }
}
export default connect(mapStateToProps)(Form.create()(AddActivity));