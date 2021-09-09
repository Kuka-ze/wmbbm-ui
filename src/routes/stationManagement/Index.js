import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormList from './components/FormList';
import FormSearch from "./components/FormSearch";
import { authority } from '../../utils/util';

function Index(props) {
  let { dispatch } = props;

  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '基础数据',
    }, {
      name: '站管理',
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
        type: 'StationManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    }
  }
  /** 筛选 */
  const formSearchProps = {
    areaTree: props.areaTree,
    placeList: props.placeList,
    is_reset: props.is_reset,
    params: props.params,
    onFormReset() {
      dispatch({
        type: 'StationManagementModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values, type) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'StationManagementModel/ajaxList',
        payload: data
      })
      if (type == 'reset') {
        dispatch({
          type: 'StationManagementModel/concat',
          payload: {
            placeList: [],
          }
        });
      }
    },
    onSelectChanges(num, value) {
      if (num == 1) {
        dispatch({
          type: 'StationManagementModel/concat',
          payload: {
            placeList: [],
          }
        });
        dispatch({
          type: 'StationManagementModel/ajaxPlaceList',
          payload: {
            centerId: value,
            type: 2,
            endLevel: 2
          }
        });
      }
    }
  }

  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          {authority('add') ?
            <Link to="/stationManagementAdd"><Button type="primary" className="mb1"><Icon type="plus" />新增站</Button></Link>
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
    ...state.StationManagementModel,
    loading: state.loading.models.StationManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
