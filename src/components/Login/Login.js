import React from "react";
import { connect } from 'dva';
import { Form, Input, Button, Row, Col, Tabs, Select } from "antd";
const { TabPane } = Tabs;
import "./login.less";
const FormItem = Form.Item;
const { Option } = Select;
function Login(props) {
  let { dispatch, form, list, keyTab } = props;
  const { getFieldDecorator } = form;
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'login/login',
        payload: {
          userName: values.username,
          password: values.password,
          systemType: "1"
        }
      })
    });
  }
  const children = [];
  list && list.length>0 && list.map((item, index)=>{
    children.push(<Option key={item.cityCode}>{item.city}</Option>);
  })
  function handleChange(value) {
    dispatch({
      type: 'login/ajaxAppid',
      payload: {
        cityCode: value
      },
      callback: (appid, redirectUri) => {
        let url = encodeURIComponent(`${redirectUri}`);
        let goto = encodeURIComponent(`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`)
        let obj = DDLogin({
          id: "login_container",
          goto: goto,
          style: "border:none;background-color:#FFFFFF;",
          width: "365",
          height: "400"
        });
      }
    });
  }
  let handleMessage = function (event) {
    let origin = event.origin;
    if( origin == "https://login.dingtalk.com" ) { //判断是否来自ddLogin扫码事件。
      let loginTmpCode = event.data; 
      //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
      let newUrl = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=APPID&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=REDIRECT_URI&loginTmpCode=${loginTmpCode}`
      window.location.href = newUrl;
    }
  };
  if (typeof window.addEventListener != 'undefined') {
    window.addEventListener('message', handleMessage, false);
  } else if (typeof window.attachEvent != 'undefined') {
    window.attachEvent('onmessage', handleMessage);
  }
  function callback(key) {
    if (key == 2) {
      dispatch({
        type: 'login/ajaxCityList',
        payload: {
        }
      });
    }
  }
  return (
    <div className="login">
      <Row style={{ height: '100%' }}>
        <Col span={10} style={{ height: '100%' }} className="right-bg"></Col>
        <Col span={14}>
          <div style={{ width: '380px', margin: '0 auto', marginTop: '200px', position: 'relative', zIndex: 2 }}>
            <div className="title">文明大脑登录</div>
            <Tabs defaultActiveKey={keyTab} onChange={callback} className="login-tab">
              <TabPane tab="密码登录" key="1">
                <Form >
                  <FormItem label="账号">
                    {getFieldDecorator("username", {
                      rules: [{ required: true, message: "请输入账号" }]
                    })(<Input placeholder="请输入账号" />)}
                  </FormItem>
                  <FormItem label="密码">
                    {getFieldDecorator("password", {
                      rules: [{ required: true, message: "请输入密码" }]
                    })(
                      <Input
                        type="password"
                        placeholder="请输入密码"
                      />
                    )}
                  </FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="button"
                    onClick={handleSubmit}
                    style={{ backgroundColor: '#FF6600', borderColor: '#FF6600', height: '36px', lineHeight: '36px', marginTop: '25px' }}
                    block
                  >
                    登录
                  </Button>
                </Form>
              </TabPane>
              <TabPane tab="钉钉登录" key="2" forceRender={true}>
                <div style={{display: 'flex'}}>
                  <label className="ant-form-item-required" style={{flex: '0 0 60px', lineHeight: '32px'}}>城市：</label>
                  <Select onChange={handleChange} style={{ flex: '1' }} placeholder="请选择城市">
                    {children}
                  </Select>
                </div>
                <div id="login_container"></div>
              </TabPane>
            </Tabs>
          </div>
          <img style={{ position: 'fixed', right: 0, bottom: 0, width: '260px', zIndex: 1 }} src={require('./bg2.png')} />
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.login };
}
export default connect(mapStateToProps)(Form.create()(Login));
