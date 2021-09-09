import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Select, Input, Radio, Checkbox, Row, Col, Table } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import { noData } from '../../utils/util';

function VolunteerView(props) {
  let { form, loading, dispatch, detail = {}, enterpriseType = [], skillsType = [], params = {}, list = [], paginationTotal = 0 } = props;
  const { getFieldDecorator, validateFields } = form;

  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '志愿者管理',
    }, {
      name: '志愿者列表',
      href: 'volunteer'
    }, {
      name: '志愿者详情',
    }
    ]
  }
  /** 布局 */
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    style: { marginBottom: '0px' }
  }

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '参加活动',
        dataIndex: 'active_name',
        key: 'active_name',
        render: noData,
      }, {
        title: '发起社区',
        dataIndex: 'social_name',
        key: 'social_name',
        render: noData,
      }, {
        title: '公益值变更',
        dataIndex: 'integral_count',
        key: 'integral_count',
        render: noData,
      }
      , {
        title: '荣誉时长变更',
        dataIndex: 'duration_count',
        key: 'duration_count',
        render: noData,
      }
    ],
    pagination: {
      total: paginationTotal ? Number(paginationTotal) : '',
      current: params.page,
      defaultCurrent: 1,
      defaultPageSize: params.rows,
      showTotal: (total, range) => `共有 ${paginationTotal} 条`,
      onChange: (page, pageSize) => {
        dispatch({
          type: 'VolunteerViewModel/volunteerInfo',
          payload: { ...props.params, page }
        })
      },
    },
    rowKey: (record, index) => index,
    loading: loading
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
          <Row type="flex">
            <Col span={6}>
              <Form.Item label="姓名" {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: detail.name,
                  rules: [],
                })(
                  <span>{detail.name}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="性别" {...formItemLayout}>
                {getFieldDecorator(`sex`, {
                  initialValue: detail.sex,
                  rules: []
                })(
                  <span>{detail.sex == 1 ? '男' : '女'}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="手机号码" {...formItemLayout}>
                {getFieldDecorator('mobile', {
                  initialValue: detail.mobile,
                  rules: [],
                })(
                  <span>{detail.mobile}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="所属单位" {...formItemLayout}>
                {getFieldDecorator('enterprise_id', {
                  initialValue: detail.enterprise_id ? detail.enterprise_id : undefined,
                  rules: [],
                })(
                  <span>{detail.enterprise_name ? detail.enterprise_name : '-'}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="认证状态" {...formItemLayout}>
                {getFieldDecorator(`type`, {
                  initialValue: detail.type ? detail.type : "1",
                  rules: []
                })(
                  <span>{detail.type == 1 ? '认证志愿者' : '社会志愿者'}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="技能分类" {...formItemLayout}>
                {getFieldDecorator(`skillNames`, {
                  initialValue: detail.skillNames,
                  rules: []
                })(
                  <span>{detail.skillNames ? detail.skillNames : '-'}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="总公益值" {...formItemLayout}>
                {getFieldDecorator('integral_count', {
                  initialValue: detail.integral_count,
                  rules: [],
                })(
                  <span>{detail.integral_count}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="总荣誉时长" {...formItemLayout}>
                {getFieldDecorator('duration_count', {
                  initialValue: detail.duration_count,
                  rules: [],
                })(
                  <span>{detail.duration_count}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="加入日期" {...formItemLayout}>
                {getFieldDecorator('create_time', {
                  initialValue: detail.create_time,
                  rules: [],
                })(
                  <span>{detail.create_time}</span>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card style={{ marginTop: '10px' }}>
        <Table {...tableProps} />
        <Row type="flex" justify="center">
          <Col><Button onClick={handleBack} className="mt1">返回</Button></Col>
        </Row>
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.VolunteerViewModel,
    loading: state.loading.models.VolunteerViewModel
  };
}
export default connect(mapStateToProps)(Form.create()(VolunteerView));