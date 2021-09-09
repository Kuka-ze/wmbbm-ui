import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Popconfirm } from 'antd';
import { noData, authority, popovers } from '../../../utils/util';

function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdateStatus, onUpdatePwd } = props;
  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '中心名称',
        dataIndex: 'centerName',
        key: 'centerName',
        render: noData,
      }, {
        title: '区域',
        dataIndex: 'provinceName',
        key: 'provinceName',
        render: noData,
      }, {
        title: '中心介绍',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => {
          return text ? popovers(text, 20, 300) : '-'
        },
        // render: noData,
      },
      {
        title: '文明实践所',
        dataIndex: 'placeCount',
        key: 'placeCount',
        render: (text, record) => {
          return +record.placeCount > 0 ? <Link to={`/centralManagementDetail?id=${record.id}&tab=1&name=${record.centerName}`}>{record.placeCount}</Link> : <span>{record.placeCount}</span>
        }
      },
      {
        title: '志愿联盟',
        dataIndex: 'leagueCount',
        key: 'leagueCount',
        render: (text, record) => {
          return +record.leagueCount > 0 ? <Link to={`/centralManagementDetail?id=${record.id}&tab=2&name=${record.centerName}`}>{record.leagueCount}</Link> : <span>{record.leagueCount}</span>
        }
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          let link1 = `/centralManagementView?id=${record.id}`;
          let link2 = `/centralManagementEdit?id=${record.id}`;
          return <div>
            {authority('detail') ?
              <Link to={link1} className="ml1">详情</Link>
              : null
            }
            {authority('edit') ?
              <Link to={link2} className="ml1">编辑</Link>
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
