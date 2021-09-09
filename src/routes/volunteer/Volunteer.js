import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Icon, Empty, Modal, Cascader } from 'antd';
import Breadcrumb from "../../components/Breadcrumb/index";
import FormSearch from "./components/FormSearch";
import FormList from './components/FormList';
import ExImport from "../../components/ExImport/index";
import { authority, download } from '../../utils/util';

function Volunteer(props) {
  let { form, dispatch, params = {} } = props;
  let { getFieldDecorator } = form;
  /** 面包屑 */
  const breadcrumbProps = {
    breadcrumbs: [{
      name: '志愿队伍管理',
    }, {
      name: '志愿者管理',
    }]
  }
  /** 筛选 */
  const formSearchProps = {
    areaTree: props.areaTree,
    teamType: props.teamType,
    teamBelong: props.teamBelong,
    centerId: props.centerId,
    teamDrop: props.teamDrop,
    inputStatus: props.inputStatus,
    is_reset: props.is_reset,
    resetField: props.resetField,
    typeDrop: props.typeDrop,
    params: props.params,
    onFormReset() {
      dispatch({
        type: 'VolunteerModel/concat',
        payload: {
          is_reset: false,
        },
      });
    },
    onFormSearch(values, type) {
      let data = { ...params, ...values, pageNum: 1, pageSize: 10 };
      /** 导入 */
      dispatch({
        type: 'VolunteerModel/concat',
        payload: { resetField: false }
      })
      dispatch({
        type: 'VolunteerModel/volunteerList',
        payload: data
      })
      if (type == 'reset') {
        dispatch({
          type: 'VolunteerModel/concat',
          payload: {
            teamType: [],
            teamBelong: [],
            inputStatus: true,
          }
        });
      }
    },
    onSelectChanges(num, value) {
      if (num == 1) {
        dispatch({
          type: 'VolunteerModel/concat',
          payload: {
            centerId: value,
            teamBelong: [],
            teamDrop: []
          }
        });
        dispatch({
          type: 'VolunteerModel/ajaxTeamType',
          payload: {}
        });
      } else if (num == 2) {
        dispatch({
          type: 'VolunteerModel/concat',
          payload: {
            positionType: value,
            teamDrop: [],
            inputStatus: false,
          }
        });
        dispatch({
          type: 'VolunteerModel/ajaxTeamBelong',
          payload: {
            positionType: value,
            centerId: props.centerId,
          }
        });
      } else if (num == 3) {
        dispatch({
          type: 'VolunteerModel/ajaxTeamDrop',
          payload: {
            centerId: props.centerId,
            positionType: props.positionType,
            positionId: value,
          }
        });
      }
    }
  }
  /** 列表 */
  let formListProps = {
    loading: props.loading,
    list: props.list,
    paginationTotal: props.paginationTotal,
    params: props.params,
    onChangePage(pageNum) {
      dispatch({
        type: 'VolunteerModel/volunteerList',
        payload: { ...props.params, pageNum }
      })
    },
    onRemove(record) {
      dispatch({
        type: 'VolunteerModel/volunteerRemove',
        payload: { id: record.id }
      })
    }
  }
  function linkJump() {
    let isAdmin = sessionStorage.getItem('isAdmin');
    if(isAdmin == 1){
      window.location.href = '#volunteerAdd';
    }else{
      dispatch({
        type: 'VolunteerModel/ajaxIsAdministrators',
        payload: {},
      });
    }
  }
  /** 导入 */
  /** 队伍弹框 */
  function showModalTeam() {
    dispatch({
      type: 'VolunteerModel/ajaxCenterTeamDrop',
      payload: {}
    });
    dispatch({
      type: 'VolunteerModel/concat',
      payload: {
        visibleTeam: true,
      }
    });
  }
  function handleCancelTeam() {
    form.resetFields();
    dispatch({
      type: 'VolunteerModel/concat',
      payload: {
        visibleTeam: false
      }
    });
  }
  function handleSubmitTeam() {
    form.validateFields(['team'], (err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      dispatch({
        type: 'VolunteerModel/concat',
        payload: {
          centerId: values && values.team && values.team.length > 0 ? values.team[0] : '',
          teamId: values && values.team && values.team.length > 0 ? values.team[1] : '',
          visibleExImport: true,
          visibleTeam: false
        }
      });
    });
  }
  /** 队伍弹框end */
  /** 导入配置 */
  const exImportProps = {
    visible: props.visibleExImport,
    importUrl: "/volunteer/volunteer/import",//导入url
    importData:{
      centerId: props.centerId,
      teamId: props.teamId,
    },
    callback(resetField) {
      dispatch({
        type: 'VolunteerModel/concat',
        payload: {
          visibleExImport: false,
          resetField
        }
      });
    },
    downUrl() {
      dispatch({
        type: 'VolunteerModel/getExcel',
        payload: {},
        callback(down_url) {
          download(down_url);
        }
      });
    }
  }
  /** 导入 end */

  return (
    <div>
      {/* <Empty description="功能升级中，敬请期待" style={{paddingTop:"20%"}}/> */}
      {authority('list') ? <div>
        <Breadcrumb {...breadcrumbProps} />
        <FormSearch {...formSearchProps} />
        <Card className="mt1">
          {authority('add') ?
            <Button type="primary" className="mb1" onClick={linkJump.bind(this)}><Icon type="plus" />新增志愿者</Button>
            : null
          }
          {/** 导入组件 */}
          {authority('excel') ?
            <Button type="primary" className="mb1 ml1" onClick={showModalTeam.bind(this)}>数据导入</Button>
            : null
          }
          <ExImport {...exImportProps} />
          {/** 队伍弹框 start */}
          <Modal
            title="批量导入"
            visible={props.visibleTeam}
            onCancel={handleCancelTeam}
            footer={null}
          >
            <Form>
              <Form.Item label="选择队伍" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} extra="请选择要将志愿者批量导入的队伍">
                {getFieldDecorator('team', {
                  initialValue: [],
                  rules: [{ required: true, message: '请选择队伍' }],
                })(
                  <Cascader
                    options={props.options}
                    placeholder="请选择队伍"
                    showSearch={
                      (inputValue, path) => path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item wrapperCol={{ span: 15, offset: 8 }}>
                <Button onClick={handleCancelTeam}>取消</Button>
                <Button className="ml1" type="primary" onClick={handleSubmitTeam} loading={props.loading}>下一步</Button>
              </Form.Item>
            </Form>
          </Modal>
          {/** 队伍弹框 end */}
          {/** 导入组件 end */}
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
    ...state.VolunteerModel,
    loading: state.loading.models.VolunteerModel
  };
}
export default connect(mapStateToProps)(Form.create()(Volunteer));
