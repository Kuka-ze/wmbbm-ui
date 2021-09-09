import React from 'react';
import { Form, Table, Popconfirm, Badge } from 'antd';
import { noData, authority, popovers, setCacheData } from '../../../utils/util';
import { Link } from 'react-router-dom';
function Newlist(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, selected, selectedRowKeys = [] } = props;

  let tableProps = {
    dataSource: list,
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
    rowKey: (record, index) => record.appUserId,
    loading: loading,
    rowSelection: {
      selectedRowKeys: selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        // eslint-disable-next-line no-console
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        selected ? selected(selectedRowKeys, selectedRows) : ""
      },
      getCheckboxProps: record => ({
        disabled: record.appUserId === 'Disabled User', // Column configuration not to be checked
        name: record.userName,
      }),
    },
  }

  return (
    <div>
      <Table {...tableProps} />
    </div>
  )
}

export default Form.create()(Newlist);
