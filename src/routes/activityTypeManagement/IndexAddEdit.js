import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Cascader } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import { checkPhone } from '../../utils/util';
import queryString from 'query-string';
function IndexAddEdit(props) {
  let { form, loading, dispatch, detail = {}, areaTree, } = props;
  const { getFieldDecorator, validateFields } = form;
  const queryId = queryString.parse(props.history.location.search).id
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '活动管理',
    }, {
      name: '活动类型管理',
      href: 'activityTypeManagement'
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
  //提交
  function handleSubmit(e) {
    validateFields((err, values) => {
      if (err) {
        return;
      }
      let data = {
        ...values,
        id:queryId&&queryId
      };
      if(queryId){
        dispatch({
          type: 'ActivityTypeManagementAddEditModel/ajaxActivityTypeEdit',
          payload: data
        });
      }else{
        dispatch({
          type: 'ActivityTypeManagementAddEditModel/ajaxAdd',
          payload: data
        });
      }
    });
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
          <Form.Item label="类型名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: detail.name,
              rules: [{ required: true, message: '请输入类型名称!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入类型名称" maxLength={10} />
            )}
          </Form.Item>
          {/* <Form.Item label="文明指数" {...formItemLayout}>
            {getFieldDecorator('goodValue', {
              initialValue: detail.goodValue,
              rules: [{ required: true, message: '请输入文明指数!', whitespace: true }, { pattern: /^([1-9]\d?|100)$/, message: '请输入1-100的整数!' }],
            })(
              <Input type="text" placeholder="请输入文明指数" maxLength={100} />
            )}
          </Form.Item> */}
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
    ...state.ActivityTypeManagementAddEditModel,
    loading: state.loading.models.ActivityTypeManagementAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));