import React from 'react';
import { Form, Table, Popconfirm } from 'antd';
import { noData, authority, popovers, setCacheData } from '../../../utils/util';
import { Link } from 'react-router-dom';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '联盟名称',
        dataIndex: 'leagueName',
        key: 'leagueName',
        render: noData,
      }, {
        title: '所属中心',
        dataIndex: 'centerName',
        key: 'centerName',
        render: noData,
      }, {
        title: '志愿队伍',
        dataIndex: 'teamCount',
        key: 'teamCount',
        render: (text, record) => {
          return +record.teamCount > 0 ? <Link to={`/voluntaryAllianceDetail?id=${record.id}&name=${record.leagueName}`} onClick={() => setCacheData(params)}>{record.teamCount}</Link> : <span>{record.teamCount}</span>
        }
      }, {
        title: '联盟介绍',
        dataIndex: 'leagueRemark',
        key: 'leagueRemark',
        render: (text, record) => {
          return text ? popovers(text, 20, 300) : '-'
        },
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return <div>
            {authority('detail') ?
              <Link to={`/allianceInfo?id=${record.id}`} onClick={() => setCacheData(params)}>详情</Link>
              : null
            }
            {authority('edit') ?
              <Link to={`/voluntaryAllianceEdit?id=${record.id}`} className="ml1" onClick={() => setCacheData(params)}>编辑</Link>
              : null
            }
            {/* {authority('del') ?<Popconfirm title={`您是否要删除?`} onConfirm={() => onUpdate(record)}>
              <a className="ml1">删除</a>
            </Popconfirm>: null
            } */}
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
