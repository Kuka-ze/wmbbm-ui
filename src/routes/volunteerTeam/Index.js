import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
import { authority } from '../../utils/util';

function Index(props) {
  let { dispatch,centerId } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '志愿队伍管理',    
    }, {
      name: '志愿队伍管理',
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
        type: 'VolunteerTeamModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdate(record) {
      dispatch({
        type: 'VolunteerTeamModel/ajaxDelete',
        payload: { id: record.id }
      })
    }
  }
  /** 筛选 */
  const formSearchProps = {
    dispatch: props.dispatch,
    areaTree: props.areaTree,
    teamType: props.teamType,
    teamBelong: props.teamBelong,
    centerId: props.centerId,
    inputStatus: props.inputStatus,
    is_reset: props.is_reset,
    params: props.params,
    onFormReset(){
      dispatch({
        type: 'VolunteerTeamModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values, type) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'VolunteerTeamModel/ajaxList',
        payload: data
      })
      if(type == 'reset'){
        dispatch({
          type: 'VolunteerTeamModel/concat',
          payload: {
            teamType: [],
            teamBelong: [],
            inputStatus: true,
          }
        });
      }
    },
    onSelectChanges(num, value){
      console.log(num, value)
      if (num == 1) {
        dispatch({
          type: 'VolunteerTeamModel/concat',
          payload: {
            centerId: value,
            teamBelong: []
          }
        });
        dispatch({
          type: 'VolunteerTeamModel/ajaxTeamType',
          payload: {}
        });
      } else if (num == 2) {
        dispatch({
          type: 'VolunteerTeamModel/concat',
          payload: {
            inputStatus: false,
          }
        });
        dispatch({
          type: 'VolunteerTeamModel/ajaxTeamBelong',
          payload: {
            positionType: value,
            centerId,
          }
        });
      }
    }
  }

  function linkJump(){
    let isAdmin = sessionStorage.getItem('isAdmin');
    if(isAdmin == 1){
      window.location.href = '#volunteerTeamAdd';
    }else{
      dispatch({
        type: 'VolunteerTeamModel/ajaxIsAdministrators',
        payload: {},
      });
    }
  }

  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          {authority('add') ?
            <Button type="primary" className="mb1" onClick={linkJump.bind(this)}><Icon type="plus" />新增队伍</Button>
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
    ...state.VolunteerTeamModel,
    loading: state.loading.models.VolunteerTeamModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
