import React from 'react';
import { Form, Table } from 'antd';
import { noData, authority } from '../../../utils/util';

function FormList(props) {
  const { params = {}, list, paginationTotal, loading,
    onChangePage, onResponse, onImplement, onAssign } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName',
        render: noData,
      }, {
        title: '任务内容',
        dataIndex: 'serverContent',
        key: 'serverContent',
        render: noData,
      }, {
        title: '任务时间',
        dataIndex: 'taskTime',
        key: 'taskTime',
        render: noData,
      }, {
        title: '执行队伍',
        dataIndex: 'team',
        key: 'team',
        render: noData,
      }, {
        title: '执行人员',
        dataIndex: 'teamNum',
        key: 'teamNum',
        render: (text, record) => {
          return record && record.teamNum && Number(record.teamNum) > 0 ? <a onClick={() => onImplement(record)}>{`${record.teamNum}/${record.people}`}</a> : `${record.teamNum}/${record.people}`
        },
      }, {
        title: '任务状态',
        dataIndex: 'stateName',
        key: 'stateName',
        render: noData,
      }, {
        title: '下发时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: noData,
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          let link2 = `/culturalVenuesEdit?id=${record.id}`;
          let link1 = `/culturalVenuesView?id=${record.id}`;
          return params.type == 1 ? '-' : <div>
            {record.state == 1 ?
              <a onClick={() => onResponse(record)}>响应</a>
              : null
            }
            {record.state == 2 && (Number(record.teamNum) < Number(record.people)) ?
              <a onClick={() => onAssign(record)}>指派</a>
              : null
            }
            {record.state != 1 && (record.state != 2 || (Number(record.teamNum) >= Number(record.people))) ? '-' : ''}
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
