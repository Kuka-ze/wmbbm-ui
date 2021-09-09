import React from 'react';
import { Form, Table, Popconfirm } from 'antd';
import { noData, authority, popovers, setCacheData } from '../../../utils/util';
import { Link } from 'react-router-dom';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdate } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '主题',
        dataIndex: 'epidemicName',
        key: 'epidemicName',
        render: (text, record) => {
          return text ? popovers(text, 20, 300) : '-'
        },
      }, {
        title: '中心',
        dataIndex: 'centerName',
        key: 'centerName',
        render: noData,
      }, {
        title: '描述',
        dataIndex: 'epidemicRemark',
        key: 'epidemicRemark',
        render: (text, record) => {
          return text ? popovers(text, 20, 300) : '-'
        },
      }, {
        title: '上报人/上报时间',
        dataIndex: 'createName',
        key: 'createName',
        render: (text, record) => {
          return `${record.createName}/${record.createTime}`
        },
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return <div>
            {authority('detail') ?
              <Link to={`/eventCenterInfo?id=${record.id}`} onClick={() => setCacheData(params)}>详情</Link>
              : null
            }
            {authority('del') ? <Popconfirm title={`您是否要删除?`} onConfirm={() => onUpdate(record)}>
              <a className="ml1">删除</a>
            </Popconfirm> : null
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
