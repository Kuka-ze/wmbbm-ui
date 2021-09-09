import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Popconfirm } from 'antd';
import { noData, authority, popovers, setCacheData } from '../../../utils/util';

function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdateStatus, onUpdatePwd } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '点名称',
        dataIndex: 'siteName',
        key: 'siteName',
        render: noData,
      }, {
        title: '所属中心>所>站',
        dataIndex: 'stationName',
        key: 'stationName',
        render: noData,
      }, {
        title: '点介绍',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => {
          return text ? popovers(text, 20, 300) : '-'
        },
      },
      {
        title: '志愿队伍',
        dataIndex: 'teamCount',
        key: 'teamCount',
        render: (text, record) => {
          return +record.teamCount > 0 ? <Link to={`/pointManagementDetail?id=${record.id}&name=${record.siteName}`} onClick={() => setCacheData(params)}>{record.teamCount}</Link> : <span>{record.teamCount}</span>
        }
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          let link1 = `/pointManagementView?id=${record.id}`;
          let link2 = `/pointManagementEdit?id=${record.id}`;
          return <div>
            {authority('detail') ?
              <Link to={link1} className="ml1" onClick={() => setCacheData(params)}>详情</Link>
              : null
            }
            {authority('edit') ?
              <Link to={link2} className="ml1" onClick={() => setCacheData(params)}>编辑</Link>
              : null
            }
          </div>
        }
      }
    ],
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
