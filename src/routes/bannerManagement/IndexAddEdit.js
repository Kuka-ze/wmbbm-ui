import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Card, Button, Input, Select, DatePicker } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import Image from '../../components/Image/';

function IndexAddEdit(props) {
  let { form, loading, dispatch, detail = {}, corpList = [], pageType } = props;
  const { getFieldDecorator, validateFields } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '用户推送',
    }, {
      name: pageType == "h5" ? 'H5banner管理' : '小程序banner管理',
      href: pageType == "h5" ? 'bannerManagements' : 'bannerManagement'
    }, {
      name: props.id ? '编辑' : '新增',
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
        image: task_image && task_image.length > 0 ? task_image.toString() : '',
        startTime: values.startTime ? values.startTime.format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: values.endTime ? values.endTime.format('YYYY-MM-DD HH:mm:ss') : '',
        type: pageType == "h5" ? "1" : values.type,
        typeUrl: pageType == "h5" ? "" : values.typeUrl
      };
      delete data.task_image;
      if (props.id) {
        dispatch({
          type: 'BannerManagementAddEditModel/ajaxEdit',
          payload: { ...data, id: props.id }
        });
      } else {
        dispatch({
          type: 'BannerManagementAddEditModel/ajaxAdd',
          payload: data
        });
      }
    });
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  let typeList = [{
    id: '1',
    name: '无'
  }, {
    id: '2',
    name: '小程序内部页面'
  }, {
    id: '3',
    name: '优酷视频'
  }]
  //图片上传
  function handleImage(id, fileList) {
    form.setFieldsValue({ task_image: fileList })
  }
  //
  function handleChange(value) {
    props.form.setFieldsValue({
      typeUrl: undefined,
    });
    // props.form.resetFields(['typeUrl']);
    let typeUrlTit = ''
    if (value == 2) {
      typeUrlTit = '页面地址';
    } else if (value == 3) {
      typeUrlTit = '优酷视频地址';
    }
    dispatch({
      type: 'BannerManagementAddEditModel/concat',
      payload: {
        type: value,
        typeUrlTit,
      }
    });
  }
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          <Form.Item label={pageType == "h5" ? "H5" : "租户"} {...formItemLayout}>
            {getFieldDecorator('backendCorpId', {
              initialValue: detail.corpId,
              rules: [{ required: true, message: pageType == "h5" ? '请选择H5!' : '请选择租户!' }],
            })(
              <Select placeholder={pageType == "h5" ? "请选择H5" : "请选择租户"} disabled={props.id ? true : false}>
                {corpList && corpList.length > 0 ? corpList.map((value, index) => {
                  return <Select.Option key={index} value={value.id}>{value.corpName}</Select.Option>
                }) : ''}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="banner名称" {...formItemLayout}>
            {getFieldDecorator('bannerName', {
              initialValue: detail.bannerName,
              rules: [{ required: true, message: '请输入banner名称!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入banner名称" maxLength={10} />
            )}
          </Form.Item>
          <Form.Item label="权重" {...formItemLayout}>
            {getFieldDecorator('sort', {
              initialValue: detail.sort,
              rules: [{ required: true, message: '请输入权重!', whitespace: true }, { pattern: /^([1-9]\d?)$/, message: '请输入1-99的整数!' }],
            })(
              <Input type="text" placeholder="请输入权重" maxLength={99} />
            )}
          </Form.Item>
          {pageType == "h5" ? '' : 
          <Form.Item label="交互" {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: detail.type,
              rules: [{ required: true, message: '请选择交互!' }],
            })(
              <Select placeholder="请选择交互" onChange={handleChange}>
                {typeList && typeList.length > 0 ? typeList.map((value, index) => {
                  return <Select.Option key={index} value={value.id}>{value.name}</Select.Option>
                }) : ''}
              </Select>
            )}
          </Form.Item>}
          {props.type == 2 || props.type == 3 ?
            <Form.Item label={`${props.typeUrlTit}`} {...formItemLayout}>
              {getFieldDecorator('typeUrl', {
                initialValue: detail.typeUrl,
                rules: [{ required: true, message: `请输入${props.typeUrlTit}!`, whitespace: true }],
              })(
                <Input type="text" placeholder={`请输入${props.typeUrlTit}`} />
              )}
            </Form.Item> : ''}
          <Form.Item label="上传图片" {...formItemLayout} extra="请上传一张686*386的banner图片，支持.png.jpeg.jpg格式，最大1M;">
            {getFieldDecorator('task_image', {
              initialValue: detail.task_image,
              rules: [{ required: true, message: '请上传图片!' }],
            })(
              <Image file={detail.task_image ? detail.task_image : []} handleImage={handleImage.bind(this)} size={1} fileSize={1} imageWidth={686} imageHeight={260}/>
            )}
          </Form.Item>
          <Form.Item label="开始时间" {...formItemLayout}>
            {getFieldDecorator('startTime', {
              initialValue: detail.startTime ? moment(detail.startTime) : null,
              rules: [{ required: true, message: '请选择开始时间!' }],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>
          <Form.Item label="结束时间" {...formItemLayout}>
            {getFieldDecorator('endTime', {
              initialValue: detail.endTime ? moment(detail.endTime) : null,
              rules: [{ required: true, message: '请选择结束时间!' }],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
            <Button type="primary" onClick={handleSubmit} loading={loading}>提交</Button>
            <Button className="ml1" onClick={handleBack}>取消</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.BannerManagementAddEditModel,
    loading: state.loading.models.BannerManagementAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));