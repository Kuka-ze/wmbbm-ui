import React from 'react';
import { Row, Col, Carousel } from 'antd';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import DataCenterTitle from './DataCenterTitle.js'; //DataCenterTitle
import DataCenterBorder from './DataCenterBorder.js'; //DataCenterBorder
import './StreetLeft.less'

/**
 * 左边组件
 */

class StreetLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {

  }

  render() {
    let { civilizationList = [], skillList = [], activityDurationList = {}, volunteerSex = {}, volunteerCode = [] } = this.props;
    let { durationWeekList = [] } = activityDurationList;
    // console.log("this.props111:", this.props);
    /** 统计图 */
    let optionData1 = [{
      name: '00:00',
      value: 4,
    }, {
      name: '04:00',
      value: 3,
    }, {
      name: '08:00',
      value: 3,
    }, {
      name: '12:00',
      value: 5,
    }, {
      name: '16:00',
      value: 2,
    }, {
      name: '20:00',
      value: 7,
    }, {
      name: '24:00',
      value: 1,
    }];
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
        },
        position: function (p) {
          return [p[0] + 10, p[1] - 10]
        },
        confine: true,
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '18%',
        containLabel: true
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: durationWeekList.list && durationWeekList.list.length > 0 ? durationWeekList.list.map((item, index) => item.date) : [],
          // data: optionData1 && optionData1.length > 0 ? optionData1.map((item, index) => item.name) : [],
          axisLabel: {
            interval: 0,    //强制文字产生间隔
            rotate: 45,     //文字逆时针旋转45°
          }
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
          data: durationWeekList.list && durationWeekList.list.length > 0 ? durationWeekList.list.map((item, index) => item.durationAll) : [],
          // data: optionData1 && optionData1.length > 0 ? optionData1.map((item, index) => item.value) : [],
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
                  { offset: 0, color: '#4474F7' },
                  { offset: 1, color: '#1E4471' }
                ]
              )
            },
          },
        }
      ]
    };
    /** 统计图 end */

    //
    const settings2 = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
      autoplaySpeed: 2000,
    };

    let right = [{
      license_plate: '1大源镇稠溪村太极拳培训志愿',
      access: 1,
      time: '15:02:11',
      typeName: '活动'
    }, {
      license_plate: '2浙D2*****2',
      access: 2,
      time: '15:02:11',
      typeName: '秀文明'
    }, {
      license_plate: '3大源镇稠溪村太极拳培训志愿',
      access: 1,
      time: '15:02:11',
      typeName: '活动'
    }, {
      license_plate: '4浙D2*****2',
      access: 2,
      time: '15:02:11',
      typeName: '秀文明'
    }, {
      license_plate: '5大源镇稠溪村太极拳培训志愿',
      access: 1,
      time: '15:02:11',
      typeName: '活动'
    }, {
      license_plate: '6浙D2*****2',
      access: 2,
      time: '15:02:11',
      typeName: '秀文明'
    }]

    //文明码等级
    const getOption2 = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}',
        axisPointer: {
          type: 'shadow'
        },
        textStyle: {
          // fontSize: 24,
        },
        position: function (p) {
          return [p[0] + 10, p[1] - 10]
        },
        confine: true,
      },
      series: [
        {
          type: 'pie',
          radius: ['54%', '70%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            show: true,
            position: 'center',
            formatter: `${volunteerCode.length > 0 ? (volunteerCode[2].count * 100) + '%' : '0%'}\n${'志愿码' ? '志愿码' : ''}`,
            color: '#fff',
            textStyle: {
              fontSize: '12',
            }
          },
          data: volunteerCode || [],
          color: ['#26B0F8', '#623FF5', '#27FDD1']
        }
      ]
    }
    /** 统计图 */
    let optionData3 = [{
      name: '出租房',
      value: 10,
    }, {
      name: '自住房',
      value: 57,
    }, {
      name: '自住房2',
      value: 49,
    }];
    const getOption3 = {
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)",
        confine: true
      },
      series: [
        {
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          roseType: 'area',
          data: skillList,
          label: {
            position: 'outer',
            alignTo: 'none',
            bleedMargin: 6,
            show: false,
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

    return (
      <div className="StreetLefts">
        <div>
          <DataCenterBorder bgType="1">
            <div style={{ height: '1.61rem', overflow: 'hidden' }}>
              <div className="title-box">
                <DataCenterTitle titleName="总活动文明时长" />
                <div className="update-time">{activityDurationList.updateTime ? activityDurationList.updateTime + '更新' : ''}</div>
              </div>
              <div className="duration-box">
                <Row type="flex" justify="start" align="middle">
                  <Col className="time-num">{activityDurationList.durationAllTotals || 0}</Col>
                  <Col className="unit">小时</Col>
                </Row>
                <div className="num-box">今日新增<span className="num">{+activityDurationList.durationCompare > 0 ? '+' : +activityDurationList.durationCompare < 0 ? '-' : ''}{activityDurationList.durationCompare || 0}</span></div>
              </div>
            </div>
          </DataCenterBorder>
        </div>
        <div style={{ padding: '.24rem 0' }}>
          <DataCenterBorder bgType="2">
            <div style={{ height: '2.12rem', overflow: 'hidden' }}>
              <DataCenterTitle titleName="近7日活动文明时长增量变化" />
              {durationWeekList.list && durationWeekList.list.length > 0 ? <ReactEcharts option={getOption1} style={{ height: '100%' }} /> : <div style={{ width: '100%', height: '1.78rem' }}>
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
          </DataCenterBorder>
        </div>
        <div>
          <DataCenterBorder bgType="3">
            <div style={{ height: '2.66rem', overflow: 'hidden' }}>
              <DataCenterTitle titleName="活动&秀文明发布动态" />
              <div style={{ height: '2.32rem' }}>
                <div className="table-scroll-box" style={{ padding: '.14rem 0 0 0', height: '100%' }}>
                  <Row className="table-header">
                    <Col className="header-line" span={18}>内容</Col>
                    <Col className="header-line" span={6}>时间</Col>
                  </Row>
                  <div className="table-cont">
                    {civilizationList && civilizationList.length > 0 ?
                      <Carousel autoplay {...settings2} style={{ height: '100%', color: '#fff' }}>
                        {civilizationList.map((item, index) => {
                          return <Row key={index} type="flex" className="cont-list" align="middle">
                            <Col className="cont-line ellipsis" span={18}><img className="icon" src={require(item.type == 4 ? '../images/dynamic-1.png' : '../images/dynamic-2.png')}></img><span style={{ fontWeight: 'bold' }}>{item.typeName}：</span>{item.content}</Col>
                            <Col className="cont-line time" span={6}>{item.createTime}</Col>
                          </Row>
                        })}
                      </Carousel>
                      : <div style={{ width: '100%', height: '100%' }}>
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
                </div>
              </div>
            </div>
          </DataCenterBorder>
        </div>
        <div style={{ paddingTop: '.24rem' }}>
          <DataCenterBorder bgType="4">
            <div style={{ height: '2.34rem', overflow: 'hidden' }}>
              <DataCenterTitle titleName="志愿者画像" />
              <Row className="portrait-box">
                <Col span={12} className="list">
                  <div className="name">文明码等级</div>
                  {volunteerCode && volunteerCode.length > 0 ? <ReactEcharts option={getOption2} style={{ height: '1.2rem' }} /> :
                    <div style={{ width: '100%', height: '1.2rem' }}>
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
                <Col span={12}>
                  <div className="name">志愿者服务意向</div>
                  {skillList && skillList.length > 0 ? <ReactEcharts option={getOption3} style={{ height: '1.2rem' }} /> :
                    <div style={{ width: '100%', height: '1.2rem' }}>
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
              {(volunteerSex.man && volunteerSex.man == 0) && (volunteerSex.woman && volunteerSex.woman == 0) ? ''
                : <Row type="flex" justify="center" align="middle" className="people-box">
                  <Col>
                    <span className="percentage">{volunteerSex.man ? 
                      parseInt(volunteerSex.man * 100) + '%' : '0%'}</span>
                  </Col>
                  <Col className="people-icon">
                    {/* <img className="icon" src={require('../images/woman.png')}></img>
                <img className="icon" src={require('../images/woman.png')}></img>
                <img className="icon" src={require('../images/woman.png')}></img>
                <img className="icon" src={require('../images/woman.png')}></img>
                <img className="icon" src={require('../images/woman.png')}></img>
                <img className="icon" src={require('../images/woman.png')}></img>
                <img className="icon" src={require('../images/woman.png')}></img>
                <img className="icon" src={require('../images/woman.png')}></img>
                <img className="icon" src={require('../images/woman.png')}></img>
                <img className="icon" src={require('../images/woman.png')}></img> */}
                    <img style={{ width: '1.6rem' }} src={require('../images/woman-all.png')}></img>
                    <div className="man" style={{ width: volunteerSex.man ? 
                      parseInt(volunteerSex.man * 100) + '%' : '0%' }}>
                      <img style={{ width: '1.6rem' }} src={require('../images/man-all.png')}></img>
                      {/* <img className="icon" src={require('../images/man.png')}></img>
                  <img className="icon" src={require('../images/man.png')}></img>
                  <img className="icon" src={require('../images/man.png')}></img>
                  <img className="icon" src={require('../images/man.png')}></img>
                  <img className="icon" src={require('../images/man.png')}></img>
                  <img className="icon" src={require('../images/man.png')}></img>
                  <img className="icon" src={require('../images/man.png')}></img>
                  <img className="icon" src={require('../images/man.png')}></img>
                  <img className="icon" src={require('../images/man.png')}></img>
                  <img className="icon" src={require('../images/man.png')}></img> */}
                    </div>
                  </Col>
                  <Col>
                    <span className="percentage">{volunteerSex.woman ? 
                      parseInt(volunteerSex.woman * 100) + '%' : '0%'}</span>
                  </Col>
                </Row>}
            </div>
          </DataCenterBorder>
        </div>
      </div>
    );
  }
}

export default StreetLeft;

