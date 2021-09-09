import React from 'react';
import { Layout, Icon, Dropdown, Menu, Modal, Form, Input, Button } from 'antd';
import './MainLayout.css';
import { connect } from 'dva';
const FormItem = Form.Item;
const { Header } = Layout;

function MainHeader(props) {
  let { dispatch, visible, form } = props;
  //console.log(props)
  const { getFieldDecorator } = form;
  let property_company_name = "文明大脑";
  // let property_company_name = sessionStorage.getItem('property_company_name');
  function confirm() {
    Modal.confirm({
      title: '确认退出该账号？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'MainLayoutModel/loginOut',
          payload: {

          }
        });
      }
    });
  }

  // 修改密码
  function showModal() {
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        visible: true
      }
    })
  }

  // 隐藏Modal
  function hideModal() {
    dispatch({
      type: 'MainLayoutModel/concat',
      payload: {
        visible: false
      }
    });
    form.resetFields();// 将表单里的数据清空
  }

  // 提交
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let param = form.getFieldsValue(['newPassword', 'oldPassword']);
      dispatch({
        type: 'MainLayoutModel/resetPassword',
        payload: param
      })
    })
  }

  function checkPass2(rule, value, callback) {
    const {
      getFieldValue
    } = form;
    if (value && value !== getFieldValue('newPassword')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }
  function chearRePasswd(){
    const { resetFields } = form;
    resetFields(['rePasswd']);
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={showModal}>修改密码</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={confirm}>退出登录</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="header">
      <div>
        <span className="fontLogo" style={{marginRight:"280px"}}>{property_company_name || "-"}</span>
        <Dropdown overlay={menu}>
          <div className="userInfo">
            欢迎你，{sessionStorage.getItem("username") ? sessionStorage.getItem("username") : '默认用户'}
            <Icon type="down" className="ml1 fz12" />
          </div>
        </Dropdown>
      </div>
      <Modal title="修改密码" visible={visible} onCancel={hideModal} footer={false}>
        <Form horizontal="true"
          className="y-form-md">
          <FormItem hasFeedback>
            {getFieldDecorator('oldPassword', { rules: [{ required: true, message: '请填写原密码' }] })(
              <Input type="password" placeholder="请填写原密码" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('newPassword', { rules: [{ required: true, pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/, whitespace: true, message: '密码格式为6~20位英文字母+数字' }] },               
            )(
              <Input type="password" placeholder="请输入6-20位新密码" onChange={() => chearRePasswd()} />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('rePasswd', {
              rules: [{ required: true, message: '再次输入新密码' },
                { validator: checkPass2.bind(this), }]
            })(
              <Input type="password" placeholder="请再次输入新密码" />)}
          </FormItem>
          <Button type="primary"
            size="large"
            className="w100"
            onClick={handleSubmit.bind(this)}>提交
          </Button>
        </Form>
      </Modal>
    </Header>
  );
}
function mapStateToProps(state) {
  return { ...state.mainHeader };
}
export default connect(mapStateToProps)(Form.create()(MainHeader));
