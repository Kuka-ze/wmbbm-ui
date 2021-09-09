'use strick';
import React from 'react';
import { message } from "antd"
import E from 'wangeditor';
import './index.less';
import { getUrl } from '../../utils/util';
class WangEditor extends React.Component{
  constructor(props){
    super(props)
    this.state={
      editorContent:""
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.props.content !== nextProps.content){
      this.instance && this.instance.txt.html(nextProps.content)
    }
  }
  componentDidMount() {
    let that = this;
    const elem = this.editor;
    const editor = new E(elem)
    editor.create();
    //禁用编辑器
    //editor.$textElem.attr('contenteditable',false);
    //开启编辑功能
    //editor.$textElem.attr('contenteditable',true);
    editor.customConfig.zIndex = 100
    editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      // 'list',  // 列表
      'justify',  // 对齐方式
      //'quote',  // 引用
      'image',  // 插入图片
      // 'table',  // 表格
    ]
    this.instance = editor;
    //editor.attr(elem, false)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
      that.props.getValues && that.props.getValues(html)
    }
    editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    // 隐藏“网络图片”tab
    editor.customConfig.showLinkImg = false
    // 配置服务器端地址
    editor.customConfig.uploadImgServer = `${getUrl()}/common/image/upload-img`
    // editor.customConfig.uploadImgServer = "https://dev-api.elive99.com/zph/web/qiniu/upload/image"
    editor.customConfig.uploadFileName = 'file'
    editor.customConfig.uploadImgMaxSize = ( this.props.imgSize || 3 ) * 1024 * 1024 //限制图片大小
    //editor.customConfig.uploadImgMaxLength = 10 //限制一次最多能传几张图片
    editor.customConfig.uploadImgHooks = {
      customInsert: function (insertImg, result, editor) {
        let url = result.data.filepath
        insertImg(url)
      }
    }
    editor.customConfig.customAlert = function (info) { //上传图片的错误提示
      message.error(info)
    }
    // 自定义处理粘贴的文本内容
    editor.customConfig.pasteTextHandle = function (content) {
      // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      if (content == '' && !content) return ''
      let str = content;
      //处理的标签里的多余代码
      str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '');
      str=str.replace('/(\\n|\\r| class=(")?Mso[a-zA-Z]+(")?)/g','');
      let reg=new RegExp('<!--(.*?)-->','g')
      str=str.replace(reg,'');
      str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
      str = str.replace(/<\/?[^>]*>/g, '')
      str = str.replace(/[ | ]*\n/g, '\n')
      str = str.replace(/&nbsp;/ig, '')
      console.log('富文本的content：',JSON.parse(JSON.stringify(content)))
      console.log('修改后的content：',str)
      return str
    }
    editor.create()
    editor.txt.html(this.props.content)
  }
  render() {
    return (
      <div className="wangEditor">
        <div ref={res => { this.editor = res }} ></div>
      </div>
    );
  }
}
export default WangEditor;