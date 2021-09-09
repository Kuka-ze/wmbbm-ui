'use strict';
import React from 'react';
import { Form, Checkbox, Row  } from 'antd';
import './index.less';
class Menus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAll: false,
      indeterminate: false,
      menuChecked: {},
      level1:[],
      level2:[],
      levelClick1:[],
      levelClick2:[]
    };
    //console.log(props)
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if((this.props.allMenus != nextProps.allMenus) || (this.props.infoMenu != nextProps.infoMenu)) {
      //console.log(1111)
      let menuChecked = this.getCheckedObj(nextProps.allMenus);
      // console.log(nextProps.infoMenu,"1111111")
      // Object.keys(nextProps.infoMenu).map(key=>{
      //   console.log(menuChecked["xq_1"],"menuChecked[key]")
      //   menuChecked[key] = true;
      // });
      //console.log(1111)
      nextProps.infoMenu && nextProps.infoMenu.length>0 && nextProps.infoMenu.map(key=>{
        menuChecked[key] = true;
      });
      let menuSize = Object.keys(menuChecked).length;
      //console.log(menuChecked,"222222")
      let infoMenuSize =nextProps.infoMenu && nextProps.infoMenu.length //Object.keys(infoMenuChecked).length;
      //console.log(this.state.indeterminate,"2222222")
      if (menuSize == infoMenuSize) {
        this.setState({
          checkedAll: true,
        });
      }else{
        this.setState({
          checkedAll: false,
        });
      } 

      this.setState({
        menuChecked: menuChecked,
      });
      this.props.callback(this.props.id,menuChecked);
      //console.log(this.state.indeterminate)
      if (menuSize == infoMenuSize || infoMenuSize == 0) {
        this.setState({
          indeterminate: false,
        });
        return 
      }
      if(infoMenuSize > 0 && infoMenuSize) {
        this.setState({
          indeterminate: true,
        });
      }

    }
  }

  //二维数组转化为一维对象
  getCheckedObj (arr) {
    let obj = {};
    if(arr === undefined) {
      return {};
    }
    let level1=[]
    let level2=[]
    arr.map(vvv=>{
      //console.log(vvv)
      obj[vvv.id] = false;
      //console.log(vvv)
      level1.push(vvv.id)
      if (Array.isArray(vvv.children)) {
        vvv.children.map(vv=>{
          level2.push(vv.id)
          obj[vv.id] = false;
          if (Array.isArray(vv.children)) {
            vv.children.map(v => {
              obj[v.id] = false;
            });
          }
        });
      }
    });
    this.setState({
      level1,
      level2,
    })
    //console.log(obj,"122222")
    return obj;
  }

  all(e) {
    let menuChecked = this.getCheckedObj(this.props.allMenus);
    //console.log(menuChecked,"111")
    Object.keys(menuChecked).map(key=>{
      menuChecked[key] = e.target.checked ? true : false;
    });
    this.setState({
      menuChecked: menuChecked,
      checkedAll: e.target.checked ? true : false,
      indeterminate: false,
    });
    this.props.callback(this.props.id, menuChecked);
  }

  handleChange(n ,e) {
    //console.log(n)
    let menus = this.props.allMenus;
    let menuChecked = this.state.menuChecked;
    //console.log(menuChecked,"11111")
    if (n.lastIndexOf('-') > -1) {
      //二级选中/三级选中
      let arr=n.split('-');
      let a=arr[0],b=arr[1],c=arr[2];
      if(c){
        menuChecked[c] = e.target.checked ? true : false;
      }
      let oneChecked = false;
      let twoChecked = false;
      //console.log(a,"arr")
      if (arr[2] == undefined){
        //二级选中
        twoChecked = e.target.checked ? true : false;
        menuChecked[b] = twoChecked ? true : false;
        menus.map(vvv => {
          if (vvv.id == a) {
            if (Array.isArray(vvv.children)) {
              vvv.children.map(vv => {
                if (menuChecked[vv.id] == true) {
                  oneChecked = true;
                }
                if (vv.id == b) {
                  if (Array.isArray(vv.children)) {
                    vv.children.map(v => {
                      menuChecked[v.id] = e.target.checked ? true : false;  //操作按钮根据二级菜单的选中或取消
                    })
                  }
                }
              })
            }
          }
        });
      }else{
        //操作按钮选中
        menus.map(vvv => {
          if (vvv.id == a) {
            if (Array.isArray(vvv.children)) {
              vvv.children.map(vv => {
                if (vv.id == b) {
                  if (Array.isArray(vv.children)) {
                    vv.children.map(v => {
                      if (menuChecked[v.id] == true) {
                        twoChecked = true;
                      }
                    })
                  }
                }
              })
            }
          }
        });
      }
      menus.map(vvv => {
        if (vvv.id == a) {
          //console.log(vvv,"6666")
          if (Array.isArray(vvv.children)) {
            vvv.children.map(vv => {
              vv.children.map(v => {
                if (menuChecked[v.id] == true) {
                  oneChecked = true;
                }
              })
            })
          }
        }
      })
      menuChecked[a] = oneChecked ? true : false;
      menuChecked[b] = twoChecked ? true : false;
    } else {
      //点击一级菜单
      menuChecked[n] = e.target.checked ? true : false;
      //console.log(menuChecked)
      menus.map(vvv=>{
        if(vvv.id == n) {
          if (Array.isArray(vvv.children)) {
            vvv.children.map(vv=>{

              menuChecked[vv.id] = e.target.checked ? true : false; //二级菜单跟着一级菜单选中或者取消
              if (Array.isArray(vv.children)) {
                vv.children.map(v => {
                  menuChecked[v.id] = e.target.checked ? true : false; //操作按钮跟着一级菜单选中或者取消
                })
              }
            })
          }
        }
      });
    }
    //检查全选按钮情况
    //console.log(menuChecked)
    let allLength = Object.keys(menuChecked).length;//所有checkbox数量
    let trueLength = Object.values(menuChecked).filter(x => x).length;//所有值为true的数量
    this.setState({
      checkedAll:trueLength == allLength ? true : false,
      indeterminate: trueLength != 0 && trueLength != allLength ? true : false,
      menuChecked: menuChecked,
    });
    
    this.props.callback(this.props.id, menuChecked);
  }
  retract(v,name){
    //console.log(v)
    if(name=="1级"){
      if(this.state.levelClick1.includes(v)){
        this.state.levelClick1.splice(this.state.levelClick1.indexOf(v),1)
        this.setState({
          levelClick1:[...this.state.levelClick1]
        })
      }else{
        this.setState({
          levelClick1:[v,...this.state.levelClick1]
        })
      }
    }else if(name=="2级"){
      if(this.state.levelClick2.includes(v)){
        this.state.levelClick2.splice(this.state.levelClick2.indexOf(v),1)
        this.setState({
          levelClick2:[...this.state.levelClick2]
        })
      }else{
        this.setState({
          levelClick2:[v,...this.state.levelClick2]
        })
      }
      
    }
  }
  //查找
  lookup(id,name){
    if(name=="1级"){
      if(this.state.levelClick1.includes(id)){
        return {"display":"none"}
      }
    }else if(name=="2级"){
      if(this.state.levelClick2.includes(id)){
        //console.log(111)
        return {"display":"none"}
      }
    }
    //return false
  }
  render() {
    const {allMenus} = this.props;
    const { getFieldDecorator } = this.props.form;
    let property_company_name = sessionStorage.getItem('property_company_name');
    return (
      <div>
        {
          allMenus && allMenus.length>0 ? <div>
            <Checkbox
              disabled = {this.props.disabled ? true : false}
              indeterminate={this.state.indeterminate} checked={this.state.checkedAll} onChange={this.all.bind(this)}>{property_company_name}</Checkbox>
            {allMenus.map((item,index)=>{
              return (
                <div key={index}>
                  <Row className="mt1 sanjiao_zhu" key={`row-${item.id}`}>
                    {
                      this.lookup(item.id,"1级") ? <div className="sanjiao_shu_right" onClick={this.retract.bind(this,item.id,"1级")}></div> : <div className="sanjiao_shu_xia" onClick={this.retract.bind(this,item.id,"1级")}></div>
                    }
                    {getFieldDecorator(`menu-${index}`,{})(
                      <Checkbox
                        disabled = {this.props.disabled ? true : false}
                        checked={this.state.menuChecked[item.id]}
                        key={item.id}
                        onChange={this.handleChange.bind(this, `${item.id}`)}>
                        {item.name}</Checkbox>
                    )}
                  </Row>
                  {
                    Array.isArray(item.children) ? item.children.map((items,indexs)=>{
                      return (
                        <div key={`row-${item.id}-${indexs}`} style={(this.lookup(item.id,"1级"))}>
                          <Row style={{marginLeft:30}} className="mt1 sanjiao_zhu" key={`rows-${index}`}>
                            {
                              this.lookup(items.id,"2级") ? <div className="sanjiao_shu_right" onClick={this.retract.bind(this,items.id,"2级")}></div> : <div className="sanjiao_shu_xia" onClick={this.retract.bind(this,items.id,"2级")}></div>
                            }
                            {getFieldDecorator(`menuItem-${item.id}-${items.id}`,{})(
                              <Checkbox
                                disabled = {this.props.disabled ? true : false}
                                checked={this.state.menuChecked[items.id]}
                                key={items.id}
                                onChange={this.handleChange.bind(this, `${item.id}-${items.id}`)}>
                                {items.name}</Checkbox>
                            )}
                          </Row>
                          <Row style={{marginLeft:60}} key={`rows-${index}-${indexs}`}>
                            <div style={(this.lookup(items.id,"2级"))}>
                              {Array.isArray(items.children) ? items.children.map((itm,idx)=>{
                                return getFieldDecorator(`btn-${item.id}-${items.id}-${itm.id}`,{})(
                                  <Checkbox
                                    disabled = {this.props.disabled ? true : false}
                                    checked={this.state.menuChecked[itm.id]}
                                    key={itm.id} onChange={this.handleChange.bind(this, `${item.id}-${items.id}-${itm.id}`)}>
                                    {itm.name}</Checkbox>
                                )
                              }) : "" }
                            </div>
                          </Row>
                        </div>
                      )
                    }) : "" 
                  }
                </div>
              )
            })}
          </div> :""
        }
        
      </div>
    );
  }
}
Menus = Form.create()(Menus);
export default Menus;
