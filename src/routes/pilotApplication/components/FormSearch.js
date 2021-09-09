import React from 'react';
import { Form, Select, Card, Row, Col, Button, DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

function FormSearch(props) {
  const { form, onFormSearch, onChangeTime, countyDrop, stateDrop, yearDrop, cityDrop, commitTime, isAdmin, params = {}, onSelectFuns } = props;
  const { getFieldDecorator } = form;
  /** 点击左侧菜单重置搜索条件 */
  if (props.is_reset == true) {
    props.form.resetFields();
    props.onFormReset ? props.onFormReset() : ''
  }
  /** 布局 */
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }
  /** 搜索 */
  function handleSearch(val) {
    form.validateFields((err, values) => {
      let data = {
        ...values,
        commitTime: values.commitTime ? values.commitTime.format('YYYY-MM-DD') : ''
      }
      onFormSearch ? onFormSearch(data) : ''
    })
  }
  /** 重置 */
  function handleReset() {
    form.setFieldsValue({ //清空所有
      county: undefined,
      centerId: undefined,
      year: undefined,
      state: undefined,
      date: undefined,
      cityCode: undefined,
      commitTime: undefined
    });
    // form.resetFields();
    handleSearch('2');
  }
  function onChangeDate(date, dateString) {
    onChangeTime(dateString)
  }
  /** 城市筛选 */
  function onSelectFun(value) {
    onSelectFuns(value)
  }

  return (
    <Card>
      <Form>
        <Row>
          {isAdmin == 10 && <Col span={8}>
            <FormItem label="所属地市" {...formItemLayout}>
              {getFieldDecorator('cityCode', { initialValue: params.cityCode })(
                <Select placeholder="请选择所属地市" onChange={onSelectFun}>
                  {cityDrop && cityDrop.length > 0 ? cityDrop.map((value, index) => {
                    return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          }
          <Col span={8}>
            <FormItem label="区县" {...formItemLayout}>
              {getFieldDecorator('centerId', { initialValue: params.centerId })(
                <Select placeholder="请选择区县">
                  {countyDrop && countyDrop.length > 0 ? countyDrop.map((value, index) => {
                    return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="年度" {...formItemLayout}>
              {getFieldDecorator('year', { initialValue: params.year })(
                <Select placeholder="请选择年度">
                  {yearDrop && yearDrop.length > 0 ? <Select.Option value="">全部</Select.Option> : ''}
                  {yearDrop && yearDrop.length > 0 ? yearDrop.map((value, index) => {
                    return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="状态" {...formItemLayout}>
              {getFieldDecorator('state', { initialValue: params.state })(
                <Select placeholder="请选择状态">
                  {stateDrop && stateDrop.length > 0 ? <Select.Option value="">全部</Select.Option> : ''}
                  {stateDrop && stateDrop.length > 0 ? stateDrop.map((value, index) => {
                    return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="提交日期" {...formItemLayout}>
              {getFieldDecorator('commitTime', { initialValue: params.commitTime ? moment(params.commitTime) : undefined })(
                <DatePicker onChange={onChangeDate} placeholder='请选择提交日期' />
              )}
            </FormItem>
          </Col>
          <Col span={7} offset={1}>
            <Button type="primary" className="mr1" onClick={handleSearch.bind(this, '1')}>查询</Button>
            <Button type="ghost" onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default Form.create()(FormSearch);
