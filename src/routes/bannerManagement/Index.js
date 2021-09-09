import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';

function Index(props) {
  let { dispatch } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '用户推送',
    }, {
      name: props.pageType == "h5"? 'H5banner管理' :'小程序banner管理',
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
    pageType: props.pageType,
    onChangePage(pageNum) {
      dispatch({
        type: 'BannerManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
    onUpdateDel(record) {
      dispatch({
        type: 'BannerManagementModel/ajaxDel',
        payload: { id: record.id }
      })
    },
    onUpdateStatus(record) {
      dispatch({
        type: 'BannerManagementModel/ajaxStatus',
        payload: { id: record.id }
      })
    },
    handlePreview(src) {
      props.dispatch({
        type: 'BannerManagementModel/concat',
        payload: {
          previewVisible: true,
          previewImage: src
        }
      });
    },
    handleImgCancel() {
      props.dispatch({
        type: 'BannerManagementModel/concat',
        payload: {
          previewVisible: false,
          previewImage: ''
        }
      });
    }
  }
  /** 筛选 */
  const formSearchProps = {
    areaTree: props.areaTree,
    is_reset: props.is_reset,
    corpList: props.corpList,
    statusList: props.statusList,
    pageType: props.pageType,
    onFormReset() {
      dispatch({
        type: 'BannerManagementModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'BannerManagementModel/ajaxList',
        payload: data
      })
    }
  }
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <FormSearch {...formSearchProps} />
      <Card className="mt1">
        <Link to={`/bannerManagementAdd?pageType=${props.pageType}`}><Button type="primary" className="mb1"><Icon type="plus" />新增banner</Button></Link>
        <FormList {...formListProps} />
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.BannerManagementModel,
    loading: state.loading.models.BannerManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
