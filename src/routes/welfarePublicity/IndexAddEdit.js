import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Select, Input, message } from 'antd';
const { TextArea } = Input;
import Breadcrumb from "../../components/Breadcrumb/index";
import WangEditor from '../../components/wangEditor';
import Image from '../../components/Image/';

function WelfarePublicityAddEdit(props) {
  let { form, loading, dispatch, detail = {}, id, areaTree = [], typeDrop = [], welfare_remark } = props;
  console.log(welfare_remark,'welfare_remark',detail)
  const { getFieldDecorator, validateFields } = form;

  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '公益宣传',
    }, {
      name: '公益宣传',
      href: 'welfarePublicity'
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
  const formItemLayout1 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  //提交
  function handleSubmit(e) {
    validateFields((err, values) => {
      let text = welfare_remark.split('<p>').join("").split('</p>').join("").split('<br>').join("");
      if (err) {
        return;
      }
      if(!text){
        message.warning('详情内容不能为空');
        return;
      }
      console.log(values,'1234task_image')
      //图片
      let welfareImg = [];
      let imgsLen = values.welfareImg && values.welfareImg.length;
      if (values.welfareImg !== undefined && imgsLen !== 0) {
        for (let i = 0; i < imgsLen; i++) {
          if (values.welfareImg[i].response) {
            welfareImg[i] = values.welfareImg[i].response.data.filepath
          } else {
            welfareImg[i] = values.welfareImg[i].url
          }
        }
      }
      console.log(welfareImg,'task_image')
      let data = {
        ...values,
        remark: welfare_remark,
        welfareImg: welfareImg[0]
      };
      
      if (id) {
        data.id = id;
        dispatch({
          type: 'WelfarePublicityAddEditModel/ajaxEdit',
          payload: data
        });
      } else {
        dispatch({
          type: 'WelfarePublicityAddEditModel/ajaxAdd',
          payload: data
        });
      }
    });
  }
  //图片上传
  function handleImage(id, fileList) {
    form.setFieldsValue({ welfareImg: fileList })
    dispatch({
      type: "WelfarePublicityAddEditModel/concat",
      payload: {
        detail: {
          ...detail,
          welfareImg: fileList
        }
      }
    })
  }
  //点击放大图片
  function handlePreview(src) {
    props.dispatch({
      type: 'WelfarePublicityAddEditModel/concat',
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
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  const getValues = {
    getValues: (value) => {
      dispatch({
        type: "WelfarePublicityAddEditModel/concat",
        payload: {
          welfare_remark: value
        }
      })
    },
    content: "",
    imgSize: 3 //默认限制图片大小是 3M
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
              <Select placeholder="请选择中心">
                {areaTree && areaTree.length > 0 ? areaTree.map((value, index) => {
                  return <Select.Option key={value.id + ""} value={value.id + ""}>{value.centerName}</Select.Option>
                }) : ''}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="公益宣传名称" {...formItemLayout}>
            {getFieldDecorator('welfareName', {
              initialValue: detail.welfareName,
              rules: [{ required: true, message: '请输入公益宣传名称!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入公益宣传名称" maxLength={30} />
            )}
          </Form.Item>
          <Form.Item label="封面图片"  {...formItemLayout} extra={"建议封面尺寸300x165px"}>
              {getFieldDecorator('welfareImg', {
                initialValue: detail.welfareImg,
                rules: [{ required: true, message: '请上传封面图片!' }],
              })(
                <Image file={detail.welfareImg ? detail.welfareImg : []} handleImage={handleImage.bind(this)} size={1} />
              )}
          </Form.Item>
          <Form.Item {...formItemLayout1} label="详细内容" required>
            {getFieldDecorator('remark', {

            })(
              <div>
                <div style={{color: '#333'}}>如需粘贴文案到此处，请务必选择<span style={{color: 'red'}}>右键粘贴为纯文本</span>，图片请使用下方按钮进行上传。</div>
                <WangEditor {...getValues} content={welfare_remark} />
              </div>
            )}
          </Form.Item>
          <Form.Item label="内容来源" {...formItemLayout}>
            {getFieldDecorator('remarkSource', {
              initialValue: detail.remarkSource,
              rules: [{ required: true, message: '请输入内容来源!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入内容来源" maxLength={50} />
            )}
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
    ...state.WelfarePublicityAddEditModel,
    loading: state.loading.models.WelfarePublicityAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(WelfarePublicityAddEdit));