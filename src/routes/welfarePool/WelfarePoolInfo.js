import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Tabs, Table, Radio, Modal, Row, Col } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import TableList from './components/TableList';
import './style.css'
const { TabPane } = Tabs;
const { confirm } = Modal;
function Index(props) {
  let { dispatch, selectedRows, selectedRowKeys, detailInfo = {} } = props;

  const tableList = detailInfo && detailInfo.orderList && detailInfo.orderList.list || []
  const teamList = detailInfo && detailInfo.teamList || []
  const templateName = detailInfo && detailInfo.templateName || '-'
  const type = detailInfo && detailInfo.type || '-'
  const serviceTime = detailInfo && detailInfo.serviceTime || '-'
  const userCount = detailInfo && detailInfo.userCount || '-'
  const mobile = detailInfo && detailInfo.mobile || '-'
  const content = detailInfo && detailInfo.content || ''
  const contacts = detailInfo && detailInfo.contacts || '-'
  const address = detailInfo && detailInfo.serviceAddress || '-'
  const image = detailInfo && detailInfo.image || '-'
  const id = detailInfo && detailInfo.id || ''
  const is_alipay = detailInfo && detailInfo.is_alipay || '1'
  const totalSize = detailInfo && detailInfo.orderList && detailInfo.orderList.totalSize || 0
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '大家帮',
    }, {
      name: '公益池',
      href: 'welfarePool'
    }, {
      name: '公益详情'
    }]
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: tableList,
    paginationTotal: totalSize,
    params: props.params,
    selectedRows: selectedRows,
    selectedRowKeys: selectedRowKeys,
    onChangePage(pageNum) {
      dispatch({
        type: 'WelfarePoolInfoModel/ajaxList',
        payload: { ...props.params, pageNum }
      })
    },
  }

  function callback(key) {
    // console.log(key);
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

  const columns = [
    {
      title: '队伍名称',
      dataIndex: 'teamName',
      key: 'id',
    }
  ];
  function closeInfo() {
    confirm({
      title: '是否确认关闭公益',
      content: '关闭状态下群众将无法获取该项公益,支持再次重启',
      okText: '确认关闭',
      cancelText: '取消',
      okType: 'danger',
      onOk() {
        dispatch({
          type: "WelfarePoolInfoModel/updateAlipay",
          payload: {
            id,
            isAlipay: 2
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function openInfo() {
    confirm({
      title: '是否确认重启公益',
      content: '重启后下群众可以获取该项公益,支持再次关闭',
      okText: '确认开启',
      cancelText: '取消',
      okType: 'primary',
      onOk() {
        dispatch({
          type: "WelfarePoolInfoModel/updateAlipay",
          payload: {
            id,
            isAlipay: 1
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
  function searchTable(e) {
    let query = e
    dispatch({
      type: "WelfarePoolInfoModel/welfareInfo",
      payload: {
        ...props.params,
        state: query || ''
      }
    })
  }
  //点击放大图片
  function handlePreview(src) {
    props.dispatch({
      type: 'WelfarePoolInfoModel/concat',
      payload: {
        previewVisible: true,
        previewImage: src
      }
    });
  }
  //隐藏放大的图片
  function handleImgCancel() {
    props.dispatch({
      type: 'WelfarePoolInfoModel/concat',
      payload: {
        previewVisible: false,
        previewImage: ''
      }
    });
  }

  return (
    <div>
      <div>
        <Breadcrumb {...breadcrumbProps} />
        <Card>
          <Row type="flex" justify="space-between" style={styles.infoBox}>
            <Col span={20}>
              <Row type="flex" gutter={16}>
                <Col span={4}>{image ? <img onClick={handlePreview.bind(this, image)} src={image} style={{ width: '100%',height:'100%' }} /> : '-'}</Col>
                <Col span={20}>
                  <Row>
                    <Col span={24} style={styles.title}>{templateName}</Col>
                    <Row gutter={10}>
                      <Col span={12} style={styles.infoList}><span style={styles.titName}>公益类型：</span>{type || '-'}</Col>
                      <Col span={12} style={styles.infoList}><span style={styles.titName}>服务时间：</span>{serviceTime || '-'}</Col>
                    </Row>
                    <Row gutter={10}>
                      <Col span={12} style={styles.infoList}><span style={styles.titName}>服务地点：</span>{address || '-'}</Col>
                      <Col span={12} style={styles.infoList}><span style={{ color: "#fff" }}  >执行队伍：</span></Col>
                    </Row>
                    <Row gutter={10}>
                      <Col span={12} style={styles.infoList}><span style={styles.titName}>联系人：</span>{contacts || '-'}</Col>
                      <Col span={12} style={styles.infoList}><span style={styles.titName}>联系电话：</span>{mobile || '-'}</Col>
                    </Row>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              {
                is_alipay == 1 ?
                  <Button onClick={closeInfo} style={{ marginRight: '10px' }}>关闭</Button> :
                  <Button onClick={openInfo} style={{ marginRight: '10px' }}>开启</Button>
              }
              <Link className="ml1" to={`/addWelfarePool?id=${id}`}>
                <Button>编辑</Button>
              </Link>
              <div style={{ marginTop: '20px' }} className="userCount-style">点单人数: {userCount}</div>
            </Col>
          </Row>
        </Card>
        <Card className="mt1">
          <Tabs defaultActiveKey="1" onChange={callback} style={{ height: "100%" }}>
            <TabPane tab="点单统计" key="1">
              <div style={{ color: '#000', fontSize: '17px' }}>点单统计</div>
              <div className="flex" style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Radio.Group defaultValue="" size="default">
                  <Radio.Button onClick={searchTable.bind(this, '')} value="">全部</Radio.Button>
                  <Radio.Button onClick={searchTable.bind(this, 1)} value="1">待统筹</Radio.Button>
                  <Radio.Button onClick={searchTable.bind(this, 2)} value="2">已实现</Radio.Button>
                  <Radio.Button onClick={searchTable.bind(this, 3)} value="3">已失效</Radio.Button>
                </Radio.Group>
              </div>
              <TableList {...formListProps} />
            </TabPane>
            <TabPane tab="详细描述" key="2">
              <div style={{ color: '#000', fontSize: '17px' }}>详细描述</div>
              {content ? <div dangerouslySetInnerHTML={{ __html: content }} className="activity-editor" /> : ''}
            </TabPane>
            <TabPane tab="关联队伍" key="3">
              <div style={{ color: '#000', fontSize: '17px' }}>关联队伍</div>
              <Table rowKey={(record, index) => index} dataSource={teamList} columns={columns} />
            </TabPane>
          </Tabs>
        </Card></div>
      <Modal visible={props.previewVisible} footer={null} onCancel={handleImgCancel.bind(this)}>
        <img alt="img" style={{ width: '100%' }} src={props.previewImage} />
      </Modal>
    </div >
  )
}

function mapStateToProps(state) {
  return {
    ...state.WelfarePoolInfoModel,
    loading: state.loading.models.WelfarePoolInfoModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
