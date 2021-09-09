import React from 'react';
import { Form, Modal, Select } from 'antd';
const { Option } = Select;
const FormItem = Form.Item;

function Assign(props) {
    const { form, visible2, volunteerList, handleCancel, handleOk } = props;
    const { getFieldDecorator, validateFields } = form;

    if (props.visible2 == false) {
        props.form.resetFields();
    }
    /** 布局 */
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }
    function onHandleOk() {
        validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log(values.volunteer,'===',values.volunteer[0],'values===',volunteerList)
            let volunteer = [];
            for(let i=0;i<volunteerList.length;i++){
                for(let j=0;j<values.volunteer.length;j++){
                    if(values.volunteer[j]==volunteerList[i].value){
                        volunteer.push(volunteerList[i].key)
                    }
                }
            }
            handleOk ? handleOk({volunteer}) : ''
        })
    }

    return (
        <Modal
            title="选择执行队员"
            visible={visible2}
            onOk={onHandleOk}
            onCancel={() => handleCancel()}
        >
            <Form>
                <FormItem label="选择执行队员" {...formItemLayout}>
                    {getFieldDecorator('volunteer', {
                        rules: [{ required: true, message: '请选择执行队员!' }],
                    })(
                        <Select style={{ width: '100%' }} placeholder="请选择执行队员" mode="multiple">
                            {volunteerList && volunteerList.length > 0 ? volunteerList.map((item, index) => <Option value={item.value.toString()} key={item.key}>{item.value}</Option>) : ''}
                        </Select>
                    )}
                </FormItem>
            </Form>

        </Modal>
    )
}

export default Form.create()(Assign);
