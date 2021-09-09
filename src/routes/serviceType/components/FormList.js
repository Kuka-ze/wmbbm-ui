import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Popconfirm } from 'antd';
import { noData, authority, setCacheData } from '../../../utils/util';

function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onAssociatedTeam } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '服务类型',
        dataIndex: 'typeName',
        key: 'typeName',
        render: noData,
      }, {
        title: '服务内容',
        dataIndex: 'serverContent',
        key: 'serverContent',
        render: noData,
      }, {
        title: '关联队伍',
        dataIndex: 'teamArr',
        key: 'teamArr',
        render: (text, record) => {
          return text && text.length > 0 ? text.join("，") : '-'
        },
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          let link2 = `/culturalVenuesEdit?id=${record.id}`;
          let link1 = `/culturalVenuesView?id=${record.id}`;
          return <div>
            {authority('gldw') ? <a className="ml1" onClick={() => onAssociatedTeam(record)}>关联队伍</a> : null}
          </div>
        }
      }],
    pagination: false,
    // pagination: {
    //   total: paginationTotal ? Number(paginationTotal) : '',
    //   current: params.pageNum,
    //   defaultCurrent: 1,
    //   defaultPageSize: params.pageSize,
    //   showTotal: (total, range) => `共有 ${paginationTotal} 条`,
    //   onChange: (page, pageSize) => {
    //     onChangePage ? onChangePage(page) : '';
    //   },
    // },
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
