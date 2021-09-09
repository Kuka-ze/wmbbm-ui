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
      name: '志愿联盟管理',
    }, {
      name: '管辖单位列表',
    }]
  }

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '志愿队伍名称',
        dataIndex: 'teamName',
        key: 'teamName',
        render: noData,
      },{
        title: '管理单位',
        dataIndex: 'positionTypeName',
        key: 'positionTypeName',
        render: noData,
      },{
        title: '队长',
        dataIndex: 'adminName',
        key: 'adminName',
        render: noData,
      },{
        title: '志愿者数量',
        dataIndex: 'volunteerCount',
        key: 'volunteerCount',
        render: noData,
      },{
        title: '队伍简介',
        dataIndex: 'teamSynopsis',
        key: 'teamSynopsis',
        render: (text, record) => {
          return text ? popovers(text, 40, 300) : '-'
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
          type: 'VoluntaryAllianceDetailModel/ajaxList',
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
          <div style={{textAlign: 'center'}}>
            <Button onClick={handleBack}>返回</Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    ...state.VoluntaryAllianceDetailModel,
    loading: state.loading.models.VoluntaryAllianceDetailModel
  };
}
export default connect(mapStateToProps)(IndexDetail);