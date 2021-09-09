import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Breadcrumb, Card,Tree } from 'antd';
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
const { TreeNode } = Tree;
import Menus from '../../components/Menus1/';


function RolesAdd(props) {
  let { dispatch, form, id, loading, branchList, info={},} = props;
  //角色新增编辑
  const { getFieldDecorator } = form;
  function handleSubmit(e){
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let arr = [];
      branchList.map(vvv=>{
        if(props.menuChecked[vvv.id]){
          arr.push(vvv.id);
          vvv.children.map(vv=>{
            if(props.menuChecked[vv.id]){
              arr.push(vv.id);
            }
            vv.children.map(v=>{
              if(props.menuChecked[v.id]){
                arr.push(v.id);
              }
            })
          })  
        }
      });
      //console.log(arr)
      let data={
        ...values,
        menuIds:arr
      }
      if(id){
        dispatch({
          type:'rolesAddModel/roleUpdate',
          payload:{
            ...data,
            id,
          }
        })
      }else{
        dispatch({
          type:'rolesAddModel/roleAdd',
          payload:{
            ...data
          }
        })
      }
      
    })
  }

  function onCheck(id,data){
    //console.log(data,"11111111")
    dispatch({
      type:'rolesAddModel/concat',
      payload:{menuChecked: data },
    });
  }

  let renderTreeNodes=(data)=>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.menuName} key={item.id} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.menuName} key={item.id}/>
    })
    
  

  //返回
  function handleBack(){
    history.go(-1);
  }

  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 7 },
  };
  const formItemLayout1 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  console.log(sessionStorage.getItem('cacheData'))
  return (
    <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>系统设置</Breadcrumb.Item>
        <Breadcrumb.Item><Link to={'/roles'} className="ml1">角色管理</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{id?'编辑':'新增'}角色</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="section">
        <Form>
          <FormItem {...formItemLayout} label="角色名称">
            {getFieldDecorator('roleName',{
              rules:[{required: true, message: '请输入角色名称'}],
              // {
              //   type: "string",
              //   pattern: /^[\u4e00-\u9fa5-0-9a-zA-Z_]{0,}$/,
              //   message: '角色名称不能包含特殊字符' }],
              initialValue: info && info.roleName || ""
            })(
              <Input maxLength={10} placeholder="请输入角色名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout1} label="角色权限" required>    
            {/* <Tree
              checkable
              autoExpandParent={true}
              onCheck={onCheck}
              checkedKeys={selectedKeys}
            >
              {renderTreeNodes(branchList)}
            </Tree> */}
            <Menus allMenus={branchList} id={'menu'} infoMenu={info.menuIds} callback={onCheck.bind(this)}/>
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 3 }}>
            <Button type="primary" loading={loading} onClick={handleSubmit} className="mr1">确定</Button>
            <Button type="ghost" onClick={handleBack}>返回</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.rolesAddModel, 
    loading: state.loading.models.rolesAddModel 
  };
}
export default connect(mapStateToProps)(Form.create()(RolesAdd));
