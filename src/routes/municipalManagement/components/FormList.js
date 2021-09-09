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
        title: '名称',
        dataIndex: 'city',
        key: 'city',
        render: noData,
      }, {
        title: '所属区域',
        dataIndex: 'areaName',
        key: 'areaName',
        render: noData,
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          let link1 = `/municipalManagementView?id=${record.id}`;
          let link2 = `/municipalManagementEdit?id=${record.id}`;
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
