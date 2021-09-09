import React from 'react';
import { Form, Select, Card, Row, Col, Button, Input } from 'antd';
const FormItem = Form.Item;

function FormSearch(props) {
  const { form, onFormSearch, corpList = [], statusList = [], pageType } = props;
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
            <FormItem label={pageType == "h5" ? "选择H5" : "选择租户"} {...formItemLayout}>
              {getFieldDecorator('backendCorpId')(
                <Select placeholder={pageType == "h5" ? "请选择H5" : "请选择租户"}>
                  <Select.Option key="all" value="">全部</Select.Option>
                  {corpList && corpList.length > 0 ? corpList.map((value, index) => {
                    return <Select.Option key={index} value={value.id}>{value.corpName}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="上架状态" {...formItemLayout}>
              {getFieldDecorator('bannerStatus')(
                <Select placeholder="请选择上架状态">
                  {statusList && statusList.length > 0 ? statusList.map((value, index) => {
                    return <Select.Option key={index} value={value.key}>{value.value}</Select.Option>
                  }) : ''}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="banner名称" {...formItemLayout}>
              {getFieldDecorator('bannerName')(
                <Input placeholder="请输入banner名称" />
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
