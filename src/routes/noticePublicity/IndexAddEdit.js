import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Select, Input, message } from 'antd';
const { TextArea } = Input;
import Breadcrumb from "../../components/Breadcrumb/index";
import WangEditor from '../../components/wangEditor';

function NoticePublicityAddEdit(props) {
  let { form, loading, dispatch, detail = {}, id, areaTree = [], typeDrop = [], notice_remark } = props;
  const { getFieldDecorator, validateFields } = form;

  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '通知宣传',
    }, {
      name: '通知宣传',
      href: 'noticePublicity'
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
  const formItemLayout1 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  //提交
  function handleSubmit(e) {
    validateFields((err, values) => {
      let text = notice_remark.split('<p>').join("").split('</p>').join("").split('<br>').join("");
      if (err) {
        return;
      }
      if(!text){
        message.warning('详情内容不能为空');
        return;
      }
      let data = {
        ...values,
        remark: notice_remark,
      };
      if (id) {
        data.id = id;
        dispatch({
          type: 'NoticePublicityAddEditModel/ajaxEdit',
          payload: data
        });
      } else {
        dispatch({
          type: 'NoticePublicityAddEditModel/ajaxAdd',
          payload: data
        });
      }
    });
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  const getValues = {
    getValues: (value) => {
      dispatch({
        type: "NoticePublicityAddEditModel/concat",
        payload: {
          notice_remark: value
        }
      })
    },
    content: "",
    imgSize: 3 //默认限制图片大小是 3M
  }
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          <Form.Item label="选择中心" {...formItemLayout}>
            {getFieldDecorator('centerId', {
              initialValue: detail.centerId ? detail.centerId : undefined,
              rules: [{ required: true, message: '请选择中心!' }],
            })(
              <Select placeholder="请选择中心">
                {areaTree && areaTree.length > 0 ? areaTree.map((value, index) => {
                  return <Select.Option key={value.id + ""} value={value.id + ""}>{value.centerName}</Select.Option>
                }) : ''}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="通知宣传名称" {...formItemLayout}>
            {getFieldDecorator('noticeName', {
              initialValue: detail.noticeName,
              rules: [{ required: true, message: '请输入通知宣传名称!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入通知宣传名称" maxLength={60} />
            )}
          </Form.Item>
          <Form.Item label="类型" {...formItemLayout}>
            {getFieldDecorator('noticeTypeId', {
              initialValue: detail.noticeTypeId ? detail.noticeTypeId : undefined,
              rules: [{ required: true, message: '请选择类型!' }],
            })(
              <Select placeholder="请选择类型">
                {typeDrop && typeDrop.length > 0 ? typeDrop.map((value, index) => {
                  return <Select.Option key={value.id + ""} value={value.id + ""}>{value.name}</Select.Option>
                }) : ''}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="内容简介" {...formItemLayout}>
            {getFieldDecorator('describe', {
              initialValue: detail.describe,
              rules: [{ required: true, message: '请输入内容简介!', whitespace: true }],
            })(
              <TextArea rows={4} placeholder="请输入内容简介" maxLength={100} />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout1} label="详细内容" required>
            {getFieldDecorator('remark', {
              // rules: [{
              //   required: true,
              //   message: '请输入详细内容!',
              // }],
            })(
              <div>
                <div style={{color: '#333'}}>如需粘贴文案到此处，请务必选择<span style={{color: 'red'}}>右键粘贴为纯文本</span>，图片请使用下方按钮进行上传。</div>
                <WangEditor {...getValues} content={notice_remark} />
              </div>
            )}
          </Form.Item>
          <Form.Item label="内容来源" {...formItemLayout}>
            {getFieldDecorator('remarkSource', {
              initialValue: detail.remarkSource,
              rules: [{ required: true, message: '请输入内容来源!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入内容来源" maxLength={50} />
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
    ...state.NoticePublicityAddEditModel,
    loading: state.loading.models.NoticePublicityAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(NoticePublicityAddEdit));