import React from 'react';
import { Form, Table, Modal } from 'antd';
import { noData } from '../../../utils/util';

function Implement(props) {
  const { visible1, implementList, handleCancel } = props;

  let tableProps = {
    dataSource: implementList,
    columns: [
      {
        title: '人员姓名',
        dataIndex: 'volunteerName',
        key: 'volunteerName',
        render: noData,
      }, {
        title: '是否签到',
        dataIndex: 'isSignName',
        key: 'isSignName',
        render: noData,
      }, {
        title: '签到时间',
        dataIndex: 'signTime',
        key: 'signTime',
        render: noData,
      }, {
        title: '签到地点',
        dataIndex: 'address',
        key: 'address',
        render: noData,
      }],
    pagination: false,
    rowKey: (record, index) => index,
    // loading: loading
  }

  return (
    <Modal
      title="执行详情"
      visible={visible1}
      footer={false}
      onCancel={() => handleCancel()}
    >
      <Table {...tableProps} />
    </Modal>
  )
}

export default Form.create()(Implement);
