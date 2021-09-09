import React from 'react';
import { connect } from 'dva';
import { Form, Card, Steps, Button, message, Input, Divider, Table, Checkbox, InputNumber, Upload, Icon, Row, Col } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
// import UploadFiles from "./components/UploadFiles";
const { Step } = Steps;
const { Dragger } = Upload;

function StepApplication(props) {
    let { form, loading, dispatch, detail = {}, current, steps, tableData1, tableChecked1, tableData2, tableChecked2, tableData3, tableChecked3, tableData4, tableChecked4, submitData, id, type, qiniuData, fileList } = props;
    const { getFieldDecorator, validateFields } = form;
    console.log("props:", props);
    /** 面包屑 */
    const breadcrumbProps = {
        breadcrumbs: [{
            name: '试点申报管理',
        }, {
            name: '试点申报管理',
            href: 'pilotApplication'
        }, {
            name: type == 1 ? '立即申报' : type == 2 ? "修改" : type == 3 ? "详情" : '立即申报',
        }]
    }
    /** 布局 */
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 8 },
    }
    /** 表格多选按钮 */
    function onChangeCheckbox(name, arr, index, e) {
        let tableChecked = arr;
        tableChecked[index] = e.target.checked;
        dispatch({
            type: "StepApplicationModel/concat",
            payload: {
                [name]: tableChecked
            }
        })
    }
    /** 表格1 */
    let tableProps1 = {
        dataSource: tableData1,
        columns: [
            {
                title: '类型',
                dataIndex: 'data1',
                key: 'data1',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 0 || index === 5) {
                        obj.props.rowSpan = 2;
                    }
                    if (index === 2 || index === 7) {
                        obj.props.rowSpan = 3;
                    }
                    if (index === 10) {
                        obj.props.rowSpan = 4;
                    }
                    if (index === 1 || index === 3 || index === 4 || index === 6 || index === 8 || index === 9 || index === 11 || index === 12 || index === 13) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '活动载体',
                dataIndex: 'data2',
                key: 'data2',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 0 || index === 5) {
                        obj.props.rowSpan = 2;
                    }
                    if (index === 1 || index === 6) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '活动内容',
                dataIndex: 'data3',
                key: 'data3',
            },
            {
                title: '是否开展',
                dataIndex: 'desc',
                width: '81px',
                render: (text, record, index) => {
                    return <div>
                        <Checkbox onChange={onChangeCheckbox.bind(this, 'tableChecked1', tableChecked1, index)} defaultChecked={tableChecked1[index]} disabled={type != 3 ? false : true}></Checkbox>
                    </div>
                }
            }],
        pagination: false,
        rowKey: (record, index) => index,
        bordered: true
    }
    /** 表格2 */
    let tableProps2 = {
        dataSource: tableData2,
        columns: [
            {
                title: '类型',
                dataIndex: 'data1',
                key: 'data1',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 3;
                    }
                    if (index === 3 || index === 10) {
                        obj.props.rowSpan = 7;
                    }
                    if (index === 1 || index === 2 || (index >= 4 && index <= 9) || (index >= 11 && index <= 16)) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '功能',
                dataIndex: 'data2',
                key: 'data2',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 3) {
                        obj.props.rowSpan = 5;
                    }
                    if (index === 8) {
                        obj.props.rowSpan = 2;
                    }
                    if ((index >= 4 && index <= 7) || index === 9) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '内容',
                dataIndex: 'data4',
                key: 'data4',
                colSpan: 0,
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 3) {
                        obj.props.rowSpan = 4;
                    }
                    if ((index >= 4 && index <= 6)) {
                        obj.props.rowSpan = 0;
                    }
                    if ((index >= 0 && index <= 2) || index >= 10) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '内容',
                dataIndex: 'data5',
                key: 'data5',
                colSpan: 0,
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if ((index >= 0 && index <= 3) || (index >= 7 && index <= 9) || index >= 10) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '内容',
                dataIndex: 'data3',
                key: 'data3',
                colSpan: 3,
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if ((index >= 0 && index <= 2) || index >= 10) {
                        obj.props.colSpan = 3;
                    }
                    if (index === 3 || (index >= 7 && index <= 9)) {
                        obj.props.colSpan = 2;
                    }
                    return obj;
                }
            },
            {
                title: '是否满足',
                dataIndex: 'desc',
                width: '81px',
                render: (text, record, index) => {
                    return <div>
                        <Checkbox onChange={onChangeCheckbox.bind(this, 'tableChecked2', tableChecked2, index)} defaultChecked={tableChecked2[index]} disabled={type != 3 ? false : true}></Checkbox>
                    </div>
                }
            }],
        pagination: false,
        rowKey: (record, index) => index,
        bordered: true
    }
    /** 表格3 */
    let tableProps3 = {
        dataSource: tableData3,
        columns: [
            {
                title: '内容',
                dataIndex: 'data1',
                key: 'data1',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 4;
                    }
                    if (index === 5 || index === 8) {
                        obj.props.rowSpan = 3;
                    }
                    if ((index >= 1 && index <= 3) || (index >= 6 && index <= 7) || (index >= 9 && index <= 10)) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '目标',
                dataIndex: 'data2',
                key: 'data2',
                width: '20%',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 4;
                    }
                    if (index === 5 || index === 8) {
                        obj.props.rowSpan = 3;
                    }
                    if ((index >= 1 && index <= 3) || (index >= 6 && index <= 7) || (index >= 9 && index <= 10)) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '具体描述',
                dataIndex: 'data4',
                key: 'data4',
                colSpan: 0,
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    // if (index === 3) {
                    //     obj.props.rowSpan = 4;
                    // }
                    // if ((index >= 4 && index <= 6)) {
                    //     obj.props.rowSpan = 0;
                    // }
                    if (index === 4) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '具体描述',
                dataIndex: 'data3',
                key: 'data3',
                colSpan: 2,
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 4) {
                        obj.props.colSpan = 2;
                    }
                    return obj;
                }
            },
            {
                title: '是否满足',
                dataIndex: 'desc',
                width: '81px',
                render: (text, record, index) => {
                    return <div>
                        <Checkbox onChange={onChangeCheckbox.bind(this, 'tableChecked3', tableChecked3, index)} defaultChecked={tableChecked3[index]} disabled={type != 3 ? false : true}></Checkbox>
                    </div>
                }
            }],
        pagination: false,
        rowKey: (record, index) => index,
        bordered: true
    }
    /** 表格4 */
    let tableProps4 = {
        dataSource: tableData4,
        columns: [
            {
                title: '阵地',
                dataIndex: 'data1',
                key: 'data1',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index == 0) {
                        obj.props.rowSpan = tableData4.length;
                    }
                    if (index >= 1) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '功能类别',
                dataIndex: 'data2',
                key: 'data2',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 4;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 6;
                    }
                    if (index === 10) {
                        obj.props.rowSpan = 2;
                    }
                    if ((index >= 1 && index <= 3) || (index >= 5 && index <= 9) || (index >= 11 && index <= 12)) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '场所用途',
                dataIndex: 'data3',
                key: 'data3',
            },
            {
                title: '是否设置',
                dataIndex: 'desc',
                width: '81px',
                render: (text, record, index) => {
                    return <div>
                        <Checkbox onChange={onChangeCheckbox.bind(this, 'tableChecked4', tableChecked4, index)} defaultChecked={tableChecked4[index]} disabled={type != 3 ? false : true}></Checkbox>
                    </div>
                }
            }],
        pagination: false,
        rowKey: (record, index) => index,
        bordered: true
    }
    /** 下一步 */
    function next() {
        if (current == 0) {
            validateFields(['centerDirector', 'captain', 'centerOfficeDirector'], (err, values) => {
                if (err) {
                    return;
                }
                let datas = {
                    ...values,
                    // organizationList: 'https://static.elive99.com/img_2020072017272856.jpeg'
                }
                if (detail.organizationList) {
                    nextDispatch(datas);
                } else {
                    message.error(`请上传实践所、站、点清单文件`);
                }
            });
        } else if (current == 1) {
            nextDispatch({ activityCheckout: tableChecked1 });
        } else if (current == 2) {
            nextDispatch({ positionCheckout: tableChecked2 });
        } else if (current == 3) {
            validateFields(['workNum', 'teamNum'], (err, values) => {
                if (err) {
                    return;
                }
                let datas = {
                    workNum: values.workNum + "",
                    teamNum: values.teamNum + "",
                    teamCheckout: tableChecked3
                }
                nextDispatch(datas);
            });
        }
    }
    function nextDispatch(values) {
        dispatch({
            type: "StepApplicationModel/concat",
            payload: {
                current: current + 1,
                submitData: { ...submitData, ...values },
                detail: { ...detail, ...values }
            }
        })
    }
    /** 上一步 */
    function prev() {
        if (current == 3) {
            validateFields(['workNum', 'teamNum'], (err, values) => {
                let valuess = {
                    workNum: values.workNum + "",
                    teamNum: values.teamNum + "",
                    teamCheckout: tableChecked3
                }
                dispatch({
                    type: "StepApplicationModel/concat",
                    payload: {
                        submitData: { ...submitData, ...valuess },
                        detail: { ...detail, ...valuess }
                    }
                })
            });
        }
        dispatch({
            type: "StepApplicationModel/concat",
            payload: {
                current: current == 0 ? 0 : current - 1
            }
        })
    }
    /** 最后一步提交*/
    function lastSubmitFun() {
        let data = {
            ...submitData,
            placeCheckout: tableChecked4
        };
        if (id) {
            dispatch({
                type: "StepApplicationModel/ajaxEdit",
                payload: { ...data, id }
            })
        } else {
            dispatch({
                type: "StepApplicationModel/ajaxAdd",
                payload: data
            })
        }
    }
    /** 上传文件 */
    const draggerProps = {
        name: 'file',
        action: 'https://upload.qiniup.com/',
        data: {
            token: qiniuData.token || '',
            key: `${new Date().getTime()}.xlsx`
        },
        accept: ".xls,.xlsx",
        fileList,
        beforeUpload(file) {
            const isJpgOrPng = extname(file.name) === 'xls' || extname(file.name) === 'xlsx';
            if (!isJpgOrPng) {
                message.error('您只能上传xls/xlsx文件!');
            }
            return isJpgOrPng;
        },
        onChange(info) {
            console.log("info:", info);
            const { status, response } = info.file;
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = qiniuData.qiniuDomain + file.response.key;
                    file.name = '新时代文明实践所、站、点清单';
                    // file.name = file.response.key;
                }
                return file;
            });
            if (status !== 'uploading') {
            }
            if (status === 'done') {
                // message.success(`${info.file.name} file uploaded successfully.`);
                let { key } = response;
                let url = qiniuData.qiniuDomain + key;
                dispatch({
                    type: "StepApplicationModel/concat",
                    payload: {
                        submitData: { ...submitData, organizationList: url },
                        detail: { ...detail, organizationList: url },
                        fileList
                    }
                })
            } else if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败.`);
                dispatch({
                    type: "StepApplicationModel/concat",
                    payload: {
                        fileList
                    }
                })
            } else if (status === 'removed') {
                dispatch({
                    type: "StepApplicationModel/concat",
                    payload: {
                        submitData: { ...submitData, organizationList: '' },
                        detail: { ...detail, organizationList: '' },
                        fileList
                    }
                })
            } else if (status === 'uploading') {
                dispatch({
                    type: "StepApplicationModel/concat",
                    payload: {
                        fileList
                    }
                })
            }
        },
    };
    /** 默认 */
    const defaultFileList = {
        name: 'file',
        action: 'https://upload.qiniup.com/',
        data: {
            token: qiniuData.token || '',
            key: `${new Date().getTime()}.xlsx`
        },
        accept: ".xls,.xlsx",
        fileList,
        beforeUpload(file) {
            const isJpgOrPng = extname(file.name) === 'xls' || extname(file.name) === 'xlsx';
            if (!isJpgOrPng) {
                message.error('您只能上传xls/xlsx文件!');
            }
            return isJpgOrPng;
        },
        onChange(info) {
            console.log("info:", info);
            const { status, response } = info.file;
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = qiniuData.qiniuDomain + file.response.key;
                    file.name = '新时代文明实践所、站、点清单';
                    // file.name = file.response.key;
                }
                return file;
            });
            if (status !== 'uploading') {
            }
            if (status === 'done') {
                // message.success(`${info.file.name} file uploaded successfully.`);
                let { key } = response;
                let url = qiniuData.qiniuDomain + key;
                dispatch({
                    type: "StepApplicationModel/concat",
                    payload: {
                        submitData: { ...submitData, organizationList: url },
                        detail: { ...detail, organizationList: url },
                        fileList
                    }
                })
            } else if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败.`);
                dispatch({
                    type: "StepApplicationModel/concat",
                    payload: {
                        fileList
                    }
                })
            } else if (status === 'removed') {
                dispatch({
                    type: "StepApplicationModel/concat",
                    payload: {
                        submitData: { ...submitData, organizationList: '' },
                        detail: { ...detail, organizationList: '' },
                        fileList
                    }
                })
            } else if (status === 'uploading') {
                dispatch({
                    type: "StepApplicationModel/concat",
                    payload: {
                        fileList
                    }
                })
            }
        },
        defaultFileList: [
            {
                uid: '-1',
                name: '申报材料',
                status: 'done',
                url: detail.organizationList,
            }
        ],
    };
    /** 下载 */
    function onExportFun() {
        dispatch({
            type: "StepApplicationModel/getExcel",
            payload: {}
        })
    }
    /**
    * 截取指定字符后的内容
    * @param url 路径
    * @param parameter 字符
    */
    function getCaption(url, parameter) {
        var index = url.lastIndexOf(parameter);
        url = url.substring(index + 1, url.length);
        return url;
    }
    /** 返回 */
    function onReturnFun() {
        window.location.href = `#/pilotApplicationEdit?id=${id}&&type=${props.types}&&menberType=${props.menberType}&&declareUrl=${props.declareUrl}`
    }
    /**
     * 文件后缀
     */
    function extname(filename) {
        if (!filename || typeof filename != 'string') {
            return false
        };
        let a = filename.split('').reverse().join('');
        let b = a.substring(0, a.search(/\./)).split('').reverse().join('');
        return b
    };
    /** 文件上传 */
    let uploadFilesProps = {

    }
    return (
        <div>
            <Breadcrumb {...breadcrumbProps} />
            <Card>
                <Row type="flex" justify="space-between">
                    <Col><div style={{ fontSize: '20px', color: '#000', paddingBottom: '20px' }}>分步填写申报内容</div></Col>
                    <Col><Button onClick={onReturnFun}>返回</Button></Col>
                </Row>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <Form>
                    {current == 0 ? <div style={{ paddingTop: '20px' }}>
                        <div style={{ fontSize: '20px', color: '#000', paddingBottom: '20px' }}>负责人</div>
                        <Form.Item label="中心主任" {...formItemLayout}>
                            {getFieldDecorator('centerDirector', {
                                initialValue: detail.centerDirector,
                                rules: [{ required: true, message: '请输入中心主任!', whitespace: true }],
                            })(
                                type != 3 ? <Input type="text" placeholder="请输入中心主任" maxLength={15} /> : <span>{detail.centerDirector}</span>
                            )}
                        </Form.Item>
                        <Form.Item label="新时代文明实践志愿服务总队队长" {...formItemLayout}>
                            {getFieldDecorator('captain', {
                                initialValue: detail.captain,
                                rules: [{ required: true, message: '请输入新时代文明实践志愿服务总队队长!', whitespace: true }],
                            })(
                                type != 3 ? <Input type="text" placeholder="请输入新时代文明实践志愿服务总队队长" maxLength={15} /> : <span>{detail.captain}</span>
                            )}
                        </Form.Item>
                        <Form.Item label="中心办公室主任" {...formItemLayout}>
                            {getFieldDecorator('centerOfficeDirector', {
                                initialValue: detail.centerOfficeDirector,
                                rules: [{ required: true, message: '请输入中心办公室主任!', whitespace: true }],
                            })(
                                type != 3 ? <Input type="text" placeholder="请输入中心办公室主任" maxLength={15} /> : <span>{detail.centerOfficeDirector}</span>
                            )}
                        </Form.Item>
                        <div style={{ fontSize: '20px', color: '#000', paddingBottom: '20px' }}>新时代文明实践所、站、点清单</div>
                        {type != 3 ? <Row type="flex" justify="start" align="middle">
                            <Col>
                                <div style={{ width: '400px', paddingBottom: '10px' }}>
                                    {/* {!detail.organizationList ? <UploadFiles {...uploadFilesProps}/>  : <Upload {...defaultFileList}></Upload>} */}
                                    {!detail.organizationList ? <Dragger {...draggerProps}>
                                        <p className="ant-upload-drag-icon">
                                            <Icon type="inbox" />
                                        </p>
                                        <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                                        <p className="ant-upload-hint">支持扩展名：.xls .xlsx</p>
                                    </Dragger> : <Upload {...defaultFileList}></Upload>}
                                </div>
                            </Col>
                            <Col>
                                <a onClick={onExportFun} style={{ fontSize: '14px', marginLeft: '100px' }}>下载数据模版<Icon type="download" style={{ marginLeft: '6px' }} /></a>
                            </Col>
                        </Row>
                            : <a href={detail.organizationList} target="_black" style={{ fontSize: '14px' }}><Icon type="paper-clip" />新时代文明实践所、站、点清单<Icon type="download" style={{ marginLeft: '6px' }} /></a>}
                    </div> : ''}
                    {current == 1 ? <div style={{ paddingTop: '20px' }}>
                        <div style={{ fontSize: '20px', color: '#000', paddingBottom: '20px' }}>新时代文明实践活动开展情况</div>
                        <Table {...tableProps1} />
                    </div> : ''}
                    {current == 2 ? <div style={{ paddingTop: '20px' }}>
                        <div style={{ fontSize: '20px', color: '#000', paddingBottom: '20px' }}>新时代文明实践中心功能</div>
                        <Table {...tableProps2} />
                    </div> : ''}
                    {current == 3 ? <div style={{ paddingTop: '20px' }}>
                        <div style={{ fontSize: '20px', color: '#000', paddingBottom: '20px' }}>新时代文明实践中心工作人员配置</div>
                        <Form.Item label="人数（位）" {...formItemLayout}>
                            {getFieldDecorator('workNum', {
                                initialValue: detail.workNum ? Number(detail.workNum) : undefined,
                                rules: [{ required: true, message: '请输入人数!' }, { pattern: /^([1-9]\d*|[0]{1,1})$/, message: '请输入0-1000的正整数!' }],
                            })(
                                type != 3 ? <InputNumber min={0} max={1000} placeholder="请输入人数" style={{ width: '30%' }} /> : <span>{detail.workNum}</span>
                            )}
                        </Form.Item>
                        <div style={{ fontSize: '20px', color: '#000', paddingBottom: '20px' }}>新时代文明实践中心队伍配置</div>
                        <Form.Item label="队伍数（支）" {...formItemLayout}>
                            {getFieldDecorator('teamNum', {
                                initialValue: detail.teamNum ? Number(detail.teamNum) : undefined,
                                rules: [{ required: true, message: '请输入队伍数!' }, { pattern: /^([1-9]\d*|[0]{1,1})$/, message: '请输入0-1000的正整数!' }],
                            })(
                                type != 3 ? <InputNumber min={0} max={1000} placeholder="请输入队伍数" style={{ width: '30%' }} /> : <span>{detail.teamNum}</span>
                            )}
                        </Form.Item>
                        <div style={{ fontSize: '20px', color: '#000', paddingBottom: '20px' }}>新时代文明实践志愿服务建设内容</div>
                        <Table {...tableProps3} />
                    </div> : ''}
                    {current == 4 ? <div style={{ paddingTop: '20px' }}>
                        <div style={{ fontSize: '20px', color: '#000', paddingBottom: '20px' }}>新时代文明实践中心功能场所配置</div>
                        <Table {...tableProps4} />
                    </div> : ''}
                    <div style={{ paddingTop: '20px' }}>
                        {current > 0 && (<Button onClick={prev}>上一步</Button>)}
                        {current === steps.length - 1 && type != 3 && (<Button style={{ marginLeft: 8 }} type="primary" onClick={lastSubmitFun}>完成并提交</Button>)}
                        {current < steps.length - 1 && (<Button style={{ marginLeft: 8 }} type="primary" onClick={next}>下一步</Button>)}
                    </div>
                </Form>
                <Divider />
                <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#666', paddingBottom: '10px' }}>内容说明</div>
                    <div style={{ fontSize: '14px', color: '#999' }}>{steps[current].content}</div>
                </div>
            </Card>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.StepApplicationModel,
        loading: state.loading.models.StepApplicationModel
    };
}
export default connect(mapStateToProps)(Form.create()(StepApplication));