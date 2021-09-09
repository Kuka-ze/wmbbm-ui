import React from 'react';
import { Form, Table, Popconfirm, Icon, Modal } from 'antd';
import { noData } from '../../../utils/util';
import { Link } from 'dva/router';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdateDel, onUpdateStatus, handlePreview, handleImgCancel, pageType } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: pageType == "h5" ? '所属H5' :'所属租户',
        dataIndex: 'corpName',
        key: 'corpName',
        render: noData,
      },
      {
        title: 'banner名称',
        dataIndex: 'bannerName',
        key: 'bannerName',
        render: noData,
      },
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        render: (text, record) => {
          return text ? <img src={text} style={{ width: '60px', cursor: 'pointer' }} onClick={() => handlePreview(text)} /> : '-'
        }
      },
      {
        title: '权重',
        dataIndex: 'sort',
        key: 'sort',
        render: noData,
      },
      {
        title: '上架状态',
        dataIndex: 'sjztfy',
        key: 'sjztfy',
        render: (text, record) => {
          return record && record.sjzt ?
            record.sjzt == 1 ? <span>{text} <Icon type="check-circle" theme="filled" style={{ color: '#00aa53' }} /></span> :
              record.sjzt == 2 ? <span>{text} <Icon type="minus-circle" theme="filled" style={{ color: '#000000' }} /></span> :
                record.sjzt == 3 ? <span>{text} <Icon type="clock-circle" theme="filled" style={{ color: '#bfbfbf' }} /></span> :
                  '' : '-'
        },
      },
      {
        title: '上架时间',
        dataIndex: 'startTime',
        key: 'startTime',
        render: noData,
      },
      {
        title: '下架时间',
        dataIndex: 'endTime',
        key: 'endTime',
        render: noData,
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return <div>
            {record.sjzt == 1 ? <Popconfirm title={`您是否要下架?`} onConfirm={() => onUpdateStatus(record)}>
              <a className="mr1">下架</a>
            </Popconfirm> : ''}
            {record.sjzt != 1 ?
              <span>
                <Link to={`/bannerManagementEdit?id=${record.id}&pageType=${pageType}`} className="mr1">编辑</Link>
                <Popconfirm title={`您是否要删除?`} onConfirm={() => onUpdateDel(record)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
              : ''
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
      <Modal visible={props.previewVisible} footer={null} onCancel={() => handleImgCancel()} width={734}>
        <img alt="img" style={{ width: '100%', height: '386px' }} src={props.previewImage} />
      </Modal>
    </div>
  )
}

export default Form.create()(FormList);
