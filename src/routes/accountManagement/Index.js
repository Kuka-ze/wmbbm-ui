import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormList from './components/FormList';
import { authority } from '../../utils/util';

function Index(props) {
  let { dispatch } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '账号管理',
    }, {
      name: '账号管理',
    }]
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: props.list,
    paginationTotal: props.paginationTotal,
    params: props.params,
    detailAlipay: props.detailAlipay,
    onChangePage(pageNum) {
      dispatch({
        type: 'AccountManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdateStatus(record) {
      dispatch({
        type: 'AccountManagementModel/ajaxUpdateStatus',
        payload: { id: record.id, status: record.status && record.status == 1 ? 2 : 1 }
      })
    },
    onUpdatePwd(record) {
      dispatch({
        type: 'AccountManagementModel/ajaxUpdatePwd',
        payload: { id: record.id }
      })
    },
    showModalAlipay(val){
      dispatch({
        type: 'AccountManagementModel/updateAlipayInfo',
        payload: {
          id: val
        }
      });
      dispatch({
        type: 'AccountManagementModel/concat',
        payload: {
          visibleAlipay: true,
          id: val
        }
      });
    },
    handleCancelAlipay(){
      dispatch({
        type: 'AccountManagementModel/concat',
        payload: {
          visibleAlipay: false
        }
      });
    },
    handleSubmitAlipay(data){
      let payload = {
        ...data,
        id: props.id
      }
      dispatch({
        type: 'AccountManagementModel/concat',
        payload: {
          resetField: true
        }
      });
      dispatch({
        type: 'AccountManagementModel/addAlipay',
        payload,
        callback(){
          dispatch({
            type: 'AccountManagementModel/concat',
            payload: {
              resetField: false
            }
          });
        }
      });
    }
  }

  return (
    <div>
      <div>
        <Breadcrumb {...breadcrumbProps} />
        <Card>
          <Link to="/accountManagementAdd"><Button type="primary" className="mb1"><Icon type="plus" />新增账户</Button></Link>
          <FormList {...formListProps} />
        </Card>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.AccountManagementModel,
    loading: state.loading.models.AccountManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
