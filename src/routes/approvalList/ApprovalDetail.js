import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Input, Modal, Table, Popconfirm, Popover } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import { noData, authoritys } from '../../utils/util';

function IndexDetail(props) {
  let { form, loading, dispatch, detail = {}, rejectVisible, reasonVisible, feedbackCon, showTip, type, params = {}, page, applyId } = props;
  let {applyList = {} } = detail;
  let {list = [], totalSize: paginationTotal = 0 } = applyList;
  const { getFieldDecorator, validateFields } = form;
  const { TextArea } = Input;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: page == 1 ? [{
      name: '活动管理',
    }, {
      name: '活动管理',
      href: 'approvalList'
    }, {
      name: '参与情况明细',
      href: `/approvalDetail?id=${sessionStorage.getItem('pageId')}&type=2`
    },{
      name: '子活动参与情况明细',
    }] : [{
      name: '活动管理',
    }, {
      name: '活动管理',
      href: 'approvalList'
    }, {
      name: '参与情况明细',
    }]
  }
  /** 布局 */
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  }
  //提交
  function onVolunteerCancel(record) {
    console.log(record,'record====')
    let payload = {
      applyId: record.applyId,
      id: record.activityId,
      volunteerId: record.volunteerId
    };
    dispatch({
      type: 'ApprovalDetailModel/ajaxVolunteerCancel',
      payload,
    });
  }
   //发放文明时长
   function onVolunteerTime(record) {
    let payload = {
      applyId: record.applyId
    };
    dispatch({
      type: 'ApprovalDetailModel/ajaxVolunteerTime',
      payload,
    });
  }
  //驳回
  function showRejectModal(record){
    // form.resetFields();
    form.setFieldsValue({ //清空
      rejectedReason: undefined
    });
    let payload = {
      applyId: record.applyId,
    };
    dispatch({
      type: 'ApprovalDetailModel/concat',
      payload: { ...payload, rejectVisible: true }
    });
  }
  function changeArea(){
    dispatch({
      type: 'ApprovalDetailModel/concat',
      payload: {  
        showTip: false
      }
    });
  }
  function onVolunteerReject() {
    validateFields(['rejectedReason'],(err, values) => {
      if (err) {
        return;
      }
      let { rejectedReason } = values;
      if(rejectedReason.length<1||rejectedReason.length>140){
        dispatch({
          type: 'ApprovalDetailModel/concat',
          payload: {  
            showTip: true
          }
        });
        return;
      }
      dispatch({
        type: 'ApprovalDetailModel/ajaxVolunteerReject',
        payload: {  
          rejectedReason, applyId
        }
      });
    });
  }
  //撤销驳回
  function onVolunteerJect(record) {
    let payload = {
      applyId: record.applyId
    };
    dispatch({
      type: 'ApprovalDetailModel/ajaxVolunteerJect',
      payload,
    });
  }
  //查看驳回原因
  function showReasonModal(record){
    let payload = {
      id: props.id,
      volunteerId: record.volunteerId,
      applyId: record.applyId,
    };
    dispatch({
      type: 'ApprovalDetailModel/ajaxVolunteerReason',
      payload: payload
    });
  }
  //隐藏弹窗
  function handleCancel(e) {
    form.resetFields();
    dispatch({
      type: 'ApprovalDetailModel/concat',
      payload: {
        reasonVisible: false,
        rejectVisible: false,
        showTip: false
      }
    });
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  let tableProps = {};
  if(type == 1){
    tableProps = {
      dataSource: detail.applyList,
      columns: [
        {
          title: '志愿者姓名',
          dataIndex: 'volunteerName',
          key: 'volunteerName',
          render: noData,
        }, {
          title: '所属队伍',
          dataIndex: 'teamList',
          key: 'teamList',
          render: (text, record) => {
            return text && text.length > 0 ?
            text.length > 2 ? 
          <Popover content={<div style={{width: '300px'}}>{text.join("，")}</div>} >
              {text.slice(0, 2).join("，")+ '...'}
            </Popover> : text.join("，")
              : '-'
          },
        }, {
          title: '联系电话',
          dataIndex: 'mobile',
          key: 'mobile',
          render: noData,
        }, {
          title: '报名时间',
          dataIndex: 'apply_deadline',
          key: 'apply_deadline',
          render: noData,
        }, {
          title: '报名状态',
          dataIndex: 'applyType',
          key: 'applyType',
          render: (text, record) => {
            return text && text == 1 ? '已报名' : text == 2 ? '已取消' : '志愿者取消'
          }
          // render: noData,
        }, {
          title: '签到时间',
          dataIndex: 'signIn',
          key: 'signIn',
          render: noData,
        }, {
          title: '签退时间',
          dataIndex: 'signOut',
          key: 'signOut',
          render: noData,
        }, {
          title: '预计发放时长',
          dataIndex: 'preDuration',
          key: 'preDuration',
          render: noData,
        },{
          title: '获得文明时长',
          dataIndex: 'actualDuration',
          key: 'actualDuration',
          render: noData,
        }, {
          title: '状态',
          dataIndex: 'durationStateMsg',
          key: 'durationStateMsg',
          render: noData,
        },      
        {
          title: '操作',
          dataIndex: 'desc',
          render: (text, record) => {
            return <div>
              {(detail.activityStatus == 1 || detail.activityStatus == 2) && record && (!record.signIn && !record.signOut) && record.applyType == 1 && authoritys('cancelBm', 1) ?
                <Popconfirm title={<div>取消后该志愿者将被踢出已<br />报名队伍，是否确认取消?</div>} onConfirm={onVolunteerCancel.bind(this, record)}>
                  <a className="ml1">取消</a>
                </Popconfirm> : ''}
              {record.durationState == 1 ?
                <Popconfirm title={<div>是否确认发放文明时长?</div>} onConfirm={onVolunteerTime.bind(this, record)}>
                  <a className="ml1">发放时长</a>
                </Popconfirm> : ''}
              {record.durationState == 1&&<a onClick={showRejectModal.bind(this, record)} className="ml1" style={{color:'#FF9900'}}>驳回</a>}
              {record.durationState == 3 ?
                <Popconfirm title={<div>是否确认撤销驳回?</div>} onConfirm={onVolunteerJect.bind(this, record)}>
                  <a className="ml1">撤销驳回</a>
                </Popconfirm> : ''} 
              {record.durationState == 3&&<a onClick={showReasonModal.bind(this, record)} className="ml1">驳回原因</a>}
            </div>
          }
        }],
      pagination: false,
      rowKey: (record, index) => index,
      loading: loading
    }
  }else if(type == 2){
    tableProps = {
      dataSource: list,
      columns: [
        {
          title: '子活动列表',
          dataIndex: 'activityName',
          key: 'activityName',
          render: noData,
        }, {
          title: '报名截止时间',
          dataIndex: 'applyDeadline',
          key: 'applyDeadline',
          render: noData,
        }, {
          title: '活动日期',
          dataIndex: 'activityDate',
          key: 'activityDate',
          render: noData,
        }, {
          title: '报名详情',
          dataIndex: 'applyCount',
          key: 'applyCount',
        render: (text, record) => <div>
          <Link to={`/approvalDetail?id=${record.id}&type=1&page=1`}>{`${record.applyCount}/${record.volunteerNumber}`}</Link>
            {record.durationState==1&&<span style={{color:'orange',marginLeft:'10px'}}>(时长需审核)</span>}
          </div>,
        }],
      pagination: {
        total: paginationTotal ? Number(paginationTotal) : '',
        current: params.pageNum,
        defaultCurrent: 1,
        defaultPageSize: params.pageSize,
        showTotal: (total, range) => `共有 ${paginationTotal} 条`,
        onChange: (page, pageSize) => {
          dispatch({
            type: 'ApprovalDetailModel/ajaxActivityManyDetail',
            payload: { ...props.params, pageNum: page }
          })
        },
      },
      rowKey: (record, index) => index,
      loading: loading
    }
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <ul className="detail-list">
          <li>
            <span className="name">活动名称</span>
            <span className="con">{detail.activityName || '-'}</span>
          </li>
          <li style={{flex: '0 0 66.66%'}}>
            <span className="name">发起方</span>
            <span className="con">{detail.centerData || '-'}</span>
          </li>
          <li>
            <span className="name">活动地点</span>
            <span className="con">{detail.detailAddress || '-'}</span>
          </li>
          <li>
            <span className="name">活动频次</span>
            <span className="con">{detail.styleMsg ? typeof(detail.styleMsg)=='string' ? detail.styleMsg : '-' :'-'}</span>
          </li>
          <li>
            <span className="name">活动日期</span>
            <span className="con">{detail.activityDate || '-'}</span>
          </li>
          <li>
            <span className="name">活动开始时间</span>
            <span className="con">{detail.activityBeginPoint || '-'}</span>
          </li>
          <li>
            <span className="name">活动结束时间</span>
            <span className="con">{detail.activityEndPoint || '-'}</span>
          </li>
          <li>
            <span className="name">签到模式</span>
            <span className="con">{detail.signModel && detail.signModel == 1 ? '仅签到' : detail.signModel == 2 ? '签到+签退' : detail.signModel == 3 ? '不需签到' : '' || '-'}</span>
          </li>
          <li>
            <span className="name">报名截止时间</span>
            <span className="con">{detail.applyDeadline || '-'}</span>
          </li>
          <li>
            <span className="name">活动状态</span>
            <span className="con">{detail.activityStatusMsg || '-'}</span>
          </li>
          <li>
            <span className="name">报名状态</span>
            <span className="con">{detail.applyStatusMsg || '-'}</span>
          </li>
          {type == 1 ? <li>
            <span className="name">志愿者数</span>
            <span className="con">{detail.applyNumber + '/' + detail.volunteerNumber || '-'} </span>
          </li>:''}
        </ul>
        <Table {...tableProps} />
        <Form.Item wrapperCol={{ span: 8, offset: 3 }} style={{ paddingTop: '20px' }}>
          <Button className="ml1" onClick={handleBack}>返回</Button>
        </Form.Item>
      </Card>
    {/** 驳回弹框 start */}
    <Modal
          title="驳回"
          visible={rejectVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form className="redExtra">
            <Form.Item label="驳回原因" {...formItemLayout} extra={showTip?"驳回原因必填且不能多于140个":''}>
              {getFieldDecorator('rejectedReason', {
                      rules: [{ required: true, message: "请输入1-140字的驳回原因" }]
                })(
                <TextArea placeholder="请输入驳回原因（1-140字）" onChange={changeArea}/>
              )}
            </Form.Item>
            
            <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
              <Button type="primary" onClick={onVolunteerReject}>确定</Button>
              <Button className="ml1" onClick={handleCancel}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
        {/** 驳回弹框 end */}
    {/** 驳回原因弹框 start */}
    <Modal
          title="驳回原因"
          visible={reasonVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form className="redExtra">
            <Form.Item label="驳回原因" {...formItemLayout} style={{marginBottom:'0'}}>
              {getFieldDecorator('feedbackCon')(
              <p>{!!feedbackCon?feedbackCon:''}</p>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 4, offset: 20 }}>
              <Button type="primary" onClick={handleCancel}>确定</Button>
              {/* <Button className="ml1" onClick={handleCancel}>关闭</Button> */}
            </Form.Item>
          </Form>
        </Modal>
        {/** 驳回原因弹框 end */}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.ApprovalDetailModel,
    loading: state.loading.models.ApprovalDetailModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexDetail));