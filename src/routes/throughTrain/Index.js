import React from 'react';
import { connect } from 'dva';
import { Form, Card } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormList from './components/FormList';

function Index(props) {
  let { dispatch } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '小程序管理',
    }, {
      name: '公益直通车',
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
        type: 'ThroughTrainModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onChangeSwitch(record) {
      let payload = {
        id: record.id,
        isOpen: record.isOpen == 1 ? 2 : 1
      }
      dispatch({
        type: 'ThroughTrainModel/ajaxOpen',
        payload
      })
    }
  }
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <FormList {...formListProps} />
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.ThroughTrainModel,
    loading: state.loading.models.ThroughTrainModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
