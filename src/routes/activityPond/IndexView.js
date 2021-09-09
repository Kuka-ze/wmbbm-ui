import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Row, Col, Modal, Tabs, Table } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import { noData } from '../../utils/util';
const { TabPane } = Tabs;

function IndexView(props) {
  let { loading, detail = {} } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '理论宣讲',
    }, {
      name: '活动池',
      href: 'activityPond'
    }, {
      name: '详情',
    }
    ]
  }
  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  //点击放大图片
  function handlePreview(src) {
    props.dispatch({
      type: 'ActivityPondViewModel/concat',
      payload: {
        previewVisible: true,
        previewImage: src
      }
    });
  }
  //隐藏放大的图片
  function handleImgCancel() {
    props.dispatch({
      type: 'ActivityPondViewModel/concat',
      payload: {
        previewVisible: false,
        previewImage: ''
      }
    });
  }
  /** 样式 */
  let styles = {
    infoBox: {
      fontSize: '14px'
    },
    title: {
      fontSize: '16px',
      color: 'rgba(0,0,0,.85)',
      marginBottom: '18px'
    },
    infoList: {
      color: 'rgba(0,0,0,.65)',
      paddingBottom: '12px'
    },
    titName: {
      color: 'rgba(0,0,0,.85)'
    },
    status: {
      fontSize: '20px',
      color: 'rgba(0,0,0,.85)'
    },
    num: {
      color: 'rgba(0, 0, 0, 0.49)',
      paddingLeft: '10px'
    }
  }
  /** 表格1 */
  let tableProps1 = {
    dataSource: detail.volunteerArr || [],
    columns: [
      {
        title: '人员姓名',
        dataIndex: 'volunteerName',
        key: 'volunteerName',
        render: noData,
      }, {
        title: '手机号',
        dataIndex: 'volunteerMobile',
        key: 'volunteerMobile',
        render: noData,
      }, {
        title: '响应时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: noData,
      },
      {
        title: '签到状态',
        dataIndex: 'typeName',
        key: 'typeName',
        render: (text, record) => {
          return record ? `${record.signTime} ${record.typeName}` : '-'
        },
      },
      {
        title: '应发时长',
        dataIndex: 'auditDuration',
        key: 'auditDuration',
        render: noData,
      },
      {
        title: '实发时长',
        dataIndex: 'duration',
        key: 'duration',
        render: noData,
      },
      {
        title: '发放状态',
        dataIndex: 'durationAuditStatusName',
        key: 'durationAuditStatusName',
        render: noData,
      }
    ],
    pagination: false,
    rowKey: (record, index) => index,
    loading: loading
  }
  /** 表格2 */
  let tableProps2 = {
    dataSource: detail.massesArr || [],
    columns: [
      {
        title: '用户姓名',
        dataIndex: 'volunteerName',
        key: 'volunteerName',
        render: noData,
      }, {
        title: '手机号',
        dataIndex: 'volunteerMobile',
        key: 'volunteerMobile',
        render: noData,
      }, {
        title: '参与状态',
        dataIndex: 'typeName',
        key: 'typeName',
        render: noData,
      }
    ],
    pagination: false,
    rowKey: (record, index) => index,
    loading: loading
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <Row type="flex" justify="space-between" style={styles.infoBox}>
          <Col span={20}>
            <Row type="flex" gutter={16}>
              <Col span={4}>{detail.image ? <img onClick={handlePreview.bind(this, detail.image)} src={detail.image} style={{ width: '100%' }} /> : '-'}</Col>
              <Col span={20}>
                <Row gutter={5}>
                  <Col span={24} style={styles.title}>{detail.templateName}</Col>
                </Row>
                <Row gutter={5}>
                  <Col span={12} style={styles.infoList}><span style={styles.titName}>活动类型：</span>{detail.typeName || '-'}</Col>
                  <Col span={12} style={styles.infoList}><span style={styles.titName}>活动时间：</span>{`${detail.activityDay} ${detail.beginTime}-${detail.endTime}` || '-'}</Col>
                </Row>
                <Row gutter={5}>
                  <Col span={12} style={styles.infoList}><span style={styles.titName}>活动地点：</span>{detail.serviceAddress || '-'}</Col>
                  <Col span={12} style={styles.infoList}><span style={styles.titName}>执行队伍：</span>{detail.teamName || '-'}</Col>
                </Row>
                <Row gutter={5}>
                  <Col span={12} style={styles.infoList}><span style={styles.titName}>联系人：</span>{detail.contractPerson || '-'}</Col>
                  <Col span={12} style={styles.infoList}><span style={styles.titName}>联系电话：</span>{detail.contractPhone || '-'}</Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Button onClick={handleBack} style={{ marginBottom: '20px' }}>返回</Button>
            <div>状态</div>
            <div style={styles.status}>{detail.activityStateName || '-'}</div>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="详情" key="1">
            <div style={styles.title}>详情</div>
            <div dangerouslySetInnerHTML={{ __html: detail.content }} />
          </TabPane>
          <TabPane tab="志愿者" key="2">
            <div style={styles.title}>志愿者<span style={styles.num}>{detail.signVolunteerCount && detail.applyVolunteerCount ? `${detail.signVolunteerCount}/${detail.applyVolunteerCount}` : ''}</span></div>
            <Table {...tableProps1} />
          </TabPane>
          <TabPane tab="群众" key="3">
            <div style={styles.title}>群众<span style={styles.num}>{detail.massesCount}</span></div>
            <Table {...tableProps2} />
          </TabPane>
        </Tabs>
        <Modal visible={props.previewVisible} footer={null} onCancel={handleImgCancel.bind(this)}>
          <img alt="img" style={{ width: '100%' }} src={props.previewImage} />
        </Modal>
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.ActivityPondViewModel,
    loading: state.loading.models.ActivityPondViewModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexView));