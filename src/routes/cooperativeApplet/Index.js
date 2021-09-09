import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormList from './components/FormList';

function Index(props) {
  let { dispatch } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '小程序管理',
    }, {
      name: '合作小程序',
    }]
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: props.list,
    paginationTotal: props.paginationTotal,
    params: props.params,
    previewVisible: props.previewVisible,
    previewImage: props.previewImage,
    onChangePage(pageNum) {
      dispatch({
        type: 'CooperativeAppletModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdateDel(record) {
      dispatch({
        type: 'CooperativeAppletModel/ajaxDel',
        payload: { id: record.id }
      })
    },
    handlePreview(src) {
      props.dispatch({
        type: 'CooperativeAppletModel/concat',
        payload: {
          previewVisible: true,
          previewImage: src
        }
      });
    },
    handleImgCancel() {
      props.dispatch({
        type: 'CooperativeAppletModel/concat',
        payload: {
          previewVisible: false,
          previewImage: ''
        }
      });
    }
  }
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Link to="/cooperativeAppletAdd"><Button type="primary" className="mb1"><Icon type="plus" />新增小程序</Button></Link>
        <FormList {...formListProps} />
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.CooperativeAppletModel,
    loading: state.loading.models.CooperativeAppletModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
