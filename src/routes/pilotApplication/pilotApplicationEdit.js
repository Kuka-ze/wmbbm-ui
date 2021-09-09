import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Cascader, Tabs, Modal } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import PilotApplicationAdd from "./components/PilotApplicationAdd";
import Image from '../../components/Image';
import queryString from 'query-string';
import { Link } from 'dva/router';
import Evaluate from './Evaluate';
import './pilotApplicationEdit.css'
const { confirm } = Modal;
const { TextArea } = Input;

function IndexAddEdit(props) {
    let { form, loading, dispatch, rejectVisible, detail = {}, status, params = {}, onSelectChanges, type, rejectItem = {}, evaluateList } = props;
    // const type = props.type
    const disabledId = queryString.parse(props.history.location.search).id
    const { getFieldDecorator, validateFields } = form;
    const { TabPane } = Tabs;



    function callback(key) {
        if (key == 2) {
            dispatch({
                type: 'pilotApplicationEditModel/declaresEvalua',
                payload: { id: props.id }
            })
        }
    }
    //布局
    const formItemLayoutMin = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    }
    /** 面包屑 */
    const breadcrumbProps = {
        breadcrumbs: [{
            name: '试点申报管理',
        }, {
            name: '试点申报管理',
            href: 'pilotApplication'
        }, {
            name: type == 1 ? '立即申报' : type == 2 ? "修改" : type == 3 ? "详情" : type == 4 ? "评价" : '审核',
        }
        ]
    }
    //通过
    function handleSubmit(e) {
        let data = {
            id: e.id,
            state: 1
        }
        console.log('通过', e)
        dispatch({
            type: 'pilotApplicationEditModel/declaresAudit',
            payload: data
        })

    }
    //驳回
    function handleReject(e) {
        console.log('驳回点击', e)
        validateFields((err, values) => {
            if (err) {
                return;
            }
            let data = {
                id: e.id,
                rejectNote: values.rejectNote || '',
                state: 2
            }
            dispatch({
                type: 'pilotApplicationEditModel/declaresAudit',
                payload: data
            })
            handleIrejectVisible()
        })
    }
    //打开驳回弹出框
    function hanleOpenModal(e) {
        console.log('打开弹出框')
        dispatch({
            type: 'pilotApplicationEditModel/concat',
            payload: {
                rejectVisible: true,
                rejectItem: e
            }
        });
    }
    //关闭驳回弹出框
    function handleIrejectVisible(e) {
        console.log('关闭弹出框')
        dispatch({
            type: 'pilotApplicationEditModel/concat',
            payload: {
                rejectVisible: false,
            }
        });
        props.form.resetFields();
    }
    //返回上一页
    function handleBack(e) {
        // history.go(-1);
        props.history.push('/pilotApplication')

    }
    //evaluateProps
    let evaluateProps = {
        edit: props.evaluateEdit, evaluateList,
        memberType: props.menberType, id: props.id, type: props.type, activeEvaluateTab: props.activeEvaluateTab, status,
        onSubmit(data) {
            dispatch({
                type: 'pilotApplicationEditModel/ajaxEditEvaluate',
                payload: data
            })
        },
        changeEvaluate(a) {
            dispatch({
                type: 'pilotApplicationEditModel/concat',
                payload: {
                    evaluateEdit: a=='1'?true:false
                }
            })
        },
        evaluateTab(e) {
            dispatch({
                type: 'pilotApplicationEditModel/concat',
                payload: {
                    activeEvaluateTab: e
                }
            })
        }
    }
    return (
        <div className="pilotApplicationEdit">
            <Breadcrumb {...breadcrumbProps} />
            <Card>
                <div>
                    <div className="title-flex">
                        {
                            type == 1 || 2 ? <div style={{ fontSize: '18px', fontWeight: 'bold' }}>分步填写申报内容</div> : ''
                        }
                        {
                            type == 2 || type == 3 || type == 4 ? <div className="status"><div className={detail.status == 1 ? 'status-circle' : detail.status == 2 ? "circle2" : detail.status == 3 ? "circle3" : detail.status == 4 ? "circle4" : detail.status == 5 ? "circle5" : ''}></div>{detail.statusName}</div> : type == 5 ? <div className="examination">
                                <Button className="ml1" type="primary"
                                    loading={loading}
                                    onClick={handleSubmit.bind(this, detail)} >审核通过</Button>
                                <Button className="ml1" onClick={hanleOpenModal.bind(this, detail)}>驳回(须填写驳回原因)</Button>
                            </div> : ''
                        }
                    </div>
                    {
                        type == 2 || type == 3 ? <Link to={`/rejectionRecord?type=${type}&&id=${detail.id}&&status=${detail.status}&&statusName=${detail.statusName}`} > <div className="hsitory">查看驳回历史记录</div>
                        </Link> : ''
                    }

                </div>
            </Card>
            <Card style={{ marginTop: '20px' }}>
                {
                    type == 3 || type == 4 || type == 5 ? <Tabs defaultActiveKey={type == 4 ? '2' : '1'} onChange={callback}>
                        <TabPane tab="详情" key="1">
                            <PilotApplicationAdd props={props} />
                        </TabPane>
                        <TabPane tab="评价" key="2">
                            <Evaluate {...evaluateProps} />
                        </TabPane>
                    </Tabs> : <div>
                            <PilotApplicationAdd props={props} />
                        </div>
                }
                <Button className="ml1" onClick={handleBack}>返回</Button>
            </Card>
            <Modal title="驳回申请" visible={rejectVisible} footer={null} onCancel={handleIrejectVisible.bind(this)}>
                <Card>
                    <Form>
                        <Form.Item label="驳回意见" {...formItemLayoutMin}>
                            {getFieldDecorator('rejectNote', {
                                initialValue: params.rejectNote,
                                rules: [{ required: true, message: '请输入驳回意见' }],
                            })(
                                <TextArea rows={4} placeholder="请输入驳回意见" maxLength="500" />
                            )}
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 8, offset: 5 }}>
                            <Button className="ml1" onClick={handleIrejectVisible.bind(this)}>取消</Button>
                            <Button className="ml1" type="primary"
                                loading={loading}
                                onClick={handleReject.bind(this, rejectItem)} >确定</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.pilotApplicationEditModel,
        loading: state.loading.models.pilotApplicationEditModel
    };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));