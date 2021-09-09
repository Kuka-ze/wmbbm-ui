import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
import { authority } from '../../utils/util';

function Index(props) {
  let { dispatch } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '活动管理',
    }, {
      name: '活动类型管理',
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
        type: 'ActivityTypeManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdateStatus(record) {
      dispatch({
        type: 'ActivityTypeManagementModel/ajaxUpdateStatus',
        payload: { id: record.id, status: record.status && record.status == 1 ? 2 : 1 }
      })
    },
    onUpdatePwd(record) {
      dispatch({
        type: 'ActivityTypeManagementModel/ajaxUpdatePwd',
        payload: { id: record.id }
      })
    }
  }
  /** 筛选 */
  const formSearchProps = {
    areaTree: props.areaTree,
    is_reset: props.is_reset,
    onFormReset(){
      dispatch({
        type: 'ActivityTypeManagementModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'ActivityTypeManagementModel/ajaxList',
        payload: data
      })
    }
  }
  function linkJump(){
    dispatch({
      type: 'ActivityTypeManagementModel/ajaxIsAdministrators',
      payload: {},
    });
  }
  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          {authority('add') ?
            <Button type="primary" className="mb1" onClick={linkJump.bind(this)}><Icon type="plus" />新增类型</Button>
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
    ...state.ActivityTypeManagementModel,
    loading: state.loading.models.ActivityTypeManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
