import React from 'react';
import { connect } from 'dva';
import { Tabs, Table, Button } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import { noData, popovers } from '../../utils/util';

const { TabPane } = Tabs;
function IndexDetail(props) {
  const {  params, list, paginationTotal, name, loading, dispatch } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '点管理',
    }, {
      name: '管辖单位列表',
    }]
  }

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '志愿队伍名称',
        dataIndex: 'name',
        key: 'name',
        render: noData,
      },{
        title: '管理单位',
        dataIndex: 'levelName',
        key: 'levelName',
        render: noData,
      },{
        title: '队长',
        dataIndex: 'teamPerson',
        key: 'teamPerson',
        render: noData,
      },{
        title: '志愿者数量',
        dataIndex: 'volunteerTotals',
        key: 'nuvolunteerTotalsm',
        render: noData,
      },{
        title: '队伍简介',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => {
          return text ? popovers(text, 20, 300) : '-'
        }
      }
    ],
    pagination: {
      total: paginationTotal ? Number(paginationTotal) : '',
      current: params.pageNum,
      defaultCurrent: 1,
      defaultPageSize: params.pageSize,
      showTotal: (total, range) => `共有 ${paginationTotal} 条`,
      onChange(pageNum) {  
        dispatch({
          type: 'PointManagementDetailModel/ajaxList',
          payload: { ...props.params, pageNum }
        })
      }
    },
    rowKey: (record, index) => index,
    loading: loading
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  return(
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <h2>{name}</h2>
      <Tabs activeKey="1" style={{background:'#fff', padding: '24px'}}>
        <TabPane tab="志愿队伍" key="1">
          <Table {...tableProps} />
          <div style={{ width: '210px', margin: '0 auto' }}>
            <Button type="ghost" onClick={handleBack}>返回</Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    ...state.PointManagementDetailModel,
    loading: state.loading.models.PointManagementDetailModel
  };
}
export default connect(mapStateToProps)(IndexDetail);