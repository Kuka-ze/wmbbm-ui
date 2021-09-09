import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
import { authority } from '../../../utils/util';

function Index(props) {
  let { dispatch } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '活动管理',
    }, {
      name: '志愿汇活动',
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
        type: 'ZyhActivityModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdate(record) {
      dispatch({
        type: 'ZyhActivityModel/ajaxDelete',
        payload: { id: record.id }
      })
    }
  }
  /** 筛选 */
  const formSearchProps = {
    typeList: props.typeList,
    areaList: props.areaList,
    is_reset: props.is_reset,
    params: props.params,
    onFormReset() {
      dispatch({
        type: 'ZyhActivityModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'ZyhActivityModel/ajaxList',
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
    ...state.ZyhActivityModel,
    loading: state.loading.models.ZyhActivityModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
