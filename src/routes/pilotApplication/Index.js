import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
import { authority, setCacheData } from '../../utils/util';
function Index(props) {
  let { form, dispatch, params = {}, countyDrop, stateDrop, yearDrop, cityDrop, commitTime, isAdmin, memberType } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '试点申报管理',
    }, {
      name: '试点申报管理',
    }]
  }
  /** 筛选 */
  const formSearchProps = {
    is_reset: props.is_reset,
    params: props.params,
    countyDrop, stateDrop, yearDrop, cityDrop, commitTime, isAdmin,
    onFormReset() {
      dispatch({
        type: 'PilotApplicationModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...params, ...values, pageNum: 1, pageSize: 10 };
      console.log(isAdmin, 'isAdmin')
      if (isAdmin == 10) {
        dispatch({
          type: 'PilotApplicationModel/ajaxProList',
          payload: data
        })
      } else {
        dispatch({
          type: 'PilotApplicationModel/ajaxList',
          payload: data
        })
      }
    },
    onChangeTime(val) {
      dispatch({
        type: 'PilotApplicationModel/concat',
        payload: { commitTime: val }
      })
    },
    onSelectFuns(val) {
      dispatch({
        type: 'PilotApplicationModel/provinceCenterList',
        payload: { type: 2, cityCode: val }
      })
    }
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: props.list,
    paginationTotal: props.paginationTotal, isAdmin, memberType,
    params: props.params,
    onChangePage(pageNum) {
      if (isAdmin == 10) {
        dispatch({
          type: 'PilotApplicationModel/ajaxProList',
          payload: { ...props.params, pageNum }
        })
      } else {
        dispatch({
          type: 'PilotApplicationModel/ajaxList',
          payload: { ...props.params, pageNum }
        })
      }
    }
  }
  function handleAdd() {
    dispatch({
      type: 'PilotApplicationModel/addInfo',
      payload: {}
    })
  }

  return (
    <div>
      {authority('list') || isAdmin == 10 ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          {authority('add') && memberType == 1 && <Button type="primary" className="mb1" onClick={handleAdd}><Icon type="plus" />立即申报</Button>}
          <FormList {...formListProps} />
        </Card>
      </div> : <div className="kong-tu">
          <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
        </div>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.PilotApplicationModel,
    loading: state.loading.models.PilotApplicationModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
