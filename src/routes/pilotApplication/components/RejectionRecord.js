import React from 'react';
import { connect } from 'dva';
import Breadcrumb from "../../../components/Breadcrumb/index";
import { Form, Card, Button, Input, Col, Select, Modal, Upload, Icon, message, Steps, Divider } from 'antd';
import queryString from 'query-string';
import { Link } from 'dva/router';
// import './index.css'
const { TextArea } = Input;
import '../pilotApplicationEdit.css'

function RejectionRecord(props) {
    console.log('props1111', props)
    let { type } = props;
    const { historyList, statusName, status } = props

    /** 面包屑 */
    const breadcrumbProps = {
        breadcrumbs: [{
            name: '试点申报管理',
        }, {
            name: '试点申报管理',
            href: 'pilotApplication'
        }, {
            name: type == 1 ? '立即申报' : type == 2 ? "修改" : type == 3 ? "详情" : type == 4 ? "评价" : '审核',
        }]
    }
    //返回上一页
    function handleBack(e) {
        props.history.go(-1)
    }

    return (
        <div className="pilotApplicationEdit">
            <Breadcrumb {...breadcrumbProps} />
            <Card>
                <div className="title-flex">
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>驳回历史记录</div>
                    {/* <div className="status"><div className="status-circle-reject"></div>市级已驳回</div> */}
                    <div className="status"><div className={status == 1 ? 'status-circle' : status == 2 ? "circle2" : status == 3 ? "circle3" : status == 4 ? "circle4" : status == 5 ? "circle5" : ''}></div>{statusName}</div>
                </div>
            </Card>
            <Card style={{ marginTop: '20px' }}>
                {historyList && historyList.length > 0 ? <div>
                    {historyList.map((item, index) => {
                        return <div key={index} className="history" style={{ marginBottom: '30px' }}>
                            <div>时间:<span>{item.createTime}</span></div>
                            <div style={{ color: '#000' }}>{item.rejectLevel.substring(0, 2)}驳回</div>
                            <div className="rejectJy">
                                <div className="rejectLevel">{item.rejectLevel.substring(0, 2)}驳回意见:</div>
                                <div className="rejectNote">
                                    {item.rejectNote}
                                </div>
                            </div>
                        </div>
                    })}
                </div> : <div style={{ fontSize: '15px', marginBottom: '30px' }}>暂无历史记录</div>}
                <Button className="ml1" onClick={handleBack}>返回</Button>
            </Card>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.pilotApplicationEditModel,
        loading: state.loading.models.pilotApplicationEditModel
    };
}
export default connect(mapStateToProps)(Form.create()(RejectionRecord));