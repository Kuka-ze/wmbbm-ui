import React from 'react';
import { Form, Table, Popconfirm } from 'antd';
import { noData, authority, popovers, setCacheData } from '../../../utils/util';
import { Link } from 'dva/router';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdateStatus, onUpdate } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '队伍名称',
        dataIndex: 'teamName',
        key: 'teamName',
        render: noData,
      }, {
        title: '所属中心',
        dataIndex: 'centerName',
        key: 'centerName',
        render: noData,
      }, {
        title: '队伍类型>队伍归属',
        dataIndex: 'positionName',
        key: 'positionName',
        render: noData,
      },{
        title: '队长',
        dataIndex: 'teamAdminName',
        key: 'teamAdminName',
        render: noData,
      }, {
        title: '志愿者数量',
        dataIndex: 'volunteerCount',
        key: 'volunteerCount',
        render: noData,
      },
       {
        title: '队伍简介',
        dataIndex: 'teamSynopsis',
        key: 'teamSynopsis',
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
          //  { 
          //   pathname:"/jump", 
          //   hash:'#ahash',  
          //   query:{foo: 'foo', boo:'boo'},  
          //   state:{data:'hello'}   
          // }
            // <Link to={`/volunteerTeamDetail?id=${record.id}&&disabled=${true}`} className="ml1">详情</Link>
            <Link to={`/volunteerTeamDetail?id=${record.id}&&disabled=${true}`} className="ml1" onClick={() => setCacheData(params)}>详情</Link>
              : null
            }
            {authority('edit') ?
              <Link to={`/volunteerTeamEdit?id=${record.id}&disabled=${false}`} className="ml1" onClick={() => setCacheData(params)}>编辑</Link>
              : null
            }
            {authority('del') ?<Popconfirm title={`您是否要删除?`} onConfirm={() => onUpdate(record)}>
              <a className="ml1">删除</a>
            </Popconfirm>: null
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
