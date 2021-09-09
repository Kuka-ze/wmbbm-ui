import React from 'react';
import { Form, Table, Popconfirm } from 'antd';
import { noData, authority, popovers, setCacheData } from '../../../utils/util';
import { Link } from 'dva/router';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdateStatus, onUpdate } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '志愿者名称',
        dataIndex: 'volunteerName',
        key: 'volunteerName',
        render: noData,
      }, {
        title: '志愿者手机号码',
        dataIndex: 'volunteerMobile',
        key: 'volunteerMobile',
        render: noData,
      }, {
        title: '平台类别',
        dataIndex: 'platform',
        key: 'platform',
        render: noData,
      }, {
        title: '申请时常',
        dataIndex: 'creditTime',
        key: 'creditTime',
        render: noData,
      }, {
        title: '租户',
        dataIndex: 'corpName',
        key: 'corpName',
        render: noData,
      },
      {
        title: '审核队伍',
        dataIndex: 'team',
        key: 'team',
        render: noData,
      },
      {
        title: '状态',
        dataIndex: 'stateName',
        key: 'stateName',
        render: noData,
      },
      {
        title: '提交时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: noData,
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return <div>
            {record.state == 3 ?
              <Link to={`/platformDetail?id=${record.id}&&disabled=${true}`} className="ml1" onClick={() => setCacheData(params)}>审核</Link>
              : null
            }
            {
              <Link to={`/platformDetail?id=${record.id}&disabled=${false}`} className="ml1" onClick={() => setCacheData(params)}>详情</Link>
            }
          </div>
        }
      }],
    pagination: {
      total: paginationTotal ? Number(paginationTotal) : '',
      current: params.pageNum,
      defaultCurrent: 1,
      defaultPageSize: params.pageSize,
      showTotal: (total, range) => `共有 ${paginationTotal} 条`,
      onChange: (page, pageSize) => {
        onChangePage ? onChangePage(page) : '';
      },
    },
    rowKey: (record, index) => index,
    loading: loading
  }

  return (
    <div>
      <Table {...tableProps} />
    </div>
  )
}

export default Form.create()(FormList);
