import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Popconfirm, Switch } from 'antd';
import { noData, authority, setCacheData } from '../../../utils/util';

function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdate, handleSetStatus } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '名称',
        dataIndex: 'noticeName',
        key: 'noticeName',
        render: noData,
      }, {
        title: '置顶',
        dataIndex: 'isTop',
        key: 'isTop',
        render: (text, record) => {
          return (<Switch checkedChildren="是" unCheckedChildren="否" checked={record.isTop == 1 ? true : false} onClick={(checked) => handleSetStatus(record, checked)} />)
        }
      }, {
        title: '类型',
        dataIndex: 'name',
        key: 'name',
        render: noData,
      }, {
        title: '所属中心',
        dataIndex: 'centerName',
        key: 'centerName',
        render: noData,
      }, {
        title: '阅读量',
        dataIndex: 'readNumber',
        key: 'readNumber',
        render: noData,
      }, {
        title: '内容来源',
        dataIndex: 'remarkSource',
        key: 'remarkSource',
        render: noData,
      }, {
        title: '发布人/发布时间',
        dataIndex: 'createName',
        key: 'createName',
        render: (text, record) => {
          return `${record.createName}/${record.createTime}`
        }
        // render: noData,
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          let link2 = `/noticePublicityEdit?id=${record.id}`;
          let link1 = `/noticePublicityView?id=${record.id}`;
          return <div>
            {authority('detail') ?
              <Link to={link1} onClick={() => setCacheData(params)}>详情</Link>
              : null
            }
            {authority('edit') ?
              <Link to={link2} className="ml1" onClick={() => setCacheData(params)}>编辑</Link>
              : null
            }
            {authority('del') ?
              <Popconfirm title={`您是否要删除?`} onConfirm={() => onUpdate(record)}>
                <a className="ml1">删除</a>
              </Popconfirm> : null
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
