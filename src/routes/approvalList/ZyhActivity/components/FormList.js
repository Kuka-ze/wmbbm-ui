import React from 'react';
import { Form, Table, Popconfirm, Popover } from 'antd';
import { noData, authority, popovers, setCacheData } from '../../../../utils/util';
import { Link } from 'react-router-dom';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdate } = props;

  let tableProps = {
    dataSource: list,
    columns: [{
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
      render: (text, record) => {
        return <Popover content={text} >{text && text.length > 10 ? text.substring(0, 9) + '...' : text}</Popover>
      }
    }, {
      title: '活动类型',
      dataIndex: 'activityTypeName',
      key: 'activityTypeName',
    }, {
      title: '所属组织',
      dataIndex: 'orgName',
      key: 'orgName',
    }, {
      title: '活动区域(区县)',
      dataIndex: 'areaName',
      key: 'areaName',
    }, {
      title: '联系人',
      dataIndex: 'contractPerson',
      key: 'contractPerson',
    }
      , {
      title: '联系电话',
      dataIndex: 'contractPhone',
      key: 'contractPhone',
    },
    {
      title: '发布人',
      dataIndex: 'createName',
      key: 'createName',
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'desc',
      render: (text, record) => {
        let link1 = `/ZyhActivityInfo?id=${record.id}`;
        return <div>
          <Link to={link1} onClick={() => setCacheData(params)}>详情</Link>
          {/* {authority('detail') ?
            <Link to={link1} onClick={() => setCacheData(params)}>详情</Link>
            : null
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
