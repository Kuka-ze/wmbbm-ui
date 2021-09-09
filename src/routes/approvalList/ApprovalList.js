import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Card, Form, Button, Table, Icon, Popconfirm, Popover, Row, Col, Input, DatePicker, Select, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { authority, popovers, setCacheData } from '../../utils/util';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';

class ApprovalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { curDate: new Date() };
  }
  tick() {
    this.setState(state => ({
      curDate: new Date()
    }));
  }

  componentDidMount() {
    let property_company_name = sessionStorage.getItem('property_company_name')
    let isHangZhou = property_company_name.indexOf("杭州") != -1
    this.setState({
      isHangZhou
    })
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    let { curDate, isHangZhou } = this.state;
    // function ApprovalList(props) {
    let { loading, list, form, dispatch, total, params, is_reset, create_time_begin, create_time_end, listDrop = [],
      activityStatusDrop = [], areaTree = [], placeList = [], stationList = [], siteList = [], allianceList = [], isPlaceFlag, isAllianceFlag, applyStatusDrop = [] } = this.props;
    if (is_reset == true) {
      form.resetFields();
      dispatch({
        type: 'ApprovalListModel/concat',
        payload: {
          is_reset: false,
        },
      });
    }
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16
      },
    }

    const { getFieldDecorator } = form;

    function reload(params) {
      dispatch({
        type: 'ApprovalListModel/getApprovalList',
        payload: params,
      });
      dispatch({
        type: 'ApprovalListModel/concat',
        payload: {
          params: params,
        }
      });
    }
    function handleSearch(e) {
      form.validateFields((err, values) => {
        reload({
          activityName: values.activityName,
          activityTypeId: values.activityTypeId,
          activityStatus: values.activityStatus,
          applyStatus: values.applyStatus,
          centerId: values.centerId,
          placeId: values.placeId,
          leagueId: values.leagueId,
          stationId: values.stationId,
          siteId: values.siteId,
          isAudit: values.isAudit,
          pageNum: 1,
          pageSize: 10
        });
      })
    }
    function handleReset() {
      form.resetFields();
      dispatch({
        type: 'ApprovalListModel/concat',
        payload: {
          create_time_begin: '',
          placeList: [],
          stationList: [],
          allianceList: [],
          siteList: [],
          isPlaceFlag: false,
          isAllianceFlag: false,
        }
      });
      const param = {
        ...params,
        pageNum: 1,
        pageSize: 10,
        activityName: '',
        activityTypeId: '',
        activityStatus: '',
        applyStatus: '',
        centerId: '',
        placeId: '',
        stationId: '',
        siteId: '',
        leagueId: '',
        isAudit: ''
      };
      reload(param);
    }

    //页码选择
    function handlePaginationChange(page, size) {
      params.pageNum = page;
      const param = { ...params, pageNum: page };
      reload(param);
    }
    const pagination = {
      current: params.pageNum,
      onChange: handlePaginationChange,
      total: parseInt(total),
      showTotal: total => `共${total}条`,
    }
    const columns = [{
      title: '活动频次',
      dataIndex: 'styleMsg',
      key: 'styleMsg',

    }, {
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
      render: (text, record) => {
        return <Popover content={text} >{text && text.length > 10 ? text.substring(0, 9) + '...' : text}</Popover>
      }
    }, {
      title: '活动类型',
      dataIndex: 'typeName',
      key: 'typeName',
    }, {
      title: '所属中心/所/联盟/站/点',
      dataIndex: 'centerData',
      key: 'centerData',
    }, {
      title: '活动地点',
      dataIndex: 'detailAddress',
      key: 'detailAddress',
      render: (text, record) => {
        return text ? popovers(text, 20, 300) : '-'
      },
    }, {
      title: '报名情况',
      dataIndex: 'applyNumber',
      key: 'applyNumber',
      render: (text, record) => {
        return record.style == 1 ? <div><Link to={`/approvalDetail?id=${record.childId}&type=1`} onClick={() => setCacheData(params)}>{`${record.applyNumber}/${record.volunteerNumber}`}</Link>
          {record.durationState == 1 && <span style={{ color: 'orange', marginLeft: '10px' }}>(时长需审核)</span>}</div> :
          <div><Link to={`/approvalDetail?id=${record.id}&type=2`} onClick={() => setCacheData(params)}>报名情况</Link>
            {record.durationState == 1 && <span style={{ color: 'orange', marginLeft: '10px' }}>(时长需审核)</span>}</div>
      }
    }
      , {
      title: '报名截止时间',
      dataIndex: 'applyDeadline',
      key: 'applyDeadline',
    },
    {
      title: '报名状态',
      dataIndex: 'applyStatusMsg',
      key: 'applyStatusMsg',
    },
    {
      title: '活动状态',
      dataIndex: 'activityStatusMsg',
      key: 'activityStatusMsg',
    },
    isHangZhou == true ?
      {
        title: '是否同步到志愿汇',
        dataIndex: 'isSynch',
        key: 'isSynch',
        render: (text, record) => {
          return record.isSynch == 1 ? '是' : '否'
        }
      } : {},
    isHangZhou == true ?
      {
        title: '审核反馈',
        dataIndex: 'auditFeedback',
        key: 'auditFeedback',
      } : {},
    {
      title: '操作',
      dataIndex: 'desc',
      key: 'desc',
      render: (text, record) => {
        let link = `/approvalInfo?id=${record.id}&type=2`;
        let link1 = `/approvalInfo?id=${record.id}`;
        return <div>
          {authority('detail') ?
            <Link to={`/detailActivity?id=${record.id}&&disabled=${true}`} className="mr1" onClick={() => setCacheData(params)}>详情</Link>
            : ''}
          {authority('edit') && record.activityStatus == 4 && record.style == 1 ?
            <Link to={`/editActivity?id=${record.id}&&disabled=${false}`} className="mr1" onClick={() => setCacheData(params)}>编辑</Link>
            : ''}
          {authority('del') && record.activityStatus == 4 ? <Popconfirm title={`您是否确认删除?`} onConfirm={() => onDelete(record)}>
            <a className="mr1">删除</a>
          </Popconfirm> : ''}
          {authority('open') && record.activityStatus == 4 ? <Popconfirm title={`您是否确认开启?`} onConfirm={onChangeStatus.bind(this, record, '1')}><a className="mr1">开启</a></Popconfirm> : ''}
          {authority('cancel') ? record.style == 1 ?
            record.applyNumber == 0 && (record.activityStatus == 1 || record.activityStatus == 2) ? <Popconfirm title={`您是否确认取消?`} onConfirm={onChangeStatus.bind(this, record, '2')}><a className="mr1">取消</a></Popconfirm> : '' :
            record.applyNumber == 0 && (record.activityStatus == 1 || record.activityStatus == 2) && (curDate < new Date(Date.parse(record.activityLastTime.replace(/-/g, "/")))) ? <Popconfirm title={`您是否确认取消?`} onConfirm={onChangeStatus.bind(this, record, '2')}><a className="mr1">取消</a></Popconfirm> : '' : ''}
          {/* {authority('cancel') && record.applyNumber == 0 && (record.activityStatus == 1 || record.activityStatus == 2) ? <Popconfirm title={`您是否确认取消?`} onConfirm={onChangeStatus.bind(this, record, '2')}><a className="mr1">取消</a></Popconfirm> : ''} */}
          {/* {record.approval_status == '1' ? authority('hdsp') ? <Link to={link}>审批</Link> : null : authority('detail') ? <Link to={link1}>查看</Link> : null} */}
          {/* {record.approval_status == '1' ? <Link to={link}>审批</Link> : <Link to={link1}>查看</Link>} */}
        </div>
      }
    }];


    // function handleChange (e){
    //   // console.log(e,8)
    //   // const { value } = e.target;
    //   // const reg = /^[0-9]*[1-9][0-9]*$/;
    //   // if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
    //   //   this.onChange(value);
    //   // }
    // }
    function onTimeChange(obj, models) {
      let str = models && models.format('YYYY-MM-DD HH:mm')
      dispatch({
        type: 'ApprovalListModel/concat',
        payload: {
          [obj]: str || '',
        }
      });
      if (obj == 'create_time_begin' && create_time_end && new Date(str).getTime() > new Date(create_time_end).getTime()) {
        form.setFieldsValue({ 'create_time_end': '' })
      }
    }
    function disabledDate(current) {
      if (create_time_begin != '') {
        return current && current < moment(create_time_begin);
      }
    }

    function linkJump() {
      dispatch({
        type: 'ApprovalListModel/ajaxIsAdministrators',
        payload: {},
      });
    }

    function onDelete(record) {
      dispatch({
        type: 'ApprovalListModel/inspectDelete',
        payload: { id: record.id },
      });
    }
    /**  */
    function onSelectChange(num, value) {
      if (num == 1) {
        dispatch({
          type: 'ApprovalListModel/ajaxPlaceList',
          payload: { centerId: value },
        });
        dispatch({
          type: 'ApprovalListModel/ajaxAllianceList',
          payload: { centerId: value },
        });
        dispatch({
          type: 'ApprovalListModel/concat',
          payload: {
            stationList: [],
            siteList: [],
          }
        });
        this.props.form.setFieldsValue({
          placeId: undefined,
          stationId: undefined,
          siteId: undefined,
          leagueId: undefined,
        });
      } else if (num == 2) {
        dispatch({
          type: 'ApprovalListModel/ajaxStationList',
          payload: { placeId: value },
        });
        dispatch({
          type: 'ApprovalListModel/concat',
          payload: {
            siteList: [],
            isAllianceFlag: true
          }
        });
        this.props.form.setFieldsValue({
          stationId: undefined,
          siteId: undefined,
        });
      } else if (num == 3) {
        dispatch({
          type: 'ApprovalListModel/ajaxSiteList',
          payload: { stationId: value, type: 2 },
        });
        this.props.form.setFieldsValue({
          siteId: undefined,
        });
      } else if (num == 4) {

        dispatch({
          type: 'ApprovalListModel/concat',
          payload: {
            isPlaceFlag: true
          }
        });
      }
    }

    function onChangeStatus(record, type) {
      if (type == 1) {
        dispatch({
          type: 'ApprovalListModel/ajaxActivityOpen',
          payload: { id: record.id },
        });
      } else if (type == 2) {
        dispatch({
          type: 'ApprovalListModel/ajaxActivityCancel',
          payload: { id: record.id },
        });
      }
    }

    return (
      <div>
        {authority('list') ? <div>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>活动管理</Breadcrumb.Item>
            <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          </Breadcrumb>
          <Alert
            className="mb1"
            message={<div>
              <div>版本更新：文明时长需活动管理员或发起活动的队长审核后才可发放。</div>
              <div>为更加规范志愿服务时长的获取，满足全国志愿服务信息系统标准，志愿者参与完成活动签退后，活动管理员需要在文明大脑PC端——活动管理，点击“时长需审核”的活动条目进入内页对志愿者的文明时长进行处理。</div>
              <div>对真实完成志愿活动的志愿者点击发放，发放文明时长；对未实际参与志愿活动的志愿者点击驳回，并填写驳回原因。</div>
            </div>}
            type="warning"
            showIcon />
          <Card>
            <Form>
              <Col span={6}>
                <FormItem label="所属中心" {...formItemLayout}>
                  {getFieldDecorator('centerId', { initialValue: params.centerId || undefined })(
                    <Select placeholder="请选择所属中心" onChange={onSelectChange.bind(this, '1')}>
                      {areaTree && areaTree.length ? areaTree.map((item, index) => {
                        return <Option value={item.id} key={index}>{item.centerName}</Option>
                      }) : ''}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="所属所" {...formItemLayout}>
                  {getFieldDecorator('placeId', { initialValue: params.placeId || undefined })(
                    <Select placeholder="请选择所属所" onChange={onSelectChange.bind(this, '2')} disabled={isPlaceFlag}>
                      {placeList && placeList.length ? placeList.map((item, index) => {
                        return <Option value={item.id} key={index}>{item.placeName}</Option>
                      }) : ''}
                    </Select>
                  )}
                </FormItem>
              </Col>

              <Col span={6}>
                <FormItem label="所属站" {...formItemLayout}>
                  {getFieldDecorator('stationId', { initialValue: params.stationId || undefined })(
                    <Select placeholder="请选择所属站" onChange={onSelectChange.bind(this, '3')} disabled={isPlaceFlag}>
                      {stationList && stationList.length ? stationList.map((item, index) => {
                        return <Option value={item.id} key={index}>{item.stationName}</Option>
                      }) : ''}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="所属点" {...formItemLayout} >
                  {getFieldDecorator('siteId', { initialValue: params.siteId || undefined })(
                    <Select placeholder="请选择所属点" disabled={isPlaceFlag}>
                      {siteList && siteList.length ? siteList.map((item, index) => {
                        return <Option value={item.id} key={index}>{item.siteName}</Option>
                      }) : ''}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="所属联盟" {...formItemLayout}>
                  {getFieldDecorator('leagueId', { initialValue: params.leagueId || undefined })(
                    <Select placeholder="请选择所属联盟" onChange={onSelectChange.bind(this, '4')} disabled={isAllianceFlag}>
                      {allianceList && allianceList.length ? allianceList.map((item, index) => {
                        return <Option value={item.id} key={index}>{item.leagueName}</Option>
                      }) : ''}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="活动类型" {...formItemLayout}>
                  {getFieldDecorator('activityTypeId', { initialValue: params.activityTypeId || undefined })(
                    <Select placeholder="请选择活动类型" showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      <Option key="all" value="">全部</Option>
                      {
                        listDrop && listDrop.length && listDrop.map((item) => {
                          return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="活动状态" {...formItemLayout}>
                  {getFieldDecorator('activityStatus', { initialValue: params.activityStatus || undefined })(
                    <Select placeholder="请选择活动状态" showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      <Option key="all" value="">全部</Option>
                      {
                        activityStatusDrop && activityStatusDrop.length && activityStatusDrop.map((item) => {
                          return <Option key={item.key} value={item.key}>{item.value}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="活动名称" {...formItemLayout}>
                  {getFieldDecorator('activityName', { initialValue: params.activityName })(
                    <Input placeholder="请输入活动名称" />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="报名状态" {...formItemLayout}>
                  {getFieldDecorator('applyStatus', { initialValue: params.applyStatus || undefined })(
                    <Select placeholder="请选择报名状态" showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      <Option key="all" value="">全部</Option>
                      {
                        applyStatusDrop && applyStatusDrop.length && applyStatusDrop.map((item) => {
                          return <Option key={item.key} value={item.key}>{item.value}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="是否需审核" {...formItemLayout}>
                  {getFieldDecorator('isAudit', { initialValue: params.isAudit || undefined })(
                    <Select placeholder="请选择是否需审核" showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      <Option key="0" value="">全部</Option>
                      <Option key="1" value="2">时长需审核</Option>
                      <Option key="2" value="1">无需审核</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={5} offset={1}>
                <Button type="primary" className="mr1" onClick={handleSearch}>查询</Button>
                <Button type="ghost" onClick={handleReset}>重置</Button>
              </Col>
            </Form>
          </Card>
          <Card style={{ marginTop: '10px' }}>
            {authority('add') ?
              <Button type="primary" onClick={linkJump.bind(this)}><Icon type="plus" />发布活动</Button>
              : null
            }
            {/* <Link to="/addActivity"><Button type="primary"><Icon type="plus" />活动申请</Button></Link> */}
            <Table defaultExpandAllRows={true} className="mt1" loading={loading} dataSource={list} rowKey={(record => record.id)} columns={columns} pagination={pagination} />
            <Row type="flex" justify="end">
              <Col>
                <div>说明：将系列活动视为一次活动，以上活动总数为：<span style={{ color: '#2697EB' }}>{this.props.total}</span>条；</div>
              </Col>
            </Row>
            <Row type="flex" justify="end">
              <Col>
                <div>将系列活动视为多次活动，以上活动总数为：<span style={{ color: '#2697EB' }}>{this.props.childTotal}</span>条。</div>
              </Col>
            </Row>
          </Card>
        </div>
          : <div className="kong-tu">
            <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.ApprovalListModel,
    loading: state.loading.models.ApprovalListModel,
  };
}
export default connect(mapStateToProps)(Form.create()(ApprovalList));
