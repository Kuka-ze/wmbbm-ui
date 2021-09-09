import React from 'react';
import { Form, Modal, Row, Col, Switch, Radio } from 'antd';

function ServiceTimeEdit(props) {
  const { visible, disabled1, disabled2, disabled3, selectedValue, startTime1, endTime1, startTime2, endTime2, startTime3, endTime3, switchDisable1, switchDisable2, switchDisable3,
    handleOk, handleCancel, onChange, onChangeRadios } = props;
  // console.log("props:11", props);

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginRight: '0',
    paddingLeft: '8px'
  };

  function onChangeFun(checked, name) {
    onChange ? onChange(checked, name) : '';
  }

  function onChangeRadio(name, e) {
    onChangeRadios ? onChangeRadios(name, e.target.value) : ''
  }

  return (
    <Modal
      title={<div>修改服务时间<span style={{ fontSize: '12px', color: '#999', paddingLeft: '10px', fontWeight: 'normal' }}>每天仅可选择3个服务时段，每段服务时长应在1-4小时时间</span></div>}
      visible={visible}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
      width={700}
      destroyOnClose={true}
    >
      <Row gutter={48}>
        <Col span={8}>
          <div style={{ paddingLeft: '8px', paddingBottom: '10px' }}>上午服务时段：<Switch checked={switchDisable1 ? switchDisable1 : disabled1} disabled={switchDisable1} checkedChildren="开" unCheckedChildren="关" onChange={onChangeFun.bind(this, "disabled1")} /></div>
          <Row type="flex" justify="space-between" align="middle">
            <Col>
              <Radio.Group disabled={!disabled1} onChange={onChangeRadio.bind(this, 'startTime1')} value={startTime1}>
                <Radio style={radioStyle} value={`${selectedValue} 07:00:00`}>7：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 08:00:00`}>8：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 09:00:00`}>9：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 10:00:00`}>10：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 11:00:00`}>11：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 12:00:00`}>12：00</Radio>
              </Radio.Group>
            </Col>
            <Col>至</Col>
            <Col>
              <Radio.Group disabled={!disabled1} onChange={onChangeRadio.bind(this, 'endTime1')} value={endTime1}>
                <Radio style={radioStyle} value={`${selectedValue} 08:00:00`}>8：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 09:00:00`}>9：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 10:00:00`}>10：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 11:00:00`}>11：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 12:00:00`}>12：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 13:00:00`}>13：00</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <div style={{ paddingLeft: '8px', paddingBottom: '10px' }}>下午服务时段：<Switch checked={switchDisable2 ? switchDisable2 : disabled2} disabled={switchDisable2} checkedChildren="开" unCheckedChildren="关" onChange={onChangeFun.bind(this, "disabled2")} /></div>
          <Row type="flex" justify="space-between" align="middle">
            <Col>
              <Radio.Group disabled={!disabled2} onChange={onChangeRadio.bind(this, 'startTime2')} value={startTime2}>
                <Radio style={radioStyle} value={`${selectedValue} 13:00:00`}>13：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 14:00:00`}>14：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 15:00:00`}>15：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 16:00:00`}>16：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 17:00:00`}>17：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 18:00:00`}>18：00</Radio>
              </Radio.Group>
            </Col>
            <Col>至</Col>
            <Col>
              <Radio.Group disabled={!disabled2} onChange={onChangeRadio.bind(this, 'endTime2')} value={endTime2}>
                <Radio style={radioStyle} value={`${selectedValue} 14:00:00`}>14：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 15:00:00`}>15：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 16:00:00`}>16：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 17:00:00`}>17：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 18:00:00`}>18：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 19:00:00`}>19：00</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <div style={{ paddingLeft: '8px', paddingBottom: '10px' }}>夜间服务时段：<Switch checked={switchDisable3 ? switchDisable3 : disabled3} disabled={switchDisable3} checkedChildren="开" unCheckedChildren="关" onChange={onChangeFun.bind(this, "disabled3")} /></div>
          <Row type="flex" justify="space-between" align="middle">
            <Col>
              <Radio.Group disabled={!disabled3} onChange={onChangeRadio.bind(this, 'startTime3')} value={startTime3}>
                <Radio style={radioStyle} value={`${selectedValue} 18:00:00`}>18：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 19:00:00`}>19：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 20:00:00`}>20：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 21:00:00`}>21：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 22:00:00`}>22：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 23:00:00`}>23：00</Radio>
              </Radio.Group>
            </Col>
            <Col>至</Col>
            <Col>
              <Radio.Group disabled={!disabled3} onChange={onChangeRadio.bind(this, 'endTime3')} value={endTime3}>
                <Radio style={radioStyle} value={`${selectedValue} 19:00:00`}>19：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 20:00:00`}>20：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 21:00:00`}>21：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 22:00:00`}>22：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 23:00:00`}>23：00</Radio>
                <Radio style={radioStyle} value={`${selectedValue} 23:59:00`}>23：59</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

export default Form.create()(ServiceTimeEdit);
