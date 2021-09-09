import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function FormSearch(props) {
  const { form, onFormSearch, areaTree = [], params = {} } = props;
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
    form.setFieldsValue({ //清空所有
      centerId: undefined,
      habitsName: undefined,
    });
    // form.resetFields();
    handleSearch();
  }

  return (
    <Card>
      <Form>
        <Row>
          <Col span={6}>
            <FormItem label="选择中心" {...formItemLayout}>
              {getFieldDecorator('centerId', { initialValue: params.centerId })(
                <Select placeholder="请选择选择中心"
                >
                  {areaTree && areaTree.length > 0 ? areaTree.map((item, index) => <Select.Option value={item.id} key={index}>{item.centerName}</Select.Option>) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="主题" {...formItemLayout}>
              {getFieldDecorator('habitsName', { initialValue: params.habitsName })(
                <Input placeholder="请输入主题" />
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
