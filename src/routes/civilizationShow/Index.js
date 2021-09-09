import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Descriptions, Pagination, Popconfirm, Modal, Icon } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import { authority } from '../../utils/util';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.css'
// const DescriptionsItem = Descriptions.Item
function Index(props) {
  let { form, dispatch, params = {}, loading, list, paginationTotal, previewVisible, previewImage, } = props;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '文明治理',
    }, {
      name: '秀文明',
    }]
  }
  /** 筛选 */
  const formSearchProps = {
    is_reset: props.is_reset,
    onFormReset() {
      dispatch({
        type: 'CivilizationShowModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values) {
      let data = { ...params, ...values, pageNum: 1, pageSize: 2 };
      dispatch({
        type: 'CivilizationShowModel/ajaxList',
        payload: data
      })
    },
    areaTree: props.areaTree,
    typeDrop: props.typeDrop,
    onChangeTime(val) {
      dispatch({
        type: 'CivilizationShowModel/concat',
        payload: { ...val }
      })
    }
  }
  /** 列表 */
  // let formListProps = {
  //   loading: props.loading,
  //   list: props.list,
  //   paginationTotal: props.paginationTotal,
  //   params: props.params,
  //   onChangePage(pageNum) {
  //     dispatch({
  //       type: 'CivilizationShowModel/ajaxList',
  //       payload: { ...props.params, pageNum }
  //     })
  //   },

  // }
  function onUpdate(record) {
    dispatch({
      type: 'CivilizationShowModel/ajaxDelete',
      payload: { id: record.id }
    })
  }
  // function linkJump() {
  //   dispatch({
  //     type: 'CivilizationShowModel/ajaxIsAdministrators',
  //     payload: {},
  //   });
  // }
  /* 点击查看大图 */
  function handlePreview(file, imageType) {
    dispatch({
      type: 'CivilizationShowModel/concat',
      payload: {
        previewImage: file || file,
        previewVisible: true,
        imageType
      }
    })
  }
  function onChangePage(pageNum) {
    dispatch({
      type: 'CivilizationShowModel/ajaxList',
      payload: { ...props.params, pageNum }
    })
  }
  function handleCancel() {
    dispatch({
      type: 'CivilizationShowModel/concat',
      payload: {
        previewVisible: false,
        previewImage: ""
      }
    })
  }
  return (
    <div>
      {authority('list') ?
        <div>
          <Breadcrumb {...breadcrumbProps} />
          <FormSearch {...formSearchProps} />
          <div className="mt1 cShow icons-list" >
            <Icon type="exclamation-circle" style={{ margin: '0 10px' }} />
            {/* <ExclamationCircleOutlined style={{ margin: '0 10px' }} /> */}
            <span className="text-style">若发现存在违规或敏感内容,请及时处理,处理后则不在手机端展示</span>
          </div>
          {
            (list && list.length) ?
              <Card className="mt1 ">
                {
                  (list && list.length) ?
                    list && list.length && list.map((item, index) => {
                      return <div className="cShow-descriptions" key={index}>
                        <div className="cShow-descriptions-left">
                          <ul className="detail-list detail-list-one">
                            <li>
                              <span className="name">发布人</span>
                              <span className="con">{item.releaseName || '-'}</span>
                            </li>
                            <li>
                              <span className="name">类型</span>
                              <span className="con">{item.typeName || '-'}</span>
                            </li>
                            {
                              item.type == 2 && <li>
                                <span className="name">所属队伍</span>
                                <span className="con">{item.team || '-'}</span>
                              </li>
                            }
                            <li>
                              <span className="name">所属组织</span>
                              <span className="con">{item.organization || '-'}</span>
                            </li>
                            <li>
                              <span className="name">所属中心</span>
                              <span className="con">{item.centerName || '-'}</span>
                            </li>
                            {
                              item.type == 1 && <li>
                                <span className="name">关联活动</span>
                                <span className="con">{item.activityName || '-'}</span>
                              </li>
                            }
                            <li>
                              <span className="name">发布内容</span>
                              <span className="con">{item.content || '-'}</span>
                            </li>
                            {
                              item.image && item.image.length ?
                                <div>
                                  {
                                    item.image && item.image.length ? item.image.map((k, index) => {
                                      return item.imageType == 1 ? <img className="img-size" src={k} key={index}
                                        onClick={handlePreview.bind(this, k, item.imageType)} /> :
                                        <div key={index} className="img-size" onClick={handlePreview.bind(this, k, item.imageType)}>
                                          <video width="100%" height="100%" src={k} controls="controls">您的浏览器不支持 video 标签。</video>
                                          <div className="video-mark"></div>
                                        </div>
                                    })
                                      : null
                                  }
                                </div>
                                : null
                            }
                            <li>
                              <span className="name">标签</span>
                              <span className="con">{item.labelName || '-'}</span>
                            </li>
                            <li>
                              <span className="name">发布时间</span>
                              <span className="con">{item.releaseTime || '-'}</span>
                            </li>
                            <li>
                              <span className="name">点赞数</span>
                              <span className="con">{item.clickNum}</span>
                            </li>
                          </ul>
                        </div>
                        <div className="cShow-descriptions-right">
                          <ul className="detail-list">
                            <li style={{ flex: '1', lineHeight: '32px' }}>
                              <span className="name">状态</span>
                              <span className="con">{item.statusName || '-'}</span>
                            </li>
                            <li style={{ flex: '1' }}>
                              {item.status != 2 ?
                              <Popconfirm title={`您是否要删除?`} onConfirm={() => onUpdate(item)}>
                                <Button type="primary" shape="round">删除</Button>
                              </Popconfirm> : ''}
                            </li>
                          </ul>
                        </div>
                      </div>
                    })
                    : null
                }
                <Pagination
                  total={paginationTotal ? Number(paginationTotal) : null}
                  current={params.pageNum}
                  defaultCurrent={1}
                  defaultPageSize={params.pageSize}
                  showTotal={(total, range) => `共有 ${paginationTotal} 条`}
                  onChange={(page, pageSize) => {
                    onChangePage(page)
                  }}
                >
                </Pagination>
              </Card>
              :
              <div style={{ width: "100%", height: '200px', lineHeight: '200px', textAlign: 'center', backgroundColor: '#fff', fontSize: '20px' }}>暂无数据</div>
          }
        </div>
        : <div className="kong-tu">
          <div className="kong-tu-text">您没有本页面查看权限，请联系管理员开通</div>
        </div>
      }
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        {props.imageType == 1 ? <img alt="example" style={{ width: '100%' }} src={previewImage} /> :
          <video width="100%" height="100%" src={previewImage} controls="controls" autoPlay="autoplay">您的浏览器不支持 video 标签。</video>}
      </Modal>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.CivilizationShowModel,
    loading: state.loading.models.CivilizationShowModel
  };
}
export default connect(mapStateToProps)(Form.create()(Index));
