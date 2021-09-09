import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Input, Cascader, Select, Modal } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import Image from '../../components/Image/';
import queryString from 'query-string';
import './index.css'
const { confirm } = Modal;
const { TextArea } = Input;

function IndexAddEdit(props) {
  console.log('props', props)
  let { form, loading, dispatch, rejectVisible, detail = {}, params = {}, onSelectChanges, rejectList = [], rejectItem = {} } = props;
  const disabledCheck = queryString.parse(props.history.location.search).disabled
  const disabledId = queryString.parse(props.history.location.search).id
  const { getFieldDecorator, validateFields } = form;

  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '平台审核',
    }, {
      name: '其他文明时',
      href: 'platformAudit'
    }, {
      name: disabledCheck == 'true' ? '审核' : '详情',
    }
    ]
  }
  // /** 布局 */
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 7 },
  }

  const formItemLayoutMin = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
  }

  //点击放大图片
  function handlePreview(src) {
    props.dispatch({
      type: 'platformDetailModel/concat',
      payload: {
        previewVisible: true,
        previewImage: src
      }
    });
  }

  //隐藏放大的图片
  function handleImgCancel() {
    props.dispatch({
      type: 'platformDetailModel/concat',
      payload: {
        previewVisible: false,
        previewImage: ''
      }
    });
  }

  //通过
  function handleSubmit(e) {
    let data = {
      id: e.id,
    }
    dispatch({
      type: 'platformDetailModel/adopt',
      payload: data
    })

  }
  //驳回
  function handleReject(e) {
    validateFields((err, values) => {
      if (err) {
        return;
      }
      let data = {
        id: e.id,
        content: values.content || '',
        rejectId: values.rejectId
      }
      dispatch({
        type: 'platformDetailModel/reject',
        payload: data
      })
      handleIrejectVisible()
    })
  }
  //打开驳回弹出框
  function hanleOpenModal(e) {
    dispatch({
      type: 'platformDetailModel/concat',
      payload: {
        rejectVisible: true,
        rejectItem: e
      }
    });
  }
  //关闭驳回弹出框
  function handleIrejectVisible(e) {
    dispatch({
      type: 'platformDetailModel/concat',
      payload: {
        rejectVisible: false,
      }
    });
    props.form.resetFields();
  }
  //选择驳回原因
  function onSelectChange(num, value) {
    onSelectChanges ? onSelectChanges(num, value) : ''
    if (num == 1) {
      props.form.setFieldsValue({
        positionId: undefined,
        positionType: undefined
      });
    } else if (num == 2) {
      dispatch({
        type: 'platformDetailModel/concat',
        payload: {
          value: value
        }
      });
    }
  }

  //返回上一页
  function handleBack(e) {
    history.go(-1);
  }
  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>基本信息</div>
        <Form >
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Form.Item label="志愿者名称" {...formItemLayout}>
                <span>{detail.volunteerName}</span>
              </Form.Item>
            </div>
            <div style={{ width: '50%' }}>
              <Form.Item label="志愿者手机号码" {...formItemLayout}>
                <span>{detail.volunteerMobile}</span>
              </Form.Item>
            </div>
          </div>
          {/* <div style={{ display: 'flex' }}> */}
          <div style={{ display: 'flex' }}>

            <div style={{ width: '50%' }}>
              <Form.Item label="平台类别" {...formItemLayout}>
                <span>{detail.platform}</span>
              </Form.Item>
            </div>
            <div style={{ width: '50%' }}>
              <Form.Item label="申请时" {...formItemLayout}>
                <span>{detail.creditTime}</span>
              </Form.Item>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Form.Item label="租户" {...formItemLayout}>
                <span>{detail.corpName}</span>
              </Form.Item>
            </div>
            <div style={{ width: '50%' }}>
              <Form.Item label="审核队伍" {...formItemLayout}>
                <span>{detail.teamName}</span>
              </Form.Item>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Form.Item label="提交时间" {...formItemLayout}>
                <span>{detail.createTime}</span>
              </Form.Item>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Form.Item label="公益履历" {...formItemLayout} >
                <img src={detail.resumeImage || ''} style={{ width: '100px', height: '100px', cursor: 'pointer' }} onClick={handlePreview.bind(this, detail.resumeImage) || ''} />
              </Form.Item>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Form.Item label="当前状态" {...formItemLayout}>
                <span>{detail.stateName}</span>
              </Form.Item>
            </div>
          </div>
          {
            detail.createName ? <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <Form.Item label="审核人" {...formItemLayout}>
                  <span>{detail.createName}</span>
                </Form.Item>
              </div>
            </div>
              : ''
          }
        </Form>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>审核历史</div>

        {detail.history && detail.history.length > 0 ? <div>
          <Form>
            {detail.history.map((item, index) => {
              return <div className='detailHistory' style={{ marginBottom: '50px' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '50%' }}>
                    <Form.Item label="时间" {...formItemLayout}>
                      <span>{item.createTime}</span>
                    </Form.Item>
                  </div>
                </div>

                <div style={{ display: 'flex' }}>
                  <div style={{ width: '50%' }}>
                    <Form.Item label="操作对象" {...formItemLayout}>
                      <span>{item.type}</span>
                    </Form.Item>
                  </div>
                </div>

                <div style={{ display: 'flex' }}>
                  <div style={{ width: '50%' }}>
                    <Form.Item label="审核人" {...formItemLayout}>
                      <span>{item.createName}</span>
                    </Form.Item>
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '50%' }}>
                    <Form.Item label="审核结果" {...formItemLayout}>
                      <span>{item.result}</span>
                    </Form.Item>
                  </div>
                </div>
                {
                  item.bhyy ? <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="驳回原因" {...formItemLayout}>
                        {item.bhyy ? <span>{item.bhyy}</span> : '-'}
                      </Form.Item>
                    </div>
                  </div> : ''
                }
                {item.bz ? <div style={{ display: 'flex' }}>
                  <div style={{ width: '50%' }}>
                    <Form.Item label="备注" {...formItemLayout}>
                      <span>{item.bz}</span>
                    </Form.Item>
                  </div>
                </div> : ''}
                {
                  item.examineImage ? <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="确认函" {...formItemLayout}>
                        {item.examineImage ? <img src={item.examineImage || ''} style={{ width: '60px', height: '60px', cursor: 'pointer' }} onClick={handlePreview.bind(this, item.examineImage) || ''} /> : '-'}
                      </Form.Item>
                    </div>
                  </div> : ''
                }
              </div>
            })}

            {disabledCheck == 'true' ? <div style={{ width: '100%', marginTop: '50px', marginLeft: '100px' }}>
              <Form.Item  {...formItemLayout}>
                <Button className="ml1" type="primary"
                  loading={loading}
                  onClick={handleSubmit.bind(this, detail)} >审核通过</Button>
                <Button className="ml1" onClick={hanleOpenModal.bind(this, detail)}>驳回(须填写驳回原因)</Button>
                <Button className="ml1" onClick={handleBack}>返回</Button>
              </Form.Item>
            </div> : <div style={{ width: '50%' }}>
                <Form.Item wrapperCol={{ span: 8, offset: 5 }}>
                  <Button className="ml1" onClick={handleBack}>返回</Button>
                </Form.Item>
              </div>
            }
          </Form>
        </div>
          : <div>
            <div className="examineStyle">暂无审核历史信息</div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <Form.Item wrapperCol={{ span: 8, offset: 5 }}>
                  <Button className="ml1" onClick={handleBack}>返回</Button>
                </Form.Item>
              </div>
            </div>
          </div>
        }

      </Card>
      <Modal title="预览" visible={props.previewVisible} footer={null} onCancel={handleImgCancel.bind(this)}>
        <img alt="img" style={{ width: '100%' }} src={props.previewImage} />
      </Modal>
      <Modal title="驳回申请" visible={rejectVisible} footer={null} onCancel={handleIrejectVisible.bind(this)}>
        <Card>
          <Form>
            <Form.Item label="驳回原因" {...formItemLayoutMin}>
              {getFieldDecorator('rejectId', { initialValue: params.type, rules: [{ required: true, message: '请选择驳回原因' }], })(
                <Select placeholder="请选择驳回原因" onChange={onSelectChange.bind(this, '2')}
                >
                  {rejectList && rejectList.length > 0 ? rejectList.map((item, index) => <Select.Option value={item.key} key={index}>{item.value}</Select.Option>) : ''}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="备注" {...formItemLayoutMin}>
              {getFieldDecorator('content', {
                initialValue: params.content,
                rules: [{ required: false, message: '请输入备注' }],
              })(
                <TextArea rows={4} placeholder="请输入备注" maxLength="50" />
              )}
            </Form.Item>

            <Form.Item wrapperCol={{ span: 8, offset: 5 }}>
              <Button className="ml1" type="primary"
                loading={loading}
                onClick={handleReject.bind(this, rejectItem)} >确定</Button>
              <Button className="ml1" onClick={handleIrejectVisible.bind(this)}>取消</Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.platformDetailModel,
    loading: state.loading.models.platformDetailModel
  };
}
export default connect(mapStateToProps)(Form.create()(IndexAddEdit));