import React from 'react';
import { connect } from 'dva';
import { Form, Table, Popconfirm, Button, Modal, Input } from 'antd';
import { noData } from '../../../utils/util';

function FormList(props) {
  const { params = {}, dispatch, form, list, paginationTotal, loading, onChangePage, onUpdateStatus, onUpdatePwd, dingdingDetail = {}, showModalAlipay, handleCancelAlipay, handleSubmitAlipay, detailAlipay } = props;
  const { getFieldDecorator } = form;

  /** 绑定钉钉弹框 */
  function showModal(val){
    dispatch({
      type: 'AccountManagementModel/dingdingShow',
      payload: {
        id: val
      }
    });
    dispatch({
      type: 'AccountManagementModel/concat',
      payload: {
        visible: true,
        id: val
      }
    });
  }
  function handleCancel(e) {
    form.resetFields();
    dispatch({
      type: 'AccountManagementModel/concat',
      payload: {
        visible: false
      }
    });
  }
  //提交
  function handleSubmit(e) {
    form.validateFields(['proxyIp', 'agentId', 'appKey', 'appSecret', 'proxyDomain', 'ddCorpId'],(err, values) => {
      if (err) {
        return;
      }
      let data = { 
        ...values,
        id: props.id
      };
      dispatch({
        type: 'AccountManagementModel/saveDingding',
        payload: data,
        callback: () => {
          form.resetFields();
        }
      });
    });
  }
  /** 绑定钉钉弹框 end */
  /** 绑定支付宝弹框 */
  function handleCancelAlipays(e) {
    form.resetFields();
    handleCancelAlipay ? handleCancelAlipay() : '';
  }
  //提交
  function handleSubmitAlipays(e) {
    form.validateFields(['appName', 'appKey', 'appSign'], (err, values) => {
      if (err) {
        return;
      }
      let data = {
        ...values,
      };
      handleSubmitAlipay ? handleSubmitAlipay(data) : ''
    });
    // form.validateFields(['proxyIp', 'agentId', 'appKey', 'appSecret', 'proxyDomain', 'ddCorpId'],(err, values) => {
    //   if (err) {
    //     return;
    //   }
    //   let data = { 
    //     ...values,
    //     id: props.id
    //   };
    //   dispatch({
    //     type: 'AccountManagementModel/saveDingding',
    //     payload: data,
    //     callback: () => {
    //       form.resetFields();
    //     }
    //   });
    // });
  }
  if (props.resetField){
    form.resetFields();
  }
  /** 绑定支付宝弹框 end */
  const formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 15
    },
  }
  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '名称',
        dataIndex: 'corpName',
        key: 'corpName',
        render: noData,
      }, {
        title: '所属区域',
        dataIndex: 'areaName',
        key: 'areaName',
        render: noData,
      }, {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
        render: noData,
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => record.status == 1 ? '已开启' : '未开启',
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return <div>
            <Popconfirm title={`您是否要${record.status == 1 ? '禁用' : '开启'}?`} onConfirm={() => onUpdateStatus(record)}>
              <a>{record.status == 1 ? '禁用' : '开启'}</a>
            </Popconfirm>
            <Popconfirm title={`您是否要重置密码?`} onConfirm={() => onUpdatePwd(record)}>
              <a className="ml1">重置密码</a>
            </Popconfirm>
            <a onClick={showModal.bind(this, record.id)} className="ml1">绑定钉钉</a>
            <a onClick={() => showModalAlipay ? showModalAlipay(record.id) : ''} className="ml1">绑定支付宝小程序</a>
          </div>
        }
      }],
    pagination: {
      total: paginationTotal ? Number(paginationTotal) : '',
      current: params.page,
      defaultCurrent: 1,
      defaultPageSize: params.rows,
      showTotal: (total, range) => `共有 ${paginationTotal} 条`,
      onChange: (page, pageSize) => {
        onChangePage ? onChangePage(page) : '';
      },
    },
    rowKey: (record, index) => index,
    loading: loading
  }
  
  return (
    <div>
      <Table {...tableProps} />
      {/** 绑定钉钉弹框 start */}
      <Modal
        title="绑定钉钉"
        visible={props.visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form>
          <Form.Item label="代理服务器ip" {...formItemLayout} >
            {getFieldDecorator('proxyIp', {
              initialValue: dingdingDetail.proxyIp,
              rules: [{ required: true, message: '请输入代理服务器ip', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入代理服务器ip" maxLength={30} />
            )}
          </Form.Item>
          <Form.Item label="应用id" {...formItemLayout} >
            {getFieldDecorator('agentId', {
              initialValue: dingdingDetail.agentId,
              rules: [{ required: true, message: '请输入应用id', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入应用id" maxLength={30} />
            )}
          </Form.Item>
          <Form.Item label="appkey" {...formItemLayout} >
            {getFieldDecorator('appKey', {
              initialValue: dingdingDetail.appKey,
              rules: [{ required: true, message: '请输入appkey', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入appkey" maxLength={100} />
            )}
          </Form.Item>
          <Form.Item label="appsecert" {...formItemLayout} >
            {getFieldDecorator('appSecret', {
              initialValue: dingdingDetail.appSecret,
              rules: [{ required: true, message: '请输入appsecert', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入appsecert" maxLength={100} />
            )}
          </Form.Item>
          <Form.Item label="服务器域名" {...formItemLayout} >
            {getFieldDecorator('proxyDomain', {
              initialValue: dingdingDetail.proxyDomain,
              rules: [{ required: true, message: '请输入服务器域名', whitespace: true }, { pattern: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/, message: '输入服务器域名格式有误!' }],
            })(
              <Input type="text" placeholder="请输入服务器域名" maxLength={50} />
            )}
          </Form.Item>
          <Form.Item label="CORPID" {...formItemLayout} >
            {getFieldDecorator('ddCorpId', {
              initialValue: dingdingDetail.ddCorpId,
              rules: [{ required: true, message: '请输入CORPID', whitespace: true }, { pattern: /^[\da-zA-Z]+$/, message: '输入CORPID格式有误!' }],
            })(
              <Input type="text" placeholder="请输入CORPID" maxLength={100} />
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
            <Button type="primary" onClick={handleSubmit} loading={loading}>保存</Button>
            <Button className="ml1" onClick={handleCancel}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
      {/** 绑定钉钉弹框 end */}
      {/** 绑定支付宝小程序 start */}
      <Modal
        title="绑定支付宝小程序"
        visible={props.visibleAlipay}
        onCancel={handleCancelAlipays}
        footer={null}
      >
        <Form>
          <Form.Item label="支付宝小程序名称" {...formItemLayout} >
            {getFieldDecorator('appName', {
              initialValue: detailAlipay.appName,
              rules: [{ required: true, message: '请输入支付宝小程序名称', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入支付宝小程序名称" maxLength={100} />
            )}
          </Form.Item>
          <Form.Item label="支付宝小程序appkey" {...formItemLayout} >
            {getFieldDecorator('appKey', {
              initialValue: detailAlipay.appKey,
              rules: [{ required: true, message: '请输入支付宝小程序appkey', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入支付宝小程序appkey" maxLength={100} />
            )}
          </Form.Item>
          <Form.Item label="小程序标志" {...formItemLayout} >
            {getFieldDecorator('appSign', {
              initialValue: detailAlipay.appSign,
              rules: [{ required: true, message: '请输入小程序标志', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入小程序标志" maxLength={50} />
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
            <Button type="primary" onClick={handleSubmitAlipays} loading={loading}>保存</Button>
            <Button className="ml1" onClick={handleCancelAlipays}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
      {/** 绑定支付宝小程序 end */}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.AccountManagementModel,
    loading: state.loading.models.AccountManagementModel,
  };
}
export default connect(mapStateToProps)(Form.create()(FormList));
// export default Form.create()(FormList);
