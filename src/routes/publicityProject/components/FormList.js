import React from 'react';
import { Form, Table, Popconfirm, Badge, Popover } from 'antd';
import { noData, authority, popovers, setCacheData } from '../../../utils/util';
import { Link } from 'react-router-dom';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, deleteItem } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '宣讲项目',
        dataIndex: 'templateName',
        key: 'templateName',
        render: (text, record) => {
          return <a href={`/#/publicityInfo?id=${record.id}`}>{popovers(record.templateName, 10, 150)}</a>
        }
      }, {
        title: '公益类型',
        dataIndex: 'typeName',
        key: 'typeName',
        render: noData,
      }, {
        title: '所属组织',
        dataIndex: 'area',
        key: 'area',
        render: noData,
      }, {
        title: '关联队伍',
        dataIndex: 'teamName',
        key: 'teamName',
        render: (text, record) => {
          return <Popover content={text} >{text && text.length > 10 ? text.substring(0, 9) + '...' : text}</Popover>
        }
      },
      {
        title: '关联活动',
        dataIndex: 'activityNum',
        key: 'activityNum',
        render: (text, record) => {
          return <a href={`/#/activityPond?id=${record.id}`}>{record.activityNum}</a>
        }
      },
      {
        title: '点单人数',
        dataIndex: 'count',
        key: 'count',
        render: (text, record) => {
          return <span>{record.count}</span>
        }
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return <div>
            {
              authority('plan') ?
                <Link to={`/publicitOverall?id=${record.id}&&templateName=${record.templateName}`}>统筹</Link>
                : null
            }
            {
              authority('edit') ?
                <Link className="ml1" to={`/addPublicity?id=${record.id}`}>编辑</Link>
                : null
            }
            {
              authority('del') ?
                <Popconfirm title={`您是否要删除?`} onConfirm={() => deleteItem(record)}>
                  <a className="ml1">删除</a>
                </Popconfirm>
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
