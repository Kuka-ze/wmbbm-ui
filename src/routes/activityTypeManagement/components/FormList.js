import React from 'react';
import { Form, Table, Popconfirm } from 'antd';
import { noData, authority } from '../../../utils/util';
import { Link } from 'dva/router';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdateStatus, onUpdatePwd } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '类型名称',
        dataIndex: 'name',
        key: 'name',
        render: noData,
      },
      //  {
      //   title: '文明指数',
      //   dataIndex: 'goodValue',
      //   key: 'goodValue',
      //   render: noData,
      // },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return <div>
            {authority('edit') ?
              // <a className="mr1">编辑</a>
              // <Link to={link2} className="mr1">编辑</Link>
            <Link to={`/activityTypeManagementEdit?id=${record.id}`} className="mr1">编辑</Link>
              : null
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
