import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Rate, Carousel } from 'antd';
import DataCenterBorder from './DataCenterBorder.js'; //DataCenterBorder
import './DataCenterMap.less';
import jiande from "../../dataCenter/components/jdxzj.json";
import fjjh from "../../dataCenter/components/fjjh.json";
import BroadCast from '../images/first.png'
import CulturalVenues from '../images/CulturalVenues.png'
let map, infoWindow, that, mass
import path from './data'
import linpin from "./linpin.json"
import demoData from './demoData'
let areaCode = [330102, 330103, 330104, 330105, 330106, 330108, 330109, 330110, 330111, 330185, 330122, 330127, 330182, 330155, 330150]
let areaName = ['上城区', '下城区', '江干区', '拱墅区', '西湖区', '滨江区', '萧山区', '余杭区', '富阳区', '临安区', '桐庐县', '淳安县', '建德市', '钱塘新区', '西湖景区'];
/**
 * 地图组件
 */
//文化场馆  创建全局的创建addMarker  用来移除创建addMarker的时候用
let addVenueMarker = []
//事件播报  创建全局的创建addBroadcast  用来移除创建addBroadcast的时候用
let addBroadcast = []

class DataCenterMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventNavList: [{
        name: '文化场馆',
        id: 1,
        checked: false
      }, {
        name: '事件播报',
        id: 2,
        checked: false
      }],
      checkedList: [],
      communityId: props.communityId,
      showCore: true,
      nextList: [],
      zoom: 9,
      center: [],
      // center: [119.5379162010498, 29.89432870761689],
      civilizationGovernance: [],
      evenBroadList: [],
      venueList: [],
      ranNumber: '',
    };
    that = this
    that.openInfo = this.openInfo.bind(this)
  }
  componentDidMount() {
    map = new window.AMap.Map('container', {
      zoom: 9,
    });
    map.setMapStyle('amap://styles/a96dc9741796d4acdcf35b3154b07ef7');
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps)
    // console.log('_th.props', this.props)
    let _th = this
    if (_th.props != nextProps) {
      // console.log('nextProps2', nextProps)
      // console.log('nextProps3', _th.props)
      _th.setState({
        mapDataJSON: nextProps.mapDataJSON,
        areaName: nextProps.areaName,
        communityId: nextProps.communityId,
        nextList: nextProps.nextList,
        evenBroadList: nextProps.oneMinute.evenBroadList || [],
        venueList: nextProps.oneHour.venueList || [],
        evenBroadUpdateTime: nextProps.evenBroadUpdateTime,
        showCore: true,
        screenCity: nextProps.screenCity
      })
    }

    if (_th.props.mapDataJSON != nextProps.mapDataJSON) {
      // 当地图数据发生改变时才区重新绘制地图
      _th.setState({
        screenCity: nextProps.screenCity,
        mapDataJSON: nextProps.mapDataJSON,
        areaName: nextProps.areaName,
        communityId: nextProps.communityId,
        showCore: true,
      }, () => {
        _th.closeVenues()
        _th.clearPolygon()
        let location = window.location
        let hostname = location.hostname

        if (hostname == 'localhost' || hostname == 'wmdn-pre.zje.com') {
          if (this.state.communityId == 0) {
            _th.getLocation(nextProps.screenCity)
          } else if (this.state.communityId == 8) {
            //建德
            _th.jianDe()
          } else if (this.state.communityId == 21) {
            _th.restWestLake()
          } else if (this.state.communityId == 20) {
            _th.qianTang()
          } else if (this.state.communityId == 16) {
            // 市直属
            _th.getLocation(nextProps.screenCity)
          } else {
            // 除了特定区县外的区县
            _th.resetMap(this.state.communityId)
          }
        } else {
          if (this.state.communityId == 0) {
            _th.getLocation(nextProps.screenCity)
          } else if (this.state.communityId == 16) {
            //建德
            _th.jianDe()
          } else if (this.state.communityId == 21) {
            _th.restWestLake()
          } else if (this.state.communityId == 22) {
            _th.qianTang()
          } else if (this.state.communityId == 29) {
            _th.addCity()
          } else {
            // 除了特定区县外的区县
            _th.resetMap(this.state.communityId)
          }
        }

      })
    }
    /** 临平和余杭切换 */
    if(nextProps.screenCity == '浙江省杭州市' && nextProps.communityId == 7){
      if (this.props.cityLp != nextProps.cityLp) {
        this.setState({
          screenCity: nextProps.screenCity,
          mapDataJSON: nextProps.mapDataJSON,
          areaName: nextProps.areaName,
          communityId: nextProps.communityId,
          showCore: true,
        },()=>{
          this.closeVenues()
          this.clearPolygon()
          if(nextProps.cityLp){//临平
            this.LinPing();
          }else{//余杭
            this.resetMap(7)
          }
        });
      }
    }
  }

  //逆编码 根据文字查询地理位置经纬度信息
  getLocation = (address) => {
    let that = this
    if (address == '浙江省杭州市') {
      that.setState({
        center: [119.5379162010498, 29.89432870761689],
      }, () => {
        that.initMap()
      })
    } else {
      // eslint-disable-next-line no-undef
      AMap.plugin('AMap.Geocoder', function () {
        let geocoder = new AMap.Geocoder({
          city: '35'
        })
        geocoder.getLocation(address, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            let location = result.geocodes[0].location
            // result中对应详细地理坐标信息
            that.setState({
              center: [location.lng, location.lat]
            }, () => {
              that.initMap()
            })
          }
        })
      })
    }
  }

  // 清除文化场馆和事件播报方法
  closeVenues = () => {
    if (mass) {
      mass.clear()
    }
    this.setState({

      checkedList: [],
      eventNavList: [{
        name: '文化场馆',
        id: 1,
        checked: false
      }, {
        name: '事件播报',
        id: 2,
        checked: false
      }],
    })
    this.clearInfoWindow()
    map.remove(addBroadcast);
  }

  // 地图初始化的方法
  initMap = () => {
    let { mapDataJSON, communityId, center } = this.state
    let { features = [] } = mapDataJSON;
    features.map((item1, index1) => {
      if (item1.geometry.coordinates) {
        let data = item1.geometry.coordinates
        this.addPolygon(data, item1, index1)
        map.setCenter(center)
      }
    });
    this.setState({
      showCore: true
    })
  }

  addCity() {
    let areaCode = [330102, 330103, 330104, 330105, 330106, 330108, 330109, 330110, 330111, 330185, 330122, 330127, 330182, 330155, 330150]
    path.map((item, index) => {
      this.draw(item, index, areaCode[index])
    })
  }

  draw = (data, index, areaCode) => {
    const { center, zoom } = this.state
    let polygon = new AMap.Polygon({
      path: data,
      fillColor: '#18967C',
      strokeOpacity: 1,
      fillOpacity: 0.3,
      strokeColor: '#7EB6FF',
      strokeWeight: 1,
      strokeDasharray: [5, 5],
    });
    map.add(polygon);
    map.setCenter(center)
    map.setZoom(zoom)
  }


  // 关于各个区县地图重画
  resetMap = (e) => {
    let { mapDataJSON, communityId } = this.state
    let { features = [] } = mapDataJSON;
    let location = window.location
    let hostname = location.hostname

    features.map((item1, index1) => {
      if (item1.geometry.coordinates) {
        let data = item1.geometry.coordinates
        this.addPolygonOther(data)
        map.setCenter(item1.properties.center)
      }
    });

    if (hostname == 'localhost' || hostname == 'wmdn-pre.zje.com') {//测试环境
      if (e == 20 || e == 2 || e == 10 || e == 19 || e == 18 || e == 22) {
        // 钱塘新区  余杭 富阳  萧山  临安 淳安
        map.setZoom(10)
      } else if (e == 3 || e == 13 || e == 15 || e == 17) {
        //上城区 下城区 拱墅、滨江
        map.setZoom(12)
      } else if (e == 1 || e == 9) {
        // 江干区 西湖区
        map.setZoom(11)
      }

    } else {
      if (e == 6 || e == 5) {
        // 江干  西湖区
        map.setZoom(11)
      } else if (e == 22 || e == 7 || e == 15 || e == 13 || e == 9 || e == 14) {
        // 钱塘新区  余杭 富阳  萧山 桐庐、临安
        map.setZoom(10)
      } else if (e == 8 || e == 10 || e == 1 || e == 11) {
        //上城区  下城区、拱墅 滨江
        map.setZoom(12)
      }

    }
  }

  // 西湖风景区 
  restWestLake = () => {
    // console.log('西湖风景区', fjjh)
    let westLake = fjjh && fjjh.features || []
    westLake.map((item1, index1) => {
      if (item1.attributes.FID == 7) {
        let data = item1.geometry.rings
        this.addPolygonOther(data)
        map.setZoomAndCenter(13, [item1.attributes.x, item1.attributes.y])
      }
    });
  }
  // 钱塘新区 
  qianTang = () => {
    // console.log('钱塘新区', fjjh.features)
    let qianTang = fjjh && fjjh.features || []
    qianTang.map((item1, index1) => {
      if (item1.attributes.FID == 2) {
        let data = item1.geometry.rings
        this.addPolygonOther(data)
        map.setZoomAndCenter(10.5, [item1.attributes.x, item1.attributes.y])
      }
      if (item1.attributes.FID == 13) {
        let data = item1.geometry.rings
        this.addPolygonOther(data)
      }
    })
  }
  //建德
  jianDe = () => {
    let { features } = jiande
    features.map((item1, index1) => {
      if (item1.geometry.coordinates && item1.geometry.coordinates.length == 1) {
        let data = item1.geometry.coordinates
        this.addPolygonStree(data)
        map.setZoomAndCenter(9.5, [119.279089, 29.472284]);
      } else {
        item1.geometry.coordinates.map((item2, index2) => {
          let data = item2
          this.addPolygonStree(data)
          // map.setZoomAndCenter(11, item1.properties.center);
        });
      }
    });
  }
  // 临平
  LinPing = () => {
    let { coords } = linpin;
    let baseArray = coords.split(';');
    let len = baseArray.length;
    let n = 2; //假设每行显示2个
    let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
    let res = [];
    for (let i = 0; i < lineNum; i++) {
      // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
      let temp = baseArray.slice(i*n, i*n+n);
      res.push(temp);
    }
    let data =[[res]]
    this.addPolygonOther(data)
    map.setZoomAndCenter(11, [120.169223,30.453302])
  }
  // 获取地图信息 清除原有描边路径
  clearPolygon() {
    map.getAllOverlays('polygon');
    let polygonLine = map.getAllOverlays('polygon');
    map.remove(polygonLine)
  }

  // 有街道的区县描边
  addPolygonStree = (data, index) => {
    let polygon = new AMap.Polygon({
      path: data,
      fillColor: '#18967C',
      strokeOpacity: 1,
      fillOpacity: 0.3,
      strokeColor: '#7EB6FF',
      strokeWeight: 1,
      strokeDasharray: [5, 5],
    });
    map.add(polygon);
    polygon.on('mouseover', () => {
      polygon.setOptions({
        fillOpacity: 1,
        fillColor: '#18C7A3'
      })
    })
    polygon.on('mouseout', () => {
      polygon.setOptions({
        fillOpacity: 0.3,
        fillColor: '#18967C'
      })
    })
    let restCenter = map.getCenter();
    map.setCenter(restCenter); //设置地图中心点
  }

  // 其它区县描边
  addPolygonOther = (data, index) => {
    let polygon = new AMap.Polygon({
      path: data,
      fillColor: '#18967C',
      strokeOpacity: 1,
      fillOpacity: 0.3,
      strokeColor: '#7EB6FF',
      strokeWeight: 4,
      strokeDasharray: [5, 5],
    });
    map.add(polygon);
    let restCenter = map.getCenter();
    map.setCenter(restCenter); //设置地图中心点
  }

  // 市级地图描边
  addPolygon = (data, index, areaCode) => {
    const { center, zoom } = this.state
    let polygon = new AMap.Polygon({
      path: data,
      fillColor: '#18967C',
      strokeOpacity: 1,
      fillOpacity: 0.3,
      strokeColor: '#7EB6FF',
      strokeWeight: 1,
      strokeDasharray: [5, 5],
    });
    polygon.on('mouseover', () => {
      polygon.setOptions({
        fillOpacity: 1,
        fillColor: '#18C7A3'
      })
      this.setState({
        showCore: false,
        areaCode: index.properties.adcode,
        areaName1: index.properties.name,
      })
    })
    polygon.on('mouseout', () => {
      polygon.setOptions({
        fillOpacity: 0.3,
        fillColor: '#18967C'
      })
      this.setState({
        areaCode: '',
        showCore: true,
        areaName1: '',
      })
    })
    map.add(polygon);
    map.setCenter(center)
    map.setZoom(zoom)
  }


  //点击地图点标记的触发的信息体弹窗
  openInfo = (data, lng, lat, id) => {
    //构建信息窗体中显示的内容
    let info = [];
    if (id == 1) {
      // 文化场馆的内容
      info.push(`
        <div class="bg-class" style="background: #041134; width: 3rem;height: 0.7rem;color: #fff;padding: 0.15rem;">
         <div style="display: flex;">
         <div  style="color: #8DABFF;font-size: 0.12rem;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">${data.centerName || '-'}</div>
          <div style="font-size: 0.12rem; color:#fff; padding: 0 0.05rem">|</div>
            <div style="width:2rem;color: #8DABFF;font-size: 0.12rem;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; padding-right:0.1rem;">${data.venueName || '-'}</div>
          </div>
         <div class="address" style="font-size: 0.14rem;font-weight: 400;line-height: 0.19rem; color: #FFFFFF;opacity: 1; padding: 0.05rem;text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" >${data.typeName || '-'}</div>
        </div>`)
      //信息窗
      infoWindow = new window.AMap.InfoWindow({
        // isCustom: true,
        offset: new window.AMap.Pixel(110, 10),
        anchor: 'none',
        content: info.join("") //使用默认信息窗体框样式，显示信息内容
      });
      // infoWindow.setAnchor('top-left')
      infoWindow.open(map, [lng, lat]);
    }
  }
  // 清除信息弹窗
  clearInfoWindow() {
    map.clearInfoWindow()
  }

  // 点击文化场馆或者事件播报出现的icon
  getVenue(id) {
    // eslint-disable-next-line no-console
    console.log(id, 'id')
    let { Venue, evenBroadList, mockList, venueList } = this.state
    console.log('this.state', this.state)
    let icon = new window.AMap.Icon({
      size: new window.AMap.Size(30, 30),
      image: id == 1 ? CulturalVenues : BroadCast,
      imageSize: new window.AMap.Size(30, 30)
    });

    if (id == 1) {
      // 下面是海量点添加
      let style = [{
        url: CulturalVenues,
        anchor: new window.AMap.Pixel(6, 6),
        size: new window.AMap.Size(20, 20)
      }];
      let arr = []
      if (venueList && venueList.length > 0) {
        venueList && venueList.length && venueList.map((item, index) => {
          if (item.lng && item.lat) {
            arr.push({
              lnglat: [item.lng && item.lng, item.lat && item.lat],
              typeName: item.typeName || '-',
              venueName: item.venueName || '-',
              centerName: item.centerName || '-'
            })

          }
        })
      } else {
        arr = []
      }

      if (arr.length == 0) {
        mass = new window.AMap.MassMarks([], {
          opacity: 0.8,
          zIndex: 111,
          cursor: 'pointer',
          style: style
        });
      } else {
        mass = new window.AMap.MassMarks(arr, {
          opacity: 0.8,
          zIndex: 111,
          cursor: 'pointer',
          style: style
        });
      }

      mass.on('click', function (e) {
        const { data } = e
        console.log('data', data)
        that.openInfo(data, data.lnglat.lng, data.lnglat.lat, id)
      });

      mass.setMap(map);

    } else if (id == 2) {
      console.log('evenBroadList', evenBroadList)
      // Broadcast是模拟的事件播报的数据
      evenBroadList.map((item, index) => {
        console.log('index', index)
        let scale = 1
        // 点标记显示内容，HTML要素字符串
        let markerContent = `<div class="dot marker${index + 1}" style="position:absolute;transform-origin: 0 0;>
          <div style="color:#fff;">
           <div style="width:2rem;white-space: nowrap; overflow:hidden;text-overflow:ellipsis;font-size: .16rem;padding-top:0.1rem;padding-left:0.3rem">${item.typeMsg}</div>
           <div style="width:2rem;white-space: nowrap; overflow:hidden;text-overflow:ellipsis;font-size: .14rem;padding-left:0.3rem">志愿者:${item.volunteerName}</div>
            <div style="width:2rem;white-space: nowrap; overflow:hidden;text-overflow:ellipsis;font-size: .14rem;padding-left:0.3rem">活动:${item.activityName}</div>
            <div style="width:2rem;white-space: nowrap; overflow:hidden;text-overflow:ellipsis;font-size: .14rem;padding-left:0.3rem">组织:${item.address}</div>
          </div>
        </div>`;

        // 创建addMarker2 添加多个文化场馆icon
        console.log('item', item)
        let addMarker2 = new window.AMap.Marker({
          map: map,
          position: [item.lon, item.lat],
          icon: icon,
          extData: item,
          content: markerContent,
          offset: new AMap.Pixel(-10, -10),
          anchor: 'bottom-left', // 设置锚点方位
        });
        //把创建addMarker1添加进去地图
        addBroadcast.push(addMarker2);
      })
    }
  }

  // 清除icon
  removeIcon(id) {
    if (id == 1) {
      // map.remove(addVenueMarker);
      mass.hide()
      mass.clear()

    } else if (id == 2) {
      map.remove(addBroadcast);
    }
  }

  clearMap() {
    // 清除地图上所有的覆盖物
    map.clearMap();
  }

  // 选择 文化场馆、事件播报、签到热力图的展示的选择方法
  tabChange(item, index) {
    item.checked = !item.checked;
    let newCheckedList = this.state.checkedList;
    newCheckedList[index] = item;
    this.setState({
      checkedList: newCheckedList
    }, () => {
      let { checkedList } = this.state
      checkedList.length && checkedList.forEach((item) => {
        if (item.id == 1 && index == 0) {
          if (item.checked == true) {
            // 生成文化场馆
            this.getVenue(item.id)
          } else {
            //移除icon
            this.removeIcon(item.id)
          }
        } else if (item.id == 2 && index == 1) {
          if (item.checked == true) {
            // 生成事件播报
            this.getVenue(item.id)
          } else {
            //移除icon
            this.removeIcon(item.id)
          }
        }
      })
    }
    )
  }

  render() {
    let { eventNavList, areaName1, areaCode, showCore } = this.state;
    let { areaName, nextList, communityId, evenBroadUpdateTime } = this.props
    return (
      <div className="DataCenterMap" style={{ height: '100%', width: '100%' }}>
        <div id="container" className="DataCenterMap" style={{ height: '100%', width: '100%' }}></div>
        <div style={{ width: '3.08rem', position: 'absolute', left: '22.0%', top: '2.4rem', zIndex: '99', color: '#fff', padding: '.2rem 0 0 .24rem' }}>
          {
            showCore == true ?
              <Carousel dots={false} autoplay effect="fade" autoplaySpeed={4000}>
                {nextList && nextList.length > 0 ? nextList.map((item, index) => {
                  return <div key={index} style={{ color: '#fff' }}>
                    <DataCenterBorder bgType="6">
                      <div style={{ height: '1.53rem', overflow: 'hidden' }}>
                        <div className="civilization-time-box" style={{ color: '#fff' }}>
                          <div className="name" style={{ display: "flex" }}><img style={{ width: '.3rem', height: '.25rem', paddingRight: ' 0.08rem' }} className="volunteer-logo" src={require("../images/volunteer-logo.png")} />{item.name || '-'}</div>
                          <div className="rate-box">
                            <Rate className="rate" disabled value={item.wmzs} />
                          </div>
                          <div className="civilization-time">活动文明时长：{item.hdwmsc || '0'}</div>
                        </div>
                      </div>
                    </DataCenterBorder>
                    <div style={{ paddingTop: '.12rem' }}>
                      <DataCenterBorder bgType="7">
                        <div style={{ height: communityId == 0 ? '3.45rem' : '3rem', overflow: 'hidden' }}>
                          <div className="info-box" style={{ color: '#fff' }}>
                            {
                              communityId == 0 ? <div className="info-list"><span className="point point-1"></span>新时代文明实践所：{item.nextNum || '0'}</div> : <div className="info-list"><span className="point point-1"></span>新时代文明实践站：{item.nextNum || '0'}</div>
                            }
                            <div className="info-list"><span className="point point-2"></span>志愿者：{item.volunteer || '0'}</div>
                            <div className="info-list"><span className="point point-3"></span>志愿队伍：{item.team || '0'}</div>
                            <div className="info-list"><span className="point point-4"></span>发布活动：{item.activity || '0'}</div>
                            <div className="info-list"><span className="point point-5"></span>发布秀文明：{item.civilization || '0'}</div>
                            {
                              communityId == 0 ? <div className="info-list"><span className="point point-6"></span>文化馆场：{item.venue || '0'}</div> : ''
                            }
                          </div>
                        </div>
                      </DataCenterBorder>
                    </div>
                  </div>
                }) : ''
                }
              </Carousel>
              : <div style={{ color: '#fff' }}>
                {nextList && nextList.length > 0 && nextList.map((item, index) => {
                  return item.areaCode == areaCode ? <div key={index} >
                    <DataCenterBorder bgType="6">
                      <div style={{ height: '1.53rem', overflow: 'hidden' }}>
                        <div className="civilization-time-box" style={{ color: '#fff' }}>
                          <div className="name" style={{ display: "flex" }}><img style={{ width: '.3rem', height: '.25rem', paddingRight: ' 0.08rem' }} className="volunteer-logo" src={require("../images/volunteer-logo.png")} />{areaName1 || '-'}文明实践中心 </div>
                          <div className="rate-box">
                            <Rate className="rate" disabled value={item.wmzs} />
                          </div>
                          <div className="civilization-time">活动文明时长：{item.hdwmsc || '0'}</div>
                        </div>
                      </div>
                    </DataCenterBorder>
                    <div style={{ paddingTop: '.12rem' }}>
                      <DataCenterBorder bgType="7">
                        <div style={{ height: communityId == 0 ? '3.45rem' : '3rem', overflow: 'hidden' }}>
                          <div className="info-box" style={{ color: '#fff' }}>
                            <div className="info-list"><span className="point point-1"></span>新时代文明实践所：{item.nextNum || '0'}</div>
                            <div className="info-list"><span className="point point-2"></span>志愿者：{item.volunteer || '0'}</div>
                            <div className="info-list"><span className="point point-3"></span>志愿队伍：{item.team || '0'}</div>
                            <div className="info-list"><span className="point point-4"></span>发布活动：{item.activity || '0'}</div>
                            <div className="info-list"><span className="point point-5"></span>发布秀文明：{item.civilization || '0'}</div>
                            {
                              communityId == 0 ? <div className="info-list"><span className="point point-6"></span>文化馆场：{item.venue || '0'}</div> : ''
                            }
                          </div>
                        </div>
                      </DataCenterBorder>
                    </div>
                  </div> : ''

                })
                }
              </div>}
        </div>
        <div style={{ position: 'absolute', right: '20.2%', bottom: '.24rem', paddingRight: '.24rem' }}>
          <Row className="event-nav" type="flex" justify="end">
            {eventNavList.map((item, index) => {
              return <Col className={item.checked == true ? "event-list actives" : "event-list"}
                key={index} onClick={this.tabChange.bind(this, item, index)}>
                <div className="event-icon"></div>{item.name}</Col>
            })}
          </Row>
          {
            communityId == 0 ? <div className="update-time">{evenBroadUpdateTime || '-'}更新</div> : ''
          }
        </div>
      </div >
    );
  }
}

export default DataCenterMap;