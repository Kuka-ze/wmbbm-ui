import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function FormSearch(props) {
  const { form, dispatch, onFormSearch, areaTree = [], teamType = [], teamBelong = [], centerId, onSelectChanges, params = {} } = props;
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
      positionType: undefined,
      positionName: undefined,
      teamName: undefined,
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
    }else if(num == 2){
      props.form.setFieldsValue({
        positionId: undefined,
      });
    }
  }

  return (
    <Card>
      <Form>
        <Row>
          <Col span={6}>
            <FormItem label="所属中心" {...formItemLayout}>
              {getFieldDecorator('centerId', { initialValue: params.centerId })(
                <Select placeholder="请选择所属中心" onChange={onSelectChange.bind(this, '1')}
                >
                  {areaTree && areaTree.length > 0 ? areaTree.map((item, index) => <Select.Option value={item.id} key={index}>{item.centerName}</Select.Option>) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="队伍类型" {...formItemLayout}>
              {getFieldDecorator('positionType', { initialValue: params.positionType })(
                <Select placeholder="请选择队伍类型" onChange={onSelectChange.bind(this, '2')}
                >
                  {teamType && teamType.length > 0 ? teamType.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="队伍归属" {...formItemLayout}>
              {getFieldDecorator('positionName', { initialValue: params.positionName })(
                <Input placeholder="请输入队伍归属" disabled={props.inputStatus}/>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="队伍名称" {...formItemLayout}>
              {getFieldDecorator('teamName', { initialValue: params.teamName })(
                <Input placeholder="请输入队伍名称" />
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
