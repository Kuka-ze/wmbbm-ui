'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { getUrl } from '../../utils/util';
import { Modal, message, Upload, Icon, Form } from 'antd';
/**
 * 图片上传组件
 * @param {number} fileSize 图片大小，比如：1兆，默认4兆
 * @param {string} imageWidth 图片预览宽度
 * @param {string} imageHeight 图片预览高度
 */
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      files: "",
      name: "",
      isUpload: true,
      initialImg: []
    };
  }
  componentDidMount() {
    if (this.props.file && this.props.file.length > 0) {
      this.setState({
        initialImg: this.props.file,
        isUpload: this.props.file.length >= this.props.size ? false : true
      })
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let thisFileJson = JSON.stringify(this.props.file);
    let nextFileJson = JSON.stringify(nextProps.file);

    if (nextProps.file.length > 0) {
      if (thisFileJson != nextFileJson) {
        this.setState({
          initialImg: nextProps.file,
          isUpload: nextProps.file.length >= nextProps.size ? false : true
        })
      }
    }
  }
  handleCancel() {
    this.setState({ previewVisible: false })
  }
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange(e) {
    console.log("e:", e);
    let id = this.props.id;
    let fileSize = this.props.fileSize ? this.props.fileSize : 4;
    const isJPEG = e.file.type === 'image/jpeg';
    const isPNG = e.file.type === 'image/png';
    const isJPG = e.file.type === 'image/jpg';
    if (e.file.type && !isJPG && !isJPEG && !isPNG) {
      message.error('只能上传.jpeg,.jpg,.png图片');
      return false;
    }
    if (e.file.size > fileSize * 1024 * 1024) {
      message.error(`请上传小于${fileSize}M 的图片!`);
      return false
    }
    if (e.file.status == 'error') {
      message.error('很遗憾...这次上传失败了。');
    } else {
      this.setState({
        initialImg: e.fileList,
        isUpload: e.fileList.length > (this.props.size - 1) ? false : true
      })
    }
    if (e.file.status == 'done' || e.file.status == 'removed') {
      this.props.handleImage(id, e.fileList);
    }
  }

  beforeUpload(file) {
    let fileSize = this.props.fileSize ? this.props.fileSize : 4;
    const isJPEG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isJPG = file.type === 'image/jpg';
    if (!isJPG && !isJPEG && !isPNG) {
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < fileSize + 1;
    if (!isLt5M) {
      return false;
    }
    const newDate = new Date().getTime();
    const strs = file.type.split("/");
    this.setState({
      name: "zhihuishequ_text/" + newDate + "." + strs[1],
      files: file
    });
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          name="file"
          action={getUrl() + '/common/image/upload-img'}
          data={{ file: this.state.files }}
          listType="picture-card"
          fileList={this.state.initialImg}
          onPreview={this.handlePreview.bind(this)}
          beforeUpload={this.beforeUpload.bind(this)}
          onChange={!this.props.disabled?this.handleChange.bind(this):null}
          disabled={this.props.disabled}
          accept=".jpeg,.jpg,.png"
        >
          {this.state.isUpload ? uploadButton : null}
        </Upload>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)} width={this.props.imageWidth ? this.props.imageWidth + 48 : 520}>
          <img alt="example" style={{ width: '100%', height: `${this.props.imageHeight ? this.props.imageHeight + 'px' : 'auto'}` }} src={this.state.previewImage} />
        </Modal>
      </div>
    );
  }
}
Image = Form.create()(Image);
export default connect((state) => {
  return {
    image: state.image
  }
})(Image);
