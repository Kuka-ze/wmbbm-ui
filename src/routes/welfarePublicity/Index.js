import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
import { authority } from '../../utils/util';
function Index(props) {
  let { form, dispatch, params = {} } = props;
  console.log(props, '====')

  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '公益宣传',
    }, {
      name: '公益宣传',
    }]
  }
  /** 筛选 */
  const formSearchProps = {
    is_reset: props.is_reset,
    params: props.params,
    onFormReset() {
      dispatch({
        type: 'WelfarePublicityModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'WelfarePublicityModel/ajaxList',
        payload: data
      })
    },
    areaTree: props.areaTree,
    typeDrop: props.typeDrop,
    onChangeTime(val) {
      dispatch({
        type: 'WelfarePublicityModel/concat',
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
        type: 'WelfarePublicityModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdate(record) {
      dispatch({
        type: 'WelfarePublicityModel/ajaxDelete',
        payload: { id: record.id }
      })
    },
    handleSetStatus(record, checked) {
      dispatch({
        type: 'WelfarePublicityModel/welfareTop',
        payload: { ...props.params, id: record.id, topState: checked ? 1 : 2 }
      })
    }

  }

  function linkJump() {
    dispatch({
      type: 'WelfarePublicityModel/ajaxIsAdministrators',
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
            <Button type="primary" className="mb1" onClick={linkJump.bind(this)}><Icon type="plus" />新建公益宣传</Button>
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
    ...state.WelfarePublicityModel,
    loading: state.loading.models.WelfarePublicityModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));

