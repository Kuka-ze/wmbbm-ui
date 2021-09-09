import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input, DatePicker, Cascader } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function FormSearch(props) {
  const { form, onFormSearch, areaTree = [], placeList = [], onSelectChanges, params = {} } = props;
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
  function handleSearch(type) {
    form.validateFields((err, values) => {
      let data = {
        ...values,
      }
      onFormSearch ? onFormSearch(data, type) : ''
    })
  }
  /** 重置 */
  function handleReset() {
    form.setFieldsValue({ //清空所有
      centerId: undefined,
      placeId: undefined,
      stationName: undefined,
    });
    // form.resetFields();
    handleSearch('reset');
  }

  function onSelectChange(num, value) {
    if (num == 1) {
      props.form.setFieldsValue({
        placeId: undefined,
      });
      onSelectChanges ? onSelectChanges(num, value) : ''
    }
  }
  return (
    <Card>
      <Form>
        <Row>
          <Col span={6}>
            <FormItem label="所属中心" {...formItemLayout}>
              {getFieldDecorator('centerId', { initialValue: params.centerId })(
                <Select placeholder="请选择所属中心" onChange={onSelectChange.bind(this, '1')}>
                  {areaTree && areaTree.length ? areaTree.map((item, index) => {
                    return <Option value={item.key} key={index}>{item.value}</Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="所属所" {...formItemLayout}>
              {getFieldDecorator('placeId', { initialValue: params.placeId })(
                <Select placeholder="请选择所属所">
                  {placeList && placeList.length ? placeList.map((item, index) => {
                    return <Option value={item.key} key={index}>{item.value}</Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="站名称" {...formItemLayout}>
              {getFieldDecorator('stationName', { initialValue: params.stationName })(
                <Input placeholder="请输入站名称" />
              )}
            </FormItem>
          </Col>
          <Col span={5} offset={1}>
            <Button type="primary" className="mr1" onClick={handleSearch}>查询</Button>
            <Button type="ghost" onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default Form.create()(FormSearch);
