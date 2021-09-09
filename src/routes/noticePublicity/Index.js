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
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '通知宣传',
    }, {
      name: '通知宣传',
    }]
  }
  /** 筛选 */
  const formSearchProps = {
    is_reset: props.is_reset,
    params: props.params,
    onFormReset() {
      dispatch({
        type: 'NoticePublicityModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'NoticePublicityModel/ajaxList',
        payload: data
      })
    },
    areaTree: props.areaTree,
    typeDrop: props.typeDrop,
    onChangeTime(val) {
      dispatch({
        type: 'NoticePublicityModel/concat',
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
        type: 'NoticePublicityModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdate(record) {
      dispatch({
        type: 'NoticePublicityModel/ajaxDelete',
        payload: { id: record.id }
      })
    },
    handleSetStatus(record, checked) {
      dispatch({
        type: 'NoticePublicityModel/noticeTop',
        payload: { ...props.params, id: record.id, topState: checked ? 1 : 2 }
      })
    }
  }

  function linkJump() {
    dispatch({
      type: 'NoticePublicityModel/ajaxIsAdministrators',
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
            <Button type="primary" className="mb1" onClick={linkJump.bind(this)}><Icon type="plus" />新建通知宣传</Button>
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
    ...state.NoticePublicityModel,
    loading: state.loading.models.NoticePublicityModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
