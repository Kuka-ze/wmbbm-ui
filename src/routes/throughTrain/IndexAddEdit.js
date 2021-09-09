import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Select, Row, Col, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
const { Option } = Select;
import List from './components/List';
import "./IndexAddEdit.less";

function IndexAddEdit(props) {
  let { form, loading, dispatch, detail = {}, corpList = [], appletsLists = [], selectedApplets = [] } = props;
  const { getFieldDecorator, validateFields } = form;
  console.log("props:", props);
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '小程序管理',
    }, {
      name: '公益直通车',
      href: 'throughTrain'
    }, {
      name: '管理',
      href: `throughTrainManagement?id=${props.appletsId}&appletsName=${props.appletsName}`
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
  const formItemLayout1 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  //提交
  function handleSubmit(e) {
    validateFields((err, values) => {
      if (err) {
        return;
      }
      let appletsCooperationArr = [];
      if (selectedApplets && selectedApplets.length > 0) {
        selectedApplets.map((item, index) => {
          appletsCooperationArr.push(item.id);
        });
      }
      let data = {
        ...values,
        appletsId: props.appletsId,
        appletsCooperation: appletsCooperationArr
      };
      delete data.appletsName;
      delete data.remark;
      delete data.remark2;
      // console.log("data:", data);
      // return true;
      if (props.id) {
        dispatch({
          type: 'ThroughTrainAddEditModel/ajaxEdit',
          payload: { ...data, id: props.id }
        });
      } else {
        dispatch({
          type: 'ThroughTrainAddEditModel/ajaxAdd',
          payload: data
        });
      }
    });
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  let listProps = {
    data: selectedApplets,
    onDelApplets(item) {
      let newAppletsLists = [...appletsLists, item];
      var arrNew = [];
      selectedApplets.forEach((value, index, array) => {
        if (item.id !== value.id) {
          arrNew.push(value);
        }
      })
      dispatch({
        type: 'ThroughTrainAddEditModel/concat',
        payload: {
          appletsLists: newAppletsLists,
          selectedApplets: arrNew
        }
      });
    },
    onSortApplets(data) {
      dispatch({
        type: 'ThroughTrainAddEditModel/concat',
        payload: {
          selectedApplets: data
        }
      });
    }
    /*data: [
      {
        newIndex: 1,
        appletsName: "测试测试测试测试测试",
        icon: 'https://tfs.alipayobjects.com/images/partner/T1DzReXeFjXXXXXXXX',
        id: "4"
      },

      {
        newIndex: 2,
        appletsName: "green",
        icon: 'https://tfs.alipayobjects.com/images/partner/T1DzReXeFjXXXXXXXX',
        id: "5"
      },

      {
        newIndex: 3,
        appletsName: "blue",
        icon: 'https://tfs.alipayobjects.com/images/partner/T1DzReXeFjXXXXXXXX',
        id: "6"
      },

      {
        newIndex: 4,
        appletsName: "yellow",
        icon: 'https://tfs.alipayobjects.com/images/partner/T1DzReXeFjXXXXXXXX',
        id: "7"
      },

      {
        newIndex: 5,
        appletsName: "orange",
        icon: 'https://tfs.alipayobjects.com/images/partner/T1DzReXeFjXXXXXXXX',
        id: "8"
      },

      {
        newIndex: 6,
        appletsName: "black",
        icon: 'https://tfs.alipayobjects.com/images/partner/T1DzReXeFjXXXXXXXX',
        id: "9"
      }
    ]*/
  }
  /** 添加已选 */
  function onAddApplets(item) {
    let newSelectedApplets = [...selectedApplets, item];
    var arrNew = [];
    appletsLists.forEach((value, index, array) => {
      if (item.id !== value.id) {
        arrNew.push(value);
      }
    })
    dispatch({
      type: 'ThroughTrainAddEditModel/concat',
      payload: {
        selectedApplets: newSelectedApplets,
        appletsLists: arrNew
      }
    });
  }
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          <Form.Item label="平台" {...formItemLayout}>
            {getFieldDecorator('appletsName')(
              <span>{props.appletsName}</span>
            )}
          </Form.Item>
          <Form.Item label="模板名称" {...formItemLayout}>
            {getFieldDecorator('templateName', {
              initialValue: detail.templateName,
              rules: [{ required: true, message: '请输入模板名称!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入模板名称" disabled={props.id ? true : false} maxLength={20}/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout1} label="已选小程序">
            {getFieldDecorator('remark')(
              <div>
                <div style={{ color: '#000' }}>( 可拖拽小程序图标进行排序 )</div>
                <div><List {...listProps} /></div>
              </div>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout1} label="可选小程序">
            {getFieldDecorator('remark2')(
              <div>
                {appletsLists && appletsLists.length > 0 ?
                  <ul className="drag-box">
                    {appletsLists && appletsLists.length > 0 ? appletsLists.map((item, index) => {
                      return <li className="drag-list" key={index} style={{ float: 'left' }}>
                        <img className="img" src={item.icon} width="80" height="80" />
                        <Icon className="icon" type="plus-circle" theme="filled" style={{ color: '#1696db' }} onClick={onAddApplets.bind(this, item)} />
                        <div className="name">{item.appletsName}</div>
                      </li>
                    }) : ''}
                    <div style={{ clear: 'both' }}></div>
                  </ul>
                  : '-'}
              </div>
            )}
          </Form.Item>

          <Form.Item label="应用租户" {...formItemLayout}>
            {getFieldDecorator('corp', {
              initialValue: detail.corp,
              rules: [{ required: false, message: '请选择应用租户!' }],
            })(
              <Select mode="multiple" placeholder="请选择应用租户" >
                {corpList && corpList.length > 0 ? corpList.map((item, index) => {
                  return <Option value={item.corpId} disabled={item.disable} key={index}>{item.corpName}</Option>
                }) : ''}
              </Select>
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
    ...state.ThroughTrainAddEditModel,
    loading: state.loading.models.ThroughTrainAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));