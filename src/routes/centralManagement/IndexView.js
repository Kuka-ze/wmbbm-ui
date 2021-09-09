import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Cascader, Row, Col, Select, Icon, Modal } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import Image from '../../components/Image/';
import Map from '../../components/Map/index.js';
const { TextArea } = Input;

function IndexView(props) {
  let { form, loading, dispatch, detail = {}, areaTree, show, cityName, address, map, options = [], userList = [], uuid } = props;
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '基础数据',
    }, {
      name: '中心管理',
      href: 'centralManagement'
    }, {
      name: props.id ? '详情' : '新增',
    }
    ]
  }
  /** 布局 */
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 },
    // style: {
    //   marginBottom: '10px'
    // }
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
      let data = {
        ...values,
        provinceCode: values && values.areaTree && values.areaTree[0] ? values.areaTree[0] : '',
        cityCode: values && values.areaTree && values.areaTree[1] ? values.areaTree[1] : '',
        areaCode: values && values.areaTree && values.areaTree[2] ? values.areaTree[2] : '',
        image: task_image && task_image.length > 0 ? task_image.toString() : '',
        lon: map.split(",")["0"],
        lat: map.split(",")["1"],
        address: address,
        memberId: values.user
      };
      delete data.areaTree;
      delete data.task_image;
      delete data.keys;
      delete data.user;
      // console.log("data:", data);
      // return true;
      if (props.id) {
        /** 编辑 */
        dispatch({
          type: 'CentralManagementViewModel/ajaxEdit',
          payload: { ...data, id: props.id }
        });
      } else {
        /** 新增 */
        dispatch({
          type: 'CentralManagementViewModel/ajaxAdd',
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
      type: 'CentralManagementViewModel/concat',
      payload: {
        show: Math.random(),
      }
    });
  }
  function handleMap(e, address) {
    dispatch({
      type: 'CentralManagementViewModel/concat',
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
      type: 'CentralManagementViewModel/concat',
      payload: {
        uuid: uuid,
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
  //转换
  function lunh(id) {
    let userName;
    options.map((v, i) => {
      if (v.id == id) {
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
                <Form.Item label="中心管理员" {...formItemLayout2}>
                  {getFieldDecorator(`user[${k}]`, {
                    initialValue: userList && userList.length > 0 && k < userList.length ? userList[k].id : undefined,
                    // initialValue: !lunh(userList && userList.length > 0 && k < userList.length && userList[k].id) && userList && userList.length > 0 && k < userList.length && userList[k].userName != null || undefined,
                    rules: [{ required: true, message: "请选择姓名&手机号码!" }]
                  })(
                    <div>{userList && userList.length > 0 && k < userList.length ? userList[k].userName : ''}</div>
                  )}
                </Form.Item>
              </Col>
            </Row>
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
//点击放大图片
function handlePreview(src) {
props.dispatch({
type: 'CentralManagementViewModel/concat',
payload: {
previewVisible: true,
previewImage: src
}
});
}
//隐藏放大的图片
function handleImgCancel() {
props.dispatch({
type: 'CentralManagementViewModel/concat',
payload: {
previewVisible: false,
previewImage: ''
}
});
}
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          <Map type={show} data={'杭州市|一号线'} cityName={cityName} handleMap={handleMap} />
          <Form.Item label="中心名称" {...formItemLayout}>
            {getFieldDecorator('centerName', {
              initialValue: detail.centerName,
              rules: [{ required: true, message: '请输入中心名称!', whitespace: true }],
            })(
              <div>{detail.centerName || '-'}</div>
            )}
          </Form.Item>
          <Form.Item label="所属区域" {...formItemLayout}>
            {getFieldDecorator('areaTree', {
              initialValue: detail.provinceCode ? [detail.provinceCode, detail.cityCode, detail.areaCode] : [],
              rules: [{ required: true, message: '请选择所属区域!' }],
            })(
              <div>{detail.provinceName || '-'}</div>
            )}
          </Form.Item>
          <Form.Item label="中心级别" {...formItemLayout}>
            {getFieldDecorator('level', {
              initialValue: detail.level,
              rules: [],
            })(
              <div>{detail.levelName || '-'}</div>
            )}
          </Form.Item>
          <Form.Item label="中心封面图" {...formItemLayout}>
            {getFieldDecorator('task_image', {
              initialValue: detail.task_image,
              rules: [{ required: false, message: '请上传中心封面图!' }],
            })(
              <div>{detail.image ? <img src={detail.image} style={{ width: '100px', height: '100px' }} onClick={handlePreview.bind(this, detail.image)}/> : '-'}</div>
            )}
          </Form.Item>
          <Form.Item label="中心介绍" {...formItemLayout}>
            {getFieldDecorator('content', {
              initialValue: detail.content,
              rules: [{ required: true, message: '请输入中心介绍!' }],
            })(
              <div>{detail.content || '-'}</div>
            )}
          </Form.Item>
          {formItems}
          <Form.Item label="中心位置" {...formItemLayout}>
            <div>{address ? address : '-'}</div>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
            <Button onClick={handleBack}>取消</Button>
          </Form.Item>
        </Form>
		<Modal visible={props.previewVisible} footer={null} onCancel={handleImgCancel.bind(this)}>
		<img alt="img" style={{ width: '100%' }} src={props.previewImage} />
		</Modal>
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.CentralManagementViewModel,
    loading: state.loading.models.CentralManagementViewModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexView));