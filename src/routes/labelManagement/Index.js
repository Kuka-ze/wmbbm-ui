import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Icon, Modal, Input, Select } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
function Index(props) {
  let { dispatch, params = {}, form, typeDrop, detail = {} } = props;
  const { getFieldDecorator } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '标签管理',
    }, {
      name: '标签类别管理',
    }]
  }
  /** 筛选 */
  const formSearchProps = {
    is_reset: props.is_reset,
    onFormReset(){
      dispatch({
        type: 'LabelManagementModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'LabelManagementModel/ajaxList',
        payload: data
      })
    },
    typeDrop,
    onChangeTime(val) {
      dispatch({
        type: 'LabelManagementModel/concat',
        payload: { ...val }
      })
    }
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: props.list,
    paginationTotal: props.paginationTotal,
    params: props.params,
    typeDrop,
    onChangePage(pageNum) {
      dispatch({
        type: 'LabelManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onDelete(record) {
      dispatch({
        type: 'LabelManagementModel/ajaxDelete',
        payload: { id: record.id }
      })
    },
    onUpdateStatus(record){
      dispatch({
        type: 'LabelManagementModel/typeStatus',
        payload: { id: record.id, status: record.status == 1?2:1 }
      })
    },
    showModal(record){
      dispatch({
        type: 'LabelManagementModel/ajaxEditDetail',
        payload: {id: record.id}
      });
      dispatch({
        type: 'LabelManagementModel/labelTypeDrop',
        payload: {type: 1}
      });
    }
  }

  /** 新增类别 */
  function showModal(val){
    dispatch({
      type: 'LabelManagementModel/concat',
      payload: {
        visible: true,
        detail:{}
      }
    });
    dispatch({
      type: 'LabelManagementModel/labelTypeDrop',
      payload: {
        type: 1
      }
    }); 
  }
  function handleCancel(e) {
    form.resetFields();
    dispatch({
      type: 'LabelManagementModel/concat',
      payload: {
        visible: false
      }
    });
    dispatch({
      type: 'LabelManagementModel/labelTypeDrop',
      payload: {
        type: 2
      }
    });
  }
  //提交
  function handleSubmit(e) {
    form.validateFields(['name', 'typeId', 'content'],(err, values) => {
      if (err) {
        return;
      }
      if(detail.id){
        dispatch({
          type: 'LabelManagementModel/ajaxEdit',
          payload: {...values, id: detail.id},
          callback: () => {
            form.resetFields();
          }
        });
      }else{
        dispatch({
          type: 'LabelManagementModel/ajaxAdd',
          payload: values,
          callback: () => {
            form.resetFields();
          }
        });
      }  
      dispatch({
        type: 'LabelManagementModel/labelTypeDrop',
        payload: {
          type: 2
        }
      });
    });
  }
  /** 新增类别 end */

  const formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 15
    },
  }
  /** 编辑 end */
  return (
    <div>
      <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          <Button type="primary" className="mb1" onClick={showModal.bind(this)}><Icon type="plus" />新增标签</Button>
          <FormList {...formListProps} />
        </Card>
        {/** 新增类别弹框 start */}
        <Modal
          title={detail.id?"编辑标签":"新增标签"}
          visible={props.visible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form>
            <Form.Item label="标签名称" {...formItemLayout} >
              {getFieldDecorator('name', {
                initialValue: detail.name,
                rules: [{ required: true, message: '请输入标签名称,不可超过8个字', whitespace: true }],
              })(
                <Input type="text" placeholder="请输入标签名称,不可超过8个字" maxLength={8} />
              )}
            </Form.Item>
            <Form.Item label="标签类别" {...formItemLayout}>
              {getFieldDecorator('typeId', {
                initialValue: detail.typeId,
                rules: [{ required: true, message: '请选择中心!' }],
              })(
                detail.id?
                  <Select placeholder="请选择类型" disabled>
                    {typeDrop && typeDrop.length > 0 ? typeDrop.map((value, index) => {
                      return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                    }) : ''}
                  </Select>:
                  <Select placeholder="请选择类型">
                    {typeDrop && typeDrop.length > 0 ? typeDrop.map((value, index) => {
                      return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                    }) : ''}
                  </Select>
              )}
              {detail.id?<p style={{lineHeight:'1.4em',margin:'5px 0 0',color:'#999'}}>本选项不能更改</p>:<p style={{lineHeight:'1.4em',margin:'5px 0 0',color:'#999'}}>本选项保存后不能更改</p>}
            </Form.Item>
            <Form.Item label="标签描述" {...formItemLayout} >
              {getFieldDecorator('content', {
                initialValue: detail.content,
                rules: [{ required: false, message: '请输入标签描述,不可超过40个字' }],
              })(
                <Input type="text" placeholder="请输入标签描述,不可超过40个字" maxLength={40} />
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
              <Button type="primary" onClick={handleSubmit}>保存</Button>
              <Button className="ml1" onClick={handleCancel}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
        {/** 新增类别弹框 end */}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.LabelManagementModel,
    loading: state.loading.models.LabelManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));