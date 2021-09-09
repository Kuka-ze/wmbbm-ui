import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Row, Col, Select, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";

function IndexAddEdit(props) {
  let { form, loading, dispatch, detail = {}, options = [], userList = [], uuid } = props;
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '基础数据',
    }, {
      name: '市级管理',
      href: 'municipalManagement'
    }, {
      name: props.id ? props.pageType == 'edit' ? '编辑' : '详情' : '新增',
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
      //成员id
      const getItems = () => values.keys && values.keys.length > 0 && values.keys.map((k, index) => {
        return Object.prototype.toString.call(values.user[k]) == "[object String]" && userList && userList.length > 0 && userList[k] && userList[k].id && values.user[k] == userList[k].userName ? userList[k].id : values.user[k]
      })
      let data = {
        memberId: getItems(),
        cityCode: detail.cityCode
      };
      delete data.areaTree;
      delete data.keys;
      delete data.user;
      // console.log("data:", data);
      // return true;
      if (props.id) {
        /** 编辑 */
        dispatch({
          type: 'MunicipalManagementAddEditViewModel/ajaxEdit',
          payload: { ...data, id: props.id }
        });
      }

    });
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }

  /** 动态增删表格 */
  const formItemLayout2 = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 18
    },
  }
  const formItemLayoutWithOutLabel = {
    wrapperCol: { span: 18, offset: 5 },
    // style: { maxWidth: '900px' }
  }
  function add(k) {
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    dispatch({
      type: 'MunicipalManagementAddEditViewModel/concat',
      payload: {
        uuid: uuid,
        editStatus: true
      }
    });
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  function remove(k) {
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  /** 筛选 */
  function handleOnSearch(value) {
    let timer;
    if (!timer) {
      timer = setTimeout(function () {
        searchValue(value)
        timer = null
      }, 100)
    }
  }
  function searchValue(value) {
    const datas = []
    const { optionsAll } = props
    // 对optionsAll进行遍历，将符合搜索条件的数据放入datas中
    optionsAll.forEach(item => {
      if (item.userNameAll.indexOf(value) > -1) {
        datas.push(item)
      }
    })
    // 然后只显示符合搜索条件的所有数据中的前100条
    dispatch({
      type: 'MunicipalManagementAddEditViewModel/concat',
      payload: {
        options: datas.slice(0, 100)
      }
    });
  }
  function handleOnBlur() {
    dispatch({
      type: 'MunicipalManagementAddEditViewModel/concat',
      payload: {
        options: props.optionsAll.slice(0, 100)
      }
    });
  }
  //转换
  function lunh(id) {
    let userName;
    options && options.length > 0 && options.map((v, i) => {
      if (v.id == id) {
        userName = userList.id
      }
    })
    return userName
  }
  getFieldDecorator('keys', { initialValue: userList && userList.length > 0 ? userList.map((item, index) => index) : [0] });
  const keys = getFieldValue('keys');
  const formItems = keys.map((k, index) => {
    return (
      <div
        key={index}
      >
        <Row gutter={10} style={{ paddingLeft: '0.4%' }}>
          <Col span={14}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="市级管理员" {...formItemLayout2}>
                  {getFieldDecorator(`user[${k}]`, {
                    initialValue: !lunh(userList && userList.length > 0 && k < userList.length && userList[k].id) && userList && userList.length > 0 && k < userList.length && userList[k].userName != null && userList[k].userName || undefined,
                    rules: [{ required: true, message: "请选择姓名&手机号码!" }]
                  })(
                    props.pageType == 'edit' ? <Select placeholder="请选择姓名&手机号码" onChange={handleSelectChange}
                      showSearch
                      filterOption={false}
                      onSearch={handleOnSearch}
                      onBlur={handleOnBlur}
                    >
                      {options && options.length > 0 ? options.map((item, index) => <Select.Option value={item.id} key={index} k={k} option_val={item.userNameAll}>{item.userName}</Select.Option>) : ''}
                    </Select> : <div>{userList && userList.length > 0 && k < userList.length ? userList[k].userName : ''}</div>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
          {props.pageType == 'edit' ?
            <Col span={6}>
              {keys.length > 1 ? (
                <Button type="dashed" onClick={() => remove(k)} style={{ marginTop: '4px' }} disabled={userList && userList.length > 0 && k < userList.length ? userList[k].is_super == 1 ? true : false : false}><Icon type="minus" /> 删除成员</Button>
              ) : null}
            </Col> : ''}
        </Row>
      </div>
    );
  });

  function handleSelectChange(value, name) {
    let mobiles = `mobile[${name.props.k}]`;
    props.form.setFieldsValue({
      [mobiles]: name.props.mobile,
    });

  }
  /** 动态增删表格 end */

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          <Form.Item label="名称" {...formItemLayout}>
            {getFieldDecorator('city', {
              initialValue: detail.city,
              rules: [{ required: false, message: '请输入名称!', whitespace: true }],
            })(
              <span>{detail.city}</span>
            )}
          </Form.Item>
          <Form.Item label="所属区域" {...formItemLayout}>
            {getFieldDecorator('areaName', {
              initialValue: detail.areaName,
              rules: [{ required: false, message: '请输入所属区域!', whitespace: true }],
            })(
              <span>{detail.areaName}</span>
            )}
          </Form.Item>
          {formItems}
          {props.pageType == 'edit' ?
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={add} style={{ width: '30%' }}><Icon type="plus" /> 增加成员</Button>
            </Form.Item> : ''}
          <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
            {props.pageType == 'edit' ? <Button type="primary" onClick={handleSubmit} loading={loading} className="mr1">提交</Button> : ''}
            <Button onClick={handleBack}>取消</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.MunicipalManagementAddEditViewModel,
    loading: state.loading.models.MunicipalManagementAddEditViewModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));