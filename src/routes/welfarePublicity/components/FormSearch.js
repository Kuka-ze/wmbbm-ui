import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function FormSearch(props) {
  const { form, onFormSearch, startValue, endValue, onChangeTime, areaTree, typeDrop, params = {} } = props;
  const { getFieldDecorator } = form;
  /** 点击左侧菜单重置搜索条件 */
  if (props.is_reset == true) {
    props.form.resetFields();
    props.onFormReset ? props.onFormReset() : ''
  }
  /** 是否置顶数组 */
  const topPing = [{
    value: '全部',
    isTop: ''
  },
  {
    value: '是',
    isTop: '1'
  }, {
    value: '否',
    isTop: '2'
  }]

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
      welfareTypeId: undefined,
      welfareName: undefined,
      topState: undefined
    });
    // form.resetFields();
    handleSearch();
  }


  return (
    <Card>
      <Form>
        <Row>
          <Col span={6}>
            <FormItem label="中心" {...formItemLayout}>
              {getFieldDecorator('centerId', { initialValue: params.centerId })(
                <Select placeholder="请选择中心">
                  {areaTree && areaTree.length > 0 ? areaTree.map((value, index) => {
                    return <Select.Option key={value.id + ""} value={value.id + ""}>{value.centerName}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="标题" {...formItemLayout}>
              {getFieldDecorator('welfareName', { initialValue: params.welfareName })(
                <Input placeholder="请输入标题" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="是否置顶" {...formItemLayout}>
              {getFieldDecorator('topState', { initialValue: params.isTop })(
                <Select placeholder="请选择是否置顶">
                  {topPing && topPing.length > 0 ? topPing.map((item, index) => {
                    return <Select.Option key={item.isTop + ""} value={item.isTop + ""}>{item.value}</Select.Option>
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
