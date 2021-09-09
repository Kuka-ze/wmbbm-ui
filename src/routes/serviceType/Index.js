import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
import AssociatedTeam from './components/AssociatedTeam';
import { authority } from '../../utils/util';
function Index(props) {
  let { form, dispatch, params = {} } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '精准帮扶',
    }, {
      name: '服务类型',
    }]
  }
  /** 筛选 */
  const formSearchProps = {
    is_reset: props.is_reset,
    params: props.params,
    onFormReset() {
      dispatch({
        type: 'ServiceTypeModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'ServiceTypeModel/ajaxList',
        payload: data
      })
    },
    areaTree: props.areaTree,
    typeDrop: props.typeDrop,
    onChangeTime(val) {
      dispatch({
        type: 'ServiceTypeModel/concat',
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
        type: 'ServiceTypeModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onAssociatedTeam(record) {
      // dispatch({
      //   type: 'ServiceTypeModel/serverTeamDrop',
      //   payload: { serverId: record.id }
      // })
      dispatch({
        type: 'ServiceTypeModel/serverTeamTargetAll',
        payload: { serverId: record.id }
      })
      dispatch({
        type: 'ServiceTypeModel/serverTeamSelectedAll',
        payload: { serverId: record.id }
      })
      dispatch({
        type: 'ServiceTypeModel/concat',
        payload: { visible: true, serverId: record.id }
      })
    },
  }
  /** 关联队伍 */
  let associatedTeamProps = {
    visible: props.visible,
    mockData: props.mockData,
    targetKeys: props.targetKeys,
    selectedKeys: props.selectedKeys,
    handleOk() {
      let data = {
        serverId: props.serverId,
        teamArr: props.targetKeys
      }
      console.log("this.props:", data);
      dispatch({
        type: 'ServiceTypeModel/ajaxAdd',
        payload: data,
      })
    },
    handleCancel() {
      dispatch({
        type: 'ServiceTypeModel/concat',
        payload: {
          visible: false,
          selectedKeys: []
        }
      })
    },
    handleChange(targetKeys) {
      console.log("targetKeys:", targetKeys);
      dispatch({
        type: 'ServiceTypeModel/concat',
        payload: { targetKeys }
      })
    },
    handleSearch(dir, value) {
      console.log('search:', dir, value);
    },
    onSelectChange(selectedKeys) {
      dispatch({
        type: 'ServiceTypeModel/concat',
        payload: { selectedKeys }
      })
    }
  }

  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          <FormList {...formListProps} />
        </Card>
        <AssociatedTeam {...associatedTeamProps} />
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
    ...state.ServiceTypeModel,
    loading: state.loading.models.ServiceTypeModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
