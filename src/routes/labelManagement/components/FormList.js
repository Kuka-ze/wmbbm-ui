import React from 'react';
import { connect } from 'dva';
import { Form, Table, Popconfirm } from 'antd';
import { noData } from '../../../utils/util';

function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onDelete, showModal } = props;
  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '标签名称',
        dataIndex: 'name',
        key: 'name',
        render: noData,
      }, {
        title: '标签类别',
        dataIndex: 'typeName',
        key: 'typeName',
        render: noData,
      },  
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return record.noOperation==1?  <div>
            <Popconfirm title={<div><p>此操作将导致已关联本标签的用户取消关联;</p><p>确认删除标签?</p></div>} onConfirm={() => onDelete(record)}>
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
    ...state.LabelManagementModel,
    loading: state.loading.models.LabelManagementModel,
  };
}
export default connect(mapStateToProps)(Form.create()(FormList));
