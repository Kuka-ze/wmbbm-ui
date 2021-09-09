import React from 'react';
import { connect } from 'dva';
import { Form, Card } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormList from './components/FormList';
import { authority } from '../../utils/util';

function Index(props) {
  let { dispatch } = props;

  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '基础数据',
    }, {
      name: '市级管理',
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
        type: 'MunicipalManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    }
  }

  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <Card>
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
    ...state.MunicipalManagementModel,
    loading: state.loading.models.MunicipalManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
