import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Modal, Input, Select, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
import { authority } from '../../utils/util';

function Index(props) {
  let { dispatch, form, id, } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '大家帮',
    }, {
      name: '公益池',
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
        type: 'welfarePoolModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    //删除
    deleteItem(record) {
      const { id } = record;
      dispatch({
        type: 'welfarePoolModel/ajaxDelete',
        payload: {
          id
        }
      });
    },

  }
  /** 筛选 */
  const formSearchProps = {
    is_reset: props.is_reset,
    params: props.params,
    stateList: props.stateList,
    onFormReset() {
      dispatch({
        type: 'welfarePoolModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'welfarePoolModel/ajaxList',
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
          {authority('add') ?
            <Link to="/addWelfarePool">
              <Button type="primary" className="mb1"><Icon type="plus" />新增公益</Button>
            </Link>
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
    ...state.welfarePoolModel,
    loading: state.loading.models.welfarePoolModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
