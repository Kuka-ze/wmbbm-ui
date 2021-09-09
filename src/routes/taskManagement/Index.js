import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
import Implement from './components/Implement';
import Assign from './components/Assign';
import { authority } from '../../utils/util';
function Index(props) {
  let { form, dispatch, params = {} } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '精准帮扶',
    }, {
      name: '任务管理',
    }]
  }
  /** 筛选 */
  const formSearchProps = {
    is_reset: props.is_reset,
    params: props.params,
    onFormReset() {
      dispatch({
        type: 'TaskManagementModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'TaskManagementModel/ajaxList',
        payload: data
      })
    },
    areaTree: props.areaTree,
    typeDrop: props.typeDrop,
    onChangeTime(val) {
      dispatch({
        type: 'TaskManagementModel/concat',
        payload: { ...val }
      })
    }
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: props.list,
    paginationTotal: props.paginationTotal,
    params: props.params,
    onChangePage(pageNum) {
      dispatch({
        type: 'TaskManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onResponse(record) {
      dispatch({
        type: 'TaskManagementModel/ajaxResponse',
        payload: { id: record.id }
      })
    },
    onImplement(record) {
      dispatch({
        type: 'TaskManagementModel/concat',
        payload: { visible1: true }
      })
      dispatch({
        type: 'TaskManagementModel/ajaxImplement',
        payload: { id: record.id }
      })
    },
    onAssign(record) {
      dispatch({
        type: 'TaskManagementModel/concat',
        payload: { visible2: true, id: record.id }
      })
      dispatch({
        type: 'TaskManagementModel/ajaxVolunteerList',
        payload: { teamId: record.teamId, id: record.id }
      })
    }
  }

  function linkJump() {
    console.log(props.params,'props.params===props.params')
    dispatch({
      type: 'TaskManagementModel/ajaxList',
      payload: {
        ...props.params, pageNum:1, type: params.type == 1 ? 2 : 1
      },
    });
  }

  let implementProps = {
    visible1: props.visible1,
    implementList: props.implementList,
    handleCancel() {
      dispatch({
        type: 'TaskManagementModel/concat',
        payload: { visible1: false }
      })
    }
  }

  let assignProps = {
    visible2: props.visible2,
    volunteerList: props.volunteerList,
    handleCancel() {
      dispatch({
        type: 'TaskManagementModel/concat',
        payload: { visible2: false }
      })
    },
    handleOk(value) {
      let data = { ...value, id: props.id }
      dispatch({
        type: 'TaskManagementModel/ajaxAssign',
        payload: data
      })
    }
  }

  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          {props.adminType == 3 ? <Button type="primary" className="mb1" onClick={linkJump.bind(this)}><Icon type="plus" />{params.type == 1 ? '切换为队长' : '切换为管理员'}</Button> : ''}
          <FormList {...formListProps} />
        </Card>
        <Implement {...implementProps} />
        <Assign {...assignProps} />
      </div>
        : <div className="kong-tu">
          <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
        </div>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.TaskManagementModel,
    loading: state.loading.models.TaskManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
