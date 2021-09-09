import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import Image from '../../components/Image/';

function IndexAddEdit(props) {
  let { form, loading, dispatch, detail = {} } = props;
  const { getFieldDecorator, validateFields } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '小程序管理',
    }, {
      name: '合作小程序',
      href: 'cooperativeApplet'
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
        icon: task_image && task_image.length > 0 ? task_image.toString() : '',
      };
      delete data.task_image;
      // console.log("data:", data);
      // return true;
      if (props.id) {
        dispatch({
          type: 'CooperativeAppletAddEditModel/ajaxEdit',
          payload: { ...data, id: props.id }
        });
      } else {
        dispatch({
          type: 'CooperativeAppletAddEditModel/ajaxAdd',
          payload: data
        });
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
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          <Form.Item label="支付宝小程序名称" {...formItemLayout}>
            {getFieldDecorator('appletsName', {
              initialValue: detail.appletsName,
              rules: [{ required: true, message: '请输入支付宝小程序名称!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入支付宝小程序名称"  maxLength={20}/>
            )}
          </Form.Item>
          <Form.Item label="url" {...formItemLayout}>
            {getFieldDecorator('url', {
              initialValue: detail.url,
              rules: [{ required: true, message: '请输入url!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入url"  maxLength={50}/>
            )}
          </Form.Item>
          <Form.Item label="接口域名" {...formItemLayout}>
            {getFieldDecorator('domain', {
              initialValue: detail.domain,
              rules: [{ required: true, message: '请输入接口域名!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入接口域名" maxLength={100} />
            )}
          </Form.Item>
          <Form.Item label="上传图标" {...formItemLayout}>
            {getFieldDecorator('task_image', {
              initialValue: detail.task_image,
              rules: [{ required: true, message: '请上传图标!' }],
            })(
              <Image file={detail.task_image ? detail.task_image : []} handleImage={handleImage.bind(this)} size={1} />
            )}
          </Form.Item>
          <Form.Item label="支付宝小程序appkey" {...formItemLayout}>
            {getFieldDecorator('appkey', {
              initialValue: detail.appkey,
              rules: [{ required: true, message: '请输入支付宝小程序appkey!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入支付宝小程序appkey"  maxLength={50}/>
            )}
          </Form.Item>
          <Form.Item label="小程序标志" {...formItemLayout}>
            {getFieldDecorator('sign', {
              initialValue: detail.sign,
              rules: [{ required: true, message: '请输入小程序标志!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入小程序标志"  maxLength={20}/>
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
    ...state.CooperativeAppletAddEditModel,
    loading: state.loading.models.CooperativeAppletAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));