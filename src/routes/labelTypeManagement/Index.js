import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Icon, Modal, Input, Select } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
function Index(props) {
  let { dispatch, params = {}, form, typeDrop, detail = {}, tipWord } = props;
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
        type: 'LabelTypeManagementModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'LabelTypeManagementModel/ajaxList',
        payload: data
      })
    },
    typeDrop,
    onChangeTime(val) {
      dispatch({
        type: 'LabelTypeManagementModel/concat',
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
        type: 'LabelTypeManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onDelete(record) {
      dispatch({
        type: 'LabelTypeManagementModel/ajaxDelete',
        payload: { id: record.id }
      })
    },
    onUpdateStatus(record){
      dispatch({
        type: 'LabelTypeManagementModel/typeStatus',
        payload: { id: record.id, status: record.status == 1?2:1 }
      })
    },
    showModal(record){
      dispatch({
        type: 'LabelTypeManagementModel/ajaxEditDetail',
        payload: {id: record.id}
      });
      dispatch({
        type: 'LabelTypeManagementModel/labelTypeDrop',
        payload: {type: 1}
      });
    }
  }

  /** 新增类别 */
  const showModal=(val)=>{
    dispatch({ 
      type: 'LabelTypeManagementModel/concat',
      payload: {
        visible: true,
        detail:{},
        tipWord: ''
      }
    });
    dispatch({
      type: 'LabelTypeManagementModel/labelTypeDrop',
      payload: {
        type: 1
      }
    }); 
  }
  function handleCancel(e) {
    form.resetFields();
    dispatch({
      type: 'LabelTypeManagementModel/concat',
      payload: {
        visible: false
      }
    });
    dispatch({
      type: 'LabelTypeManagementModel/labelTypeDrop',
      payload: {
        type: 2
      }
    });
  }
  //提交
  function handleSubmit(e) {
    form.validateFields(['name', 'type', 'content'],(err, values) => {
      if (err) {
        return;
      }
      let typeNum;
      if(values.type=='单选标签'){
        typeNum=1
      }else if(values.type=='多选标签'){
        typeNum=2
      }else{
        typeNum=values.type
      }
      let data = { 
        ...values,type:typeNum
      };
      if(detail.id){
        dispatch({
          type: 'LabelTypeManagementModel/ajaxEdit',
          payload: {...data,id: detail.id},
          callback: () => {
            form.resetFields();
          }
        });
      }else{
        dispatch({
          type: 'LabelTypeManagementModel/ajaxAdd',
          payload: data,
          callback: () => {
            form.resetFields();
          }
        });
      }  
      dispatch({
        type: 'LabelTypeManagementModel/labelTypeDrop',
        payload: {
          type: 2
        }
      });
    });
  }
  /** 新增类别 end */
  function handleChange(value) {
    let tip;
    if(value==1){
      tip='本类别的标签同一用户只可存在一个或不存在'
    }else{
      tip = '本类别下的标签同一用户可存在多个'
    }
    dispatch({
      type: 'LabelTypeManagementModel/concat',
      payload: {
        tipWord: tip
      }
    });
  }
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
          <Button type="primary" className="mb1" onClick={showModal}><Icon type="plus" />新增类别</Button>
          <FormList {...formListProps} />
        </Card>
        {/** 新增类别弹框 start */}
        <Modal
          title={detail.id?"编辑类别":"新增类别"}
          visible={props.visible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form>
            <Form.Item label="类别名称" {...formItemLayout} >
              {getFieldDecorator('name', {
                initialValue: detail.name,
                rules: [{ required: true, message: '请输入类别名称,不可超过6个字', whitespace: true }],
              })(
                <Input type="text" placeholder="请输入类别名称,不可超过6个字" maxLength={6} />
              )}
            </Form.Item>
            <Form.Item label="类别属性" {...formItemLayout}>
              {getFieldDecorator('type', {
                initialValue: detail.type,
                rules: [{ required: true, message: '请选择中心!' }],
              })(
                detail.id?
                  <Select placeholder="请选择类型" disabled>
                    {typeDrop && typeDrop.length > 0 ? typeDrop.map((value, index) => {
                      return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                    }) : ''}
                  </Select>:
                  <Select placeholder="请选择类型" onChange={handleChange}>
                    {typeDrop && typeDrop.length > 0 ? typeDrop.map((value, index) => {
                      return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                    }) : ''}
                  </Select>
              )}
              {detail.id?<p style={{lineHeight:'1.4em',margin:'5px 0 0',color:'#999'}}>本选项不能更改</p>:<p style={{lineHeight:'1.4em',margin:'5px 0 0',color:'#999'}}>本选项保存后不能更改</p>}
              <p style={{lineHeight:'1.4em',margin:'5px 0 0',color:'#999'}}>{tipWord}</p>
            </Form.Item>
            <Form.Item label="类别描述" {...formItemLayout} >
              {getFieldDecorator('content', {
                initialValue: detail.content,
                rules: [{ required: false, message: '请输入类别描述,不可超过40个字' }],
              })(
                <Input type="text" placeholder="请输入类别描述,不可超过40个字" maxLength={40} />
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
    ...state.LabelTypeManagementModel,
    loading: state.loading.models.LabelTypeManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));