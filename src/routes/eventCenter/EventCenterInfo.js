import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Breadcrumb, Form, Button, Col, Row, Card, Modal, Divider, Radio, Select, Input } from 'antd';
const FormItem = Form.Item;
import '../../index.css';

function EventCenterInfo(props) {
  let { dispatch, previewVisible, previewImage, info, loading } = props;
  const formItemLayout = {
    labelCol: {
      span: 3
    },
    wrapperCol: {
      span: 8
    }
  }

  function handlePreview(file) {
    dispatch({
      type: 'EventCenterInfoModel/concat',
      payload: {
        previewImage: file || file,
        previewVisible: true
      }
    })
  }

  function handleCancel() {
    dispatch({
      type: 'EventCenterInfoModel/concat',
      payload: {
        previewVisible: false
      }
    })
  }


  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }

  return (
    <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>文明治理</Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/eventCenter">文明速报</Link></Breadcrumb.Item>
        <Breadcrumb.Item>详情</Breadcrumb.Item>
      </Breadcrumb>
      <Form {...formItemLayout} style={{ backgroundColor: 'white', padding: '20px 0' }}>
        <Form.Item label="主题" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.epidemicName || '-'}</span>
        </Form.Item>
        <Form.Item label="描述" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.epidemicRemark || '-'}</span>
        </Form.Item>
        <Form.Item label="照片" >
          <span className="ant-form-text">
            {
              info.imgs && info.imgs.length ? info.imgs.map((item, index) => {
                return <img
                  className="detail-img"
                  src={item}
                  onClick={handlePreview.bind(this, item)}
                  style={{ width: "80px", height: "80px" }}
                  key={index}
                />
              }) : '-'
            }
          </span>
        </Form.Item>
        <Form.Item label="事件地点" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.epidemicAddress || '-'}</span>
        </Form.Item>
        <Form.Item label="上报人" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.createName ? info.mobile ? info.createName + '/' + info.mobile : info.createName : '-'}</span>
        </Form.Item>
        <Form.Item label="上报时间" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.createTime || '-'}</span>
        </Form.Item>
        <Form.Item label="所属中心" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.centerName || '-'}</span>
        </Form.Item>
        <div style={{ width: '210px', margin: '0 auto' }}>
          <Button type="ghost" onClick={handleBack}>返回</Button>
        </div>
      </Form>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    ...state.EventCenterInfoModel,
    loading: state.loading.models.EventCenterInfoModel,
  }
}

export default connect(mapStateToProps)(EventCenterInfo);