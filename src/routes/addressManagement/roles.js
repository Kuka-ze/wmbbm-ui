import React from 'react';
import { connect } from 'dva';
import { Breadcrumb,Card,Form,Button,Table,Icon,Popconfirm,Col,Input,Row} from 'antd';
import { Link } from 'react-router-dom';
import { authority } from '../../utils/util';
const FormItem = Form.Item;

function Roles(props) {
  let {  loading, list, form, dispatch, is_reset } = props;
  if (is_reset == true) {
    form.resetFields();
    dispatch({
      type: 'rolesModel/concat',
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
        type:'rolesModel/roleList',
        payload:{
          roleName:values.roleName
        }
      })
    })
  }
  
  function handleReset(){
    form.resetFields();
    dispatch({
      type:'rolesModel/roleList',
      payload:{
        roleName:""
      }
    })
  }
  function handleDelete(record){
    dispatch({
      type:'rolesModel/roleDel',
      payload:{
        id:record.id,
      }
    })
  }

  // function handlePaginationChange(page, size) {
  //   const param = { ...params, page };
  //   reload(param);
  // }

  // const pagination = {
  //   onChange: (page, size)=>{dispatch({type:'rolesModel/roleList',payload:{name:""}})},
  //   total: parseInt(totals),
  //   showTotal: total => `共${totals}条`,
  //   current: params ? params.page:''
  // }

  function notd(text, record){
    return text || text == 0? text  : "-"
  }
  const columns = [{
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
    render:notd
  },{
    title: '关联人数',
    dataIndex: 'num',
    key: 'num',
    render: notd
  }, {
    title: '操作',
    dataIndex: 'desc',
    key: 'desc',
    render:(text, record) => {
      let link = `/rolesAdd?id=${record.id}`;
      let link1 = `/rolespersonnel?id=${record.id}`;
      return <div>
        {authority('jsglry') ?
          <Link to={link1} className="ml1">
            角色关联人员
          </Link>
          : null
        }
        {authority('edit') ? record.actPermission ?
          <Link to={link} className="ml1">
            编辑
          </Link>
          : null :null
        }
        {authority('del') ? record.actPermission ?
          <Popconfirm title="是否删除该角色?" onConfirm={handleDelete.bind(this,record)}>
            <a className="ml1">删除</a>
          </Popconfirm>
          : null : null
        }
      </div>
    }
  }];
  
  return (
    <div>
      {authority('list') ?<div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>系统设置</Breadcrumb.Item>
          <Breadcrumb.Item>角色管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Form>
            <Row>
              <Col span={6}>
                <FormItem label="角色名称" {...formItemLayout}>
                  {getFieldDecorator('roleName')(<Input placeholder="请输入角色名称" maxLength={10}/>
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
        <Card className="mt1">
          {authority('add') ?
            <Link to="/rolesAdd"><Button type="primary"><Icon type="plus" />新增角色</Button></Link>
            : null
          }
          {/* <Link to="/rolesAdd"><Button type="primary"><Icon type="plus" />新增角色</Button></Link> */}
          <Table className="mt1" loading={loading} dataSource={list} rowKey={(record => record.id)} columns={columns} pagination={false}/>
        </Card>
      </div>
        : <div className="kong-tu">
          <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
        </div> 
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.rolesModel,
    loading: state.loading.models.rolesModel,
  };
}
export default connect(mapStateToProps)(Form.create()(Roles));
