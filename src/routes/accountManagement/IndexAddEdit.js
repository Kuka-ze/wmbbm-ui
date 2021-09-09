import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Cascader } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import { checkPhone } from '../../utils/util';

function IndexAddEdit(props) {
  let { form, loading, dispatch, detail = {}, areaTree } = props;
  const { getFieldDecorator, validateFields } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '账号管理',
    }, {
      name: '账号管理',
      href: 'accountManagement'
    }, {
      name: props.id ? '编辑账户' : '新增账户',
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
        provinceCode: values && values.areaTree && values.areaTree[0] ? values.areaTree[0] : '',
        cityCode: values && values.areaTree && values.areaTree[1] ? values.areaTree[1] : '',
        areaCode: values && values.areaTree && values.areaTree[2] ? values.areaTree[2] : '',
      };
      delete data.areaTree;
      dispatch({
        type: 'AccountManagementAddEditModel/ajaxAdd',
        payload: data
      });
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
          <Form.Item label="名称" {...formItemLayout}>
            {getFieldDecorator('corpName', {
              initialValue: detail.corpName,
              rules: [{ required: true, message: '请输入名称!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入名称" maxLength={20} />
            )}
          </Form.Item>
          <Form.Item label="所属区域" {...formItemLayout}>
            {getFieldDecorator('areaTree', {
              initialValue: detail.areaTree,
              rules: [{ required: true, message: '请选择所属区域!' }],
            })(
              <Cascader placeholder="请选择所属区域" options={areaTree} fieldNames={{ label: 'value', value: 'key', children: 'children' }} changeOnSelect/>
            )}
          </Form.Item>
          <Form.Item label="手机号码" {...formItemLayout}>
            {getFieldDecorator('mobile', {
              initialValue: detail.mobile,
              rules: [{ required: true, message: '请输入手机号码!' }, { validator: checkPhone.bind(this) }],
            })(
              <Input type="text" placeholder="请输入手机号码" />
            )}
          </Form.Item>

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
    ...state.AccountManagementAddEditModel,
    loading: state.loading.models.AccountManagementAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));