import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function FormSearch(props) {
  const { form, dispatch, onFormSearch, areaTree = [], teamType = [], teamBelong = [], centerId, onSelectChanges, params = {},stateList=[] } = props;
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
      platformId: undefined,
      state: undefined,
      volunteerName: undefined,
      volunteerMobile: undefined,
    });
    // form.resetFields();
    handleSearch('reset');
  }
  function onSelectChange(num, value) {
    onSelectChanges ? onSelectChanges(num, value) : ''
    if (num == 1) {
      props.form.setFieldsValue({
        positionId: undefined,
        positionType: undefined
      });
    } else if (num == 2) {
      props.form.setFieldsValue({
        positionId: undefined,
      });
    }
  }

  return (
    <Card>
      <Form>
        <Row>
          <Col span={10}>
            <FormItem label="志愿者手机号码" {...formItemLayout}>
              {getFieldDecorator('volunteerMobile', { initialValue: params.volunteerMobile })(
                <Input placeholder="请输入志愿者手机号码" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="平台类别" {...formItemLayout}>
              {getFieldDecorator('platformId', { initialValue: params.platformId })(
                <Select placeholder="请选择平台" onChange={onSelectChange.bind(this, '1')}
                >
                  {areaTree && areaTree.length > 0 ? areaTree.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="状态" {...formItemLayout}>
              {getFieldDecorator('state', { initialValue: params.state })(
                <Select placeholder="请选择状态" onChange={onSelectChange.bind(this, '2')}
                >
                  {stateList && stateList.length > 0 ? stateList.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
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
