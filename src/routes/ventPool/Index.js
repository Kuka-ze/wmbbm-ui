import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Modal, Input, Select } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
import { authority } from '../../utils/util';

function Index(props) {
  let { dispatch, form, nextDrop, opinionCode, id, receiveVisible, rejectVisible, resolveVisible, showTip } = props;
  const { getFieldDecorator } = form;
  const { TextArea } = Input;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '大家帮',
    }, {
      name: '问题池',
    }]
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: props.list,
    paginationTotal: props.paginationTotal,
    params: props.params,
    onChangePage(pageNum) {
      dispatch({
        type: 'VentPoolModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    //退回
    showRefuseModal(record) {
      form.resetFields();
      const { opinionCode, id } = record;
      dispatch({
        type: 'VentPoolModel/concat',
        payload: { rejectVisible: true, opinionCode, id, feedback1:'' }
      })
    },
    //接收
    showReceiveModal(record){
      const { centerId, opinionCode, id } = record;
      dispatch({
        type: 'VentPoolModel/nextDrop',
        payload: {centerId}
      });
      dispatch({
        type: 'VentPoolModel/concat',
        payload: {
          opinionCode, id, centerId
        }
      });
    },
    //解决
    showSolveModal(record) {
      form.resetFields();
      const { opinionCode, id } = record;
      dispatch({
        type: 'VentPoolModel/concat',
        payload: { resolveVisible: true, opinionCode, id }
      })
    },
    
  }
  /** 筛选 */
  const formSearchProps = {
    is_reset: props.is_reset,
    params: props.params,
    stateList: props.stateList,
    onFormReset(){
      dispatch({
        type: 'VentPoolModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'VentPoolModel/ajaxList',
        payload: data
      })
    }
  }
  /** 接收问题 */
  function handleCancel(e) {
    form.resetFields();
    dispatch({
      type: 'VentPoolModel/concat',
      payload: {
        receiveVisible: false,
        rejectVisible: false,
        resolveVisible: false,
        showTip:false
      }
    });
  }
  //提交-接收
  function handleSubmit(e) {
    form.validateFields(['key'],(err, values) => {
      if (err) {
        return;
      }
      let { key } = values;
      dispatch({
        type: 'VentPoolModel/onReceive',
        payload: {
          key, id
        }
      });
    });
  }
  //提交-退回
  function handleReject(e){
    form.validateFields(['feedback'],(err, values) => {
      if (err) {
        return;
      }
      let { feedback } = values;
      if(feedback.length<5||feedback.length>100){
        dispatch({
          type: 'VentPoolModel/concat',
          payload: {  
            showTip: true
          }
        });
        return;
      }
      dispatch({
        type: 'VentPoolModel/onReject',
        payload: {  
          feedback, id
        }
      });
    });
  }
  function changeArea(){
    dispatch({
      type: 'VentPoolModel/concat',
      payload: {  
        showTip: false
      }
    });
  }

  //提交-解决
  function handleResolve(e){
    form.validateFields(['feedback1'],(err, values) => {
      if (err) {
        return;
      }
      let { feedback1 } = values;
      if(feedback1.length<5||feedback1.length>100){
        dispatch({
          type: 'VentPoolModel/concat',
          payload: {  
            showTip: true
          }
        });
        return;
      }
      dispatch({
        type: 'VentPoolModel/onResolve',
        payload: {  
          feedback: feedback1, id
        }
      });
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
  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          <FormList {...formListProps} />
        </Card></div>
        : <div className="kong-tu">
          <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
        </div>
      }
      {/** 接收问题弹框 start */}
      <Modal
          title="接收问题"
          visible={receiveVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form>
            <Form.Item label="问题号" {...formItemLayout} style={{marginBottom:'0'}}>
              {getFieldDecorator('opinionCode')(
              <p>{!!opinionCode?opinionCode:''}</p>
              )}
            </Form.Item>
            <Form.Item label="接收组织" {...formItemLayout}>
              {getFieldDecorator('key')(
                <Select placeholder="请选择接收组织，该组织将负责解决此问题" showSearch 
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {nextDrop && nextDrop.length > 0 ? nextDrop.map((value, index) => {
                    return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
              <Button type="primary" onClick={handleSubmit}>确定</Button>
              <Button className="ml1" onClick={handleCancel}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
        {/** 接收问题弹框 end */}
        {/** 退回问题弹框 start */}
      <Modal
          title="退回问题"
          visible={rejectVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form className="redExtra">
            <Form.Item label="问题号" {...formItemLayout} style={{marginBottom:'0'}}>
              {getFieldDecorator('opinionCode')(
              <p>{!!opinionCode?opinionCode:''}</p>
              )}
            </Form.Item>
            <Form.Item label="退回原因" {...formItemLayout} extra={showTip?"退回原因的字数不能少于5个且不能多于100个":''}>
              {getFieldDecorator('feedback', {
                      rules: [{ required: true, message: "请输入5-100字的退回原因" }]
                })(
                <TextArea placeholder="请输入退回原因（5-100字）" onChange={changeArea}/>
              )}
            </Form.Item>
            
            <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
              <Button type="primary" onClick={handleReject}>确定</Button>
              <Button className="ml1" onClick={handleCancel}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
        {/** 退回问题弹框 end */}
        {/** 解决问题弹框 start */}
      <Modal
          title="解决问题"
          visible={resolveVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form className="redExtra">
            <Form.Item label="槽号" {...formItemLayout} style={{marginBottom:'0'}}>
              {getFieldDecorator('opinionCode')(
              <p>{!!opinionCode?opinionCode:''}</p>
              )}
            </Form.Item>
            <Form.Item label="反馈内容" {...formItemLayout} extra={showTip?"反馈内容的字数不能少于5个且不能多于100个":''}>
              {getFieldDecorator('feedback1', {
                      rules: [{ required: true, message: "请输入5-100字的反馈内容" }]
                })(
                <TextArea placeholder="请确认该问题已被解决，并输入解决结果" onChange={changeArea}/>
              )}
            </Form.Item>
            
            <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
              <Button type="primary" onClick={handleResolve}>确定</Button>
              <Button className="ml1" onClick={handleCancel}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
        {/** 解决问题弹框 end */}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.VentPoolModel,
    loading: state.loading.models.VentPoolModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
