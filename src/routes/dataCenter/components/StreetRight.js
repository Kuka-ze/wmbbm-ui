import React from 'react';
import { Row, Col, Tooltip, Icon, Carousel, Rate } from 'antd';
import { Link } from 'react-router-dom';
import Title from './Title.js'; //Title
import DataCenterBorder from './DataCenterBorder.js'; //DataCenterBorder
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import './StreetRight.less'

class StreetRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabMenu: [{
        name: '文明指数/值',
        value: '1'
      }, {
        name: '活动文明时长',
        value: '2'
      }],
      tabActive: '1',
    };
  }
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {

  }

  render() {
    let { tabMenu, tabActive } = this.state;
    // console.log("StreetRight:", this.props);
    let { topRight = {}, zyfwyx = [], integralRoll = [], durationRoll = [], volunteerCode = {}, volunteerSex = {}, durationLj = {}, areaName } = this.props;
    let { place = {}, station = {}, team = {}, volunteer = {}, center = {} } = integralRoll;
    let { place: place2 = {}, station: station2 = {}, team: team2 = {}, volunteer: volunteer2 = {}, center: center2 = {} } = durationRoll;
    let { place: place3 = {}, league: league3 = {}, center: center3 = {} } = durationLj;
    let {corpIntegralLevel = 0} = topRight;
    let centers1 = {list: []}
    let centers2 = {list: []}
    let stations1 = {list: []}
    let stations2 = {list: []}
    let centers3 = {list: []}
    if(sessionStorage.getItem('communityId') == '0'){
      centers1 = center
      stations1 = place
      centers2 = center2
      stations2 = place2
      centers3 = center3
    }else{
      centers1 = place
      stations1 = station
      centers2 = place2
      stations2 = station2
      centers3 = place3
    }
    /** tab */
    function tabChange(value) {
      this.setState({
        tabActive: value
      });
    }
    /** data */
    // let progressData1 = [{
    //   name: "所1",
    //   value: 50,
    //   count: 380
    // }, {
    //   name: "所2",
    //   value: 50,
    //   count: 380
    // }, {
    //   name: "所3",
    //   value: 50,
    //   count: 380
    // }, {
    //   name: "所4",
    //   value: 50,
    //   count: 380
    // }, {
    //   name: "所5",
    //   value: 50,
    //   count: 380
    // }, {
    //   name: "所6",
    //   value: 50,
    //   count: 380
    // }, {
    //   name: "所7",
    //   value: 50,
    //   count: 380
    // }, {
    //   name: "所8",
    //   value: 50,
    //   count: 380
    // }, {
    //   name: "所9",
    //   value: 50,
    //   count: 380
    // }, {
    //   name: "所10",
    //   value: 50,
    //   count: 380
    // }, {
    //   name: "所11",
    //   value: 50,
    //   count: 380
    // }]

    /** 统计图 */
    // let optionData1 = [{
    //   name: '00:00',
    //   value: 4,
    // }, {
    //   name: '04:00',
    //   value: 3,
    // }, {
    //   name: '08:00',
    //   value: 3,
    // }, {
    //   name: '12:00',
    //   value: 5,
    // }, {
    //   name: '16:00',
    //   value: 2,
    // }, {
    //   name: '20:00',
    //   value: 7,
    // }, {
    //   name: '24:00',
    //   value: 1,
    // }];
    const getOption1 = {
      textStyle: {
        color: 'rgba(255,255,255,0.5)'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        textStyle: {
          // fontSize: 24,
        }
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: volunteer.list && volunteer.list.length > 0 ? volunteer.list.map((item, index) => item.name) : [],
          axisLabel: {
            color:"rgba(255,255,255,0.5)",
            interval: 0,    //强制文字产生间隔
            formatter:function(value){  
              let str = ""; 
              let num = 2; //每行显示字数 
              let valLength = value.length; //该项x轴字数  
              let rowNum = Math.ceil(valLength / num); // 行数  
                  
              if(rowNum > 1) {
                for(let i = 0; i < rowNum; i++) {
                  let temp = "";
                  let start = i * num;
                  let end = start + num;
                          
                  temp = value.substring(start, end) + "\n";
                  str += temp; 
                }
                return str;
              } else {
                return value;
              } 
            }
          }
          // axisLine: {
          //   lineStyle: {
          //     color: '#fff',
          //   },
          // }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barGap: 0,
          data: volunteer.list && volunteer.list.length > 0 ? volunteer.list.map((item, index) => item.count) : [],
          itemStyle: {
            normal: {
              color: '#7D49CC'
            },
          },
          barWidth: 20,//柱图宽度
        }
      ]
    };
    /** 统计图 end */
    /** 统计图 */
    // let optionData2 = [{
    //   name: '00:00',
    //   value: 4,
    // }, {
    //   name: '04:00',
    //   value: 3,
    // }, {
    //   name: '08:00',
    //   value: 3,
    // }, {
    //   name: '12:00',
    //   value: 5,
    // }, {
    //   name: '16:00',
    //   value: 2,
    // }, {
    //   name: '20:00',
    //   value: 7,
    // }, {
    //   name: '24:00',
    //   value: 1,
    // }];
    const getOption2 = {
      textStyle: {
        color: 'rgba(255,255,255,0.5)'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        textStyle: {
          // fontSize: 24,
        }
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: volunteer2.list && volunteer2.list.length > 0 ? volunteer2.list.map((item, index) => item.name) : [],
          axisLabel: {
            color:"rgba(255,255,255,0.5)",
            interval: 0,    //强制文字产生间隔
            formatter:function(value){  
              let str = ""; 
              let num = 2; //每行显示字数 
              let valLength = value.length; //该项x轴字数  
              let rowNum = Math.ceil(valLength / num); // 行数  
                  
              if(rowNum > 1) {
                for(let i = 0; i < rowNum; i++) {
                  let temp = "";
                  let start = i * num;
                  let end = start + num;
                          
                  temp = value.substring(start, end) + "\n";
                  str += temp; 
                }
                return str;
              } else {
                return value;
              } 
            }
          }
          // axisLine: {
          //   lineStyle: {
          //     color: '#fff',
          //   },
          // }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barGap: 0,
          data: volunteer2.list && volunteer2.list.length > 0 ? volunteer2.list.map((item, index) => item.count) : [],
          itemStyle: {
            normal: {
              color: '#7D49CC'
            },
          },
          barWidth: 20,//柱图宽度
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#3FB2F5' },
                  { offset: 1, color: '#5C2F6F' }
                ]
              )
            },
          },
        }
      ]
    };
    /** 统计图 end */
    /** 统计图 */
    // let optionData3 = [{
    //   name: '00:00',
    //   value: 4,
    // }, {
    //   name: '04:00',
    //   value: 3,
    // }, {
    //   name: '08:00',
    //   value: 3,
    // }, {
    //   name: '12:00',
    //   value: 5,
    // }, {
    //   name: '16:00',
    //   value: 2,
    // }, {
    //   name: '20:00',
    //   value: 7,
    // }, {
    //   name: '24:00',
    //   value: 1,
    // }];
    const getOption3 = {
      textStyle: {
        color: 'rgba(255,255,255,0.5)'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        textStyle: {
          // fontSize: 24,
        }
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: league3.list && league3.list.length > 0 ? league3.list.map((item, index) => item.name) : [],
          axisLabel: {
            color:"rgba(255,255,255,0.5)",
            interval: 0,    //强制文字产生间隔
            formatter:function(value){  
              let str = ""; 
              let num = 2; //每行显示字数 
              let valLength = value.length > 8 ? 8 : value.length; //该项x轴字数  
              let rowNum = Math.ceil(valLength / num); // 行数  
                  
              if(rowNum > 1) {
                for(let i = 0; i < rowNum; i++) {
                  let temp = "";
                  let start = i * num;
                  let end = start + num;
                          
                  temp = value.substring(start, end) + "\n";
                  str += temp; 
                }
                return str;
              } else {
                return value;
              } 
            }
          }
          // axisLine: {
          //   lineStyle: {
          //     color: '#fff',
          //   },
          // }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barGap: 0,
          data: league3.list && league3.list.length > 0 ? league3.list.map((item, index) => item.count) : [],
          itemStyle: {
            normal: {
              color: '#7D49CC'
            },
          },
          barWidth: 20,//柱图宽度
        }
      ]
    };
    /** 统计图 end */
    /** 统计图 */
    // let optionData4 = [{
    //   name: '出租房',
    //   value: 10,
    // }, {
    //   name: '自住房',
    //   value: 57,
    // }];
    let optionData4 = volunteerCode.list && volunteerCode.list.length > 0 ? volunteerCode.list.map((item, index) => {
      return {
        name: item.name,
        value: item.value
      }
    }) : [];
    const getOption4 = {
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)",
        confine: true
      },
      series: [
        {
          type: 'pie',
          radius: ['35%', '50%'],
          center: ['50%', '60%'],
          data: optionData4,
          label: {
            position: 'outer',
            alignTo: 'none',
            bleedMargin: 1,
            // show: true,
            formatter: '{b}\n{d}%',
            textStyle: {
              color: '#fff',
              fontSize: '.1rem'
            }
          },
          labelLine: {
            length: 1,
            length2: 1
          },
          color: ['#26B0F8', "#FD9726", '#F7693C', '#1EC1A8'],
          avoidLabelOverlap: true,
        }
      ],
    };
    /** 统计图 end */
    /** 统计图 */
    // let optionData5 = [{
    //   name: '出租房',
    //   value: 10,
    // }, {
    //   name: '自住房',
    //   value: 57,
    // }];
    const getOption5 = {
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)",
        confine: true
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          roseType: 'area',
          data: zyfwyx,
          label: {
            position: 'outer',
            alignTo: 'none',
            bleedMargin: 6,
            show: true,
            formatter: '{b}\n{c}',
            textStyle: {
              color: '#fff',
              fontSize: '.1rem'
            }
          },
          labelLine: {
            length: 1,
            length2: 1
          },
          color: ['#FD9726', "#B75EDE", '#3F6AF5', '#1EC1A8', '#FFF47A', '#F7693C', '#7F15DC', '#FF8C26', '#AEF5DF', '#84A443', '#FE3D00'],
          avoidLabelOverlap: true,
        }
      ]
    };
    /** 统计图 end */
    // console.log("this.props:", this.props);
    return (
      <div className="StreetRight">
        <Row className="compare-box" style={{ height: '.82rem', overflow: 'hidden' }}>
          <Col className="compare-cont" span={10}>
            <div className="name">文明指数：<Rate className="rate" disabled value={+corpIntegralLevel}/></div>
            <div className="compare">
              <span className="num">{topRight.corpIntegral || 0}</span>
              {+topRight.yesterdayCorpIntegral > 0 ?
                <span>
                  <span className="compare-num rise">{"+" + topRight.yesterdayCorpIntegral || 0}</span>
                  <img className="arrow-icon arrow-01" src={require('./../images/arrow_01.png')}/>
                  {/* <Icon className="icon rise-icon" type="arrow-up" /> */}
                </span> :
                +topRight.yesterdayCorpIntegral < 0 ?
                  <span>
                    <span className="compare-num decline">{topRight.yesterdayCorpIntegral || 0}</span>
                    <img className="arrow-icon arrow-02" src={require('./../images/arrow_02.png')}/>
                    {/* <Icon className="icon decline-icon" type="arrow-down" /> */}
                  </span>
                  :
                  ''
              }
            </div>
          </Col>
          <Col className="compare-cont" span={14}>
            <div className="name">累计活动文明时长：</div>
            <div className="compare">
              <span className="num">{topRight.corpDuration || 0}</span>
              {+topRight.yesterdayCorpDuration > 0 ?
                <span>
                  <span className="compare-num rise">{"+" + topRight.yesterdayCorpDuration || 0}</span>
                  <img className="arrow-icon arrow-01" src={require('./../images/arrow_01.png')}/>
                  {/* <Icon className="icon rise-icon" type="arrow-up" /> */}
                </span> :
                +topRight.yesterdayCorpDuration < 0 ?
                  <span>
                    <span className="compare-num decline">{topRight.yesterdayCorpDuration || 0}</span>
                    <img className="arrow-icon arrow-02" src={require('./../images/arrow_02.png')}/>
                    {/* <Icon className="icon decline-icon" type="arrow-down" /> */}
                  </span>
                  :
                  ''
              }
            </div>
          </Col>
        </Row>
        <div className="practice-box">
          <div className="pb10"><Title titleName="文明实践排行榜(本月)" type="right" /></div>
          <Row className="tab-menu" type="flex" justify="start">
            {tabMenu && tabMenu.map((item, index) => {
              return <Col key={index} className={item.value == tabActive ? 'name-list active' : 'name-list'} onClick={tabChange.bind(this, item.value)}>{item.name}</Col>
            })}
          </Row>
          <div className="pr20">
            <DataCenterBorder>
              <div style={{ height: '2.26rem', padding: '.13rem .16rem 0 .16rem', overflow: 'hidden' }}>
                {tabActive == 1 ? <div>
                  <Carousel autoplay dots={false} effect="fade" autoplaySpeed={2000}>
                    <div>
                      <div className="pub-title">{sessionStorage.getItem('communityId') == 0 ? '中心TOP10' : '所TOP10'}</div>
                      {centers1.list && centers1.list.length > 0 ?
                        <Row className="progress-box">
                          <Col span={12}>
                            {centers1.list.map((item, index) => {
                              return index < 5 ?
                                <div key={index} className="progress-list" style={{ paddingTop: '.1rem' }}>
                                  <Row className="progress-info" type="flex" justify="space-between">
                                    <Col className="name" style={{width: '56%'}}>{item.name}</Col>
                                    <Col className="num"><Rate className="rate-2" disabled value={item.level ? +item.level : 0}/></Col>
                                    {/* <Col className="num">{item.count}</Col> */}
                                  </Row>
                                  <div className="progress-bar"><div className="progress-bar-bg" style={{ width: `${item.value}%`, background: '#1EC1A8', height: '.04rem' }}></div></div>
                                </div> : ''
                            })}
                          </Col>
                          <Col span={12}>
                            {centers1.list.map((item, index) => {
                              return index >= 5 && index < 10 ?
                                <div key={index} className="progress-list" style={{ paddingTop: '.1rem' }}>
                                  <Row className="progress-info" type="flex" justify="space-between">
                                    <Col className="name" style={{width: '56%'}}>{item.name}</Col>
                                    <Col className="num"><Rate className="rate-2" disabled value={item.level ? +item.level : 0}/></Col>
                                    {/* <Col className="num">{item.count}</Col> */}
                                  </Row>
                                  <div className="progress-bar"><div className="progress-bar-bg" style={{ width: `${item.value}%`, background: '#1EC1A8', height: '.04rem' }}></div></div>
                                </div> : ''
                            })}
                          </Col>
                        </Row>
                        : <div style={{ width: '100%', height: '1.9rem' }}>
                          <div style={{
                            position: 'relative',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '.14rem',
                            color: '#fff'
                          }}>暂无数据</div></div>}
                    </div>
                    <div>
                      <div className="pub-title">{sessionStorage.getItem('communityId') == 0 ? '所TOP10' : '站TOP10'}</div>
                      {stations1.list && stations1.list.length > 0 ?
                        <Row className="site-box">
                          <Col span={12}>
                            {stations1.list.map((item, index) => {
                              return index < 5 ?
                                <div key={index} className="site-list" style={{}}>
                                  <Row className={`site-info site-info-${index}`} type="flex" justify="space-between">
                                    <Col className="name" style={{width: '49%'}}>{item.name}</Col>
                                    <Col className="num"><Rate className="rate-2" disabled value={item.level ? +item.level : 0}/></Col>
                                    {/* <Col className="num">{item.count}</Col> */}
                                  </Row>
                                </div> : ''
                            })}
                          </Col>
                          <Col span={12}>
                            {stations1.list.map((item, index) => {
                              return index >= 5 && index < 10 ?
                                <div key={index} className="site-list" style={{}}>
                                  <Row className={`site-info site-info-${index}`} type="flex" justify="space-between">
                                    <Col className="name" style={{width: '49%'}}>{item.name}</Col>
                                    <Col className="num"><Rate className="rate-2" disabled value={item.level ? +item.level : 0}/></Col>
                                    {/* <Col className="num">{item.count}</Col> */}
                                  </Row>
                                </div> : ''
                            })}
                          </Col>
                        </Row>
                        : <div style={{ width: '100%', height: '1.9rem' }}>
                          <div style={{
                            position: 'relative',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '.14rem',
                            color: '#fff'
                          }}>暂无数据</div></div>}
                    </div>
                    <div>
                      <div className="pub-title">队伍TOP10</div>
                      {team.list && team.list.length > 0 ?
                        <Row className="progress-box">
                          <Col span={12}>
                            {team.list.map((item, index) => {
                              return index < 5 ?
                                <div key={index} className="progress-list" style={{ paddingTop: '.1rem' }}>
                                  <Row className="progress-info" type="flex" justify="space-between">
                                    <Col className="name" style={{width: '56%'}}>{item.name}</Col>
                                    <Col className="num"><Rate className="rate-2" disabled value={item.level ? +item.level : 0}/></Col>
                                    {/* <Col className="num">{item.count}</Col> */}
                                  </Row>
                                  <div className="progress-bar"><div className="progress-bar-bg" style={{ width: `${item.value}%`, background: '#D29FFF', height: '.04rem' }}></div></div>
                                </div> : ''
                            })}
                          </Col>
                          <Col span={12}>
                            {team.list.map((item, index) => {
                              return index >= 5 && index < 10 ?
                                <div key={index} className="progress-list" style={{ paddingTop: '.1rem' }}>
                                  <Row className="progress-info" type="flex" justify="space-between">
                                    <Col className="name" style={{width: '56%'}}>{item.name}</Col>
                                    <Col className="num"><Rate className="rate-2" disabled value={item.level ? +item.level : 0}/></Col>
                                    {/* <Col className="num">{item.count}</Col> */}
                                  </Row>
                                  <div className="progress-bar"><div className="progress-bar-bg" style={{ width: `${item.value}%`, background: '#D29FFF', height: '.04rem' }}></div></div>
                                </div> : ''
                            })}
                          </Col>
                        </Row>
                        : <div style={{ width: '100%', height: '1.9rem' }}>
                          <div style={{
                            position: 'relative',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '.14rem',
                            color: '#fff'
                          }}>暂无数据</div></div>}
                    </div>
                    <div>
                      <div className="pub-title">志愿者TOP10</div>
                      {volunteer.list && volunteer.list.length > 0 ? <ReactEcharts option={getOption1} style={{ height: '1.9rem' }} /> :
                        <div style={{ width: '100%', height: '1.9rem' }}>
                          <div style={{
                            position: 'relative',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '.14rem',
                            color: '#fff'
                          }}>暂无数据</div></div>}
                    </div>
                  </Carousel>
                </div> : ''}
                {tabActive == 2 ? <div>
                  <Carousel autoplay dots={false} effect="fade" autoplaySpeed={2000}>
                    <div>
                      <div className="pub-title">{sessionStorage.getItem('communityId') == 0 ? '中心TOP10' : '所TOP10'}</div>
                      {centers2.list && centers2.list.length > 0 ?
                        <Row className="progress-box">
                          <Col span={12}>
                            {centers2.list.map((item, index) => {
                              return index < 5 ?
                                <div key={index} className="progress-list" style={{ paddingTop: '.08rem' }}>
                                  <Row className="progress-info" type="flex" justify="space-between">
                                    <Col className="name">{item.name}</Col>
                                    <Col className="num">{item.count}</Col>
                                  </Row>
                                  <div className="progress-bar"><div className="progress-bar-bg" style={{ width: `${item.value}%`, background: '#FB9F4D', height: '.06rem' }}></div></div>
                                </div> : ''
                            })}
                          </Col>
                          <Col span={12}>
                            {centers2.list.map((item, index) => {
                              return index >= 5 && index < 10 ?
                                <div key={index} className="progress-list" style={{ paddingTop: '.08rem' }}>
                                  <Row className="progress-info" type="flex" justify="space-between">
                                    <Col className="name">{item.name}</Col>
                                    <Col className="num">{item.count}</Col>
                                  </Row>
                                  <div className="progress-bar"><div className="progress-bar-bg" style={{ width: `${item.value}%`, background: '#FB9F4D', height: '.06rem' }}></div></div>
                                </div> : ''
                            })}
                          </Col>
                        </Row>
                        : <div style={{ width: '100%', height: '1.9rem' }}>
                          <div style={{
                            position: 'relative',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '.14rem',
                            color: '#fff'
                          }}>暂无数据</div></div>}
                    </div>
                    <div>
                      <div className="pub-title">{sessionStorage.getItem('communityId') == 0 ? '所TOP10' : '站TOP10'}</div>
                      {stations2.list && stations2.list.length > 0 ?
                        <Row className="site-box">
                          <Col span={12}>
                            {stations2.list.map((item, index) => {
                              return index < 5 ?
                                <div key={index} className="site-list" style={{}}>
                                  <Row className={`site-info site-info-${index}`} type="flex" justify="space-between">
                                    <Col className="name">{item.name}</Col>
                                    <Col className="num">{item.count}</Col>
                                  </Row>
                                </div> : ''
                            })}
                          </Col>
                          <Col span={12}>
                            {stations2.list.map((item, index) => {
                              return index >= 5 && index < 10 ?
                                <div key={index} className="site-list" style={{}}>
                                  <Row className={`site-info site-info-${index}`} type="flex" justify="space-between">
                                    <Col className="name">{item.name}</Col>
                                    <Col className="num">{item.count}</Col>
                                  </Row>
                                </div> : ''
                            })}
                          </Col>
                        </Row>
                        : <div style={{ width: '100%', height: '1.9rem' }}>
                          <div style={{
                            position: 'relative',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '.14rem',
                            color: '#fff'
                          }}>暂无数据</div></div>}
                    </div>
                    <div>
                      <div className="pub-title">队伍TOP10</div>
                      {team2.list && team2.list.length > 0 ?
                        <Row className="progress-box">
                          <Col span={12}>
                            {team2.list.map((item, index) => {
                              return index < 5 ?
                                <div key={index} className="progress-list" style={{ paddingTop: '.1rem' }}>
                                  <Row className="progress-info" type="flex" justify="space-between">
                                    <Col className="name">{item.name}</Col>
                                    <Col className="num">{item.count}</Col>
                                  </Row>
                                  <div className="progress-bar"><div className="progress-bar-bg" style={{ width: `${item.value}%`, background: '#D29FFF', height: '.04rem' }}></div></div>
                                </div> : ''
                            })}
                          </Col>
                          <Col span={12}>
                            {team2.list.map((item, index) => {
                              return index >= 5 && index < 10 ?
                                <div key={index} className="progress-list" style={{ paddingTop: '.1rem' }}>
                                  <Row className="progress-info" type="flex" justify="space-between">
                                    <Col className="name">{item.name}</Col>
                                    <Col className="num">{item.count}</Col>
                                  </Row>
                                  <div className="progress-bar"><div className="progress-bar-bg" style={{ width: `${item.value}%`, background: '#D29FFF', height: '.04rem' }}></div></div>
                                </div> : ''
                            })}
                          </Col>
                        </Row>
                        : <div style={{ width: '100%', height: '1.9rem' }}>
                          <div style={{
                            position: 'relative',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '.14rem',
                            color: '#fff'
                          }}>暂无数据</div></div>}
                    </div>
                    <div>
                      <div className="pub-title">志愿者TOP10</div>
                      {volunteer2.list && volunteer2.list.length > 0 ? <ReactEcharts option={getOption2} style={{ height: '1.9rem' }} /> :
                        <div style={{ width: '100%', height: '1.9rem' }}>
                          <div style={{
                            position: 'relative',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '.14rem',
                            color: '#fff'
                          }}>暂无数据</div></div>}
                    </div>
                  </Carousel>
                </div> : ''}
              </div>
            </DataCenterBorder>
          </div>
        </div>
        <div>
          <div className="pt10 pb10"><Title titleName="活动文明时长排行榜(累计)" type="right" /></div>
          <div className="pr20">
            <DataCenterBorder>
              <div style={{ height: '2.64rem', padding: '.13rem .16rem 0 .16rem', overflow: 'hidden' }}>
                <Carousel autoplay dots={false} effect="fade" autoplaySpeed={2000}>
                  <div>
                    <div className="pub-title">志愿 联盟</div>
                    {league3.list && league3.list.length > 0 ? <ReactEcharts option={getOption3} style={{ height: '2.3rem' }} /> :
                      <div style={{ width: '100%', height: '2.3rem' }}>
                        <div style={{
                          position: 'relative',
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '.14rem',
                          color: '#fff'
                        }}>暂无数据</div></div>}
                  </div>
                  <div>
                    <div className="pub-title">{sessionStorage.getItem('communityId') == 0 ? '文明实践中心' : '文明实践所'}</div>
                    {centers3.list && centers3.list.length > 0 ?
                      <Row className="progress-box">
                        <Col span={12}>
                          {centers3.list.map((item, index) => {
                            return index < 5 ?
                              <div key={index} className="progress-list" style={{ paddingTop: '.14rem' }}>
                                <Row className="progress-info" type="flex" justify="space-between">
                                  <Col className="name">{item.name}</Col>
                                  <Col className="num">{item.count}</Col>
                                </Row>
                                <div className="progress-bar"><div className="progress-bar-bg" style={{ width: `${item.value}%`, background: '#9927FD', height: '.06rem' }}></div></div>
                              </div> : ''
                          })}
                        </Col>
                        <Col span={12}>
                          {centers3.list.map((item, index) => {
                            return index >= 5 && index < 10 ?
                              <div key={index} className="progress-list" style={{ paddingTop: '.14rem' }}>
                                <Row className="progress-info" type="flex" justify="space-between">
                                  <Col className="name">{item.name}</Col>
                                  <Col className="num">{item.count}</Col>
                                </Row>
                                <div className="progress-bar"><div className="progress-bar-bg" style={{ width: `${item.value}%`, background: '#27C4FD', height: '.06rem' }}></div></div>
                              </div> : ''
                          })}
                        </Col>
                      </Row>
                      : <div style={{ width: '100%', height: '2.3rem' }}>
                        <div style={{
                          position: 'relative',
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '.14rem',
                          color: '#fff'
                        }}>暂无数据</div></div>}
                  </div>
                </Carousel>
              </div>
            </DataCenterBorder>
          </div>
        </div>
        <div>
          <div className="pt10 pb10"><Title titleName="志愿者画像" type="right" /></div>
          <div className="pr20">
            <DataCenterBorder>
              <div style={{ height: '2.6rem', padding: '.13rem .16rem 0 .16rem', overflow: 'hidden' }}>
                <Row>
                  <Col span={12}>
                    <div className="pub-title">志愿者申领文明码占比</div>
                    {volunteerCode.list && volunteerCode.list.length > 0 ? <ReactEcharts option={getOption4} style={{ height: '1.74rem' }} /> :
                      <div style={{ width: '100%', height: '1.74rem' }}>
                        <div style={{
                          position: 'relative',
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '.14rem',
                          color: '#fff'
                        }}>暂无数据</div></div>}
                    <Row>
                      <Col span={12}>
                        <Row className="proportion-main" type="flex" align="middle">
                          <Col><img className="proportion-icon" src={require('../images/proportion_01.png')} /></Col>
                          <Col className="proportion-right">
                            <div className="num">{volunteerSex.man || 0}%</div>
                            <div className="name">占比</div>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row className="proportion-main" type="flex" align="middle">
                          <Col><img className="proportion-icon" src={require('../images/proportion_02.png')} /></Col>
                          <Col className="proportion-right">
                            <div className="num">{volunteerSex.woman || 0}%</div>
                            <div className="name">占比</div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12} style={{ position: 'relative' }}>
                    <div className="border"></div>
                    <div className="pub-title">志愿服务意向统计</div>
                    {zyfwyx && zyfwyx.length > 0 ? <div>
                      <div className="circle circle-1"></div>
                      <div className="circle circle-2"></div>
                      <ReactEcharts option={getOption5} style={{ height: '2.26rem' }} />
                    </div> :
                      <div style={{ width: '100%', height: '2.26rem' }}>
                        <div style={{
                          position: 'relative',
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '.14rem',
                          color: '#fff'
                        }}>暂无数据</div></div>}
                  </Col>
                </Row>
              </div>
            </DataCenterBorder>
          </div>
        </div>
      </div>
    );
  }
}

export default StreetRight;

