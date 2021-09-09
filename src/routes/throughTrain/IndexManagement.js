import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormList from './components/FormList2';

function IndexManagement(props) {
  let { dispatch } = props;
  console.log("props:", props);
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '小程序管理',
    }, {
      name: '公益直通车',
      href: 'throughTrain'
    }, {
      name: '管理',
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
    appletsName: props.appletsName,
    onChangePage(pageNum) {
      dispatch({
        type: 'ThroughTrainManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdateDel(record) {
      dispatch({
        type: 'ThroughTrainManagementModel/ajaxDel',
        payload: { id: record.id }
      })
    },
    onUpdateStatus(record) {
      dispatch({
        type: 'ThroughTrainManagementModel/ajaxStatus',
        payload: { id: record.id }
      })
    },
    handlePreview(src) {
      props.dispatch({
        type: 'ThroughTrainManagementModel/concat',
        payload: {
          previewVisible: true,
          previewImage: src
        }
      });
    },
    handleImgCancel() {
      props.dispatch({
        type: 'ThroughTrainManagementModel/concat',
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
        <div style={{ paddingBottom: '10px', fontSize: '18px', color: '#000' }}>平台：{props.appletsName}</div>
        <Link to={`/throughTrainAdd?appletsId=${props.params.appletsId}&appletsName=${props.appletsName}`}><Button type="primary" className="mb1"><Icon type="plus" />新增合作小程序展示模板</Button></Link>
        <FormList {...formListProps} />
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.ThroughTrainManagementModel,
    loading: state.loading.models.ThroughTrainManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexManagement));
