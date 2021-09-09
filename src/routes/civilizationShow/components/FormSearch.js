import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function FormSearch(props) {
  const { form, onFormSearch, startValue, endValue, onChangeTime, areaTree, typeDrop } = props;
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
        start_time: values.time && values.time[0] ? values.time[0].format('YYYY-MM-DD ') : '',
        end_time: values.time && values.time[1] ? values.time[1].format('YYYY-MM-DD') : '',
      }
      delete data.time;
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
            <FormItem label="选择中心" {...formItemLayout}>
              {getFieldDecorator('center_id')(
                <Select placeholder="请选择中心">
                  {areaTree && areaTree.length > 0 ? areaTree.map((value, index) => {
                    return <Select.Option key={value.id + ""} value={value.id + ""}>{value.centerName}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="选择类型" {...formItemLayout}>
              {getFieldDecorator('type')(
                <Select placeholder="请选择类型">
                  {/* {typeDrop && typeDrop.length > 0 ? <Select.Option value="">全部</Select.Option> : ''} */}
                  {typeDrop && typeDrop.length > 0 ? typeDrop.map((value, index) => {
                    return <Select.Option key={value.key + ""} value={value.key + ""}>{value.value}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="发布人" {...formItemLayout}>
              {getFieldDecorator('release_name')(
                <Input placeholder="请输入发布人" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="发布人手机号" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
              {getFieldDecorator('releasePhone')(
                <Input placeholder="请输入发布人手机号" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="发布时间" labelCol={{ span: 6 }} wrapperCol={{ span: 17 }}>
              {getFieldDecorator('time')(
                <RangePicker format="YYYY-MM-DD " showTime={{
                  hideDisabledOptions: true,
                  // defaultValue: moment('00:00:00', 'HH:mm:ss')
                }} style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="选择状态" {...formItemLayout}>
              {getFieldDecorator('status')(
                <Select placeholder="请选择状态">
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value={"1"}>已发布</Select.Option>
                  <Select.Option value={"2"}>已删除</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6} offset={1}>
            <Button type="primary" className="mr1" onClick={handleSearch}>查询</Button>
            <Button type="ghost" onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default Form.create()(FormSearch);
