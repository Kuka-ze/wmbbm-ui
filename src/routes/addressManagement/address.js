import React from 'react';
import { connect } from 'dva';
import { Breadcrumb,Card,Form,Button,Table,Col,Input,Row,Tree,Modal,Radio,Select,Popconfirm,Icon,message} from 'antd';
import './index.less';
import { authority } from '../../utils/util';
// import Menus from '../../components/Menus/';
import Menus from './components/Menus';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TreeNode } = Tree;
const Option = Select.Option;
const { Search } = Input;
// const IconFont = Icon.createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_1222328_gpmra7gulet.js',
// });
// const IconFonts = Icon.createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_1222328_3rtn3q07jrm.js',
// });
function Address(props) {
  let {  loading, userList,info={}, form, dispatch, is_reset,selectedKeys,branchList=[],visible,addressSelectedKeys,visiblename,status,branchInfos={},disableds,add,deptId,RadioGroupon,totals,communityList=[],roleIdName,editId,updateDepartmentSelectedKeys,updateDepartmentId,departmentId,pams,rootNodeName,userType,userLists=[]} = props;
  if (is_reset == true) {
    form.resetFields();
    dispatch({
      type: 'addressModel/concat',
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
  //部门树
  function onSelect(selectedKeyss, info){
    let id=selectedKeyss.join("")
    let g= id && info.selectedNodes[0].props.dataRef.parentId > 0//是否为根节点
    if(id){
      dispatch({
        type:'addressModel/concat',
        payload:{
          deptId:id,
          pams:{...pams,deptId:id,pageNum:1},
          status:false,
          selectedKeys:selectedKeyss,
        }
      })
      dispatch({
        type:'addressModel/branchUserList',
        payload:{
          ...pams,
          deptId:id,
          pageNum:1
        }
      })
      if(g){
        dispatch({
          type:'addressModel/concat',
          payload:{
            rootNodeName:""
          }
        })
      }else{
        dispatch({
          type:'addressModel/concat',
          payload:{
            rootNodeName:info.selectedNodes[0].props.dataRef.deptName
          }
        })
      }
    } 
  }
  //迁移部门树
  function updateDepartmentOnCheck(selectedKeyss, info){
    let id=selectedKeyss.join("")
    if(id){
      dispatch({
        type:'addressModel/concat',
        payload:{
          updateDepartmentSelectedKeys:selectedKeyss,
          updateDepartmentId:id
        }
      })
    }   
  }
  // 部门树
  let renderTreeNodes=(data)=>{
    return (
      data.map(item => {
        if (item.children) {
          if(item.parentId<0){
            return (
              <TreeNode title={item.deptName} key={item.id} dataRef={item} disabled={item.disabled}>
                {renderTreeNodes(item.children)}
              </TreeNode>
            );
          }else{
            return (
              <TreeNode title={item.deptName} key={item.id} dataRef={item} disabled={item.disabled}>
                {renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          
        }
        //return <TreeNode switcherIcon={<Icon type="folder-open" theme="twoTone" twoToneColor="#AEE3FA" />} title={item.deptName} key={item.id}/>
      })
    )
  }
  //迁移部门树
  let renderTreeNodess=(data)=>{
    return (
      data.map(item => {
        if (item.children) {
          return (
            <TreeNode title={item.deptName} key={item.id} dataRef={item} disabled={item.disabled}>
              {renderTreeNodess(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode title={item.deptName} key={item.id} disabled={item.disabled}/>
      })
    )
  }
 
    
  let RadioGrouponChange= (v)=>{
    dispatch({type: 'addressModel/concat', payload:{
      RadioGroupon: v.target.value
    }});
  }
  //可查看通讯录
  function addressOnCheck(checkedKeys){
    //('onCheck', checkedKeys);
    dispatch({
      type:'addressModel/concat',
      payload:{
        addressSelectedKeys:checkedKeys.checked
      }
    })
  }
  //部门迁移 提交
  function updateDepartmentSubmit(){
    if(!updateDepartmentId){
      return message.error("请选择要迁移的部门")
    }
    dispatch({
      type:'addressModel/branchUserDepartment',
      payload:{
        deptId:updateDepartmentId,
        id:departmentId
      }
    })
  }
  //确定提交  部门新增编辑
  function handleSubmit(e){
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let pas={
        ...values,
        parentId:deptId,
        deptIds:addressSelectedKeys || []
      }
      if(add=="add"){
        dispatch({
          type:'addressModel/branchAdds',
          payload:{
            ...pas
          }
        })
      }else{
        dispatch({
          type:'addressModel/branchEdits',
          payload:{
            ...pas,
            deptId:branchInfos && branchInfos.id || "",
            parentId:branchInfos && branchInfos.parentId || "",
          }
        })
      }
    })
  }
  //确定提交  用户新增编辑
  function handleSubmits(e){
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let arr = [];
      communityList.map(vvv=>{
        if(props.menuChecked[vvv.id]){
          arr.push(vvv.id);
          vvv.children.map(vv=>{
            if(props.menuChecked[vv.id]){
              arr.push(vv.id);
            }
            vv.children.map(v=>{
              if(props.menuChecked[v.id]){
                arr.push(v.id);
                v.children.map(vs=>{
                  if(props.menuChecked[vs.id]){
                    arr.push(vs.id);
                  }
                })
              }
            })
          })  
        }
      });
      let pas={
        ...values,
        roleIds:roleIdName || [],
        userRoles:values.roleIds&& values.roleIds.length>0&&values.roleIds.join(",") || "",
        deptName:rootNodeName || branchInfos && branchInfos.deptName || "",
        deptId,
        community:props.communityIofo
        // community:arr
      }
      // return true;
      if(editId){
        dispatch({
          type:'addressModel/branchUserUpdate',
          payload:{
            ...pas,
            id:editId,
          }
        })    
      }else{
        dispatch({
          type:'addressModel/branchUserAdd',
          payload:{
            ...pas
          }
        })
      }
      
    })
  }


  //部门删除
  function confirm() {
    dispatch({
      type:'addressModel/branchDelete',
      payload:{
        deptId
      }
    })
  }
  //返回
  function handleBack(){
    dispatch({
      type:'addressModel/concat',
      payload:{
        visible:false
      }
    })
  }
  //员工删除
  function handleDelete(v) {
    dispatch({
      type:'addressModel/branchUserDel',
      payload:{
        id:v.id
      }
    })
  }
  //重置密码
  function resetPassword(v){
    dispatch({
      type:'addressModel/resetPassword',
      payload:{
        id:v.id
      }
    })
  }
  const pagination = {
    onChange: (page, size)=>{dispatch({type:'addressModel/branchUserList',payload:{...pams,pageNum:page}})},
    total: parseInt(totals),
    showTotal: total => `共${totals}条`,
    current: pams ? pams.pageNum:''
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
    render: notd
  }, {
    title: '角色',
    dataIndex: 'roles',
    key: 'roles',
    render:notd
  },{
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: (text, record) => {
      return text==1 ? "男": text==2 ? "女": "未知"
    }
  }, {
    title: '账号状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      return text==1 ? "启用"  : "禁用"
    }
  },
  // {
  //   title: '可查看中心/所/站/点',
  //   dataIndex: 'communityNum',
  //   key: 'communityNum',
  //   render:notd
  // },
  {
    title: '操作',
    dataIndex: 'desc',
    key: 'desc',
    render:(text, record) => {
      return <div>
        {authority('editBm') ?
          record.isOrdinary?
            <a className="ml1" onClick={addOnClick.bind(this,'updateDepartment',record)}>更改部门</a>:null
          : null
        }
        {authority('detailUser') ? <a className="ml1" onClick={defOnClick.bind(this,record)}>查看</a>: null}
        {authority('editUser') ?
          (!record.isMe && record.isOrdinary) ?
            <a className="ml1" onClick={addOnClick.bind(this,'staff',record)}>编辑</a> : null
          : null
        }
        {authority('delUser') ?
          (!record.isMe && record.isOrdinary) ?
            <Popconfirm title="是否删除?" onConfirm={handleDelete.bind(this,record)}>
              <a className="ml1">删除</a>
            </Popconfirm> : null
          : null
        }
        {authority('editPassword') ?
          <Popconfirm title="是否重置密码?" onConfirm={resetPassword.bind(this,record)}>
            <a className="ml1">重置密码</a>
          </Popconfirm>
          : null
        }
        {/* <a className="ml1" onClick={addOnClick.bind(this,'updateDepartment',record)}>更改部门</a>
        <a className="ml1" onClick={addOnClick.bind(this,'staff',record)}>编辑</a>
        <Popconfirm title="钉钉通讯录也会同步删除该员工，是否删除该员工?" onConfirm={handleDelete.bind(this,record)}>
          <a className="ml1">删除</a>
        </Popconfirm> */}
      </div>
    }
  }
  ];
  //打开弹框
  function addOnClick(name,v,disabled){
    if(name=="staff"){ //用户新增
      form.resetFields();
      dispatch({
        type:'addressModel/concat',
        payload:{
          visiblename:2,
        }
      })
      dispatch({
        type:'addressModel/branchUserCommunity',
        payload:{
          id:deptId
        }
      })
      dispatch({
        type:'addressModel/roleList1',
        payload:{}
      })
      if(v.id){//编辑
        dispatch({
          type:'addressModel/branchUserInfo',
          payload:{
            id:v.id
          }
        })
        dispatch({
          type:'addressModel/concat',
          payload:{
            editId:v.id,
            userPhoneStatus: true 
          }
        })
        
      }else{//新增
        form.resetFields();
        dispatch({
          type:'addressModel/concat',
          payload:{
            info:{},
            editId:"",
            roleIdName:[],
            communityIofo:[],
            userPhoneStatus: false
          }
        })
      }
    }else if(name=="department"){  //部门新增
      form.resetFields();
      if(v=="departmentAdd"){
        //form.resetFields();
        dispatch({
          type:'addressModel/concat',
          payload:{
            add:"add",
            addressSelectedKeys:[],
            RadioGroupon:1,
          }
        })
      }else{
        dispatch({
          type:'addressModel/concat',
          payload:{
            add:"edit",
          }
        })
      }
      dispatch({
        type:'addressModel/concat',
        payload:{
          visiblename:1,
        }
      })
    }else if(name=="updateDepartment"){
      dispatch({
        type:'addressModel/concat',
        payload:{
          
          visiblename:3,
          departmentId:v.id
        }
      })
    }
    if(!rootNodeName){
      dispatch({
        type:'addressModel/branchInfos',
        payload:{
          deptId
        }
      })
    }
    dispatch({
      type:'addressModel/concat',
      payload:{
        visible:true,
        truenameId:"",
        updateDepartmentSelectedKeys:[]
      }
    })
  }
  
  //角色选项
  function handleChanges(value,o) {
    let lis=o && o.length>0 && o.map((v,i)=>{
      return v.props.id
    })
    dispatch({
      type:'addressModel/concat',
      payload:{
        roleIdName:lis
      }
    })
  }
  //小区列表操作 communityAdd
  function onCheckCommunity(id,data){
    dispatch({
      type:'addressModel/concat',
      payload:{menuChecked: data },
    });
  }
  //关闭弹框
  function modalCancel(){
    dispatch({
      type:'addressModel/concat',
      payload:{
        visible:false,
        disableds:false,
        truenameId:"",
        userPhoneStatus: false
      }
    })
  }
  const styleHeight=status?{
    minHeight:"800px"
  }:null

  //搜索 
  function useronChange(values){
    if(values){
      if(isNaN(values)){
      dispatch({
        type:'addressModel/concat',
        payload:{
          userType:true,
        }
      })
      dispatch({
        type:'addressModel/userLists',
        payload:{
          userName:values,
        }
      })
      }else{
        if(values.length < 4){
          message.error('请输入4位及以上手机号码开始搜索');
        }else{
          dispatch({
            type:'addressModel/concat',
            payload:{
              userType:true,
            }
          })
          dispatch({
            type:'addressModel/userLists',
            payload:{
              userName:values,
            }
          })
        }
      }
    }else{
      dispatch({
        type:'addressModel/concat',
        payload:{
          userType:false,
        }
      })
    }
    // if(v.target.value){
    //   dispatch({
    //     type:'addressModel/concat',
    //     payload:{
    //       userType:true,
    //     }
    //   })
    //   dispatch({
    //     type:'addressModel/userLists',
    //     payload:{
    //       userName:v.target.value,
    //     }
    //   })
    // }else{
    //   dispatch({
    //     type:'addressModel/concat',
    //     payload:{
    //       userType:false,
    //     }
    //   })
    // }
  }
  function onChangeFun(v){
    if(!(v.target.value)){
      dispatch({
        type:'addressModel/concat',
        payload:{
          userType:false,
        }
      })
    }
  }
  //打开详情弹窗
  function defOnClick(data){
    form.resetFields();
    dispatch({
      type:'addressModel/concat',
      payload:{
        visiblename:2,
        disableds:true,
        visible:true,
        editId:data.id,
        truenameId:data.id,
        info: {}
      }
    })
    dispatch({
      type:'addressModel/branchUserCommunity',
      payload:{
        id:deptId
      }
    })
    dispatch({
      type:'addressModel/branchUserInfo',
      payload:{
        id:data.id
      }
    })
  }
  /** 菜单 */
  let menusProps = {
    treeData: props.communityList,
    checkedKeys: props.communityIofo,
    onCheckFun(checkedKeys){
      dispatch({
        type:'addressModel/concat',
        payload:{
          communityIofo: checkedKeys
        }
      })
    }
  }
  return (
    <div className="address">
      {authority('list') ?<div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>通讯录管理</Breadcrumb.Item>
          <Breadcrumb.Item>通讯录管理</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col span={7} style={{"marginRight":"30px"}}>
            <Card className="section" style={{minHeight:"800px"}}>
              <Row gutter={16}>
                <Col span={8} style={{marginBottom:"10px"}}>
                  {authority('add') ?
                    <Button type="primary" disabled={status || userType ? true : false} onClick={addOnClick.bind(this,'department',"departmentAdd")} style={{padding:"0"}} block>新增子部门</Button>
                    : null
                  }
                  {/* <Button type="primary" disabled={status} onClick={addOnClick.bind(this,'department',"departmentAdd")} style={{padding:"0"}} block><Icon type="plus" />新增子部门</Button> */}
                </Col>
                <Col span={8}>
                  {authority('edit') ?
                    <Button type="primary" disabled={rootNodeName || status || userType ? true : false} onClick={addOnClick.bind(this,'department')} style={{padding:"0"}} block>编辑部门</Button>
                    : null
                  }
                  {/* <Button type="primary" disabled={rootNodeName || status ? true : false} onClick={addOnClick.bind(this,'department')} style={{padding:"0"}} block>编辑部门</Button> */}
                </Col>
                <Col span={8}>
                  {authority('del') ?
                    rootNodeName || status ?
                      <Button type="danger" disabled={rootNodeName || status || userType? true : false} block>删除部门</Button>
                      :<Popconfirm placement="top"  title={"钉钉通讯录也会同步删除该部门，是否删除该部门"} onConfirm={confirm} okText="确定" cancelText="取消">
                        <Button type="danger" disabled={rootNodeName || status || userType ? true : false} block>删除部门</Button>
                      </Popconfirm>
                    : null
                  }
                  {/* <Popconfirm placement="top" title={"钉钉通讯录也会同步删除该部门，是否删除该部门"} onConfirm={confirm} okText="确定" cancelText="取消">
                    <Button type="danger" disabled={rootNodeName || status ? true : false} block>删除部门</Button>
                  </Popconfirm> */}
                </Col>
              </Row>
              <div><Search placeholder="请输入工作人员姓名或手机号码" allowClear onSearch={useronChange} onChange={onChangeFun} enterButton /></div>
              {/* <div><Input placeholder="请输入工作人员姓名或手机号码" allowClear onChange={useronChange} /></div> */}
              <div className="departTreeBox">
                {authority('list') && !userType ?
                  (branchList && branchList.length>0 ?<Tree
                    //defaultExpandAll={true}
                    // defaultExpandAll={true}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    checkStrictly={true}
                    defaultExpandedKeys={props.defaultExpandedKeys}
                  >
                    {renderTreeNodes(branchList)}
                  </Tree>:null)
                  : <div>
                    {
                      userLists && userLists.length>0 && userLists.map((v,i)=>{
                        return <div className="renderTree_list" style={{color:`${props.truenameId == v.id ? "#448BFF" : ""}`}} key={i} onClick={defOnClick.bind(this,v)}>{v.userName}</div>
                      })
                    }
                  </div>
                }
              </div>
            </Card> 
          </Col>
          <Col span={16}>
            <Card style={{...styleHeight}}>
              <Row>
                {authority('addUser') ?
                  <Button type="primary"  onClick={addOnClick.bind(this,'staff')}  disabled={status} style={{margin: '20px 0 0 20px'}}><Icon type="plus" />新增工作人员</Button>
                  : null
                }
                {/* <Button type="primary" style={{"float":"right"}}  onClick={addOnClick.bind(this,'staff')}  disabled={status}><Icon type="plus" />新增工作人员</Button> */}
                {/* //<Button  type="danger" style={{...styleColors}} disabled={!hasSelected}>批量删除</Button> */}
              </Row>
              {
                !status?<Table className="mt1"  loading={loading} dataSource={userList} rowKey={(record => record.id)} columns={columns} pagination={pagination}/>:<Row>
                  <div className="kong-branch"></div>
                  <div className="kong-branch-text">请选择左侧组织节点</div>
                </Row>       
              }
              
            </Card>  
          </Col>
          <Modal
            visible={visible}
            footer={null}
            //closable={false}
            onCancel={modalCancel}
            width={700}
            title={visiblename==1 ? add=="add" ? "新增子部门" : "编辑部门" : visiblename == 2 ? editId && disableds ? "人员详情" : editId ? "编辑人员" : "新增人员": "更改部门"}
          >
            {visiblename==1 ? <Form id="area">
              <FormItem {...formItemLayout} label="上级部门" required>
                <div>{rootNodeName || add=="edit" && branchInfos && branchInfos.parentName || branchInfos && branchInfos.deptName || "-" }</div>
              </FormItem>
              <FormItem {...formItemLayout} label={add=="edit"?"编辑部门名称":"新增部门名称"}>
                {getFieldDecorator('deptName',{
                  rules:[{required: true, message: "请输入部门名称"}],
                  initialValue: add=="edit" && branchInfos && branchInfos.deptName || "" 
                })(
                  <Input  type="text" maxLength={20} placeholder={"请输入部门名称"} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="可查看部门范围">
                {getFieldDecorator('type',{
                  rules:[{required: true, message: '请选择部门范围'}],
                  initialValue: add=="edit" && branchInfos && branchInfos.type || add=="add" && 1
                })(
                  <RadioGroup onChange={RadioGrouponChange}>
                    {/* <Radio value={3}>所有部门</Radio> */}
                    <Radio value={1}>本部门及以下部门</Radio>
                    <Radio value={2}>指定部门</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              {(add=="edit" && RadioGroupon == 1 || RadioGroupon == 3) || (add=="add" && RadioGroupon == 1|| RadioGroupon == 3)? null :<FormItem {...formItemLayout} label="可查看通讯录">    
                <Tree
                  defaultExpandAll={true}
                  checkable
                  checkStrictly={true}
                  onCheck={addressOnCheck}
                  checkedKeys={addressSelectedKeys}
                  //selectedKeys={addressSelectedKeys}
                >
                  {renderTreeNodess(branchList)}
                </Tree>
              </FormItem>
              }
              <FormItem wrapperCol={{ span: 12, offset: 3 }}>
                <Button type="primary" loading={loading} onClick={handleSubmit} className="mr1">确定</Button>
                <Button type="ghost" onClick={handleBack}>返回</Button>
              </FormItem>
            </Form>: visiblename == 2 ? <Form id="area">
              <FormItem {...formItemLayout} label="部门名称" required>
                <div>{disableds && info.deptName || rootNodeName || branchInfos && branchInfos.deptName || "-" }</div>
              </FormItem> 
              <FormItem {...formItemLayout} label="姓名">
                {getFieldDecorator('userName',{
                  rules:[{required: true, message: '请输入姓名'},{
                    pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
                    message: '请输入10字以内中英文数字'
                  }],
                  initialValue: info && info.userName || ""
                })(
                  <Input maxLength={10} placeholder="请输入姓名"  disabled={disableds}/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="手机号">
                {getFieldDecorator('userPhone',{
                  rules:[{required: true, message: '请输入手机号'},{
                    type: "string",
                    pattern:/^1(3|4|5|6|7|8|9)\d{9}$/,
                    message: '请输入11位手机号码!' }],
                  initialValue: info && info.userPhone || ""
                })(
                  <Input maxLength={11} placeholder="请输入手机号" disabled={disableds || props.userPhoneStatus}/>
                )}
              </FormItem>
            
              <FormItem {...formItemLayout} label="角色">
                {getFieldDecorator('roleIds',{
                  initialValue: info && info.userRoles || []
                })(
                  <Select
                    placeholder="请选择角色" 
                    //notFoundContent="没有数据"
                    getPopupContainer={() => document.getElementById('area')}
                    mode="multiple"
                    onChange={(value, option) => {handleChanges.bind(this)(value, option)}}
                    disabled={disableds}
                  >
                    {props.list &&props.list.length>0&&props.list.map((v,i)=>{
                      return <Option value={v.roleName} key={i} id={v.id}>{v.roleName}</Option>
                    })}
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="性别">
                {getFieldDecorator('sex',{
                  rules:[{required: true, message: '请选择性别'}],
                  initialValue: info && info.sex || undefined
                })(
                  <Select placeholder="请选择性别" getPopupContainer={() => document.getElementById('area')} disabled={disableds}>
                    <Option value={1}>男</Option>
                    <Option value={2}>女</Option>
                    <Option value={3}>未知</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="账号状态">
                {getFieldDecorator('status',{
                  rules:[{required: true, message: '请选择状态'}],
                  initialValue: info && info.status || 1
                })(
                  <RadioGroup disabled={disableds}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={2}>禁用</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              {editId&&info.basiceName?
                <FormItem {...formItemLayout} label="担任管理员">
                  <div>{info.basiceName}</div>
                </FormItem>:''
              }
              {editId&&info.teamName?
                <FormItem {...formItemLayout} label="担任队长">
                  <div>{info.teamName}</div>
                </FormItem>:''
              } 
              <FormItem {...formItemLayout} label="可查看中心/所/联盟/站/点">
                <div className="community_style">
                  <Menus {...menusProps}/>
                  {/* <Menus allMenus={communityList} id={'menu'} infoMenu={communityIofo} callback={onCheckCommunity.bind(this)} disabled={disableds}/> */}
                </div>
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 3 }}>
                {
                  disableds ? "" : <Button type="primary" loading={loading} onClick={handleSubmits} className="mr1">确定</Button>
                }
                <Button type="ghost" onClick={handleBack}>返回</Button>
              </FormItem>
            </Form>:<Form>
              <FormItem {...formItemLayout} label="当前部门" required>                   
                <div>{rootNodeName || branchInfos && branchInfos.deptName || "-" }</div>
              </FormItem>
              <FormItem {...formItemLayout} label="迁移部门" required>
                <Tree
                  // defaultExpandAll={true}
                  onSelect={updateDepartmentOnCheck}
                  selectedKeys={updateDepartmentSelectedKeys}
                  defaultExpandedKeys={props.defaultExpandedKeys}
                >
                  {renderTreeNodess(branchList)}
                </Tree>
              </FormItem>

              <FormItem wrapperCol={{ span: 12, offset: 3 }}>
                <Button type="primary" loading={loading} onClick={updateDepartmentSubmit} className="mr1">确定</Button>
                <Button type="ghost" onClick={handleBack}>返回</Button>
              </FormItem>
            </Form>}
                
          </Modal>
        </Row></div>
        : <div className="kong-tu">
          <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
        </div>
      }
     
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.addressModel,
    loading: state.loading.models.addressModel,
  };
}
export default connect(mapStateToProps)(Form.create()(Address));
