import React from 'react';
import { connect } from 'dva';
import { Form, Icon } from 'antd';

function DingLogin(props) {
  return (
    <div>
      <Icon type="loading" style={{position: 'fixed', left: '50%',top:'40%', transform:'translate(-50%,-50%)',fontSize:'44px'}}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.DingLoginModel,
    loading: state.loading.models.DingLoginModel
  };
}
export default connect(mapStateToProps)(Form.create()(DingLogin));