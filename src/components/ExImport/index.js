'use strict';
import React from 'react';
import { Form, Button, Modal, Steps, Progress, Upload, Icon, message } from 'antd';
const Step = Steps.Step;
import { getUrl } from '../../utils/util';
let timer = false;
let submit = false;
import md5 from 'crypto-js/md5';

/**
 * 导入组件
 * 
 * @param {boolean} visible 导入弹框显示隐藏
 * @param {string} importUrl 导入url
 * @param {object} importData 导入传参
 * @param {function} callback 关闭弹框返回(让弹框隐藏，刷新列表)
 * @param {function} downUrl 下载模板函数
 * 
 */

class ExImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      loading: false,
      communitySelect: '',
      fileListArr: [],
      stepNum: 0,
      step1: "block",
      step2: "hide",
      progressNum: 0,
      textShow: 0,
      progressState: "",
      error_url: "",
      success: "",
      totalsNum: "",
      current: 1,
      showStep1: false,
      fileUrl: '',
      fileState: '',
      fileLen: '',
    };
  }
  //下载模板 importUrl
  downloadFile() {
    this.props.downUrl();
  }
  //确认上传
  handleImport() {
    if (this.state.fileListArr.length == '0') {
      message.error('请上传文件！');
      return;
    }
    submit = true;
    setTimeout(() => {
      window.clearTimeout(timer);
      submit = false;
    }, 50);
    this.setState({
      stepNum: 1,
      step1: "hide",
      step2: "block",
    })

    // this.props.handleImport();
  }
  //关闭弹框
  hideModal() {
    let resetField = true;
    // setTimeout(() => {
    //   this.props.form.resetFields();
    this.setState({
      communitySelect: "",
      fileListArr: [],
      stepNum: 0,
      progressState: "",
      step1: "block",
      step2: "hide",
      textShow: 0,
      progressNum: 0
    });
    // }, 1000)

    // //将父属性的visible设置为false
    this.props.callback(resetField);
    //删除列表参数
    sessionStorage.removeItem('listParams');
  }
  //上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传
  beforeUpload(file) {
    this.setState({
      error_url: '',
      success: '',
      totalsNum: '',
      fileListArr: [{
        uid: 1,
        name: file.name
      }],
      file: file
    });
    return new Promise((resolve) => {
      timer = setInterval(() => {
        if (submit) {
          if (this.state.fileListArr.length > 0) {
            resolve(this.state.file);
          } else {
            //  message.error('请添加文件！',  3);
            return false;
          }
        }
      }, 50);
    });
  }
  //删除已上传文件
  fileRemove() {
    this.setState({
      fileListArr: [],
    });
    setTimeout(() => {
      window.clearTimeout(timer);
      submit = false;
    }, 50);
  }
  onProgress(step, file) {
    this.setState({
      // textShow: 1,
      progressNum: Math.round(75)
    })
  }
  handleExport() {
    this.props.export();
  }
  handleChange(value) {
    this.setState({
      pay_channel: value
    })
  }
  // 上传文件时
  uploadChange(info) {
    if (info.file.status == 'done') {
      if (info.file.response.code == 1) {
        this.setState({
          fileListLen: info.fileList.length,
          fileListArr: info.fileList,
          stepNum: 2,
          fileUrl: info.file.response ? info.file.response.data.file_path : '',
          fileState: info.file.response ? info.file.response.code : '',
          fileLen: info.fileList.length,
          fileList: info.file.status,
        });
        message.success('文件已成功上传！');
      } else {
        message.error(info.file.response.message);
        return;
      }
    } else if (info.file.status == 'error') {
      message.error('很遗憾...这次上传失败了。');
    }
  }
  onSuccess(ret) {
    if (ret.code != 1) {
      message.error(ret.message);
    }
    this.setState({
      textShow: 1,
      stepNum: 2,
      progressState: "success",
      error_url: ret.data ? ret.data.error_url : 0,
      success: ret.data ? ret.data.success : 0,
      totalsNum: ret.data ? ret.data.totals : 0,
      progressNum: Math.round(100)
    })
  }
  onError(err) {
    this.setState({
      textShow: 1,
      stepNum: 2,
      progressState: "error",
      progressNum: Math.round(100)
    })
    message.error('数据导入失败，请重新导入。', 3);
  }
  createData() {
    const { id, importType, period_id } = this.props;
    let dataList = {};
    // if (id !== 'billmanageMore') {
    //   dataList.community_id = sessionStorage.getItem("communityId");
    // } else {
    //   dataList.community_id = sessionStorage.getItem("communityId");
    //   dataList.pay_channel = this.state.pay_channel;
    // }
    // if (importType && importType === 'publicAccount') {
    //   dataList.period_id = period_id;
    // }
    return dataList;
  }
  render() {
    const { visible } = this.props;
    const _cookie = sessionStorage.getItem("QXToken");
    const appSecret = 'HU6%12(w';
    //四位随机数(1000-9999)
    let rand = parseInt(Math.random() * 8999 + 1000, 10).toString();
    let timestamp = new Date().getTime().toString();
    // let dataString = (id != 'billmanageMore' ? { "community_id": sessionStorage.getItem("communityId") } : { "community_id": sessionStorage.getItem("communityId"), pay_channel: this.state.pay_channel })
    let md5String = JSON.stringify({
      "data": this.createData(), "rand": rand, "timestamp": timestamp, "token": _cookie
    });
    //验签算法pay_channel
    let sign = md5(md5(md5String).toString() + appSecret).toString();
    const uploadProps = {
      action: getUrl() + this.props.importUrl,
      accept: '.xls,.xlsx',
      name: 'file',
      disabled: false,
      fileList: this.state.fileListArr,
      beforeUpload: this.beforeUpload.bind(this),
      onRemove: this.fileRemove.bind(this),
      onChange: this.uploadChange.bind(this),
      onProgress: this.onProgress.bind(this),
      onSuccess: this.onSuccess.bind(this),
      onError: this.onError.bind(this),
      data: {
        ...this.props.importData,
        // token: _cookie,
        // source: "wmdn_pc"
      },
      headers: {
        'authorization': "Bearer " + _cookie,
        'source': "wmdn_pc",
        // 'Content-Type': 'multipart/form-data',
        // "Zj-Custom-Rand": rand,
        // "Zj-Custom-Timestamp": timestamp,
        // "Zj-Custom-Sign": sign
      }
    };
    return (
      <Modal title={'批量导入'} visible={visible} maskClosable={true} onCancel={this.hideModal.bind(this, 4)} footer={this.state.textShow == 0 ?
        (<Button type="primary" loading={this.state.loading} onClick={this.handleImport.bind(this)}>开始导入</Button>)
        : <Button type="primary" onClick={this.hideModal.bind(this, 4)}>关闭</Button>} confirmLoading={this.state.confirmLoading}>
        <Steps size="small" current={this.state.stepNum}>
          <Step title="上传文档" />
          <Step title="导入数据" />
          <Step title="完成" />
        </Steps>
        <section className="section">
          <div className={this.state.step1}>
            <div className="modal-layer">
              <p>1.请按照数据模板的格式准备要导入的数据</p>
              <div className="padding" onClick={this.downloadFile.bind(this)}>
                <a>下载数据模版 <Icon type="download" /></a>
              </div>
            </div>
            <div className="modal-layer">
              <p>2.请注意：数据重复时不导入</p>
            </div>
            <div className="modal-layer">
              <p>3.请选择需要导入的文件</p>
              <div className="padding">
                <Upload {...uploadProps}>
                  <Button type="ghost" disabled={this.state.fileListArr && this.state.fileListArr.length>0 ? true : false}>
                    <Icon type="upload" /> 上传文件
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
          <div className={this.state.step2}>
            <div className="modal-layer">
              <Progress percent={this.state.progressNum} status={this.state.progressState ? this.state.progressState : 'active'} />
              <div className="padding">{this.state.textShow == 0 ? '正在导入数据，请耐心等候...' : `导入完成！共${this.state.totalsNum ? this.state.totalsNum : 0}条，成功上传${this.state.success ? this.state.success : 0}条`}</div>
            </div>
            <div className="modal-layer">
              {
                this.state.textShow == 0 ?
                  (<div>
                    <p>提示：</p>
                    <div className="padding">1.导入数据期间请不要关闭此窗口</div>
                    <div className="padding">2.导入数据需要一段时间，如出现中断，请重新导入。</div>
                  </div>) : ''
              }

            </div>
            <div className="modal-layer">
              {
                this.state.error_url ? (
                  <div className="padding">
                    <p>下载导入报告，查看数据导入详情。</p>
                    <a href={this.state.error_url} download="">导入报告下载 <Icon type="download" /></a>
                  </div>
                ) : ''
              }

            </div>
          </div>

        </section>
      </Modal>
    )

  }

}
ExImport = Form.create()(ExImport);
export default ExImport;
