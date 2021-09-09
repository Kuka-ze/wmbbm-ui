import React from 'react';
import { Form, Table, Switch } from 'antd';
import { noData } from '../../../utils/util';
import { Link } from 'dva/router';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onChangeSwitch } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '平台名称',
        dataIndex: 'appletsName',
        key: 'appletsName',
        render: noData,
      },
      {
        title: '直通车模块',
        dataIndex: 'isOpen',
        key: 'isOpen',
        render: (text, record) => {
          return <Switch checked={text == 1 ? true : false} onChange={() => onChangeSwitch ? onChangeSwitch(record) : ''} checkedChildren="开" unCheckedChildren="关"/>
        }
      },
      {
        title: '模板数目',
        dataIndex: 'templateNum',
        key: 'templateNum',
        // render: noData,
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return <div>
            <Link to={`/throughTrainManagement?id=${record.id}&appletsName=${record.appletsName}`} className="mr1">管理</Link>
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
