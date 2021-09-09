import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormList from './components/FormList';
import FormSearch from "./components/FormSearch";
import { authority, performanceTest } from '../../utils/util';

function Index(props) {
  let { dispatch } = props;

  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '基础数据',
    }, {
      name: '中心管理',
    }]
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: props.list,
    paginationTotal: props.paginationTotal,
    params: props.params,
    onChangePage(pageNum) {
      dispatch({
        type: 'CentralManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    }
  }
  /** 筛选 */
  const formSearchProps = {
    areaTree: props.areaTree,
    is_reset: props.is_reset,
    onFormReset(){
      dispatch({
        type: 'CentralManagementModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'CentralManagementModel/ajaxList',
        payload: data
      })
    }
  }
  // performanceTest();

  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          {authority('add') ?
            <Link to="/centralManagementAdd"><Button type="primary" className="mb1"><Icon type="plus" />新增中心</Button></Link>
            : null
          }
          <FormList {...formListProps} />
        </Card></div>
        : <div className="kong-tu">
          <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
        </div>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.CentralManagementModel,
    loading: state.loading.models.CentralManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
