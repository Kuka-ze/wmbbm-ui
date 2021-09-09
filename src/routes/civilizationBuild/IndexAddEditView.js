import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Select, Input, message, Radio, Row, Col, Modal } from 'antd';
const { TextArea } = Input;
import Breadcrumb from "../../components/Breadcrumb/index";
import WangEditor from '../../components/wangEditor';
import Image from '../../components/Image/';

function IndexAddEditView(props) {
  let { form, loading, dispatch, detail = {}, id, areaTree = [], typeDrop = [], notice_remark, typeImgs, pageType } = props;
  const { getFieldDecorator, validateFields } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '文明宣传',
    }, {
      name: '文明实践',
      href: 'civilizationBuild'
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
      if (values.typeImg == "2" && values.task_image.length < 3) {
        message.warning('请添加三张封面图');
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
        remark: notice_remark,
        buildImg: task_image
      };
      delete data.task_image;
      console.log("data:", data);
      if (id) {
        data.id = id;
        dispatch({
          type: 'CivilizationBuildAddEditViewModel/ajaxEdit',
          payload: data
        });
      } else {
        dispatch({
          type: 'CivilizationBuildAddEditViewModel/ajaxAdd',
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
        type: "CivilizationBuildAddEditViewModel/concat",
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
      type: "CivilizationBuildAddEditViewModel/concat",
      payload: {
        detail: {
          ...detail,
          task_image: typeImgs != 3 ? fileList : []
        }
      }
    })
  }
  //
  function onChangeFun(e) {
    let task_images = [];
    if (detail.task_image && detail.task_image.length > 0) {
      let task_image_one = detail.task_image.slice(0, 1);
      task_image_one.map((item, index) => {
        return task_images.push({ ...item, rand: Math.random() })
      });
    }
    dispatch({
      type: "CivilizationBuildAddEditViewModel/concat",
      payload: {
        typeImgs: e.target.value,
        detail: {
          ...detail,
          task_image: typeImgs != 3 ? task_images : []
        }
      }
    })
    form.setFieldsValue({ task_image: typeImgs != 3 ? task_images : [] })
  }
  //点击放大图片
  function handlePreview(src) {
    props.dispatch({
      type: 'CivilizationBuildAddEditViewModel/concat',
      payload: {
        previewVisible: true,
        previewImage: src
      }
    });
  }
  //隐藏放大的图片
  function handleImgCancel() {
    props.dispatch({
      type: 'CivilizationBuildAddEditViewModel/concat',
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
          <Form.Item label="文明实践名称" {...formItemLayout}>
            {getFieldDecorator('buildName', {
              initialValue: detail.buildName,
              rules: [{ required: true, message: '请输入文明实践名称!', whitespace: true }],
            })(
              pageType != 'view' ? <Input type="text" placeholder="请输入文明实践名称" maxLength={30} /> : <div>{detail.buildName || '-'}</div>
            )}
          </Form.Item>
          <Form.Item label="类型" {...formItemLayout}>
            {getFieldDecorator('buildTypeId', {
              initialValue: detail.buildTypeId ? detail.buildTypeId : undefined,
              rules: [{ required: true, message: '请选择类型!' }],
            })(
              pageType != 'view' ? <Select placeholder="请选择类型">
                {typeDrop && typeDrop.length > 0 ? typeDrop.map((value, index) => {
                  return <Select.Option key={value.id + ""} value={value.id + ""}>{value.name}</Select.Option>
                }) : ''}
              </Select> : <div>{detail.name || '-'}</div>
            )}
          </Form.Item>
          <Form.Item label="内容简介" {...formItemLayout}>
            {getFieldDecorator('describe', {
              initialValue: detail.describe,
              rules: [{ required: true, message: '请输入内容简介!', whitespace: true }],
            })(
              pageType != 'view' ? <TextArea rows={4} placeholder="请输入内容简介" maxLength={100} /> : <div>{detail.describe || '-'}</div>
            )}
          </Form.Item>
          <Form.Item label="封面图片" {...formItemLayout}>
            {getFieldDecorator('typeImg', {
              initialValue: typeImgs,
              rules: [{ required: true, message: '请选择封面图片!' }],
            })(
              pageType != 'view' ? <Radio.Group onChange={onChangeFun}>
                <Radio value="1">单图</Radio>
                <Radio value="2">三图</Radio>
                <Radio value="3">无封面图片（不建议）</Radio>
              </Radio.Group> : <div>{typeImgs == "1" ? "单图" : typeImgs == "2" ? "三图" : typeImgs == "3" ? "无封面图片（不建议）" : '-'}</div>
            )}
          </Form.Item>
          {typeImgs == "1" ?
            <Form.Item label="" wrapperCol={{ span: 8, offset: 3 }} extra={pageType != 'view' ? "建议封面尺寸220x144px" : ''}>
              {getFieldDecorator('task_image', {
                initialValue: detail.task_image,
                rules: [{ required: true, message: '请上传封面图片!' }],
              })(
                pageType != 'view' ? <Image file={detail.task_image ? detail.task_image : []} handleImage={handleImage.bind(this)} size={1} /> :
                  <div>{detail.task_image && detail.task_image.length > 0 ? <Row type="flex" justify="start">{
                    detail.task_image.map((item, index) => {
                      return <Col key={index} style={{ marginRight: '10px' }}><img onClick={handlePreview.bind(this, item.url)} src={item.url} style={{ width: '100px', height: '100px', cursor: 'pointer' }} /></Col>
                    })
                  }</Row> : '-'}</div>
              )}
            </Form.Item> : typeImgs == "2" ?
              <Form.Item label="" wrapperCol={{ span: 8, offset: 3 }} extra={pageType != 'view' ? "建议封面尺寸220x144px" : ''}>
                {getFieldDecorator('task_image', {
                  initialValue: detail.task_image,
                  rules: [{ required: true, message: '请上传封面图片!' }],
                })(
                  pageType != 'view' ? <Image file={detail.task_image ? detail.task_image : []} handleImage={handleImage.bind(this)} size={3} /> :
                    <div>{detail.task_image && detail.task_image.length > 0 ? <Row type="flex" justify="start">{
                      detail.task_image.map((item, index) => {
                        return <Col key={index} style={{ marginRight: '10px' }}><img onClick={handlePreview.bind(this, item.url)} src={item.url} style={{ width: '100px', height: '100px', cursor: 'pointer' }} /></Col>
                      })
                    }</Row> : '-'}</div>
                )}
              </Form.Item> : ''}
          <Form.Item {...formItemLayout1} label="详细内容" required>
            {getFieldDecorator('remark', {
              // rules: [{
              //   required: true,
              //   message: '请输入详细内容!',
              // }],
            })(
              pageType != 'view' ? <div>
                <div style={{ color: '#333' }}>如需粘贴文案到此处，请务必选择<span style={{ color: 'red' }}>右键粘贴为纯文本</span>，图片请使用下方按钮进行上传。</div>
                <WangEditor {...getValues} content={notice_remark} />
              </div> : <div dangerouslySetInnerHTML={{ __html: notice_remark ? notice_remark : '-' }}></div>
            )}
          </Form.Item>
          <Form.Item label="内容来源" {...formItemLayout}>
            {getFieldDecorator('remarkSource', {
              initialValue: detail.remarkSource,
              rules: [{ required: true, message: '请输入内容来源!', whitespace: true }],
            })(
              pageType != 'view' ? <Input type="text" placeholder="请输入内容来源" maxLength={50} /> : <div>{detail.remarkSource || '-'}</div>
            )}
          </Form.Item>
          {pageType == 'view' ? <span>
            <Form.Item label="发布人" {...formItemLayout}>
              {getFieldDecorator('createName')(
                <div>{detail.createName || '-'}</div>
              )}
            </Form.Item>
            <Form.Item label="发布时间" {...formItemLayout}>
              {getFieldDecorator('createTime')(
                <div>{detail.createTime || '-'}</div>
              )}
            </Form.Item>
            <Form.Item label="阅读量" {...formItemLayout}>
              {getFieldDecorator('readNumber')(
                <div>{detail.readNumber || '-'}</div>
              )}
            </Form.Item>
          </span> : ''}

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
    ...state.CivilizationBuildAddEditViewModel,
    loading: state.loading.models.CivilizationBuildAddEditViewModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEditView));