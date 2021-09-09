import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Cascader, Row, Col, Select, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import Image from '../../components/Image/';
import WangEditor from '../../components/wangEditor';
import Map from '../../components/Map/index.js';
import queryString from 'query-string';

function IndexAddEdit(props) {
  let { form, loading, dispatch, detail = {}, content, show, cityName, address, map, options = [], userList = [], uuid, ajaxStateList = [] } = props;
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  const disabledCheck = queryString.parse(props.history.location.search).disabled
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '大家帮',
    }, {
      name: '公益池',
      href: 'welfarePool'
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
      console.log('values', values)
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
      const getItems = () => values.keys && values.keys.length > 0 && values.keys.map((k, index) => {
        return Object.prototype.toString.call(values.teamId[k]) == "[object String]" && userList && userList.length > 0 && userList[k] && userList[k].id && values.teamId[k] == userList[k].teamName ? userList[k].id : values.teamId[k]
      })
      console.log('getItems', getItems())

      let data = {
        ...values,
        image: task_image && task_image.length > 0 ? task_image.toString() : '',
        lon: map.split(",")["0"],
        lat: map.split(",")["1"],
        address: address,
        content: content,
        teamId: getItems()
      };
      delete data.keys;
      // delete data.teamId;
      console.log('props', props)
      if (props.id) {
        /** 编辑 */
        dispatch({
          type: 'welfarePoolAddEditModel/ajaxEdit',
          payload: { ...data, id: props.id }
        });
      } else {
        /** 新增 */
        dispatch({
          type: 'welfarePoolAddEditModel/ajaxAdd',
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
      type: 'welfarePoolAddEditModel/concat',
      payload: {
        show: Math.random(),
      }
    });
  }
  function handleMap(e, address) {
    dispatch({
      type: 'welfarePoolAddEditModel/concat',
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
      span: 14
    },
  }
  const formItemLayoutWithOutLabel = {
    wrapperCol: { span: 18, offset: 5 },
  }
  function add(k) {
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    dispatch({
      type: 'welfarePoolAddEditModel/concat',
      payload: {
        uuid: uuid,
        editStatus: true
      }
    });
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
  function handleOnSearch(value) {
    let timer;
    if (!timer) {
      timer = setTimeout(function () {
        searchValue(value)
        timer = null
      }, 100)
    }
  }
  function searchValue(value) {
    const datas = []
    const { optionsAll } = props
    // 对optionsAll进行遍历，将符合搜索条件的数据放入datas中
    optionsAll.forEach(item => {
      if (item.value.indexOf(value) > -1) {
        datas.push(item)
      }
    })
    // 然后只显示符合搜索条件的所有数据中的前100条
    dispatch({
      type: 'welfarePoolAddEditModel/concat',
      payload: {
        options: datas.slice(0, 100)
      }
    });
  }
  function handleOnBlur() {
    dispatch({
      type: 'welfarePoolAddEditModel/concat',
      payload: {
        options: props.optionsAll.slice(0, 100)
      }
    });
  }
  //转换
  function lunh(key) {
    console.log('options', options)
    let teamName;
    options && options.length > 0 && options.map((v, i) => {
      if (v.key == key) {
        teamName = userList.key
      }
    })
    return teamName
  }

  console.log('userList', userList)

  getFieldDecorator('keys', { initialValue: userList && userList.length > 0 ? userList.map((item, index) => index) : [0] });
  const keys = getFieldValue('keys');

  console.log('keys', keys)

  const getValues = {
    getValues: (value) => {
      dispatch({
        type: "welfarePoolAddEditModel/concat",
        payload: {
          content: value
        }
      })
    },
    content: "",
    imgSize: 3 //默认限制图片大小是 3M
  }

  const formItems = keys.map((k, index) => {
    return (
      <div
        key={index}
      >
        <Row gutter={10} style={{ paddingLeft: '0.4%' }}>
          <Col span={14}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="关联配置" {...formItemLayout2}>
                  {getFieldDecorator(`teamId[${k}]`, {
                    initialValue: !lunh(userList && userList.length > 0 && k < userList.length && userList[k].key) && userList && userList.length > 0 && k < userList.length && userList[k].teamName != null && userList[k].teamName || undefined,
                    rules: [{ required: true, message: "请选择可提供该项公益服务的队伍" }]
                  })(
                    <Select placeholder="请选择可提供该项公益服务的队伍" onChange={handleSelectChange}
                      showSearch
                      filterOption={false}
                      onSearch={handleOnSearch}
                      onBlur={handleOnBlur}
                    >
                      {options && options.length > 0 ? options.map((item, index) => <Select.Option value={item.key} key={index} k={k} option_val={item.value}>{item.value}</Select.Option>) : ''}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            {keys.length > 1 ? (
              <Button type="dashed" onClick={() => remove(k)} style={{ marginTop: '4px' }} disabled={userList && userList.length > 0 && k < userList.length ? userList[k].is_super == 1 ? true : false : false}><Icon type="minus" /> 删除</Button>
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
          <Form.Item label="公益标题" {...formItemLayout}>
            {getFieldDecorator('templateName', {
              initialValue: detail.templateName,
              rules: [{ required: true, message: '请输入公益标题!', whitespace: true }],
            })(
              <Input type="text" placeholder="请输入公益标题" maxLength={30} />
            )}
          </Form.Item>
          <Form.Item label="公益类型" {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: detail.type,
              rules: [{ required: true, message: '请选择公益类型!', whitespace: true }],
            })(
              <Select placeholder="请选择公益类型" >
                {ajaxStateList && ajaxStateList.length > 0 ? ajaxStateList.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="服务时间" {...formItemLayout}>
            {getFieldDecorator('serviceTime', {
              initialValue: detail.serviceTime,
              rules: [{ required: true, message: '请输入该公益的服务时间，例如：每周二' }],
            })(
              <Input rows={4} placeholder="请输入该公益的服务时间,例如:每周二" maxLength="30" />
            )}
          </Form.Item>
          <Form.Item label="公益封面图" {...formItemLayout}>
            {getFieldDecorator('task_image', {
              initialValue: detail.task_image,
              rules: [{ required: true, message: '请上传公益封面图!' }],
            })(
              <Image file={detail.task_image ? detail.task_image : []} handleImage={handleImage.bind(this)} size={1} />
            )}
          </Form.Item>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={add} style={{ width: '30%' }}><Icon type="plus" /> 添加</Button>
          </Form.Item>

          <Form.Item label="联系人" {...formItemLayout}
            extra=""
            required={true}>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              {getFieldDecorator('contacts', {
                initialValue: detail.contacts,
                rules: [{ required: true, message: '请输入联系人姓名!' }],
              })(<Input rows={4} placeholder="请输入联系人姓名" maxLength="10" />)}
            </Form.Item>
            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              {getFieldDecorator('mobile', {
                initialValue: detail.mobile,
                rules: [{ required: true, message: '请输入联系人手机号!' }],
              })(<Input rows={4} placeholder="请输入联系人手机号" maxLength="11" />)}
            </Form.Item>
            <p>请输入该项公益的联系人联系方式，供群众或志愿者联系询问相关事宜。</p>
          </Form.Item>

          <Form.Item label="服务地点" {...formItemLayout}>
            {getFieldDecorator('serviceAddress', {
              initialValue: detail.serviceAddress,
              rules: [{ required: true, message: '请输入服务地点名称，例如 杭州市 | 西湖风景区!' }],
            })(
              <Input rows={4} placeholder="请输入服务地点名称，例如 杭州市 | 西湖风景区" maxLength="50" />
            )}
          </Form.Item>
          <Form.Item label="定位地址" {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: address,
              rules: [{ required: true, message: '请获取服务位置!' }],
            })(
              <Button type="primary" onClick={handleClick}>获取地址</Button>
            )}
            <div>{address ? address : null}</div>
          </Form.Item>
          <Form.Item  {...formItemLayout} label="详细描述" required>
            {getFieldDecorator('content', {
              initialValue: detail.content,
            })(
              <div>
                <div style={{ color: '#333' }}>如需粘贴文案到此处，请务必选择<span style={{ color: 'red' }}>右键粘贴为纯文本</span>，图片请使用下方按钮进行上传。</div>
                <WangEditor {...getValues} content={detail.content || ''} />
              </div>
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
    ...state.welfarePoolAddEditModel,
    loading: state.loading.models.welfarePoolAddEditModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));