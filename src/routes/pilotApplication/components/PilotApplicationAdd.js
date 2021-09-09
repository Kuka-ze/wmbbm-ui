import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Cascader, Select, Alert, Upload, Icon, message, Steps } from 'antd';
import queryString from 'query-string';
import { Link } from 'dva/router';
import { authority, download } from '../../../utils/util';

const { Step } = Steps;
const steps = [
    {
        title: '组织架构',
        content: 'First-content',
    },
    {
        title: '活动内容',
        content: 'Second-content',
    },
    {
        title: '阵地整合',
        content: 'Last-content',
    },
    {
        title: '队伍组建',
        content: 'Last-content',
    },
    {
        title: '功能场所配置',
        content: 'Last-content',
    },
];
const { Dragger } = Upload;
function pilotApplicationAdd(props) {
    // console.log('props1111', props)
    let propsAdd = props.props
    console.log('propsAdd', propsAdd)
    const { type, detail, dispatch, qiniuData, id, menberType, declareUrl, fileList, } = propsAdd;



    function alertMessage() {
        message.warning('请上传申报材料');
    }

    /** 模版导出 */
    function onExportFun() {
        dispatch({
            type: 'pilotApplicationEditModel/getPdf',
            payload: {}
        })
    }

    /** 申报材料下载 */
    function applicationMaterialsDown() {
        const { declareUrl } = detail
        download(declareUrl)
    }

    /** 上传文件 */
    const draggerProps = {
        name: 'file',
        multiple: true,
        action: 'https://upload.qiniup.com/',
        data: {
            token: qiniuData.token || '',
            key: `${new Date().getTime()}.pdf`
        },
        fileList,
        accept: ".pdf",
        beforeUpload(file) {
            console.log('1111file--->', file)
            const isPdf = file.type === 'application/pdf';
            if (!isPdf) {
                message.error('请上传pdf格式文件');
            }
            return isPdf
        },
        onChange(info) {
            const { status, response } = info.file;
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = qiniuData.qiniuDomain + file.response.key;
                    file.name = '申报材料';
                    // file.name = file.response.key;
                }
                return file;
            });
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                let { key } = response;
                let url = qiniuData.qiniuDomain + key;
                console.log("url:", url);
                dispatch({
                    type: "pilotApplicationEditModel/concat",
                    payload: {
                        detail: {
                            declareUrl: url,
                            area: detail.area,
                            year: detail.year,
                        },
                        fileList
                    }
                })
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                dispatch({
                    type: "pilotApplicationEditModel/concat",
                    payload: {
                        detail: {
                            declareUrl: url,
                            area: detail.area,
                            year: detail.year,
                        },
                        fileList
                    }
                })
            } else if (status === 'removed') {
                dispatch({
                    type: "pilotApplicationEditModel/concat",
                    payload: {
                        fileList,
                        declareUrl: '',
                        detail: {
                            declareUrl: '',
                            area: detail.area,
                            year: detail.year
                        }
                    }
                })
            } else if (status === 'uploading') {
                dispatch({
                    type: "pilotApplicationEditModel/concat",
                    payload: {
                        fileList
                    }
                })
            }

        },
    };

    const defaultFileList = {
        name: 'file',
        multiple: true,
        action: 'https://upload.qiniup.com/',
        data: {
            token: qiniuData.token || '',
            key: `${new Date().getTime()}.pdf`
        },
        accept: ".pdf",
        fileList,
        beforeUpload(file) {
            const isPdf = file.type === 'application/pdf';
            if (!isPdf) {
                message.error('请上传pdf格式文件');
            }
            return isPdf;
        },
        onChange(info) {
            const { status, response } = info.file;
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = qiniuData.qiniuDomain + file.response.key;
                    file.name = '申报材料';
                    // file.name = file.response.key;
                }
                return file;
            });
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                let { key } = response;
                let url = qiniuData.qiniuDomain + key;
                console.log("url:", url);
                dispatch({
                    type: "pilotApplicationEditModel/concat",
                    payload: {
                        detail: {
                            declareUrl: url,
                            area: detail.area,
                            year: detail.year,
                        },
                        fileList
                    }
                })
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                dispatch({
                    type: "pilotApplicationEditModel/concat",
                    payload: {
                        detail: {
                            declareUrl: url,
                            area: detail.area,
                            year: detail.year,
                        },
                        fileList
                    }
                })
            } else if (status === 'removed') {
                dispatch({
                    type: "pilotApplicationEditModel/concat",
                    payload: {
                        fileList,
                        declareUrl: '',
                        detail: {
                            declareUrl: '',
                            area: detail.area,
                            year: detail.year
                        }
                    }
                })
            } else if (status === 'uploading') {
                dispatch({
                    type: "pilotApplicationEditModel/concat",
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
                url: detail.declareUrl || declareUrl,
            }
        ],
    };

    return (
        <div className="add-content pilotApplicationEdit" >
            <div className="font-input"><span>中心建设主体:</span><span className="input-value">{detail.area}</span></div>
            <div className="font-input"><span>申报年度:</span><span className="input-value">{detail.year}</span></div>
            <div style={{ paddingBottom: '30px' }}>
                <p className="font-input">申报材料</p>
                {type == 1 || type == 2 ? <div className="flex upload-dragger-div">
                    {!detail.declareUrl && !declareUrl ? <Dragger {...draggerProps} style={{ width: '400px' }}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                        <p className="ant-upload-hint">支持扩展名：.pdf</p>
                    </Dragger> : <Upload {...defaultFileList}></Upload>}

                    <div className="flex-center downliad-icon" onClick={onExportFun}>
                        下载数据模版
                    <Icon style={{ marginLeft: '10px' }} type="download" />
                    </div>
                </div> :
                    <a href={detail.declareUrl} target="_black" >
                        <div className=" downliad-icon-detail">
                            <Icon type="paper-clip" style={{ marginRight: '6px' }} />申报材料
                            <Icon type="download" style={{ marginLeft: '6px' }} />
                        </div>
                    </a>
                }

                <div style={{ marginTop: '80px' }}>
                    <p style={{ marginLeft: '40px' }} className="font-input">请按照以下分布流程填写申报试点量化内容</p>
                    <Steps current={-1}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    {
                        detail.declareUrl || declareUrl ? <Link to={`/stepApplication?type=${type}&&declareUrl=${detail.declareUrl || declareUrl}&&id=${id || ''}&&menberType=${menberType}`} > <div className="begin flex-center">
                            {type == 1 || type == 2 ? '开始' : '开始查看'}
                        </div>
                        </Link> : <div className="begin flex-center cur-point" onClick={alertMessage}>
                                {type == 1 || type == 2 ? '开始' : '开始查看'}
                            </div>
                    }

                </div>
            </div>
        </div >
    )
}

function mapStateToProps(state) {
    return {
        ...state.PilotApplicationModel,
        loading: state.loading.models.PilotApplicationModel
    };
}
export default connect(mapStateToProps)(Form.create()(pilotApplicationAdd));