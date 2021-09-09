import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Breadcrumb, Form, Button, Col, Row, Card, Modal, Divider, Radio, Select, Input, Steps } from 'antd';
import '../../index.css';

const { Step } = Steps;
function VentPoolInfo(props) {
  let { dispatch, previewVisible, previewImage, info = {}, form, nextDrop, opinionCode, id, receiveVisible, rejectVisible, resolveVisible, showTip } = props;
  let { stepList = {} } = info;
  let { step, list= [] } = stepList;
  const { getFieldDecorator } = form;
  const { TextArea } = Input;
  function handlePreview(file) {
    dispatch({
      type: 'VentPoolInfoModel/concat',
      payload: {
        previewImage: file || file,
        previewVisible: true
      }
    })
  }

  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  //退回
  function showRefuseModal() {
    const { opinionCode, id } = info;
    dispatch({
      type: 'VentPoolInfoModel/concat',
      payload: { rejectVisible: true, opinionCode, id }
    })
  }
  //接收
  function showReceiveModal() {
    const { centerId, opinionCode, id } = info;
    dispatch({
      type: 'VentPoolInfoModel/nextDrop',
      payload: { centerId }
    });
    dispatch({
      type: 'VentPoolInfoModel/concat',
      payload: {
        opinionCode, id, centerId
      }
    });
  }
  //解决
  function showSolveModal() {
    const { opinionCode, id } = info;
    dispatch({
      type: 'VentPoolInfoModel/concat',
      payload: { resolveVisible: true, opinionCode, id }
    })
  }
  /** 接收问题 */
  function handleCancel(e) {
    form.resetFields();
    dispatch({
      type: 'VentPoolInfoModel/concat',
      payload: {
        receiveVisible: false,
        rejectVisible: false,
        resolveVisible: false,
        previewVisible: false,
        showTip:false
      }
    });
  }
  //提交-接收
  function handleSubmit(e) {
    form.validateFields(['key'],(err, values) => {
      if (err) {
        return;
      }
      let { key } = values;
      dispatch({
        type: 'VentPoolInfoModel/onReceive',
        payload: {
          key, id
        }
      });
    });
  }
  //提交-退回
  function handleReject(e){
    form.validateFields(['feedback2'],(err, values) => {
      if (err) {
        return;
      }
      let { feedback2 } = values;
      if(feedback2.length<5||feedback2.length>100){
        dispatch({
          type: 'VentPoolInfoModel/concat',
          payload: {  
            showTip: true
          }
        });
        return;
      }
      dispatch({
        type: 'VentPoolInfoModel/onReject',
        payload: {  
          feedback: feedback2, id
        }
      });
    });
  }
  function changeArea(){
    dispatch({
      type: 'VentPoolInfoModel/concat',
      payload: {  
        showTip: false
      }
    });
  }

  //提交-解决
  function handleResolve(e){
    form.validateFields(['feedback'],(err, values) => {
      if (err) {
        return;
      }
      let { feedback } = values;
      if(feedback.length<5||feedback.length>100){
        dispatch({
          type: 'VentPoolInfoModel/concat',
          payload: {  
            showTip: true
          }
        });
        return;
      }
      dispatch({
        type: 'VentPoolInfoModel/onResolve',
        payload: {  
          feedback, id
        }
      });
    });
  }
  const formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 15
    },
  }

  return (
    <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>大家帮</Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/ventPool">问题池</Link></Breadcrumb.Item>
        <Breadcrumb.Item>问题详情</Breadcrumb.Item>
      </Breadcrumb>
      <div className="title-vent">
        <h3>问题号: {info.opinionCode}
          {info.receiveBtn == 1 && <Button type="primary" onClick={showReceiveModal} className="ml1">接收</Button>}
          {info.refuseBtn == 1 && <Button type="default" onClick={showRefuseModal} className="ml1">退回</Button>}
          {info.solveBtn == 1 && <Button type="primary" onClick={showSolveModal} className="ml1">解决</Button>}</h3>
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box" style={{padding:'0 16px'}}>反馈人:<span>{info.appUserName}</span></div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box" style={{padding:'0 16px'}}>联系人:<span>{info.contacts}</span></div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box" style={{textAlign: 'right',marginRight:'0',padding:'0 16px'}}>状态</div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box" style={{padding:'0 16px'}}>反馈时间:<span>{info.createTime}</span></div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box" style={{padding:'0 16px'}}>联系电话:<span>{info.mobile}</span></div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box state" style={{textAlign: 'right',marginRight:'0',fontSize:'14px', padding:'0 16px'}}>{info.stateName}</div>
          </Col>
        </Row>
        {(info.organization||info.feedback)&&<Row gutter={16}>
        {info.organization&&<Col className="gutter-row" span={8}>
            <div className="gutter-box" style={{padding:'0 16px'}}>接收组织:<span>{info.organization}</span></div>
          </Col>}
          {info.feedback&&<Col className="gutter-row" span={8}>
            <div className="gutter-box" style={{padding:'0 16px'}}>{info.state==4?'退回原因':'解决反馈'}:<span>{info.feedback}</span></div>
          </Col>}
          {info.evaluateContent&&<Col className="gutter-row" span={8}>
            <div className="gutter-box" style={{padding:'0 16px'}}>评价内容:<span>{info.evaluateContent}</span></div>
          </Col>}
        </Row>}
      </div>
      <div className="vent-steps">
        <h3>流程进度</h3>
        <Steps progressDot current={step-1}>
          {list&&list.length>0&&list.map((item,index)=>{
            return <Step key={index} title={item.step} description={<div><p>{item.name}</p><p>{item.time}</p></div>} />
          })}
        </Steps>
      </div>
      <div className="vent-steps vent-con">
        <h3>问题信息</h3>
        <h5>反馈内容</h5>
        <p>{info.content}</p>
        <h5>相关凭证</h5>
        <div style={{paddingLeft: '34px'}}>
        {
          info.image && info.image.length ? info.image.map((item, index) => {
            return <img
              className="detail-img"
              src={item}
              onClick={handlePreview.bind(this, item)}
              style={{ width: "213px", height: "147px", borderRadius: '4px' }}
              key={index}
            />
          }) : '-'
        }
        </div>
      </div>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%', borderRadius: '4px' }} src={previewImage} />
      </Modal>
      {/** 接收问题弹框 start */}
      <Modal
          title="接收问题"
          visible={receiveVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form>
            <Form.Item label="问题号" {...formItemLayout} style={{marginBottom:'0'}}>
              {getFieldDecorator('opinionCode')(
              <p>{!!opinionCode?opinionCode:''}</p>
              )}
            </Form.Item>
            <Form.Item label="接收组织" {...formItemLayout}>
              {getFieldDecorator('key')(
                <Select placeholder="请选择接收组织，该组织将负责解决此问题" showSearch 
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {nextDrop && nextDrop.length > 0 ? nextDrop.map((value, index) => {
                    return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
              <Button type="primary" onClick={handleSubmit}>确定</Button>
              <Button className="ml1" onClick={handleCancel}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
        {/** 接收问题弹框 end */}
        {/** 退回问题弹框 start */}
      <Modal
          title="退回问题"
          visible={rejectVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form className="redExtra">
            <Form.Item label="问题号" {...formItemLayout} style={{marginBottom:'0'}}>
              {getFieldDecorator('opinionCode')(
              <p>{!!opinionCode?opinionCode:''}</p>
              )}
            </Form.Item>
            <Form.Item label="退回原因" {...formItemLayout} extra={showTip?"退回原因的字数不能少于5个且不能多于100个":''}>
              {getFieldDecorator('feedback2', {
                initialValue:'',
                rules: [{ required: true, message: "请输入5-100字的退回原因" }]
                })(
                <TextArea placeholder="请输入退回原因（5-100字）" onChange={changeArea}/>
              )}
            </Form.Item>
            
            <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
              <Button type="primary" onClick={handleReject}>确定</Button>
              <Button className="ml1" onClick={handleCancel}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
        {/** 退回问题弹框 end */}
        {/** 解决问题弹框 start */}
      <Modal
          title="解决问题"
          visible={resolveVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form className="redExtra">
            <Form.Item label="槽号" {...formItemLayout} style={{marginBottom:'0'}}>
              {getFieldDecorator('opinionCode')(
              <p>{!!opinionCode?opinionCode:''}</p>
              )}
            </Form.Item>
            <Form.Item label="反馈内容" {...formItemLayout} extra={showTip?"反馈内容的字数不能少于5个且不能多于100个":''}>
              {getFieldDecorator('feedback', {
                  initialValue:'',
                  rules: [{ required: true, message: "请输入5-100字的反馈内容" }]
                })(
                <TextArea placeholder="请确认该问题已被解决，并输入解决结果" onChange={changeArea}/>
              )}
            </Form.Item>
            
            <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
              <Button type="primary" onClick={handleResolve}>确定</Button>
              <Button className="ml1" onClick={handleCancel}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
        {/** 解决问题弹框 end */}
    </div>
  )

}

function mapStateToProps(state) {
  return {
    ...state.VentPoolInfoModel,
    loading: state.loading.models.VentPoolInfoModel,
  }
}

export default connect(mapStateToProps)(Form.create()(VentPoolInfo));