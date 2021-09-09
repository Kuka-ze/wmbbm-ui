import React from 'react';
import { connect } from 'dva';
import { Form, Table, Card } from 'antd';
import DataCenterLayout from './components/DataCenterLayout.js';
import Header from "./components/Header"; //头部
import Map3D from "./components/Map3D"; //头部

function Demo(props) {
  let { form, dispatch, loading } = props;

  /* table */
  let tableProps = {
    dataSource: [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ],
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ],
    // pagination: {
    //   total: paginationTotal ? Number(paginationTotal) : '',
    //   current: params.page,
    //   defaultCurrent: 1,
    //   defaultPageSize: params.rows,
    //   showTotal: (total, range) => `共有 ${paginationTotal} 条`,
    //   onChange: (page, pageSize) => {
    //     onChangePage ? onChangePage(page) : '';
    //   },
    // },
    rowKey: (record, index) => index,
    loading: loading
  }
  /* table end */

  return (
    <DataCenterLayout>
      <Header titleName="仓溢东苑物业大屏" />
      <div className="data-center-container data-center-demo" style={{ paddingTop: '.7rem', overflow: 'hidden' }}>
        <Map3D />
        {/* <Card>
          <Table {...tableProps} />
        </Card> */}
      </div>
    </DataCenterLayout>
  )
}

function mapStateToProps(state) {
  return {
    ...state.DemoModel,
    loading: state.loading.models.DemoModel
  };
}
export default connect(mapStateToProps)(Form.create()(Demo));