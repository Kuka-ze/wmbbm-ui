import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Popconfirm, Badge } from 'antd';
import { noData, authority, setCacheData, popovers } from '../../../utils/util';

function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdate } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '活动名称',
        dataIndex: 'templateName',
        key: 'templateName',
        render: (text, record) => {
          let link1 = `/activityPondView?id=${record.id}`;
          return <div>
            <Link to={link1} onClick={() => setCacheData(params)}>{popovers(text, 10, 150)}</Link>
          </div>
        },
      }, {
        title: '群众',
        dataIndex: 'massesCount',
        key: 'massesCount',
        render: noData,
      }, {
        title: '志愿者',
        dataIndex: 'signVolunteerCount',
        key: 'signVolunteerCount',
        render: (text, record) => {
          return record && record.signVolunteerCount && record.applyVolunteerCount ? `${record.signVolunteerCount}/${record.applyVolunteerCount}` : '-'
        },
      },
      {
        title: '活动状态',
        dataIndex: 'activityStateName',
        key: 'activityStateName',
        render: (text, record) => {
          const { activityState } = record;
          return <div><Badge color={activityState == 1 ? "#F59A23" : activityState == 2 ? "#0E77D1" : activityState == 3 ? "#00A854" : activityState == 4 ? "#D7D7D7" : "#d9d9d9"} />{text}</div>
        }
      },
      {
        title: '活动时间',
        dataIndex: 'activityDay',
        key: 'activityDay',
        render: (text, record) => {
          return record ? `${record.activityDay} ${record.beginTime}-${record.endTime}` : '-'
        }
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          let link1 = `/activityPondView?id=${record.id}`;
          return <div>
            {authority('add') && record.activityState == 1 ? <a onClick={() => onUpdate(record, '1')}>添加群众</a> : ''}
            {authority('issue') && record.activityState == 3 && record.existsAudit == true ? <a className="ml1" onClick={() => onUpdate(record, '2')}>发放时长</a> : ''}
            {authority('cancel') && record.activityState == 1 ?
              <Popconfirm title={`您是否要取消?`} onConfirm={() => onUpdate(record, '3')}>
                <a className="ml1">取消</a>
              </Popconfirm> : null
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
