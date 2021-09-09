import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Cascader, Row, Col, Select, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import Image from '../../components/Image/';
import Map from '../../components/Map/index.js';
const { TextArea } = Input;

function IndexAddEdit(props) {
  let { form, loading, dispatch, detail = {}, areaTree, show, cityName, address, map, options = [], userList = [], uuid } = props;
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '基础数据',
    }, {
      name: '所管理',
      href: 'managed'
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
  //图片上传
  function handleImage(id, fileList) {
    form.setFieldsValue({ task_image: fileList })
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
        return Object.prototype.toString.call(values.user[k]) == "[object String]"  && userList && userList.length>0 && userList[k] && userList[k].id && values.user[k] ==  userList[k].userName ? userList[k].id  : values.user[k]
      })
      let data = {
        ...values,
        centerId: values && values.areaTree && values.areaTree[0] ? values.areaTree[0] : '',
        image: task_image && task_image.length > 0 ? task_image.toString() : '',
        lon: map.split(",")["0"],
        lat: map.split(",")["1"],
        address: address,
        memberId: getItems()
      };
      delete data.areaTree;
      delete data.task_image;
      delete data.keys;
      delete data.user;
      // console.log("qq:", data);
      // return true;
      if(props.id){
        /** 编辑 */
        dispatch({
          type: 'ManagedAddEditModel/ajaxEdit',
          payload: {...data, id: props.id}
        });
      }else{
        /** 新增 */
        dispatch({
          type: 'ManagedAddEditModel/ajaxAdd',
          payload: data
        });
      }
    });
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  /** 地图 */
  //地图显示
  function handleClick(e) {
    dispatch({
      type: 'ManagedAddEditModel/concat',
      payload: {
        show: Math.random(),
      }
    });
  }
  function handleMap(e, address) {
    dispatch({
      type: 'ManagedAddEditModel/concat',
      payload: {
        map: e,
        address: address,
        changeMap: true,
      }
    });
    form.setFieldsValue({ address: address })
  }
  /** 地图 end */

  /** 动态增删表格 */
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
      type: 'ManagedAddEditModel/concat',
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
      type: 'ManagedAddEditModel/concat',
      payload: {
        options: datas.slice(0,100)
      }
    });
  }
  function handleOnBlur(){
    dispatch({
      type: 'ManagedAddEditModel/concat',
      payload: {
        options: props.optionsAll.slice(0,100)
      }
    });
  }
  //转换
  function lunh(id){
    let userName;
    options && options.length>0 && options.map((v,i)=>{
      if(v.id==id){
        userName=userList.id
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
                <Form.Item label="所管理员" {...formItemLayout2}>
                  {getFieldDecorator(`user[${k}]`, {
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
                        {options && options.length > 0 ? options.map((item, index) => <Select.Option value={item.id} key={index} k={k} option_val={item.userNameAll}>{item.userName}</Select.Option>) : ''}
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
  /** 动态增删表格 end */

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          <Map type={show} data={'杭州市|一号线'} cityName={cityName} handleMap={handleMap} />
          <Form.Item label="所名称" {...formItemLayout}>
            {getFieldDecorator('placeName', {
              initialValue: detail.placeName,
              rules: [{ required: true, message: '请输入所名称!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入所名称" maxLength={20} />
            )}
          </Form.Item>
          <Form.Item label="所属中心" {...formItemLayout}>
            {getFieldDecorator('areaTree', {
              initialValue: detail.centerId ? [+detail.centerId] : [],
              rules: [{ required: true, message: '请选择所属中心!' }],
            })(
              <Cascader placeholder="请选择所属中心" options={areaTree} fieldNames={{ label: 'value', value: 'key', children: 'children' }}  disabled={props.id ? true : false}/>
            )}
          </Form.Item>
          <Form.Item label="所封面图" {...formItemLayout}>
            {getFieldDecorator('task_image', {
              initialValue: detail.task_image,
              rules: [{ required: false, message: '请上传所封面图!' }],
            })(
              <Image file={detail.task_image ? detail.task_image : []} handleImage={handleImage.bind(this)} size={1} />
            )}
          </Form.Item>
          <Form.Item label="所介绍" {...formItemLayout}>
            {getFieldDecorator('content', {
              initialValue: detail.content,
              rules: [{ required: true, message: '请输入所介绍!' }],
            })(
              <TextArea rows={4} placeholder="请输入所介绍" maxLength="1000" />
            )}
          </Form.Item>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={add} style={{ width: '30%' }}><Icon type="plus" /> 增加成员</Button>
          </Form.Item>
          <Form.Item label="所位置" {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: address,
              rules: [{ required: false, message: '请获取所位置!' }],
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
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.ManagedAddEditModel,
    loading: state.loading.models.ManagedAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));