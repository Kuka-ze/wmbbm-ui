import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, Card, Modal, Divider, Radio, Select, Input } from 'antd';
import Breadcrumb from "../../../components/Breadcrumb/index";
const FormItem = Form.Item;

function DetailInfo(props) {
  let { form, detail = {} } = props;
  const { getFieldDecorator, getFieldValue } = form;
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '活动管理',
    }, {
      name: '志愿汇活动',
      href: 'ZyhActivity'
    }, {
      name: '活动详情'
    }]
  }
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
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          <FormItem label="所属组织" {...formItemLayout}>
            <div>{detail.orgName || '-'}</div>
          </FormItem>
          <FormItem label="发布人" {...formItemLayout}>
            <div>{detail.createName || '-'}</div>
          </FormItem>
          <FormItem label="活动名称" {...formItemLayout}>
            <div>{detail.activityName || '-'}</div>
          </FormItem>
          <FormItem label="活动区域" {...formItemLayout}>
            <div>{detail.areaName || '-'}</div>
          </FormItem>
          <FormItem label="活动类型" {...formItemLayout}>
            <div>{detail.activityTypeName || '-'}</div>
          </FormItem>
          <FormItem label="活动说明" {...formItemLayout}>
            {/* <div>{detail.activityRemark || '-'}</div> */}
            <div dangerouslySetInnerHTML={{ __html: detail && detail.activityRemark }} className="activity-editor" />
          </FormItem>
          <FormItem label="活动详细地址" {...formItemLayout}>
            <div>{detail.detailAddress || '-'}</div>
          </FormItem>
          <FormItem label="联系人" {...formItemLayout}>
            <div>{detail.contractPerson || '-'}</div>
          </FormItem>
          <FormItem label="联系电话" {...formItemLayout}>
            <div>{detail.contractPhone || '-'}</div>
          </FormItem>
          <FormItem label="活动时间" {...formItemLayout}>
            <div>{detail.activityBeginDate || '-'} ~{detail.activityEndDate || '-'}</div>
          </FormItem>
          <FormItem label="签到时间" {...formItemLayout}>
            <div>{detail.activityBeginPoint || '-'} ~{detail.activityEndPoint || '-'}</div>
          </FormItem>
          {
            detail && detail.signAddress && detail.signAddress.map((item, index) => {
              return <div key={index}>
                <FormItem label={"签到地点" + (index + 1)}{...formItemLayout}>
                  <div>{item.address || '-'}</div>
                </FormItem>
                <FormItem label={"签到范围" + (index + 1)} {...formItemLayout}>
                  <div>{item.signRangeName || '-'} {item.signRangeName ? '米' : ''}</div>
                </FormItem>
              </div>
            })
          }
          <FormItem wrapperCol={{ span: 8, offset: 3 }}>
            <Button onClick={handleBack}>返回</Button>
          </FormItem>
        </Form>

      </Card>

    </div >
  )

}

function mapStateToProps(state) {
  return {
    ...state.ZyhActivityInfoModel,
    loading: state.loading.models.ZyhActivityInfoModel,
  }
}

export default connect(mapStateToProps)(Form.create()(DetailInfo));