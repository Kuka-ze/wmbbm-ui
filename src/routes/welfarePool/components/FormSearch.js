import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function FormSearch(props) {
  const { form, onFormSearch, stateList = [], params = {} } = props;
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
        ...values
      }
      onFormSearch ? onFormSearch(data) : ''
    })
  }
  /** 重置 */
  function handleReset() {
    form.setFieldsValue({ //清空所有
      type: undefined,  //活动状态
      templateName: undefined,   //问题人、联系人姓名、电话
    });
    // form.resetFields();
    handleSearch();
  }

  return (
    <Card>
      <Form>
        <Row>
          <Col span={6}>
            <FormItem label="公益名称" {...formItemLayout}>
              {getFieldDecorator('templateName')(
                <Input placeholder="请输入公益名称" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="公益类型" {...formItemLayout}>
              {getFieldDecorator('type')(
                <Select placeholder="请选择公益类型"
                >
                  {stateList && stateList.length > 0 ? stateList.map((item, index) => <Select.Option value={item.key} key={index+''+item.key}>{item.value}</Select.Option>) : ''}
                </Select>
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
