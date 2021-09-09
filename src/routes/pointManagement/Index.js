import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormList from './components/FormList';
import FormSearch from "./components/FormSearch";
import { authority, download } from '../../utils/util';

function Index(props) {
  let { dispatch } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '基础数据',
    }, {
      name: '点管理',
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
        type: 'PointManagementModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    }
  }
  /** 筛选 */
  const formSearchProps = {
    areaTree: props.areaTree,
    siteType: props.siteType,
    placeList: props.placeList,
    stationList: props.stationList,
    is_reset: props.is_reset,
    params: props.params,
    onFormReset() {
      dispatch({
        type: 'PointManagementModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values, type) {
      let data = { ...props.params, ...values, pageNum: 1, pageSize: 10 };
      dispatch({
        type: 'PointManagementModel/ajaxList',
        payload: data
      })
      if (type == 'reset') {
        dispatch({
          type: 'PointManagementModel/concat',
          payload: {
            placeList: [],
            stationList: [],
          }
        });
      }
    },
    onSelectChanges(num, value) {
      if (num == 1) {
        dispatch({
          type: 'PointManagementModel/ajaxPlaceList',
          payload: {
            centerId: value,
            endLevel: 2
          }
        });
        dispatch({
          type: 'PointManagementModel/concat',
          payload: {
            stationList: []
          }
        });
      } else if (num == 2) {
        dispatch({
          type: 'PointManagementModel/ajaxStationList',
          payload: {
            placeId: value,
            type: 2,
            endLevel: 2
          }
        });
      }
    }
  }
  /** 小区导出 */
  function onExportFun(){
    let location = window.location,
    hostname = location.hostname;
    let api_url = '';
    if (hostname == 'localhost') {   //本地环境
      api_url = 'http://dev-api.elive99.com/volunteer-ckl/?r='
    } else if (hostname == 'wmdn-pre.zje.com') {/** 预发1 */
      api_url = 'http://dev-api.elive99.com/volunteer-ckl/?r='
    } else if (hostname == 'wmdn-pre-kelang.zje.com') {/** 预发2 */
      api_url = 'http://dev-api.elive99.com/volunteer-sdm/?r='
    } else if (hostname == 'wmdn.zje.com') {/** 生产 */
      api_url = 'http://wmdn-api.zje.com/index.php?r='
    } else if (hostname == 'wmdn-gs.zje.com') {/** 拱墅 */
      api_url = 'http://wmdn-api.zje.com/index.php?r='
    } else if (hostname == 'wmdn-code.zje.com') {/** 文明码 */
      api_url = 'http://wmdn-code-api.zje.com/index.php?r='
    } else if (hostname == 'wmdn-yj.zje.com') {/** 西子义警 */
      api_url = 'http://wmdn-yj-api.zje.com/index.php?r='
    } else {/** 其他 */
      api_url = 'http://wmdn-api.zje.com/index.php?r='
    }
    let url = `${api_url}/volunteer/download/down`;
    download(url);
    // dispatch({
    //   type: 'PointManagementModel/ajaxExcelIndex',
    //   payload: {}
    // });
  }
  return (
    <div>
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          {authority('add') ?
            <Link to="/pointManagementAdd"><Button type="primary" className="mb1"><Icon type="plus" />新增点</Button></Link>
            : null
          }
          {sessionStorage.getItem('isAdmin') == 1 ?
            <Button type="primary" className="mb1 ml1" onClick={onExportFun}>小区数据</Button>
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
    ...state.PointManagementModel,
    loading: state.loading.models.PointManagementModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
