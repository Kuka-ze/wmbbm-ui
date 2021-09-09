import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Breadcrumb, Form, Button, Col, Row, Card, Modal, Divider, Radio, Select, Input } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
import Map from '../../components/Map/index.js';
import '../../index.css';

function ApprovalInfo(props) {
  let { dispatch, id, type, previewVisible, previewImage, info, form, siteList, sign_address, show, cityName, sign_range, loading, detail_address } = props;
  const { getFieldDecorator, getFieldValue } = form;
  const formItemLayout = {
    labelCol: {
      span: 3
    },
    wrapperCol: {
      span: 8
    }
  }


  function handSubmit(e) {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let data = {}
      if (info.address_type == '2') {
        data = {
          id: id,
          address_type: info.address_type,
          good_value: values.good_value,
          detail_address: detail_address,
          sign_address: sign_address,
          sign_range: values.sign_range,
          sign_model: values.sign_model,
          approval_status: '2'
        }
      } else {
        data = {
          id: id,
          address_type: info.address_type,
          good_value: values.good_value,
          sign_model: values.sign_model,
          approval_status: '2'
        }
      }
      dispatch({
        type: 'ApprovalInfoModel/activityAudit',
        payload: data
      })
    })
  }

  function handleDisagree() {
    confirm({
      title: '审批不通过',
      content: '审批不通过后，该志愿活动不会开展。',
      okText: '审批不通过',
      cancelText: '我再想想',
      onOk() {
        let data = {
          id: id,
          approval_status: '3'
        }
        dispatch({
          type: 'ApprovalInfoModel/activityAudit',
          payload: data
        })
      },
      onCancel() {
       
      },
    });
  }


  function handlePreview(file) {
    dispatch({
      type: 'ApprovalInfoModel/concat',
      payload: {
        previewImage: file || file,
        previewVisible: true
      }
    })
  }

  function handleCancel() {
    dispatch({
      type: 'ApprovalInfoModel/concat',
      payload: {
        previewVisible: false
      }
    })
  }

  function remove(k) {
    let newAddress = sign_address && sign_address.length && sign_address.filter((item, i) => {
      return k != i
    })
    dispatch({
      type: 'ApprovalInfoModel/concat',
      payload: {
        sign_address: newAddress
      }
    })

  }

  /** 地图 */
  //地图显示
  function handleClick(e) {
    dispatch({
      type: 'ApprovalInfoModel/concat',
      payload: {
        show: Math.random(),
      }
    });
  }

  function handleMap(e, name) {

    let obj = {};
    obj.lon = e && e.split(',')[0];
    obj.lat = e && e.split(',')[1];
    obj.address = name;
    sign_address.push(obj);
    dispatch({
      type: 'ApprovalInfoModel/concat',
      payload: {
        sign_address,
        changeMap: Math.random(),
        // uuid: uuid,
      }
    });
  }

  function handleSelect(val, selected) {
    // console.log(val,selected)
    dispatch({
      type: 'ApprovalInfoModel/concat',
      payload: {
        detail_address: selected.props.children || '',
      }
    });
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }


  return (
    <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>活动管理</Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/approvalList">活动审批</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{type == '2' ? '活动审批' :'活动审批详情'}</Breadcrumb.Item>
      </Breadcrumb>
      <Form {...formItemLayout} style={{ backgroundColor: 'white', padding: '20px 0' }}>
        <Form.Item label="活动名称" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.activity_name || ''}</span>
        </Form.Item>
        <Form.Item label="发起社区" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.social_name || ''}</span>
        </Form.Item>
        <Form.Item label="活动封面" >
          <span className="ant-form-text">
            <img
              className="detail-img"
              src={info.activity_img}
              onClick={handlePreview.bind(this, info.activity_img)}
              style={{ width: "80px", height: "80px" }}
            />
          </span>
        </Form.Item>
        <Form.Item label="活动说明" style={{ marginBottom: '0px' }}>
          <div dangerouslySetInnerHTML={{ __html: info.activity_remark }}  className="activity-editor" />
        </Form.Item>
        <Form.Item label="开放模式" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.open_model_msg || ''}</span>
        </Form.Item>
        <Form.Item label="活动联系人" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.contract_person || ''}</span>
        </Form.Item>
        <Form.Item label="联系电话" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.contract_phone || ''}</span>
        </Form.Item>
        <Form.Item label="志愿者人数" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.volunteer_number || '0'}人</span>
        </Form.Item>
        {
          type == '2' ? <FormItem label="公益值" {...formItemLayout} style={{ marginBottom: '0px' }}>
            {getFieldDecorator('good_value', {
              rules: [{ required: true, message: '请输入公益值' }, { pattern: /^[1-9][0-9]{0,3}$/, message: '请输入1~9999的正整数' }],
              initialValue: info.good_value
            })(<Input placeholder="请输入" addonAfter="分" />)}
          </FormItem> : <Form.Item label="公益值" style={{ marginBottom: '0px' }}>
            <span className="ant-form-text">{info.good_value || '0'}分</span>
          </Form.Item>
        }

        <FormItem
          label="活动地址"
          {...formItemLayout}
          style={{ marginBottom: '0px' }}
        >
          {getFieldDecorator('address_type', {
            initialValue: info.address_type
          })(
            <Radio.Group disabled={true}>
              <Radio value="1">社区自备场地</Radio>
              <Radio value="2">街道指派场地</Radio>
            </Radio.Group>
          )}
        </FormItem>

        {
          info.address_type == '2' && <div><Form.Item label="所需场地面积" style={{ marginBottom: '0px' }}>
            <span className="ant-form-text">{info.site_area || '0'}m²</span>
          </Form.Item>
          {
            type == '2' ? <div>
              <FormItem label="详细地址" {...formItemLayout} style={{ marginBottom: '0px' }}>
                {getFieldDecorator('social_id', {
                  rules: [
                    { required: true, message: '请选择详细地址' }
                  ]
                })(
                  <Select placeholder="请选择" showSearch
                    optionFilterProp="children"
                    onSelect={handleSelect.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {
                      siteList && siteList.length && siteList.map((item, index) => {
                        return <Option key={index} value={index}>{item.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
              <Form.Item label="签到地址" {...formItemLayout} required style={{ marginBottom: '0px' }}>
                {getFieldDecorator('sign_address', {
                  // rules: [{ required: true, message: '' }],
                })(
                  <Button type="primary" onClick={handleClick}>添加地址</Button>
                )}
                <div>
                  {sign_address && sign_address.length ? sign_address.map((item, index) => {
                    return (
                      <div key={index}>
                        <span>{item.address}</span>
                        <span onClick={() => remove(index)} style={{ color: 'rgb(24, 144, 255)', cursor: 'pointer', marginLeft: '16px' }}>删除</span>
                      </div>
                    )
                  }) : ''}
                </div >
              </Form.Item>

              <FormItem label="签到范围" {...formItemLayout} style={{ marginBottom: '0px' }}>
                {getFieldDecorator('sign_range', {
                  rules: [
                    { required: true, message: '请选择签到范围' }
                  ],
                  initialValue: "2"
                })(
                  <Select placeholder="请选择" showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {
                      sign_range && sign_range.length && sign_range.map((item, index) => {
                        return <Option key={item.key} value={item.key}>{item.value}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </div> : <div>
              <Form.Item label="详细地址" style={{ marginBottom: '0px' }}>
                <span className="ant-form-text">{info.detail_address || '-'}</span>
              </Form.Item>
              <Form.Item label="签到地址" style={{ marginBottom: '0px' }}>
                <span className="ant-form-text"><div>
                  {info.sign_address && JSON.parse(info.sign_address).length ? JSON.parse(info.sign_address).map((item, index) => {
                    return (
                      <div key={index}>
                        <span>{item.address}</span>
                      </div>
                    )
                  }) : '-'}
                </div ></span>
              </Form.Item>
              <Form.Item label="签到范围" style={{ marginBottom: '0px' }}>
                <span className="ant-form-text">{info.sign_range_msg || ''}</span>
              </Form.Item>
            </div>
          }
          </div>
        }

        {
          info.address_type == '1' && <div>
            <Form.Item label="详细地址" style={{ marginBottom: '0px' }}>
              <span className="ant-form-text">{info.detail_address || '-'}</span>
            </Form.Item>
            <Form.Item label="签到地址" style={{ marginBottom: '0px' }}>
              <span className="ant-form-text"><div>
                {info.sign_address && JSON.parse(info.sign_address).length ? JSON.parse(info.sign_address).map((item, index) => {
                  return (
                    <div key={index}>
                      <span>{item.address}</span>
                    </div>
                  )
                }) : '-'}
              </div ></span>
            </Form.Item>
            <Form.Item label="签到范围" style={{ marginBottom: '0px' }}>
              <span className="ant-form-text">{info.sign_range_msg || ''}</span>
            </Form.Item>
          </div>
        }

        <Form.Item label="报名截止时间" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.apply_deadline || ''}</span>
        </Form.Item>
        <Form.Item label="活动时间" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">{info.activity_begin_time && info.activity_end_time ? `${info.activity_begin_time}至${info.activity_end_time}` : ''}</span>
        </Form.Item>
        <Form.Item label="公示时间" style={{ marginBottom: '0px' }}>
          <span className="ant-form-text">活动开始前{info.formula_house || ''}小时</span>
        </Form.Item>

        {
          type == '2' ? <FormItem
            label="签到模式"
            {...formItemLayout}
            style={{ marginBottom: '0px' }}
          >
            {getFieldDecorator('sign_model', {
              rules: [
                { required: true, message: '请选择签到模式' }
              ],
              initialValue: info.sign_model
            })(
              <Radio.Group>
                <Radio value="1">仅签到</Radio>
                <Radio value="2">签到+签退</Radio>
              </Radio.Group>
            )}
          </FormItem> : <FormItem
            label="签到模式"
            {...formItemLayout}
            style={{ marginBottom: '0px' }}
          >
            {getFieldDecorator('sign_model', {
              initialValue: info.sign_model
            })(
              <Radio.Group disabled={true}>
                <Radio value="1">仅签到</Radio>
                <Radio value="2">签到+签退</Radio>
              </Radio.Group>
            )}
          </FormItem>
        }
        {
          type == '2' ? <div style={{ width: '210px', margin: '0 auto' }}>
            <Button type="primary" className="mr1" loading={loading} onClick={handSubmit}>审批通过</Button>
            <Button type="primary" className="mr1" loading={loading} onClick={handleDisagree}>审批不通过</Button>
          </div> :<div style={{ width: '200px', margin: '0 auto' }}>
            <Button type="ghost" onClick={handleBack}>返回</Button>
          </div>
        }
        
      </Form>
      <Map type={show} data={'杭州市|一号线'} cityName={cityName} handleMap={handleMap} />
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    ...state.ApprovalInfoModel,
    loading: state.loading.models.ApprovalInfoModel,
  }
}

export default connect(mapStateToProps)(Form.create()(ApprovalInfo));