import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input, DatePicker, Cascader } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function FormSearch(props) {
  const { form, onFormSearch, startValue, endValue, onChangeTime, areaTree = [] } = props;
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
      }
      onFormSearch ? onFormSearch(data) : ''
    })
  }
  /** 重置 */
  function handleReset() {
    form.resetFields();
    handleSearch();
  }

  return (
    <Card>
      <Form>
        <Row>
          <Col span={6}>
            <FormItem label="类型名称" {...formItemLayout}>
              {getFieldDecorator('name')(
                <Input placeholder="请输入类型名称" />
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
