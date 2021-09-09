import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';

function Index(props) {
  let { dispatch, centerId } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '平台审核',
    }, {
      name: '其他文明时',
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
        type: 'platformAuditModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdate(record) {
      dispatch({
        type: 'platformAuditModel/ajaxDelete',
        payload: { id: record.id }
      })
    }
  }
  /** 筛选 */
  const formSearchProps = {
    dispatch: props.dispatch,
    areaTree: props.areaTree,
    stateList: props.stateList,
    centerId: props.centerId,
    inputStatus: props.inputStatus,
    is_reset: props.is_reset,
    params: props.params,
    onFormReset() {
      dispatch({
        type: 'platformAuditModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values, type) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'platformAuditModel/ajaxList',
        payload: data
      })
      if (type == 'reset') {
        dispatch({
          type: 'platformAuditModel/concat',
          payload: {
            teamType: [],
            teamBelong: [],
            inputStatus: true,
          }
        });
      }
    },
    onSelectChanges(num, value) {
      console.log(num, value)
      if (num == 1) {
        dispatch({
          type: 'platformAuditModel/concat',
          payload: {
            centerId: value,
            teamBelong: []
          }
        });
        dispatch({
          type: 'platformAuditModel/ajaxTeamType',
          payload: {}
        });
      } else if (num == 2) {
        dispatch({
          type: 'platformAuditModel/concat',
          payload: {
            inputStatus: false,
          }
        });
        dispatch({
          type: 'platformAuditModel/ajaxTeamBelong',
          payload: {
            positionType: value,
            centerId,
          }
        });
      }
    }
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <FormSearch {...formSearchProps} />
      <Card className="mt1">
        <FormList {...formListProps} />
      </Card>
    </div>


  )
}

function mapStateToProps(state) {
  return {
    ...state.platformAuditModel,
    loading: state.loading.models.platformAuditModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
