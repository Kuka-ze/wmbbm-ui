import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input } from 'antd';
const FormItem = Form.Item;

function FormSearch(props) {
  const { form, onFormSearch, typeDrop } = props;
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
            <FormItem label="标签类别" {...formItemLayout}>
              {getFieldDecorator('name')(
                <Input placeholder="请输入名称" maxLength={6} />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="标签属性" {...formItemLayout}>
              {getFieldDecorator('type')(
                <Select placeholder="请选择类型">
                  {typeDrop && typeDrop.length > 0 ? typeDrop.map((value, index) => {
                    return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                  }) : ''}
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
