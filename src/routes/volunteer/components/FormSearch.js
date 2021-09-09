import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function FormSearch(props) {
  const { form, onFormSearch, areaTree = [], teamType = [], teamBelong = [],teamDrop = [], onSelectChanges, typeDrop = [], params = {} } = props;
  const { getFieldDecorator } = form;
  /** 点击左侧菜单重置搜索条件 */
  if (props.is_reset == true) {
    props.form.resetFields();
    props.onFormReset ? props.onFormReset() : ''
  }
  /** 导入 */
  if (props.resetField){
    handleReset();
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
      teamName: undefined,
      volunteerName: undefined,
      volunteerMobile: undefined,
      volunteerTagId: undefined,
    });
    // form.resetFields();
    handleSearch('reset');
  }

  function onSelectChange(num, value) {
    onSelectChanges ? onSelectChanges(num, value) : ''
    if (num == 1) {
      props.form.setFieldsValue({
        positionType: undefined,
        positionId: undefined,
        teamId: undefined
      });
    }else if(num == 2){
      props.form.setFieldsValue({
        positionId: undefined,
        teamId: undefined
      });
    }else if(num == 3){
      props.form.setFieldsValue({
        teamId: undefined,
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
          {/* <Col span={6}>
            <FormItem label="队伍归属" {...formItemLayout}>
              {getFieldDecorator('positionName')(
                <Input placeholder="请输入队伍归属" disabled={props.inputStatus}/>
                // <Select placeholder="请选择队伍归属" onChange={onSelectChange.bind(this, '3')}                     // showSe                        // optionFilterProp="ch                           // filterOption={(input,                               //   option.props.children.toLowerCase().indexOf(input.toLowe                                 // }
                // >
                //   {teamBelong && teamBelong.length > 0 ? teamBelong.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
                // </Select>
              )}
            </FormItem>
          </Col> */}
          <Col span={6}>
            <FormItem label="所属队伍" {...formItemLayout}>
              {getFieldDecorator('teamName', { initialValue: params.teamName })(
                <Input placeholder="请输入所属队伍" />
                // <Select placeholder="请选择所属队伍"
                // showSearch
                // optionFilterProp="children"
                // filterOption={(input, option) =>
                //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                // >
                //   {teamDrop && teamDrop.length > 0 ? teamDrop.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
                // </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="志愿者姓名" {...formItemLayout}>
              {getFieldDecorator('volunteerName', { initialValue: params.volunteerName })(
                <Input placeholder="请输入志愿者姓名" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机号码" {...formItemLayout}>
              {getFieldDecorator('volunteerMobile', { initialValue: params.volunteerMobile })(
                <Input placeholder="请输入手机号码" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="志愿者标签" {...formItemLayout}>
              {getFieldDecorator('volunteerTagId', { initialValue: params.volunteerTagId })(
                <Select placeholder="请选择志愿者标签"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                  {typeDrop && typeDrop.length > 0 ? typeDrop.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
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
