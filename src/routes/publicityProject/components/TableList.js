import React from 'react';
import { Form, Table, Popconfirm, Badge } from 'antd';
import { noData, authority, popovers, setCacheData } from '../../../utils/util';
import { Link } from 'react-router-dom';
function TableList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage } = props;

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
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (text, item) => {
          const { templateOrderId } = item;
          return <p><Badge color={templateOrderId == 1 ? "gold" : templateOrderId == 2 ? "#108ee9" : templateOrderId == 3 ? "#87d068" : "#d9d9d9"} />{item.state}</p>
        },
      }, {
        title: '点单时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: noData,
      },
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

export default Form.create()(TableList);
