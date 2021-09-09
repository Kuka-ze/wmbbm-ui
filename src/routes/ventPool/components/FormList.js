import React from 'react';
import { Form, Table, Popconfirm, Badge } from 'antd';
import { noData, authority, popovers, setCacheData } from '../../../utils/util';
import { Link } from 'react-router-dom';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, showRefuseModal, showSolveModal, showReceiveModal } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '问题号',
        dataIndex: 'opinionCode',
        key: 'opinionCode',
        render: noData,
      }, {
        title: '反馈人',
        dataIndex: 'appUserName',
        key: 'appUserName',
        render: noData,
      }, {
        title: '反馈内容',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => {
          return text ? popovers(text, 10, 150) : '-'
        },
      }, {
        title: '联系电话',
        dataIndex: 'mobile',
        key: 'mobile',
        render: noData,
      },
      {
        title: '问题状态',
        dataIndex: 'stateName',
        key: 'stateName',
        render: (text, item) => {
          const { state } = item;
          return <p><Badge color={state == 1 ? "gold" : state == 2 ? "#108ee9" : state == 3 ? "#87d068" : "#d9d9d9"} />{text}</p>
        },
      },
      {
        title: '反馈时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: noData,
      },
      {
        title: '联系人',
        dataIndex: 'contacts',
        key: 'contacts',
        render: noData,
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return <div>
            <Link to={`/ventPoolInfo?id=${record.id}`} onClick={() => setCacheData(params)}>详情</Link>
            {record.refuseBtn==1&&<a onClick={()=>showRefuseModal(record)} className="ml1">退回</a>}
            {record.receiveBtn==1&&<a onClick={()=>showReceiveModal(record)} className="ml1">接收</a>}
            {record.solveBtn==1&&<a onClick={()=>showSolveModal(record)} className="ml1">解决</a>}
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
