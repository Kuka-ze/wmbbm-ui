import React from 'react';
import { connect } from 'dva';
import { Tabs, Table, Button } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import { noData, popovers } from '../../utils/util';

const { TabPane } = Tabs;
function IndexDetail(props) {
  const { dispatch, params, list, paginationTotal, list2, paginationTotal2, name, loading, tab, levelId, levelType } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '中心管理',
    }, {
      name: '管辖单位列表',
    }]
  }

  function handleTab(key){
    if (key=='1') {
      dispatch({ type: 'CentralManagementDetailModel/concat', payload: { ...params, tab:"1" } });
      dispatch({ type: 'CentralManagementDetailModel/ajaxList', payload: { ...params, levelId, levelType, pageNum: 1 } });
    }else if (key=='2') {
      dispatch({ type: 'CentralManagementDetailModel/concat', payload: { ...params, tab:"2" } });
      dispatch({ type: 'CentralManagementDetailModel/ajaxList2', payload: { ...params, levelId, levelType, pageNum: 1 } });
    }
  }

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '所名称',
        dataIndex: 'name',
        key: 'name',
        render: noData,
      }, {
        title: '所介绍',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => {
          return text ? popovers(text, 60, 300) : '-'
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
          type: 'CentralManagementDetailModel/ajaxList',
          payload: { ...props.params, pageNum }
        })
      }
    },
    rowKey: (record, index) => index,
    loading: loading
  }
  let tableProps2 = {
    dataSource: list2,
    columns: [
      {
        title: '志愿联盟名称',
        dataIndex: 'name',
        key: 'name',
        render: noData,
      }, {
        title: '联盟介绍',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => {
          return text ? popovers(text, 60, 300) : '-'
        }
      }
    ],
    pagination: {
      total: paginationTotal2 ? Number(paginationTotal2) : '',
      current: params.pageNum,
      defaultCurrent: 1,
      defaultPageSize: params.pageSize,
      showTotal: (total, range) => `共有 ${paginationTotal2} 条`,
      onChange(pageNum) {  
        dispatch({
          type: 'CentralManagementDetailModel/ajaxList2',
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
      <Tabs activeKey={tab} onChange={handleTab} style={{background:'#fff', padding: '24px'}}>
        {paginationTotal>0?<TabPane tab="文明实践所" key="1">
          <Table {...tableProps} />
          <div style={{ width: '210px', margin: '0 auto' }}>
            <Button type="ghost" onClick={handleBack}>返回</Button>
          </div>
        </TabPane>:''}
        {paginationTotal2>0?<TabPane tab="志愿联盟" key="2">
          <Table {...tableProps2} />
          <div style={{ width: '210px', margin: '0 auto' }}>
            <Button type="ghost" onClick={handleBack}>返回</Button>
          </div>
        </TabPane>:''}
      </Tabs>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    ...state.CentralManagementDetailModel,
    loading: state.loading.models.CentralManagementDetailModel
  };
}
export default connect(mapStateToProps)(IndexDetail);