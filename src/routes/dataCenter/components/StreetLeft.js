import React from 'react';
import { Row, Col, Table, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import Title from './Title.js'; //Title
import DataCenterBorder from './DataCenterBorder.js'; //DataCenterBorder
import { popovers } from './../../../utils/util';
import './StreetLeft.less'
import echarts from 'echarts';
class StreetLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tabFlag: true,
      tabFlag1: true,

      value1: 50,
    };
  }
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {

  }
  // 改变tabd的方法
  toChangeTab = () => {
    this.setState({
      tabFlag: !this.state.tabFlag
    })
  }
  render() {
    let { human_section = {}, house_section = {}, dataCar = {}, dataHuman = {}, civilizationGovernance, hdlxzb, rmhd, wmzsDay, wmzsMonth } = this.props
    let { mobile, permanent, male, age = {}, type = [], label = [] } = human_section;
    let { occupancy, label: label2 = [] } = house_section;
    let { car_count = 0, today_record_count = 0, record = [] } = dataCar;
    let { today_record_count: today_record_count2 = 0, today_record_human_type = [], record: record2 = [] } = dataHuman;
    // console.log(this.props, 'eee', hdlxzb);

    let hdlxzbData = []
    let hdlxzbData1 = []
    let hdlxzbData2 = []
    let aaa = []
    hdlxzb && hdlxzb.map((item) => {
      // console.log(item.value,'1')
      if (item.name.length > 5) {
        item.name = item.name.substring(0, 4) + '..'
      } else {
        item.name = item.name
      }
      aaa.push(item.name)
    })
    // console.log('2222', aaa)
    // hdlxzb && hdlxzb.list && hdlxzb.list.map((item) => {
    //   if (item.name.length > 5) {
    //     hdlxzbData1.push(item.name.substring(0, 5) + '...')
    //   } else {
    //     hdlxzbData2.push(item.name)
    //   }

    // })
    // hdlxzbData = [...hdlxzbData1, ...hdlxzbData2]
    let a = []
    let b = []
    let c = []
    let d = []
    let e = []
    let f = []
    civilizationGovernance.map((item, index) => {
      if (item.type == 1) {
        item.color = '#F7693C'
        a.push(item)
        return
      } else if (item.type == 2) {
        item.color = '#B75EDE'

        b.push(item)
        return
      } else if (item.type == 3) {
        item.color = '#26B0F8'
        c.push(item)
        return
      } else if (item.type == 4) {
        item.color = '#1EC1A8'
        d.push(item)
        return
      } else if (item.type == 5) {
        item.color = '#3F6AF5'
        e.push(item)
        return
      }
    })
    // console.log('a',a,'b',b,'c',c,'d',d,'e',e)
    // f.push(a[0] || null, b[0] || null, c[0] || null, d[0] || null, e[0] || null)
    // f.push(a[1] || null, b[1] || null, c[1] || null, d[1] || null, e[1] || null)
    // f.push(a[2] || null, b[2] || null, c[2] || null, d[2] || null, e[2] || null)
    // f.push(a[3] || null, b[3] || null, c[3] || null, d[3] || null, e[3] || null)
    f.push(...a, ...b, ...c, ...d, ...e)
    /* 折线图 */
    const getOptionDay = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: wmzsDay && wmzsDay.list && wmzsDay.list.map((item) => {
          return item.name
        }),
        axisLine: {
          lineStyle: {
            color: '#31468E',
          },
        },
        axisLabel: {
          interval: 0,    //强制文字产生间隔
          textStyle: {    //文字样式
            color: "#81A4D0",
            fontSize: 10,
          }
        }
      },
      yAxis: {
        type: 'value',//数值轴，适用于连续数据
        axisLine: {
          lineStyle: {
            color: '#31468E',
          },
        },
        // axisLabel: {
        //   interval: 0,    //强制文字产生间隔 
        //   textStyle: {    //文字样式
        //     color: "#81A4D0",
        //     fontSize: 12,
        //   },
        // },
        axisLabel: {
          // margin: 2,
          interval: 0,    //强制文字产生间隔 
          textStyle: {    //文字样式
            color: "#81A4D0",
            fontSize: 10,
          },
          formatter: function (value, index) {
            if (value >= 10000 && value < 10000000) {
              value = value / 10000 + "万";
            } else if (value >= 10000000) {
              value = value / 10000000 + "千万";
            } else if (value >= 1000 && value < 10000) {
              value = value / 1000 + "千";
            }
            return value;
          }
        },
        splitLine: {
          show: false
        },
        grid: {
          left: 35
        },
      },
      series: [
        {
          name: '文明指数',
          type: 'line',
          data: wmzsDay && wmzsDay.list && wmzsDay.list.map((item) => {
            return item.value
          }),
          areaStyle: {
            // normal: {
            //   color: '#FD9726' //改变区域颜色
            // }
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: 'rgba(253,151,38,0.5)' },
                  { offset: 1, color: 'rgba(127,76,19,0)' }
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            }
          },
          itemStyle: {
            color: 'rgba(253, 151, 38, 1)'
          },
        }
      ]
    }
    const getOptionDay2 = {
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
          data: wmzsDay && wmzsDay.list && wmzsDay.list.map((item) => {
            return item.name
          }),
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
          data: wmzsDay && wmzsDay.list && wmzsDay.list.map((item) => {
            return item.value
          }),
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
                  { offset: 0, color: 'rgba(253,151,38,0.8)' },
                  { offset: 1, color: 'rgba(127,76,19,0)' }
                ]
              )
            },
          },
        }
      ]
    }
    const getOptionMonth = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: wmzsMonth && wmzsMonth.list && wmzsMonth.list.map((item) => {
          return item.name
        }),
        axisLine: {
          lineStyle: {
            color: '#31468E',
          },
        },
        axisLabel: {
          interval: 0,    //强制文字产生间隔
          textStyle: {    //文字样式
            color: "#81A4D0",
            fontSize: 10,
          }
        }
      },
      yAxis: {
        // type: 'value' ,//数值轴，适用于连续数据
        axisLine: {
          lineStyle: {
            color: '#31468E',
          },
        },
        // axisLabel: {
        //   interval: 0,    //强制文字产生间隔
        //   textStyle: {    //文字样式
        //     color: "#81A4D0",
        //     fontSize: 14,
        //   }
        // },
        axisLabel: {
          // margin: 2,
          interval: 0,    //强制文字产生间隔 
          textStyle: {    //文字样式
            color: "#81A4D0",
            fontSize: 10,
          },
          formatter: function (value, index) {
            if (value >= 10000 && value < 10000000) {
              value = value / 10000 + "万";
            } else if (value >= 10000000) {
              value = value / 10000000 + "千万";
            } else if (value >= 1000 && value < 10000) {
              value = value / 1000 + "千";
            }
            return value;
          }
        },
        splitLine: {
          show: false
        }
        , grid: {
          left: 35
        },
      },
      series: [
        {
          name: '文明指数',
          type: 'line',
          data: wmzsMonth && wmzsMonth.list && wmzsMonth.list.map((item) => {
            return item.value
          }),
          areaStyle: {
            // normal: {
            //   color: '#FD9726' //改变区域颜色
            // }
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: 'rgba(253,151,38,0.5)' },
                  { offset: 1, color: 'rgba(127,76,19,0)' }
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            }
          },
          itemStyle: {
            color: 'rgba(253, 151, 38, 1)'
          },
        }
      ]
    }
    const getOption20 = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{d}%',
        confine: true
      },
      legend: {
        orient: 'vertical',
        left: 5,
        top: 10,
        fontSize: 8,
        itemWidth: 4,             // 图例图形宽度
        itemHeight: 2,            // 图例图形高度
        x: 'left',               // 水平安放位置，默认为全图居中，可选为：
        y: 'top',               // 垂直安放位置，默认为全图顶端，可选为：
        data: aaa && aaa,
        textStyle: {
          color: '#fff',
          fontSize: 10
        },
      },
      color: ['#26B0F8', '#1EC1A8', '#3F6AF5', '#B75EDE', '#FD9726', '#F7693C', '#3D009A', '#7F4C13'],
      series: [
        {
          type: 'pie',
          // stillShowZeroSum :true , 
          minShowLabelAngle: 0.00001,
          avoidLabelOverlap: true,
          radius: ['0%', '50%'],
          center: ['70%', '40%'],
          label: {
            show: true,
            position: 'outside',
            normal: {
              show: false,
              position: 'inner', //标签的位置,
              textStyle: {
                fontSize: 8,
                //文字的字体大小
                fontWeight: 400,

              },
              formatter: '{d}%',
              rotate: true,
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 8,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true,
            length: '0.01rem',
            length: '0.02rem',
          },
          data: hdlxzb
        }
      ]
    };
    return (
      <div className="StreetLeft">
        <div style={{ position: 'relative' }}>
          <div className="pb10">
            <Title titleName="文明指数" />
            {/* <div style={{ position: "absolute", right: '0', top: '0' }}>
              <span className={this.state.tabFlag ? 'tabCheckStyle  tabCheckActive' : 'tabCheckStyle'} onClick={this.toChangeTab}>天</span>
              <span className={(!this.state.tabFlag) ? 'tabCheckStyle  tabCheckActive' : 'tabCheckStyle'} onClick={this.toChangeTab}>月</span>
            </div> */}
          </div>
          <div className="pl10">
            <DataCenterBorder>
              <div className="people-data-box" style={{ height: '2.82rem', overflow: 'hidden' }}>
                {/* { */}
                  {/* // (wmzsDay && wmzsDay.length > 0) || (wmzsMonth && wmzsMonth.length > 0) ? */}
                    <Row style={{ height: '100%' }}>
                      <Col span={24} style={{ height: '100%' }}>
                        {
                          this.state.tabFlag ?
                            <div>

                              {
                                wmzsDay && wmzsDay.list&&wmzsDay.list.length > 0 ?

                                  <ReactEcharts option={getOptionDay2} style={{ height: '2.82rem' }} />
                                  :
                                  <div style={{ lineHeight: '2.82rem', margin: '0 auto', textAlign: 'center' }}>暂无数据</div>

                              }
                            </div>
                            :
                            <div>
                              {
                                wmzsMonth && wmzsMonth.list&&wmzsMonth.list.length > 0 ?

                                  <ReactEcharts option={getOptionMonth} style={{ height: '2.82rem' }} />
                                  :
                                  <div style={{ lineHeight: '2.82rem', margin: '0 auto', textAlign: 'center' }}>暂无数据</div>

                              }
                            </div>

                            // <ReactEcharts option={getOptionMonth} style={{ height: '100%' }} />
                        }
                      </Col>

                    </Row>
                    {/* // : <div style={{ lineHeight: '2.82rem', margin: '0 auto', textAlign: 'center' }}>暂无数据</div> */}

                {/* } */}

              </div>
            </DataCenterBorder>
          </div>
        </div>
        <div style={{ margin: '.08rem 0' }}>
          <div className="pt10 pb10" ><Title titleName="本月文明实践活动统计" /></div>
          <div className="pl10">
            <DataCenterBorder>
              <Row style={{ height: '2.82rem', overflow: 'hidden' }} type='flex'>
                <Col span={11} style={{ height: '100%' }}>
                  <div className='civilizedTotals-title' style={{ marginTop: '0.15rem', marginLeft: '0.1rem' }}>文明实践活动类型占比</div>
                  {
                    hdlxzb && hdlxzb.length > 0 ?
                      <ReactEcharts option={getOption20} style={{ height: '100%' }} />
                      : <div style={{ height: '2.32rem', textAlign: 'center', margin: '0 auto', lineHeight: '2.32rem' }}>暂无数据</div>
                  }
                </Col>
                <Col span={2}>
                  <div style={{ height: '1.79rem', width: '0.01rem', marginTop: '.58rem', border: '0.01rem dashed #31468e ', marginLeft: '0.2rem' }}></div>
                </Col>
                <Col span={11} style={{ height: '100%' }}>
                  <div className='civilizedTotals-title' style={{ marginTop: '0.15rem' }}>热门活动：报名人数TOP6</div>
                  {
                    rmhd && rmhd.length > 0 ?
                      <div style={{  width: '100%', margin: '0.14rem 0 ' }}>
                        {
                          rmhd && rmhd.map((item, index) => {
                            return <div style={{ marginTop: '0.08rem' }} key={index}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                                <div style={{ fontSize: '0.12rem', lineHeight: '0.23rem' }}>{item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name}</div>
                                <div style={{ fontSize: '0.14rem', lineHeight: '0.23rem' }}>{item.count} 人</div>
                              </div>
                              <div style={{ height: '0.04rem', width: '95%', backgroundColor: '#31468E',transform:'scale(1 , 0.8)' }}>
                                <div style={{ width: `${item.value}%`, backgroundColor: '#1EC1A8', height: '0.04rem',transform:'scale(1 , 0.8)' }}></div>
                              </div>
                            </div>
                          })
                        }
                      </div>
                      : <div style={{ height: '2.32rem', textAlign: 'center', margin: '0 auto', lineHeight: '2.32rem' }}>暂无数据</div>

                  }

                </Col>
              </Row>
            </DataCenterBorder>
          </div>
        </div>
        <div>
          <div className="pt10 pb10"><Title titleName="文明治理" /></div>
          <div className="pl10">
            <DataCenterBorder>

              <div style={{ padding: '.10rem', height: '2.52rem', width: '100%' }}>
                {
                  (!(f.length > 0)) ?
                    <div style={{ height: '2.32rem', textAlign: 'center', margin: '0 auto', lineHeight: '2.32rem' }}>暂无数据</div>
                    : <div>
                      {

                        f.length > 5 ?

                          <Carousel autoplay={true} vertical={true} dots={false} autoplaySpeed={2000}  style={{ height: '2.32rem', }} >
                            {
                              f && f.map((item, index) => {
                                return <div key={index} style={{ height: '2.32rem', width: '100%' }}>
                                  <div style={{ height: '0.464rem', display: 'flex', alignItems: 'center', color: '#FFF', borderBottom: '0.01rem dashed #31468E', justifyContent:'space-between'}}>
                                    {/* <div style={{  flex: '0 0 20%', order:-1 ,height: '0.2rem', textAlign: 'center', lineHeight: '0.2rem', fontSize: '0.12rem', backgroundColor: `${item && item.color}` }}>{item && item.typeName.length > 4 ? item && item.typeName.substring(0, 4) + '...' : item && item.typeName}</div> */}
                                    <div style={{  flex: 1, paddingLeft: '0.06rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',fontSize: '0.12rem', }}>
                                      <div style={{ width:'0.78rem',marginRight:'0.15rem', display:'inline-block',height: '0.2rem', textAlign: 'center', lineHeight: '0.2rem', fontSize: '0.12rem', backgroundColor: `${item && item.color}` }}>
                                        {item && item.typeName.length > 4 ? item && item.typeName.substring(0, 3) + '..' : item && item.typeName}</div>
                                      {item && item.content}
                                    </div>
                                    <div style={{ paddingLeft: '0.18rem', fontSize: '.12rem',}}>{item && item.time}</div>
                                  </div>
                                </div>
                              })
                            }
                          </Carousel>
                          :
                          <div>
                            {
                              f && f.map((item, index) => {
                                return <div key={index}>
                                <div style={{ height: '0.464rem', display: 'flex', alignItems: 'center', color: '#FFF', borderBottom: '0.01rem dashed #31468E', justifyContent:'space-between'}}>
                                  {/* <div style={{  flex: '0 0 20%', order:-1 ,height: '0.2rem', textAlign: 'center', lineHeight: '0.2rem', fontSize: '0.12rem', backgroundColor: `${item && item.color}` }}>{item && item.typeName.length > 4 ? item && item.typeName.substring(0, 4) + '...' : item && item.typeName}</div> */}
                                  <div style={{  flex: 1, paddingLeft: '0.06rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',fontSize: '0.12rem', }}>
                                    <div style={{ width:'0.78rem',marginRight:'0.15rem', display:'inline-block',height: '0.2rem', textAlign: 'center', lineHeight: '0.2rem', fontSize: '0.12rem', backgroundColor: `${item && item.color}` }}>
                                      {item && item.typeName.length > 4 ? item && item.typeName.substring(0, 3) + '..' : item && item.typeName}</div>
                                    {item && item.content}
                                  </div>
                                  <div style={{ paddingLeft: '0.18rem', fontSize: '.12rem',}}>{item && item.time}</div>
                                </div>
                              </div>
                                // return <div style={{ height: '0.464rem', display: 'flex', alignItems: 'center', color: '#FFF', borderBottom: '0.01rem dashed #31468E', }}>
                                //   <div style={{ display: 'inline-block', width: '20%', height: '0.2rem', textAlign: 'center', lineHeight: '0.2rem', fontSize: '0.12rem', backgroundColor: `${item && item.color}` }}>{item && item.typeName.length > 4 ? item && item.typeName.substring(0, 4) + '...' : item && item.typeName}</div>
                                //   <div style={{ display: 'inline-block', width: '40%', paddingLeft: '0.06rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                //     {item && item.content}
                                //   </div>
                                //   <div style={{ width: '40%', paddingLeft: '0.18rem', fontSize: '.12rem' }}>{item && item.time}</div>
                                // </div>

                              })
                            }
                          </div>
                      }

                    </div>


                }
                {/* {
                  civilizationGovernance&&civilizationGovernance.length>5?
                  <Carousel autoplay={true} vertical={true} dots={false} autoplaySpeed={2000} style={{ height: '2.32rem', }} >
                  {
                    f && f.map((item, index) => {
                      return <div key={index} style={{ height: '2.32rem', width: '100%' }}>
                        <div style={{ height: '0.46rem', display: 'flex', alignItems: 'center', color: '#FFF', borderBottom: '0.01rem dashed #31468E', }}>
                          <div style={{ display: 'inline-block', width: '20%', height: '0.2rem', textAlign: 'center', lineHeight: '0.2rem', fontSize: '0.12rem', backgroundColor: `${item && item.color}` }}>{item && item.typeName.length > 4 ? item && item.typeName.substring(0, 4) + '...' : item && item.typeName}</div>
                          <div style={{ display: 'inline-block', width: '40%', paddingLeft: '0.06rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                            {item && item.content}
                          </div>
                          <div style={{ width: '40%', paddingLeft: '0.18rem', fontSize: '.12rem' }}>{item && item.time}</div>
                        </div>
                      </div>
                    })
                  }
                </Carousel>
                :<div  style={{ height: '2.32rem', textAlign:'center',margin:'0 auto',lineHeight:'2.32rem'}}>暂无数据</div>
                } */}

              </div>
            </DataCenterBorder>
          </div>
        </div>
      </div>
    );
  }
}

export default StreetLeft;

