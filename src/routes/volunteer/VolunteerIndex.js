import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Descriptions, Table } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import { noData } from '../../utils/util';
import '../IndexPage.css'
function IndexDetail(props) {
  let { loading, detail = {} } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '志愿队伍管理',
    }, {
      name: '志愿者管理',
      href: 'volunteer'
    }, {
      name: '文明时长明细',
    }
    ]
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }

  let tableProps = {
    dataSource: detail.recordArr,
    columns: [
      {
        title: '活动/服务名称',
        dataIndex: 'activityName',
        key: 'activityName',
        render: noData,
      }, {
        title: '发起方',
        dataIndex: 'createName',
        key: 'createName',
        render: noData,
      }, {
        title: '文明时长',
        dataIndex: 'duration',
        key: 'duration',
        render: noData,
      },
      //  {
      //   title: '积累文明值',
      //   dataIndex: 'integral',
      //   key: 'integral',
      //   render: noData,
      // }, 
      {
        title: '获取时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        render: (text, record) => {
        return text ? <div><div>{text}</div><div>{record.limitRemark}</div></div> : '-'
        }
      }],
    pagination: false,
    rowKey: (record, index) => index,
    loading: loading
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <ul className="detail-list detail-list-four">
          <li>
            <span className="name">姓名</span>
            <span className="con">{detail.volunteerName || '-'}</span>
          </li>
          <li>
            <span className="name">手机号</span>
            <span className="con">{detail.mobile || '-'}</span>
          </li>
          <li style={{flex: '0 0 50%'}}>
            <span className="name">所属队伍</span>
            <span className="con">{detail && detail.ascription
            && detail.ascription.length > 0 ?
            detail.ascription.map((item, index) => {
              return <span key={index}>{item}</span>
            }) : '' || '-'}</span>
          </li>
          <li>
            <span className="name">文明值</span>
            <span className="con">{detail.civilizationSurplus || '-'}</span>
          </li>
          <li>
            <span className="name">文明积分</span>
            <span className="con">{detail.integralSurplus || '-'}</span>
          </li>
          <li>
            <span className="name">活动/服务总次数</span>
            <span className="con">{detail.activityCount || '-'}</span>
          </li>
          <li>
            <span className="name">总文明时长</span>
            <span className="con">{detail.durationSurplus || '-'}</span>
          </li>
        </ul>
        <Table {...tableProps} />
        <Form.Item wrapperCol={{ span: 8, offset: 3 }} style={{ paddingTop: '20px' }}>
          <Button className="ml1" onClick={handleBack}>返回</Button>
        </Form.Item>
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.VolunteerIndexModel,
    loading: state.loading.models.VolunteerIndexModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexDetail));