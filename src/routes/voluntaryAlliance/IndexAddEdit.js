import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Row, Col, Select, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import Image from '../../components/Image/index';
import Map from '../../components/Map/index.js';
const { TextArea } = Input;

function IndexAddEdit(props) {
  let { form, loading, dispatch, detail = {}, areaTree = [], options = [], address, show, cityName, map, userList = [], uuid } = props;
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '志愿队伍管理',
    }, {
      name: '志愿联盟管理',
      href: 'voluntaryAlliance'
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

  //联盟管理员
  const formItemLayout2 = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 18
    },
  }
  const formItemLayoutWithOutLabel = {
    wrapperCol: { span: 18, offset: 5 },
    // style: { maxWidth: '900px' }
  }
  function add(k) {
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    dispatch({
      type: 'VoluntaryAllianceAddEditModel/concat',
      payload: {
        uuid: uuid,
        editStatus: true
      }
    });
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  //提交
  function handleSubmit(e) {
    validateFields((err, values) => {
      if (err) {
        return;
      }
      //图片
      let task_image = [];
      let imgsLen = values.task_image && values.task_image.length;
      if (values.task_image !== undefined && imgsLen !== 0) {
        for (let i = 0; i < imgsLen; i++) {
          if (values.task_image[i].response) {
            task_image[i] = values.task_image[i].response.data.filepath
          } else {
            task_image[i] = values.task_image[i].url
          }
        }
      }
      //成员id
      const getItems = () => values.keys && values.keys.length>0 && values.keys.map((k, index) => {
        return Object.prototype.toString.call(values.adminArr[k]) == "[object String]"  && userList && userList.length>0 && userList[k] && userList[k].userId && values.adminArr[k] ==  userList[k].userName ? userList[k].userId  : values.adminArr[k]
      })
      let data = {
        ...values,
        leagueImg: task_image && task_image.length > 0 ? task_image.toString() : '',
        leagueAdminId: values.leagueAdminId == detail.userName ? detail.leagueAdminId : values.leagueAdminId,
        centerId:values.centerId == detail.centerName ? detail.centerId : values.centerId,
        lon: map?map.split(",")["0"]:'',
        lat: map?map.split(",")["1"]:'',
        address: address,
        adminArr: getItems()
      };
      delete data.task_image;
      if (props.id) {
        data.id = props.id;
        dispatch({
          type: 'VoluntaryAllianceAddEditModel/ajaxEdit',
          payload: data
        });
      } else {
        dispatch({
          type: 'VoluntaryAllianceAddEditModel/ajaxAdd',
          payload: data
        });
      }
    });
  }

  function remove(k) {
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  //图片上传
  function handleImage(id, fileList) {
    form.setFieldsValue({ task_image: fileList })
  }

  /** 筛选 */
  function handleOnSearch(value){
    let timer;
    if (!timer) {
      timer = setTimeout(function(){
        searchValue(value)
        timer = null
      },100)
    }
  }
  function searchValue(value){
    const datas = [] 
    const {optionsAll} =props
    // 对optionsAll进行遍历，将符合搜索条件的数据放入datas中
    optionsAll.forEach(item => {
      if (item.userNameAll.indexOf(value) > -1) {
        datas.push(item)
      }
    })
    // 然后只显示符合搜索条件的所有数据中的前100条
    dispatch({
      type: 'VoluntaryAllianceAddEditModel/concat',
      payload: {
        options: datas.slice(0,100)
      }
    });
  }
  function handleOnBlur(){
    dispatch({
      type: 'VoluntaryAllianceAddEditModel/concat',
      payload: {
        options: props.optionsAll.slice(0,100)
      }
    });
  }
  //转换
  function zhuan(id) {
    let user_name;
    areaTree && areaTree.length > 0 && areaTree.map((v, i) => {
      if (v.key == id) {
        user_name = detail.centerId
      }
    })
    return user_name
  }

  function lunh(id){
    let userName;
    options && options.length>0 && options.map((v,i)=>{
      if(v.id==id){
        userName = userList.id
      }
    })
    return userName
  }

  getFieldDecorator('keys', { initialValue: userList && userList.length > 0 ? userList.map((item, index) => index) : [0] });
  const keys = getFieldValue('keys');
  const formItems = keys.map((k, index) => {
    return (
      <div
        key={index}
      >
        <Row gutter={10} style={{ paddingLeft: '0.4%' }}>
          <Col span={14}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="联盟管理员" {...formItemLayout2}>
                  {getFieldDecorator(`adminArr[${k}]`, {
                    initialValue: !lunh(userList && userList.length > 0 && k < userList.length && userList[k].id) && userList && userList.length > 0 && k < userList.length && userList[k].userName != null && userList[k].userName  || undefined,
                    rules: [{ required: true, message: "请选择姓名&手机号码!" }]
                  })(
                    <Select placeholder="请选择姓名&手机号码" onChange={handleSelectChange}
                      showSearch
                      filterOption={false}
                      onSearch={handleOnSearch}
                      onBlur={handleOnBlur}
                      // optionFilterProp="children"
                      // filterOption={(input, option) =>
                      //   option.props.option_val.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      // }
                    >
                      {options && options.length > 0 ? options.map((item, index) => <Select.Option value={item.key} key={index} k={k} option_val={item.userNameAll}>{item.value}</Select.Option>) : ''}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            {keys.length > 1 ? (
              <Button type="dashed" onClick={() => remove(k)} style={{ marginTop: '4px' }} disabled={userList && userList.length > 0 && k < userList.length ? userList[k].is_super == 1 ? true : false : false}><Icon type="minus" /> 删除成员</Button>
            ) : null}
          </Col>
        </Row>
      </div>
    );
  });
  function handleSelectChange(value, name) {
    let mobiles = `mobile[${name.props.k}]`;
    props.form.setFieldsValue({
      [mobiles]: name.props.mobile,
    });

  }
  /** 地图 */
  //地图显示
  function handleClick(e) {
    dispatch({
      type: 'VoluntaryAllianceAddEditModel/concat',
      payload: {
        show: Math.random(),
      }
    });
  }
  function handleMap(e, address) {
    dispatch({
      type: 'VoluntaryAllianceAddEditModel/concat',
      payload: {
        map: e,
        address: address,
        changeMap: true,
      }
    });
    form.setFieldsValue({ address: address })
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          <Form.Item label="联盟名称" {...formItemLayout}>
            {getFieldDecorator('leagueName', {
              initialValue: detail.leagueName,
              rules: [{ required: true, message: '请输入联盟名称!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入联盟名称" maxLength={20} />
            )}
          </Form.Item>
          {props.id?
            <Form.Item label="所属中心" {...formItemLayout}>
              {getFieldDecorator('centerId', {
                initialValue: zhuan(detail.centerId) || detail.centerName,
                rules: [{ required: true, message: '请选择所属中心!' }],
              })(
                <Select placeholder="请选择所属中心"
                disabled
                >
                  {areaTree && areaTree.length > 0 ? areaTree.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
                </Select>
              )}
            </Form.Item>:<Form.Item label="所属中心" {...formItemLayout}>
              {getFieldDecorator('centerId', {
                initialValue: zhuan(detail.centerId) || detail.centerName,
                rules: [{ required: true, message: '请选择所属中心!' }],
              })(
                <Select placeholder="请选择所属中心"
                >
                  {areaTree && areaTree.length > 0 ? areaTree.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
                </Select>
              )}
            </Form.Item>}
          <Form.Item label="联盟封面图" {...formItemLayout}>
            {getFieldDecorator('task_image', {
              initialValue: detail.leagueImg ? [{ url: detail.leagueImg, uid: "rc-img-01" }] : [],
              rules: [{ required: false, message: '请上传联盟封面图!' }],
            })(
              <Image file={detail.leagueImg ? [{ url: detail.leagueImg, uid: "rc-img-01" }] : []} handleImage={handleImage.bind(this)} size={1} />
            )}
          </Form.Item>
          <Form.Item label="联盟介绍" {...formItemLayout}>
            {getFieldDecorator('leagueRemark', {
              initialValue: detail.leagueRemark,
              rules: [{ required: true, message: '请输入联盟介绍!' }],
            })(
              <TextArea rows={4} placeholder="请输入联盟介绍" maxLength="1000" />
            )}
          </Form.Item>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={add} style={{ width: '30%' }}><Icon type="plus" /> 增加成员</Button>
          </Form.Item>
          <Form.Item label="联盟位置" {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: address,
              rules: [{ required: false, message: '请获取中心位置!' }],
            })(
              <Button type="primary" onClick={handleClick}>获取地址</Button>
            )}
            <div>{address ? address : null}</div>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
            <Button type="primary" onClick={handleSubmit} loading={loading}>提交</Button>
            <Button className="ml1" onClick={handleBack}>取消</Button>
          </Form.Item>
        </Form>
      </Card>
      <Map type={show} data={'杭州市|一号线'} cityName={cityName} handleMap={handleMap} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.VoluntaryAllianceAddEditModel,
    loading: state.loading.models.VoluntaryAllianceAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));