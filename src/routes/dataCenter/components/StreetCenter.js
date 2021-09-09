import React from 'react';
import { Row, Col, Rate } from 'antd';
import DataCenterBorder from './DataCenterBorder.js'; //DataCenterBorder
// import DataCenterMap from './DataCenterMap.js'; //DataCenterMap
import DataCenterMap from './DataCenterMap.js'; 
import './StreetCenter.less'
import pubIcon from './../images/publish.png'
import subIcon from './../images/submit.png'
import acIcon from './../images/active.png'

class StreetCenter extends React.Component {
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
    let { adc = {}, activeVolunteer = {},  mapData = {}, areaList = [], colorList, mapDataJSON = {}, messIndex, mapMessage = [], areaName, mapList, mapIndex, centerArea, showLun, handleChange } = this.props
    let { centerPlace = {} } = mapData;
    /** 大屏地图 */
    let dataCenterMapProps = {
      mapData,
      mapDataJSON,
      areaName,
      centerArea,
      areaList,
      colorList,
      handleChange
    };
    let communityId = sessionStorage.getItem('communityId')
    return (
      <div className="StreetCenter" style={{ height: '100%' }}>
        <div className="am-flexbox" style={{ height: '10%' }}>
          <div className="am-flexbox-item">
            <Row type="flex" justify="space-between" style={{ display: 'flex' }}>
              <Col className="base-data-list">
                <DataCenterBorder>
                  <Row className="base-data-main" type="flex" align="middle">
                    <Col className="base-data-right">
                      <div className="name">志愿者总数 (人)</div>
                      <div className="num-box"><span className="num">{adc.volunteerCount || 0}</span></div>
                    </Col>
                  </Row>
                </DataCenterBorder>
              </Col>
              <Col className="base-data-list">
                <DataCenterBorder>
                  <Row className="base-data-main" type="flex" align="middle">
                    <Col className="base-data-right">
                      <div className="name">志愿队伍总数 (支)</div>
                      <div className="num-box"><span className="num">{adc.teamCount || 0}</span></div>
                    </Col>
                  </Row>
                </DataCenterBorder>
              </Col>
              <Col className="base-data-list">
                <DataCenterBorder>
                  <Row className="base-data-main" type="flex" align="middle">
                    <Col className="base-data-right">
                      <div className="name">发布志愿活动总数 (次)</div>
                      <div className="num-box"><span className="num">{adc.activityCount || 0}</span></div>
                    </Col>
                  </Row>
                </DataCenterBorder>
              </Col>
              <Col className="base-data-list">
                <DataCenterBorder>
                  <Row className="base-data-main" type="flex" align="middle">
                    <Col className="base-data-right">
                      <div className="name">发布秀文明总数 (条)</div>
                      <div className="num-box"><span className="num">{adc.civiCount || 0}</span></div>
                    </Col>
                  </Row>
                </DataCenterBorder>
              </Col>
            </Row>
          </div>
        </div>
        {/* 区级地图 */}
        <div className="center-map" style={{display: areaName=='钱塘新区'||areaName=='西湖名胜风景区'||areaName=='西湖风景名胜区'||areaName=='拱墅区'?'block':'none'}}>
          {areaName=='钱塘新区'&&<div style={{ position: 'absolute', left: '15%', top: '50%', width: '70%',transform:'translateY(-50%)'}}><img src={mapList[mapIndex] && mapList[mapIndex].image || require('../images/qt-bg.png')} className="map-img" style={{width:'100%'}} /><p style={{ fontSize:'14px', position: 'absolute', left: '50%', top: '50%', transform:'translate(-50%, -55%)'}}>钱塘新区</p></div>}
          {(areaName=='西湖风景名胜区'||areaName=='西湖名胜风景区')&&<div style={{ position: 'absolute', left: '15%', top: '50%', width: '70%',transform:'translateY(-50%)'}}><img src={mapList[mapIndex] && mapList[mapIndex].image || require('../images/xi-bg.png')} className="map-img" style={{width:'100%'}}/><p style={{ fontSize:'14px', position: 'absolute', left: '50%', top: '50%', transform:'translate(-50%)'}}>西湖风景名胜区</p></div>}
          {areaName=='拱墅区'&&<img src={mapList[mapIndex] && mapList[mapIndex].image || require('../images/map-bg.png')} className="map-img" style={{ position: 'absolute', left: '15%', top: '50%', width: '70%',transform:'translateY(-50%)'}} />}
          {
            showLun&&mapList.length>0 && centerPlace.name && <div className={`street-info`}>
              <div className="street-name"><img src={require('../images/location.png')} style={{ width: '.24rem', height: '.24rem', marginRight: '8px' }} />{centerPlace.name || ''}</div>
              <div>文明指数：<span><Rate value={Number(centerPlace.level)||2} style={{fontSize:'13px'}}/></span></div>
              {/* <div>秀文明发布数：<span>{centerPlace.civiCount || '0'}</span></div> */}
              <div>志愿者数：<span>{centerPlace.volunteerCount || '0'}</span></div>
              <div>志愿队伍数：<span>{centerPlace.teamCount || '0'}</span></div>
              <div>活动总数：<span>{centerPlace.activityCount || '0'}</span></div>
            </div>
          }
          <div className="active-num">
            <div className="active-tit">活跃志愿者</div>
            <div className="num-box">
              <div className="num-name">今日</div>
              <div className="num-value"><span>{activeVolunteer.today || 0}</span>人</div>
            </div>
            {/* <div className="num-box">
              <div className="num-name">最近7天</div>
              <div className="num-value"><span>{activeVolunteer.weekday || 0}</span>人</div>
            </div>
            <div className="num-box">
              <div className="num-name">最近30天</div>
              <div className="num-value"><span>{activeVolunteer.monthday || 0}</span>人</div>
            </div> */}
          </div>
          {areaName!='钱塘新区' && areaName!='西湖名胜风景区' && areaName!='西湖风景名胜区' && areaName!='拱墅区'?
          <div className="index-color-box">
            <div className="color-list"><span className="color color-1"></span>120&lt;=文明指数&lt;=150</div>
            <div className="color-list"><span className="color color-2"></span>100&lt;=文明指数&lt;120</div>
            <div className="color-list"><span className="color color-3"></span>30&lt;=文明指数&lt;100</div>
            <div className="color-list"><span className="color color-4"></span>文明指数&lt;30</div>
          </div> : ''}
          <div>
            {
              mapMessage.length ? mapMessage.map((item, index) => {
                return <div key={index} className={`mess-pisition location${index % 10} ${index == messIndex ? 'showAc' : 'hideAc'}` } >
                  <img src={item.type == 4 ? acIcon : item.type == 2 ? subIcon : pubIcon} style={{ width: '.24rem', height: '.24rem', marginRight: '8px' }} />
                  <span>{item.content}</span>
                </div>
              }) : null
            }
          </div>
        </div>
        {/* 市级地图 */}
        <div className="center-map" style={{display: areaName!='钱塘新区'&&areaName!='西湖名胜风景区'&&areaName!='西湖风景名胜区'&&areaName!='拱墅区'?'block':'none'}}>
          <div className="active-num">
            <div className="active-tit">活跃志愿者</div>
            <div className="num-box">
              <div className="num-name">今日</div>
              <div className="num-value"><span>{activeVolunteer.today || 0}</span>人</div>
            </div>
          </div>
          {
            showLun && centerPlace && centerPlace.name&&<div className={`street-info`}>
              <div className="street-name"><img src={require('../images/location.png')} style={{ width: '.24rem', height: '.24rem', marginRight: '8px' }} />{centerPlace.name || ''}</div>
              <div>文明指数：<span><Rate value={Number(centerPlace.level)||2} style={{fontSize:'13px'}}/></span></div>
              {communityId=='0'&&<div>秀文明发布数：<span>{centerPlace.civiCount || '0'}</span></div>}
              <div>志愿者数：<span>{centerPlace.volunteerCount || '0'}</span></div>
              <div>志愿队伍数：<span>{centerPlace.teamCount || '0'}</span></div>
              <div>活动总数：<span>{centerPlace.activityCount || '0'}</span></div>
            </div>
          }
          {areaName!='钱塘新区' && areaName!='西湖名胜风景区' && areaName!='西湖风景名胜区' && areaName!='拱墅区'?
          <div className="index-color-box">
            <div className="color-list"><span className="color color-1"></span>120&lt;=文明指数&lt;=150</div>
            <div className="color-list"><span className="color color-2"></span>100&lt;=文明指数&lt;120</div>
            <div className="color-list"><span className="color color-3"></span>30&lt;=文明指数&lt;100</div>
            <div className="color-list"><span className="color color-4"></span>文明指数&lt;30</div>
          </div> : ''}
          <DataCenterMap {...dataCenterMapProps}/>
          <div>
            {
              mapMessage.length ? mapMessage.map((item, index) => {
                return <div key={index} className={`mess-pisition location${index % 10} ${index == messIndex ? 'showAc' : 'hideAc'}` } >
                  <img src={item.type == 4 ? acIcon : item.type == 2 ? subIcon : pubIcon} style={{ width: '.24rem', height: '.24rem', marginRight: '8px' }} />
                  <span>{item.content}</span>
                </div>
              }) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default StreetCenter;

