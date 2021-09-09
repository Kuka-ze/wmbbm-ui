import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Modal, Table, Popconfirm, message } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormList from './components/FormList';
import FormSearch from "./components/FormSearch";
import { authority, noData } from '../../utils/util';

function Index(props) {
  let { dispatch } = props;

  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '理论宣讲',
    }, {
      name: '活动池',
    }]
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: props.list,
    paginationTotal: props.paginationTotal,
    params: props.params,
    onChangePage(pageNum) {
      dispatch({
        type: 'ActivityPondModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdate(record, type) {
      if (type == 1) {
        dispatch({
          type: 'ActivityPondModel/ajaxInfoService',
          payload: {
            id: record.id,
          },
        });
        dispatch({
          type: 'ActivityPondModel/concat',
          payload: {
            visible: true,
            type,
            activityId: record.id,
            massesArr: []
          },
        });
      } else if (type == 2) {
        dispatch({
          type: 'ActivityPondModel/ajaxVolunteerList',
          payload: {
            activityId: record.id,
          },
        });
        dispatch({
          type: 'ActivityPondModel/concat',
          payload: {
            visible: true,
            type,
            activityId: record.id,
          },
        });
      } else if (type == 3) {
        dispatch({
          type: 'ActivityPondModel/ajaxCancel',
          payload: {
            activityId: record.id,
          },
        });
      }
    }
  }
  /** 筛选 */
  const formSearchProps = {
    areaTree: props.areaTree,
    is_reset: props.is_reset,
    params: props.params,
    onFormReset() {
      dispatch({
        type: 'ActivityPondModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'ActivityPondModel/ajaxList',
        payload: data
      })
    }
  }
  /** 弹框确定 */
  function handleOk() {
    let { massesArr, activityId } = props;
    if (massesArr && massesArr.length > 0) {
      dispatch({
        type: 'ActivityPondModel/ajaxMassesAdd',
        payload: {
          massesArr,
          activityId
        },
        callback: () => {
          dispatch({
            type: 'ActivityPondModel/concat',
            payload: {
              visible: false,
            },
          });
        }
      });

    } else {
      message.error('请勾选需要添加的群众！');
    }
  }
  /** 弹框取消 */
  function handleCancel() {
    dispatch({
      type: 'ActivityPondModel/concat',
      payload: {
        visible: false,
      },
    });
  }
  /** 表格1 */
  let tableProps1 = {
    dataSource: props.infoService || [],
    columns: [
      {
        title: '用户姓名',
        dataIndex: 'userName',
        key: 'userName',
        render: noData,
      }, {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
        render: noData,
      }, {
        title: '点单时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: noData,
      }
    ],
    pagination: false,
    rowKey: (record, index) => record.appUserId,
    loading: props.loading,
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        let massesArr = selectedRows && selectedRows.length > 0 ? selectedRows.map((item, index) => {
          return {
            templateOrderId: item.templateOrderId,
            appUserId: item.appUserId
          }
        }) : [];
        dispatch({
          type: 'ActivityPondModel/concat',
          payload: {
            massesArr,
          },
        });
      }
    }
  }
  /** 表格2 */
  let tableProps2 = {
    dataSource: props.volunteerList || [],
    columns: [
      {
        title: '人员姓名',
        dataIndex: 'volunteerName',
        key: 'volunteerName',
        render: noData,
      }, {
        title: '手机号',
        dataIndex: 'volunteerMobile',
        key: 'volunteerMobile',
        render: noData,
      }, {
        title: '响应时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: noData,
      }, {
        title: '签到状态',
        dataIndex: 'typeName',
        key: 'typeName',
        render: noData,
      }, {
        title: '应发时长',
        dataIndex: 'auditDuration',
        key: 'auditDuration',
        render: noData,
      }
    ],
    pagination: false,
    rowKey: (record, index) => record.id,
    loading: props.loading,
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        let volunteerArr = selectedRows && selectedRows.length > 0 ? selectedRows.map((item, index) => {
          return item.appUserId
        }) : [];
        dispatch({
          type: 'ActivityPondModel/concat',
          payload: {
            volunteerArr,
          },
        });
      }
    }
  }
  /** 发放&驳回 */
  function onIssueRejected(auditState) {
    let { activityId, volunteerArr } = props;
    let payload = {
      activityId,
      volunteerArr,
      auditState
    }
    dispatch({
      type: 'ActivityPondModel/ajaxAudit',
      payload,
      callback: () => {
        dispatch({
          type: 'ActivityPondModel/concat',
          payload: {
            visible: false,
          },
        });
      }
    });
  }

  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          <FormList {...formListProps} />
        </Card>
        {props.type == 1 ?
          <Modal
            title="添加群众"
            visible={props.visible}
            onOk={handleOk.bind(this)}
            onCancel={handleCancel.bind(this)}
            width="900px"
            destroyOnClose
          >
            <Table {...tableProps1} />
          </Modal> :
          <Modal
            title="发放时长"
            visible={props.visible}
            // onOk={handleOk.bind(this)}
            onCancel={handleCancel.bind(this)}
            footer={null}
            width="900px"
            destroyOnClose
          >
            {props.volunteerArr && props.volunteerArr.length > 0 ? <span>
              <Popconfirm title={`是否确认“发放”文明时长？`} onConfirm={onIssueRejected.bind(this, '1')}>
                <Button type="primary">发放</Button>
              </Popconfirm>
              <Popconfirm title={`是否确认“驳回”文明时长？`} onConfirm={onIssueRejected.bind(this, '2')}>
                <Button className="ml1">驳回</Button>
              </Popconfirm>
            </span> : <span>
              <Button type="primary" onClick={() => message.error('请勾选需要发放时长的成员！')}>发放</Button>
              <Button className="ml1" onClick={() => message.error('请勾选需要驳回时长的成员！')}>驳回</Button>
            </span>}
            <Table {...tableProps2} className="mt1" />
          </Modal>}
      </div>
        : <div className="kong-tu">
          <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
        </div>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.ActivityPondModel,
    loading: state.loading.models.ActivityPondModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
