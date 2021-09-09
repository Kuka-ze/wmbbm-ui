import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Select, Input, message, Row, Col, Modal } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import WangEditor from '../../components/wangEditor';
import Image from '../../components/Image/';
import Map from '../../components/Map/index.js';

function IndexAddEditView(props) {
  let { form, loading, dispatch, detail = {}, id, areaTree = [], typeDrop = [], notice_remark, typeImgs, pageType, address, map, show, cityName } = props;
  const { getFieldDecorator, validateFields } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '文明宣传',
    }, {
      name: '文化场馆',
      href: 'culturalVenues'
    }, {
      name: props.id ? pageType == 'edit' ? '编辑' : '详情' : '新增',
    }
    ]
  }
  /** 布局 */
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 },
  }
  const formItemLayout1 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  //提交
  function handleSubmit(e) {
    validateFields((err, values) => {
      let text = notice_remark.split('<p>').join("").split('</p>').join("").split('<br>').join("");
      if (err) {
        return;
      }
      if (!text) {
        message.warning('详情内容不能为空');
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
        venueContent: notice_remark,
        venueImage: task_image && task_image.length > 0 ? task_image.join(',') : '',
        lng: map.split(",")["0"],
        lat: map.split(",")["1"],
        address: address,
      };
      delete data.task_image;
      delete data.remark;
      console.log("data:", data);
      // return true;
      if (id) {
        data.id = id;
        dispatch({
          type: 'CulturalVenuesAddEditViewModel/ajaxEdit',
          payload: data
        });
      } else {
        dispatch({
          type: 'CulturalVenuesAddEditViewModel/ajaxAdd',
          payload: data
        });
      }
    });
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  const getValues = {
    getValues: (value) => {
      dispatch({
        type: "CulturalVenuesAddEditViewModel/concat",
        payload: {
          notice_remark: value
        }
      })
    },
    content: "",
    imgSize: 3 //默认限制图片大小是 3M
  }
  //图片上传
  function handleImage(id, fileList) {
    form.setFieldsValue({ task_image: fileList })
    dispatch({
      type: "CulturalVenuesAddEditViewModel/concat",
      payload: {
        detail: {
          ...detail,
          task_image: fileList
        }
      }
    })
  }
  //点击放大图片
  function handlePreview(src) {
    props.dispatch({
      type: 'CulturalVenuesAddEditViewModel/concat',
      payload: {
        previewVisible: true,
        previewImage: src
      }
    });
  }
  //隐藏放大的图片
  function handleImgCancel() {
    props.dispatch({
      type: 'CulturalVenuesAddEditViewModel/concat',
      payload: {
        previewVisible: false,
        previewImage: ''
      }
    });
  }
  /** 地图 */
  //地图显示
  function handleClick(e) {
    dispatch({
      type: 'CulturalVenuesAddEditViewModel/concat',
      payload: {
        show: Math.random(),
      }
    });
  }
  function handleMap(e, address) {
    dispatch({
      type: 'CulturalVenuesAddEditViewModel/concat',
      payload: {
        map: e,
        address: address,
        changeMap: true,
      }
    });
    form.setFieldsValue({ address: address })
  }
  /** 地图 end */
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Form>
          <Map type={show} data={'杭州市|一号线'} cityName={cityName} handleMap={handleMap} />
          <Form.Item label="选择中心" {...formItemLayout}>
            {getFieldDecorator('centerId', {
              initialValue: detail.centerId ? detail.centerId : undefined,
              rules: [{ required: true, message: '请选择中心!' }],
            })(
              pageType != 'view' ? <Select placeholder="请选择中心">
                {areaTree && areaTree.length > 0 ? areaTree.map((value, index) => {
                  return <Select.Option key={value.id + ""} value={value.id + ""}>{value.centerName}</Select.Option>
                }) : ''}
              </Select> : <div>{detail.centerName || '-'}</div>
            )}
          </Form.Item>
          <Form.Item label="场馆名称" {...formItemLayout}>
            {getFieldDecorator('venueName', {
              initialValue: detail.venueName,
              rules: [{ required: true, message: '请输入场馆名称!', whitespace: true }],
            })(
              pageType != 'view' ? <Input type="text" placeholder="请输入场馆名称" maxLength={30} /> : <div>{detail.venueName || '-'}</div>
            )}
          </Form.Item>
          <Form.Item label="选择场馆类型" {...formItemLayout}>
            {getFieldDecorator('venueType', {
              initialValue: detail.venueType ? detail.venueType : undefined,
              rules: [{ required: true, message: '请选择场馆类型!' }],
            })(
              pageType != 'view' ? <Select placeholder="请选择场馆类型">
                {typeDrop && typeDrop.length > 0 ? typeDrop.map((value, index) => {
                  return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                }) : ''}
              </Select> : <div>{detail.venueTypeName || '-'}</div>
            )}
          </Form.Item>
          <Form.Item label="场馆封面图片" {...formItemLayout} extra={pageType != 'view' ? "建议封面尺寸96x96px" : ''}>
            {getFieldDecorator('task_image', {
              initialValue: detail.task_image,
              rules: [{ required: false, message: '请上传场馆封面图片!' }],
            })(
              pageType != 'view' ? <Image file={detail.task_image ? detail.task_image : []} handleImage={handleImage.bind(this)} size={1} /> :
                <div>{detail.task_image && detail.task_image.length > 0 ? <Row type="flex" justify="start">{
                  detail.task_image.map((item, index) => {
                    return <Col key={index} style={{ marginRight: '10px' }}><img onClick={handlePreview.bind(this, item.url)} src={item.url} style={{ width: '100px', height: '100px', cursor: 'pointer' }} /></Col>
                  })
                }</Row> : '-'}</div>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout1} label="详细内容" required>
            {getFieldDecorator('remark', {
              initialValue: detail.venueContent,
              // rules: [{
              //   required: true,
              //   message: '请输入详细内容!',
              // }],
            })(
              pageType != 'view' ? <div>
                <div style={{ color: '#333' }}>如需粘贴文案到此处，请务必选择<span style={{ color: 'red' }}>右键粘贴为纯文本</span>，图片请使用下方按钮进行上传。</div>
                <WangEditor {...getValues} content={detail.venueContent || ''} />
              </div> : <div dangerouslySetInnerHTML={{ __html: notice_remark ? notice_remark : '-' }}></div>
            )}
          </Form.Item>
          <Form.Item label="场馆位置" {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: address,
              rules: [{ required: true, message: '请获取场馆位置!' }],
            })(
              pageType != 'view' ? <Button type="primary" onClick={handleClick}>获取地址</Button> : <span></span>
            )}
            <div>{address ? address : null}</div>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
            {pageType != 'view' ? <Button type="primary" onClick={handleSubmit} loading={loading} className="mr1">提交</Button> : ''}
            <Button onClick={handleBack}>{pageType != 'view' ? "取消" : "返回"}</Button>
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
    ...state.CulturalVenuesAddEditViewModel,
    loading: state.loading.models.CulturalVenuesAddEditViewModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEditView));