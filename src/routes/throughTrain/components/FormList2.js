import React from 'react';
import { Form, Table, Popconfirm, Icon, Modal } from 'antd';
import { noData } from '../../../utils/util';
import { Link } from 'dva/router';
function FormList(props) {
  const { params = {}, list, paginationTotal, loading, onChangePage, onUpdateDel, onUpdateStatus, handlePreview, handleImgCancel } = props;

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '模板名称',
        dataIndex: 'templateName',
        key: 'templateName',
        render: noData,
      },
      {
        title: '合作小程序',
        dataIndex: 'icon',
        key: 'icon',
        render: (text, record) => {
          return text && text.length > 0 ? text.map((item, index) => {
            return <div style={{display: 'inline-block', marginRight: '10px', marginBottom: '10px', textAlign: 'center'}}>
              <img src={item.icon} style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={() => handlePreview(item.icon)} key={index} />
          <div style={{paddingTop: '6px'}}>{item.appletsName}</div>
            </div>
          }) : '-'
        }
      },
      {
        title: '应用租户',
        dataIndex: 'corpName',
        key: 'corpName',
        render: noData,
      },
      {
        title: '操作',
        dataIndex: 'desc',
        render: (text, record) => {
          return <div>
            <Link to={`/throughTrainEdit?id=${record.id}&appletsId=${props.params.appletsId}&appletsName=${props.appletsName}`} className="mr1">编辑</Link>
            <Popconfirm title={`您是否要删除?`} onConfirm={() => onUpdateDel(record)}>
              <a>删除</a>
            </Popconfirm>
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
      <Modal visible={props.previewVisible} footer={null} onCancel={() => handleImgCancel()}>
        <img alt="img" style={{ width: '100%' }} src={props.previewImage} />
      </Modal>
    </div>
  )
}

export default Form.create()(FormList);
