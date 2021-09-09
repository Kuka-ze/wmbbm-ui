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
      name: '所管理',
    }, {
      name: '管辖单位列表',
    }]
  }

  function handleTab(key){
    if (key=='1') {
      dispatch({ type: 'ManagedDetailModel/concat', payload: { ...params, tab:"1" } });
      dispatch({ type: 'ManagedDetailModel/ajaxList', payload: { ...params, levelId, levelType, pageNum: 1 } });
    }else if (key=='2') {
      dispatch({ type: 'ManagedDetailModel/concat', payload: { ...params, tab:"2" } });
      dispatch({ type: 'ManagedDetailModel/ajaxList2', payload: { ...params, levelId, levelType, pageNum: 1 } });
    }
  }

  let tableProps = {
    dataSource: list,
    columns: [
      {
        title: '站名称',
        dataIndex: 'name',
        key: 'name',
        render: noData,
      }, {
        title: '站介绍',
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
          type: 'ManagedDetailModel/ajaxList',
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
        title: '志愿队伍名称',
        dataIndex: 'name',
        key: 'name',
        render: noData,
      }, {
        title: '管理方式',
        dataIndex: 'teamType',
        key: 'teamType',
        render:  (text, record) => {
          return text == 1 ? '直属队伍' : '下级队伍'
        },
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
        key: 'volunteerTotals',
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
      total: paginationTotal2 ? Number(paginationTotal2) : '',
      current: params.pageNum,
      defaultCurrent: 1,
      defaultPageSize: params.pageSize,
      showTotal: (total, range) => `共有 ${paginationTotal2} 条`,
      onChange(pageNum) {  
        dispatch({
          type: 'ManagedDetailModel/ajaxList2',
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
        {paginationTotal>0?<TabPane tab="文明实践站" key="1">
          <Table {...tableProps} />
          <div style={{ width: '210px', margin: '0 auto' }}>
            <Button type="ghost" onClick={handleBack}>返回</Button>
          </div>
        </TabPane>:''}
        {paginationTotal2>0?<TabPane tab="志愿队伍" key="2">
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
    ...state.ManagedDetailModel,
    loading: state.loading.models.ManagedDetailModel
  };
}
export default connect(mapStateToProps)(IndexDetail);