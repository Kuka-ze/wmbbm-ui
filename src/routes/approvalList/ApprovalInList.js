import React from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Table, Modal, Popover, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { authority, popovers, setCacheData } from '../../utils/util';

function ApprovalInList(props) {
  const { list, total, params, dispatch } = props;
  const pageAll =  Math.ceil(total/params.pageSize);
  //页码选择
  function onShowSizeChange(current,size){
    params.pageSize = size;
    params.pageNum = 1;
    const param = { ...params, pageSize: size, pageNum: 1};
    reload(param);
  }
  function changePage(page,pageSize){
    params.pageNum = page;
    const param = { ...params, pageNum: page };
    reload(param);
  }
  function reload(params) {
    dispatch({
      type: 'ApprovalInListModel/getApprovalList',
      payload: params,
    });
    dispatch({
      type: 'ApprovalInListModel/concat',
      payload: {
        params,
      }
    });
  }
  const columns = [{
    title: '活动名称',
    dataIndex: 'activityName',
    key: 'activityName',
    render: (text, record) => {
      return <Popover content={text} >{text && text.length > 10 ? text.substring(0, 9) + '...' : text}</Popover>
    }
  }, {
    title: '活动类型',
    dataIndex: 'typeName',
    key: 'typeName',
  }, {
    title: '所属中心/所/联盟/站/点',
    dataIndex: 'centerData',
    key: 'centerData',
    width: '20%'
  }, {
    title: '活动地点',
    dataIndex: 'detailAddress',
    key: 'detailAddress',
    render: (text, record) => {
      return text ? popovers(text, 20, 300) : '-'
    },
  }, {
    title: '报名情况',
    dataIndex: 'applyNumber',
    key: 'applyNumber',
    render: (text, record) => {
      return <div>{`${record.applyNumber}/${record.volunteerNumber}`}</div>
    }
  }
    , {
    title: '报名截止时间',
    dataIndex: 'applyDeadline',
    key: 'applyDeadline',
  },
  {
    title: '报名状态',
    dataIndex: 'applyStatusMsg',
    key: 'applyStatusMsg',
  },
  {
    title: '活动状态',
    dataIndex: 'activityStatusMsg',
    key: 'activityStatusMsg',
  }];
  function getOut() {
    dispatch({
      type: 'ApprovalInListModel/getOut',
      payload: {}
    })
  }
  function handleOk() {
    dispatch({
      type: 'ApprovalInListModel/concat',
      payload: {
        outVisible: false
      }
    })
    window.location.href = props.scalar
  }
  function handleCancel() {
    dispatch({
      type: 'ApprovalInListModel/concat',
      payload: {
        outVisible: false
      }
    })
  }
  return <div>{!authority('list') ? <div>
    <Card style={{ marginTop: '10px' }}>
      <Button type="primary" onClick={getOut}>导出</Button>
      <Table defaultExpandAllRows={true} className="mt1" dataSource={list} rowKey={(record => record.id)} columns={columns} pagination={false}/>
      <Pagination showTotal={(total, range) => `共${total}条记录 第${params.pageNum}/${pageAll}页`} total={total} current={params.pageNum} pageSize={params.pageSize} showSizeChanger showQuickJumper onChange={changePage} onShowSizeChange={onShowSizeChange} className="table-page"/>
    </Card>
  </div>
    : <div className="kong-tu">
      <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
    </div>
  }
    <Modal
      title="下载文件"
      visible={props.outVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>确定要下载吗</p>
      <a href={props.scalar} download=''></a>
    </Modal>
  </div>
}

function mapStateToProps(state) {
  return {
    ...state.ApprovalInListModel,
    loading: state.loading.models.ApprovalInListModel,
  };
}
export default connect(mapStateToProps)(Form.create()(ApprovalInList));
