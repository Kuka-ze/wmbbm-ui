import React from 'react';
import { connect } from 'dva';
import { Form, Col, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch({
      type: 'CommunityModel/getCommunityList',
      payload: {}
    });
  }

  selectChange(name,val){
    const searchModel = 'CommunityModel';
    let validate=["community_id","group","building","unit","room"];
    if(name=='community'){
      this.props.form.resetFields(['group','building','unit','room']);
      if(val){
        const param={
          community_id:val
        }
        this.props.dispatch({
          type: searchModel+'/getGroupList',
          payload: param,
        });
      }else{
        this.props.dispatch({
          type: searchModel+'/initValue',
        });
      }
    }
    if(name=='group'){
      this.props.form.resetFields(['building','unit','room']);
      this.props.form.validateFields(validate,(err, values) => {
        const param = {
          community_id: values.community_id,
          group: val,
        }
        this.props.dispatch({
          type: searchModel+'/getBuildingList',
          payload: param,
        });
      })
    }
    if(name=='building'){
      this.props.form.resetFields(['unit','room']);
      this.props.form.validateFields(validate,(err, values) => {
        const param = {
          community_id: values.community_id,
          group: values.group,
          building:val,
        }
        this.props.dispatch({
          type: searchModel+'/getUnitList',
          payload: param,
        });
      })
    }
    if(name=='unit'){
      this.props.form.resetFields(['room']);
      this.props.form.validateFields(validate,(err, values) => {
        const param = {
          community_id: values.community_id,
          group: values.group,
          building:values.building,
          unit:val,
        }
        this.props.dispatch({
          type: searchModel+'/getRoomList',
          payload: param,
        });
      })
    }
  }


  render(){
    let { communityList, groupData, buildingData, unitData, roomData,allDatas} = this.props;
    let { community, group, building, unit, room, formItem} = allDatas;
    const formItemLayout = formItem?formItem:{labelCol: {span: 6},wrapperCol: {span: 16}};
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {community?
          <Col span={community.span?community.span:6}>
            <FormItem label={community.label?community.label:"房屋信息"} {...formItemLayout}>
              {getFieldDecorator('community_id',{onChange:this.selectChange.bind(this,'community')})(<Select placeholder={community.placeholder?community.placeholder:"小区名称"}>
                <Option key={-1} value="">全部</Option>
                {communityList?communityList.map((value,index)=>{
                  return <Option key={index} value={value.id.toString()}>{value.name}</Option>
                }):''}
              </Select>)}
            </FormItem>
          </Col>
          :null}
        {group?
          <Col span={group.span?group.span:2} className="mr1">
            <FormItem>
              {getFieldDecorator('group',{onChange:this.selectChange.bind(this,'group')})(<Select className="mr1" placeholder={group.placeholder?group.placeholder:"苑\\期\\区"} notFoundContent="没有数据">
                {groupData?groupData.map((value, index) => {
                  return <Option key={index} value={value.name}>{value.name}</Option>
                }):''}
              </Select>)}
            </FormItem>
          </Col>
          :null}
        {building?
          <Col span={building.span?building.span:2} className="mr1">
            <FormItem>
              {getFieldDecorator('building',{onChange:this.selectChange.bind(this,'building')})(<Select className="mr1" placeholder={building.placeholder?building.placeholder:"幢"} notFoundContent="没有数据">
                {buildingData?buildingData.map((value, index) => {
                  return <Option key={index} value={value.name}>{value.name}</Option>
                }):''}
              </Select>)}
            </FormItem>
          </Col>
          :null}
        {unit?
          <Col span={unit.span?unit.span:2} className="mr1">
            <FormItem>
              {getFieldDecorator('unit',{onChange:this.selectChange.bind(this,'unit')})(<Select className="mr1" placeholder={unit.placeholder?unit.placeholder:"单元"} notFoundContent="没有数据">
                {unitData?unitData.map((value, index) => {
                  return <Option key={index} value={value.name}>{value.name}</Option>
                }):''}
              </Select>)}
            </FormItem>
          </Col>
          :null}
        {room?
          <Col span={room.span?room.span:2} className="mr1">
            <FormItem>
              {getFieldDecorator('room')(<Select className="mr1" placeholder={room.placeholder?room.placeholder:"室"} notFoundContent="没有数据">
                {roomData?roomData.map((value, index) => {
                  return <Option key={index} value={value.name}>{value.name}</Option>
                }):''}
              </Select>)}
            </FormItem>
          </Col>
          :null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.CommunityModel };
}
export default connect(mapStateToProps)(Community);
