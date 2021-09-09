import React from 'react';
import { connect } from 'dva';
import { Form, Table, Popconfirm } from 'antd';
import { noData } from '../../../utils/util';

function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdateStatus, onDelete, showModal } = props;
  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '标签类别',
        dataIndex: 'name',
        key: 'name',
        render: noData,
      }, {
        title: '标签属性',
        dataIndex: 'typeName',
        key: 'typeName',
        render: noData,
      },  {
        title: '状态',
        dataIndex: 'statusName',
        key: 'statusName',
        render: (text, record) => record.status == 1 ? '显示' : '隐藏',
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return record.noOperation==1?  <div>
            <Popconfirm title={`您是否要${record.status == 1 ? '隐藏' : '显示'}?`} onConfirm={() => onUpdateStatus(record)}>
              <a>{record.status == 1 ? '隐藏' : '显示'}</a>
            </Popconfirm>
            <Popconfirm title={`您是否要删除?`} onConfirm={() => onDelete(record)}>
              <a className="ml1">删除</a>
            </Popconfirm>
            <a onClick={()=>showModal(record)} className="ml1">编辑</a>
          </div>:<div>--</div>
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

function mapStateToProps(state) {
  return {
    ...state.LabelTypeManagementModel,
    loading: state.loading.models.LabelTypeManagementModel,
  };
}
export default connect(mapStateToProps)(Form.create()(FormList));
