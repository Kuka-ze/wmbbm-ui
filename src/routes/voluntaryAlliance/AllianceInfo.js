import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Breadcrumb, Form, Button, Col, Row, Card, Modal, Divider, Radio, Select, Input } from 'antd';
const FormItem = Form.Item;
import '../../index.css';

function AllianceInfo(props) {
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
      type: 'AllianceInfoModel/concat',
      payload: {
        previewImage: file || file,
        previewVisible: true
      }
    })
  }

  function handleCancel() {
    dispatch({
      type: 'AllianceInfoModel/concat',
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
        <Breadcrumb.Item>志愿队伍管理</Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/voluntaryAlliance">志愿联盟管理</Link></Breadcrumb.Item>
        <Breadcrumb.Item>详情</Breadcrumb.Item>
      </Breadcrumb>
      <Form {...formItemLayout} style={{ backgroundColor: 'white', padding: '20px 0' }}>
        <Form.Item label="联盟名称" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.leagueName || '-'}</span>
        </Form.Item>
        <Form.Item label="所属中心" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.centerName || '-'}</span>
        </Form.Item>
        <Form.Item label="联盟封面图" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">
            {info.leagueImg ? 
              <img
                className="detail-img"
                src={info.leagueImg}
                onClick={handlePreview.bind(this, info.leagueImg)}
                style={{ width: "80px", height: "80px" }}
              />:'-'
            }
          </span>
        </Form.Item>
        <Form.Item label="联盟介绍" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.leagueRemark || '-'}</span>
        </Form.Item>
        <Form.Item label="联盟管理员" style={{ marginBottom: '0px' }}>
          {info.adminArr && info.adminArr.length > 0 ?info.adminArr.map((item, index)=> <span className="ant-form-text" key={item.userId}>{item.userName}</span>):'-'}
        </Form.Item>
        <Form.Item label="地址" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.address || '-'}</span>
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
    ...state.AllianceInfoModel,
    loading: state.loading.models.AllianceInfoModel,
  }
}

export default connect(mapStateToProps)(AllianceInfo);