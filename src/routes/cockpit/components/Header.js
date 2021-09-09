import React from 'react';
import { Row, Col, Select, Rate } from 'antd';
import "./Header.less";

/**
 * 头部
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      judge: false,
      time: '',
      y: '',
      m: '',
      d: '',
      h: '',
      min: '',
      sec: '',
      grid_construction: {}
    };
  }
  componentDidMount() {
    let that = this;
    setInterval(function () {
      let time = new Date(); // 程序计时的月从0开始取值后+1
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      let hour = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours();
      let getMinutes = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes();
      let getSeconds = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds();
      let t = `${time.getFullYear()}-${m}-${time.getDate()} ${hour}:${getMinutes}:${getSeconds}`;
      that.setState({
        time: t,
        y: y,
        m: m,
        d: d,
        h: hour,
        min: getMinutes,
        sec: getSeconds,
      });
    }, 1000);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if ((this.props.grid_construction != nextProps.grid_construction)) {
      this.setState({
        grid_construction: nextProps.grid_construction,
      });
    }
  }
  returnPage = () => {
    this.setState({
      openKeys: ['9999']
    });
    if (this.state.judge) {
      this.delfull()
    }
    sessionStorage.removeItem('numberJudge')
    sessionStorage.openKeys = JSON.stringify(['9999']);
    window.location.href = `#/indexPage`;
  }
  // 全屏
  //关闭全屏
  delfull = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  fullScreen = (el) => {
    sessionStorage.setItem('numberJudge', JSON.stringify({ judge: !this.state.judge }));
    if (!this.state.judge) {//打开全屏
      let docElm = document.documentElement;
      //W3C   
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      //FireFox   
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      //Chrome等   
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      //IE11   
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {  //退出全屏
      this.delfull()
    }
    this.setState({
      judge: !this.state.judge
    })
  }


  handleChangeFun = (value, o) => {
    this.props.handleChange ? this.props.handleChange(value, o) : ''
  }

  Astop() {
    this.refs.mar.stop();
  }
  Astart() {
    this.refs.mar.start();
  }
  //余杭/临平切换
  onCommunityLps(){
    this.props.onCommunityLp ? this.props.onCommunityLp() : ''
  }

  render() {
    let { grid_construction, time } = this.state;
    let { titleName = "杭州市-文明大脑驾驶舱", communityId, communityList, star = {} } = this.props;
    // let { corpIntegralLevel = "" } = star;

    return (
      <div className="data-headers">
        <Row className="head-box" type="flex" justify="space-between">
          <Col className="head-l" span={7}>
            {this.state.y ? <span className="time">
              <span>{this.state.y}</span>
              <span>-</span>
              <span>{this.state.m}</span>
              <span>-</span>
              <span>{this.state.d}</span>
              <span className="line">|</span>
              <span>{this.state.h}:</span>
              <span>{this.state.min}:</span>
              <span>{this.state.sec}</span>
            </span> : ''
            }
            <span className="rate-box">文明星级<Rate className="rate" disabled value={star && star.corpIntegralLevel ? +star.corpIntegralLevel : ""} /></span>
          </Col>
          <Col className="head-c" span={10}><span className="title-name">{titleName && titleName.length > 15 ? <marquee ref="mar" onMouseOver={this.Astop.bind(this)} onMouseOut={this.Astart.bind(this)} scrollamount="5">{titleName}</marquee> : titleName}</span></Col>
          <Col className="head-r" span={7}>
            {sessionStorage.getItem('property_company_name') == '杭州市' && communityId==7 ? <span onClick={this.onCommunityLps.bind(this)} style={{width: '0.1rem', height: '0.1rem', background: '#8B6FFF', borderRadius: '50%', display: 'inline-block', marginRight: '.06rem'}}></span> : ''}
            <span className="wmztc-box">
              <span className="wmztc">文明直通车</span>
              <Select
                value={communityId ? communityId : undefined}
                style={{ width: '1rem' }}
                onChange={this.handleChangeFun.bind(this)}
                size={'small'}
                placeholder="请选择"
              >
                {communityList && communityList.length > 0 ? communityList.map((item, index) => {
                  return <Select.Option key={index} value={item.id}>{item.area}</Select.Option>
                }) : null}
              </Select>
            </span>
            <a className="right-link" onClick={this.fullScreen}><img className="icon" src={!this.state.judge ? require('../images/full_screen_01.png') : require('../images/full_screen_02.png')} />{!this.state.judge ? "全屏" : "返回"}</a>
            <a className="right-link" onClick={this.returnPage}><img className="icon" src={require('../images/drop_out.png')} />退出</a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
