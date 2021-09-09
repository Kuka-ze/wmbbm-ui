import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Cascader, Select, Modal } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import Image from '../../components/Image/';
import queryString from 'query-string';
const { confirm } = Modal;
const { TextArea } = Input;

function IndexAddEdit(props) {
  let { form, loading, dispatch, detail = {}, areaTree = [], options = [], teamType = [], teamBelong = [], centerId, teamTags = [] } = props;
  const disabledCheck = queryString.parse(props.history.location.search).disabled
  const disabledId = queryString.parse(props.history.location.search).id
  // console.log('这是判断', queryString.parse(props.history.location.search).disabled)
  // console.log('输出props',props)
  const { getFieldDecorator, validateFields } = form;
  // const initTeamAdmin = options && options.filter((item) => {
  //   return item.key == detail.teamAdminId ? item : null
  // })
  // const initCenterList = areaTree && areaTree.filter((item) => {
  //   return item.key == detail.centerId ? item : null
  // })
  // const initTeamType = teamType && teamType.filter((item) => {
  //   return item.key == detail.positionType ? item : null
  // })
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '志愿队伍管理',
    }, {
      name: '志愿队伍管理',
      href: 'volunteerTeam'
    }, {
      name: props.id ? disabledCheck == 'true' ? '详情' : '编辑' : '新增',
    }
    ]
  }
  /** 布局 */
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 },
  }
  //提交
  function handleSubmit(e) {
    validateFields((err, values) => {
      if (err) {
        return;
      }
      //图片
      let task_image = [];
      let imgsLen = values.task_image && values.task_image.length;
      if (values.task_image !== undefined && imgsLen !== 0) {
        for (let i = 0; i < imgsLen; i++) {
          if (values.task_image[i].response) {
            task_image[i] = values.task_image[i].response.data.filepath
          } else {
            task_image[i] = values.task_image[i].url
          }
        }
      }
      let data = {
        ...values,
        teamImg: task_image && task_image.length > 0 ? task_image.toString() : '',
        positionId: values.positionId,
        positionType: values.positionType == detail.positionTypeName ? detail.positionType : values.positionType,
        centerId: values.centerId == detail.centerName ? detail.centerId : values.centerId,
        id: disabledId && disabledId,
        teamAdminId: values.teamAdminId == detail.userName ? detail.teamAdminId : values.teamAdminId
      };
      delete data.task_image;
      {
        if (disabledId) {
          dispatch({
            type: 'VolunteerTeamAddEditModel/ajaxTeamEdit',
            payload: data
          });
        } else {
          dispatch({
            type: 'VolunteerTeamAddEditModel/ajaxAdd',
            payload: data
          });

        }
      }

    });
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  //图片上传
  function handleImage(id, fileList) {
    form.setFieldsValue({ task_image: fileList })
  }
  function onSelectChange(num, value) {
    // console.log('num',num,'value',value)
    if (num == 1) {
      dispatch({
        type: 'VolunteerTeamAddEditModel/concat',
        payload: {
          centerId: value,
          teamBelong: []
        }
      });
      dispatch({
        type: 'VolunteerTeamAddEditModel/ajaxTeamType',
        payload: {}
      });
      props.form.setFieldsValue({
        positionType: undefined,
      });
    } else if (num == 2) {
      dispatch({
        type: 'VolunteerTeamAddEditModel/ajaxTeamBelong',
        payload: {
          positionType: value,
          centerId
        }
      });
    }
    props.form.setFieldsValue({
      positionId: undefined,
    });
  }
  //队伍归属-模糊搜索
  function handleSelectChange(value, name) {
    let mobiles = `mobile[${name.props.k}]`;
    props.form.setFieldsValue({
      [mobiles]: name.props.mobile,
    });
  }
  //转换
  function lunh(id) {

    let name;
    options && options.length > 0 && options.map((v, i) => {
      if (v.id == id) {
        name = detail.teamAdminId
      } else {
        name = detail.userName
      }
    })
    return name

  }
  //转换
  function lunh2(id) {
    let userName;
    areaTree && areaTree.length > 0 && areaTree.map((v, i) => {
      if (v.key == id) {
        userName = id
      }
    })
    return userName
  }
  /** 筛选 */
  function handleOnSearch(value) {
    let timer;
    if (!timer) {
      timer = setTimeout(function () {
        searchValue(value)
        timer = null
      }, 100)
    }
  }
  function searchValue(value) {
    const datas = []
    const { optionsAll } = props
    // 对optionsAll进行遍历，将符合搜索条件的数据放入datas中
    optionsAll.forEach(item => {
      if (item.userNameAll.indexOf(value) > -1) {
        datas.push(item)
      }
    })
    // 然后只显示符合搜索条件的所有数据中的前100条
    dispatch({
      type: 'VolunteerTeamAddEditModel/concat',
      payload: {
        options: datas.slice(0, 100)
      }
    });
  }
  function handleOnBlur() {
    dispatch({
      type: 'VolunteerTeamAddEditModel/concat',
      payload: {
        options: props.optionsAll.slice(0, 100)
      }
    });
  }
  //转换
  function lunh3(id) {
    let userName;
    teamType && teamType.length > 0 && teamType.map((v, i) => {
      if (v.key == id) {
        userName = id
      }
    })
    return userName
  }
  function grantFun(grantType) {
    if (grantType == "1") {
      dispatch({
        type: 'VolunteerTeamAddEditModel/teamGrant',
        payload: {
          id: props.id,
          grantType
        }
      });
    } else if (grantType == "2") {
      confirm({
        title: '解除授权后当前队长不再拥有授权单位的活动发布、管理权限，确认解除授权？',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          dispatch({
            type: 'VolunteerTeamAddEditModel/teamGrant',
            payload: {
              id: props.id,
              grantType
            }
          });
        },
        onCancel() {
        },
      });
    }
  }
  //转换多选,取key值
  const defalutTeamTagArr = [];
  if (detail && detail.teamTagArr && detail.teamTagArr.length !== 0) {
    detail.teamTagArr.forEach((item => {
      defalutTeamTagArr.push(item.key);
      return item.key;
    }
    ));
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          {
            disabledCheck == 'true' ?
              <Form.Item label="队伍名称" {...formItemLayout}>
                <span>{detail.teamName}</span>
              </Form.Item>
              : <Form.Item label="队伍名称" {...formItemLayout}>
                {getFieldDecorator('teamName', {
                  initialValue: detail.teamName,
                  rules: [{ required: true, message: '请输入队伍名称!', whitespace: true }],
                })(
                  <Input type="text" placeholder="请输入队伍名称" maxLength={20} disabled={disabledCheck == 'true' ? true : false} />
                )}
              </Form.Item>
          }
          {
            disabledCheck == 'true' ?
              <Form.Item label="所属中心" {...formItemLayout}>
                <span>{detail.centerName}</span>
              </Form.Item>
              :
              <Form.Item label="所属中心" {...formItemLayout}>
                {getFieldDecorator('centerId', {
                  // initialValue: detail.centerName,
                  // initialValue: initCenterList && initCenterList.length > 0 ? initCenterList[0].value : null,
                  // initialValue:disabledId ? detail && { key: detail.centerId, lable: detail.centerName } : undefined,
                  initialValue: !lunh2(detail.centerId) && detail.centerName || detail && detail.centerId,
                  // initialValue:detail.centerId ? detail.centerId :undefined,
                  rules: [{ required: true, message: '请选择所属中心!' }],
                })(
                  <Select placeholder="请选择所属中心" onChange={onSelectChange.bind(this, '1')}
                  // labelInValue
                  >
                    {areaTree && areaTree.length > 0 ? areaTree.map((item, index) => <Select.Option value={item.key} key={index}>{item.value + ""}</Select.Option>) : ''}
                  </Select>
                )}
              </Form.Item>

          }
          {
            disabledCheck == 'true' ?
              <Form.Item label="队伍类型" {...formItemLayout}>
                <span>{detail.positionTypeName}</span>
              </Form.Item>
              :
              <Form.Item label="队伍类型" {...formItemLayout}>
                {getFieldDecorator('positionType', {
                  // initialValue: detail.positionType,
                  // initialValue: initTeamType && initTeamType.length > 0 ? initTeamType[0].value : null,
                  // initialValue:disabledId? detail && { key: +detail.positionType, lable: detail.positionTypeName } :undefined,
                  initialValue: !lunh3(detail.positionType) && detail.positionTypeName || detail && detail.positionTypeName,
                  // initialValue:detail.positionType ? +detail.positionType :undefined,

                  rules: [{ required: true, message: '请选择队伍类型!' }],
                })(
                  <Select placeholder="请选择队伍类型" onChange={onSelectChange.bind(this, '2')}
                  >
                    {teamType && teamType.length > 0 ? teamType.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
                  </Select>
                )}
              </Form.Item>
          }
          {
            disabledCheck == 'true' ?
              <Form.Item label="队伍归属" {...formItemLayout}>
                <span>{detail.positionName}</span>
              </Form.Item>
              :
              <Form.Item label="队伍归属" {...formItemLayout}>
                {getFieldDecorator('positionId', {
                  // initialValue: detail.positionId,
                  // initialValue: detail.positionId ? detail && { key: ""+detail.positionId, lable: detail.positionName } : undefined,
                  initialValue: detail.positionId ? detail.positionId : undefined,
                  rules: [{ required: true, message: '请选择队伍归属!' }],
                })(
                  <Select placeholder="请选择队伍归属" onChange={handleSelectChange}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.option_val.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {teamBelong && teamBelong.length > 0 ? teamBelong.map((item, index) => <Select.Option value={item.key} key={index} option_val={item.value}>{item.value}</Select.Option>) : ''}
                  </Select>
                )}
              </Form.Item>

          }
          {
            disabledCheck == 'true' ?
              <Form.Item label="队伍标签" {...formItemLayout}>
                {detail && detail.teamTagArr && detail.teamTagArr.map((item, index) => {
                  // eslint-disable-next-line react/jsx-key
                  return <span>{item.value || ''}{detail.teamTagArr.length - 1 == index ? '' : ','}</span>
                })}
              </Form.Item>
              :
              <Form.Item label="队伍标签" {...formItemLayout}>
                {getFieldDecorator('teamTagArr', {
                  initialValue: detail && detail.teamTagArr ? defalutTeamTagArr : undefined,
                  rules: [{ required: false, message: '请选择队伍标签!' }],
                })(
                  <Select placeholder="请选择队伍标签"
                    mode="multiple"
                    optionFilterProp="children"
                  >
                    {teamTags && teamTags.length > 0 ? teamTags.map((item, index) => <Select.Option value={item.key} key={index} option_val={item.value}>{item.value}</Select.Option>) : ''}
                  </Select>
                )}
              </Form.Item>

          }
          {
            disabledCheck == 'true' ?
              <Form.Item label="队伍封面图" {...formItemLayout}>
                {/* < img src={detail.teamImg} /> */}
                <Image file={detail.task_image ? detail.task_image : []} handleImage={handleImage.bind(this)} size={1} disabled={disabledCheck == 'true' ? true : false} />

              </Form.Item>
              :
              <Form.Item label="队伍封面图" {...formItemLayout}>
                {getFieldDecorator('task_image', {
                  initialValue: detail.task_image,
                  rules: [{ required: false, message: '请上传队伍封面图!' }],
                })(
                  <Image file={detail.task_image ? detail.task_image : []} handleImage={handleImage.bind(this)} size={1} disabled={disabledCheck == 'true' ? true : false} />
                )}
              </Form.Item>
          }
          {
            disabledCheck == 'true' ?
              <Form.Item label="队伍简介" {...formItemLayout}>
                <span>{detail.teamSynopsis}</span>
              </Form.Item>
              :
              <Form.Item label="队伍简介" {...formItemLayout}>
                {getFieldDecorator('teamSynopsis', {
                  initialValue: detail.teamSynopsis,
                  rules: [{ required: true, message: '请输入队伍简介!' }],
                })(
                  <TextArea rows={4} placeholder="请输入队伍简介" maxLength="1000" disabled={disabledCheck == 'true' ? true : false} />
                )}
              </Form.Item>

          }
          {
            disabledCheck == 'true' ?
              <Form.Item label="服务机制" {...formItemLayout}>
                <span>{detail.serviceMechanism}</span>
              </Form.Item>
              :
              <Form.Item label="服务机制" {...formItemLayout}>
                {getFieldDecorator('serviceMechanism', {
                  initialValue: detail.serviceMechanism,
                  rules: [{ required: false, message: '请输入服务机制!' }],
                })(
                  <TextArea rows={4} placeholder="请输入服务机制" maxLength="1000" disabled={disabledCheck == 'true' ? true : false} />
                )}
              </Form.Item>
          }
          {
            disabledCheck == 'true' ?
              <Form.Item label="服务内容" {...formItemLayout}>
                <span>{detail.serviceContext}</span>
              </Form.Item>
              :
              <Form.Item label="服务内容" {...formItemLayout}>
                {getFieldDecorator('serviceContext', {
                  initialValue: detail.serviceContext,
                  rules: [{ required: false, message: '请输入服务内容!' }],
                })(
                  <TextArea rows={4} placeholder="请输入服务内容" maxLength="500" disabled={disabledCheck == 'true' ? true : false} />
                )}
              </Form.Item>
          }
          {
            disabledCheck == 'true' ?
              <Form.Item label="服务时间" {...formItemLayout}>
                <span>{detail.serviceTime}</span>
              </Form.Item>
              :
              <Form.Item label="服务时间" {...formItemLayout}>
                {getFieldDecorator('serviceTime', {
                  initialValue: detail.serviceTime,
                  rules: [{ required: false, message: '请输入服务时间!' }],
                })(
                  <TextArea rows={4} placeholder="请输入服务时间" maxLength="50" disabled={disabledCheck == 'true' ? true : false} />
                )}
              </Form.Item>
          }
          {
            disabledCheck == 'true' ?
              <Form.Item label="队长" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
                <div>{detail.userName}</div>
                {detail.canGrant == 1 ?
                  detail.grantStatus == 1 ? <Button type="danger" onClick={grantFun.bind(this, "2")} style={{ verticalAlign: '-2px' }}>解除授权</Button>
                    : <Button type="primary" size="large" style={{ verticalAlign: '-2px' }} onClick={grantFun.bind(this, "1")}><div>授权队长活动发布权限</div><div style={{ fontSize: '12px' }}>(授权后队长拥有授权单位的活动发布、管理权限)</div></Button>
                  : <div style={{ textAlign: 'center', lineHeight: '20px', display: 'inline-block', border: '1px solid #ddd', borderRadius: '2px', padding: '4px 10px', verticalAlign: '-14px' }}>{detail.grantStatus == 1 ? '已授权' : '未授权'}<br />(授权后队长拥有授权单位的活动发布、管理权限)</div>}
                <div style={{ textAlign: 'center', lineHeight: '20px', display: 'inline-block', borderRadius: '2px', padding: '4px 10px', verticalAlign: '-14px' }}>{detail.grantStatus == 1 ? '' : '可'}授权单位<br />{detail.positionName}</div>
              </Form.Item>
              :
              <Form.Item label="队长" {...formItemLayout}>
                {getFieldDecorator('teamAdminId', {
                  // initialValue:detail&&{key:+detail.teamAdminId,lable:detail.userName},
                  initialValue: lunh(detail.teamAdminId) && detail.userName || detail && detail.teamAdminId,
                  rules: [{ required: true, message: '请选择队长!' }],
                })(
                  <Select placeholder="请选择队长"
                    showSearch
                    filterOption={false}
                    onSearch={handleOnSearch}
                    onBlur={handleOnBlur}
                    // labelInValue={true}
                    // optionFilterProp="children"
                    // filterOption={(input, option) => option.props.option_val.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    disabled={disabledCheck == 'true' ? true : false}
                  >
                    {options && options.length > 0 ? options.map((item, index) => <Select.Option value={item.key} key={index} option_val={item.userNameAll}>{item.value}</Select.Option>) : ''}
                  </Select>
                )}
              </Form.Item>
          }
          {/* <Form.Item label="队长" {...formItemLayout}>
            {getFieldDecorator('teamAdminId', {
              initialValue: initTeamAdmin && initTeamAdmin.length > 0 ? initTeamAdmin[0].value : null,
              rules: [{ required: true, message: '请选择队长!' }],
            })(
              <Select placeholder="请选择队长"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={disabledCheck == 'true' ? true : false}
              >
                {options && options.length > 0 ? options.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
              </Select>
            )}
          </Form.Item> */}
          {
            disabledCheck == 'true' ?
              <Form.Item wrapperCol={{ span: 8, offset: 5 }}>
                <Button className="ml1" onClick={handleBack}>返回</Button>

              </Form.Item>
              :
              <Form.Item wrapperCol={{ span: 8, offset: 3 }}>

                <Button type="primary" onClick={handleSubmit} loading={loading}>提交</Button>
                <Button className="ml1" onClick={handleBack}>取消</Button>
              </Form.Item>
          }

        </Form>
      </Card>
    </div >
  )
}

function mapStateToProps(state) {
  return {
    ...state.VolunteerTeamAddEditModel,
    loading: state.loading.models.VolunteerTeamAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));