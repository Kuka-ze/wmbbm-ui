import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Breadcrumb, Form, Button } from 'antd';
import '../../index.css';

function WelfareInfo(props) {
  let {  info } = props;
  const formItemLayout = {
    labelCol: {
      span: 3
    },
    wrapperCol: {
      span: 8
    }
  }

  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  return (
    <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>公益宣传</Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/welfarePublicity">公益宣传</Link></Breadcrumb.Item>
        <Breadcrumb.Item>详情</Breadcrumb.Item>
      </Breadcrumb>
      <Form {...formItemLayout} style={{ backgroundColor: 'white', padding: '20px 0' }}>
        <Form.Item label="选择中心" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.centerName || '-'}</span>
        </Form.Item>
        <Form.Item label="公益宣传名称" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.welfareName || '-'}</span>
        </Form.Item>
        <Form.Item label="封面图片" style={{ marginBottom: '0px' }}>
          {console.log(info,'info')}
          <img src={info.welfareImg} style={{width:'100px',height:'100px',cursor:'pointer'}}/>
        </Form.Item>
        <Form.Item label="内容" style={{ marginBottom: '0px' }}>
          <div dangerouslySetInnerHTML={{ __html: info.remark }}  className="activity-editor" />
        </Form.Item>
        <Form.Item label="内容来源" style={{ marginBottom: '0px' }}> 
          <span className="ant-form-text">{info.remarkSource || '-'}</span>
        </Form.Item>
        {/* <Form.Item label="发布人" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.createName || '-'}</span>
        </Form.Item>
        <Form.Item label="发布时间" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.createTime || '-'}</span>
        </Form.Item> */}
        <Form.Item label="阅读量" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.readNumber || '-'}</span>
        </Form.Item>
        <div style={{ width: '210px', margin: '0 auto' }}>
          <Button type="ghost" onClick={handleBack}>返回</Button>
        </div>
      </Form>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    ...state.WelfareInfoModel,
    loading: state.loading.models.WelfareInfoModel,
  }
}

export default connect(mapStateToProps)(WelfareInfo);