import React from 'react';
import { connect } from 'dva';
import { Breadcrumb,Card,Form,Button,Table,Col,Input,Row} from 'antd';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

function Rolespersonnel(props) {
  let {  loading, list, form, dispatch, is_reset,totals,params} = props;
  //console.log(list)
  if (is_reset == true) {
    form.resetFields();
    dispatch({
      type: 'rolespersonnelModel/concat',
      payload: {
        is_reset: false,
      },
    });
  }
  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 16
    },
  }
  const { getFieldDecorator } = form;
  function handleSearch(list){
    form.validateFields((err, values) => {
      dispatch({
        type:'rolespersonnelModel/roleUserList',
        payload:{
          ...values,
          pageSize:10,
          pageNum:1,
        }
      })
    })
  }
  
  function handleReset(){
    form.resetFields();
    dispatch({
      type:'rolespersonnelModel/roleUserList',
      payload:{
        userName:"",
        userPhone:"",
        pageSize:10,
        pageNum:1,
      }
    })
  }

  const pagination = {
    onChange: (page, size)=>{dispatch({type:'rolespersonnelModel/roleUserList',payload:{pageNum:page}})},
    total: parseInt(totals),
    showTotal: total => `共${totals}条`,
    current: params ? params.pageNum:''
  }
  function notd(text, record){
    return text ? text  : "-"
  }
  const columns = [{
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
    render:notd
  },{
    title: '手机号',
    dataIndex: 'userPhone',
    key: 'userPhone',
    render: (text, record) => {
      return text ? text.substr(0, 3) + '****' + text.substr(text.length - 4): '-'
    }
  }, {
    title: '所属组织',
    dataIndex: 'deptName',
    key: 'deptName',
    render:notd
  }];
  
  return (
    <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>系统设置</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/roles`} className="ml1">
          角色管理
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>角色关联人员</Breadcrumb.Item>
      </Breadcrumb>
      {/* <Card>
        <Link to="/roles"><Button type="primary">返回</Button></Link>
      </Card> */}
      <Card className="section">
        <Form>
          <Row>
            <Col span={6}>
              <FormItem label="姓名" {...formItemLayout}>
                {getFieldDecorator('userName')(<Input placeholder="请输入姓名" />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="手机号" {...formItemLayout}>
                {getFieldDecorator('userPhone')(<Input placeholder="请输入手机号" />
                )}
              </FormItem>
            </Col>
            <Col span={5} offset={1} className="line40">
              <Button type="primary" className="mr1" onClick={handleSearch.bind(this,list)}>查询</Button>
              <Button type="ghost" onClick={handleReset}>重置</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Table className="mt1" loading={loading} dataSource={list} rowKey={(record => record.id)} columns={columns} pagination={pagination}/>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.rolespersonnelModel,
    loading: state.loading.models.rolespersonnelModel,
  };
}
export default connect(mapStateToProps)(Form.create()(Rolespersonnel));
