import React from 'react';
import { Row, Col } from 'antd';
import './DataCenterModal.less'
import DataRank from './DataRank.js';
import arrow from '../images/arrow.png'
import first from '../images/first.png'
import second from '../images/second.png'
import third from '../images/third.png'
import fourth from '../images/fourth.png'
import fifth from '../images/fifth.png'

/**
 * 弹出框
 */

class DataCenterModal extends React.Component {
  constructor(props) {
    // eslint-disable-next-line no-console
    console.log('11111111props', props)
    super(props);
    this.state = {
      modalType: ''
    };
  }

  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {

  }

  render() {
    let { modalType, styleList = [], applyList, hotList, rollTotal, rollMonth, communityId } = this.props
    let newList = styleList.slice(0, 5)
    let { center, league, place, station, team, volunteer } = rollMonth
    let centerTotal = rollTotal.center || []
    let leagueTotal = rollTotal.league || []
    let placeTotal = rollTotal.place || []
    let stationTotal = rollTotal.station || []
    let teamTotal = rollTotal.team || []
    let volunteerTotal = rollTotal.volunteer || []


    return (
      <div className="DataCenterModal">
        {modalType == 1 ? <div className="DataCenterCont">
          <div className="modaltitle">
            <div>文明时长（本月）排行专题</div>
            <div className="backCockpit" onClick={() => { this.props.getFun() }}>返回驾驶舱 <img src={arrow} style={{ width: '0.18rem' }}></img></div>
          </div>
          <div className="all-modular">
            <div className="modular">
              <div className="modular-title">{communityId == 0 ? '新时代文明实践中心Top5' : '新时代文明实践站Top5'}</div>
              <DataRank dataList={communityId == 0 ? center : station}></DataRank>
            </div>
            <div className="modular">
              <div className="modular-title">新时代文明实践所Top5</div>
              <DataRank dataList={place}></DataRank>
            </div>
            <div className="modular">
              <div className="modular-title">志愿联盟Top5</div>
              <DataRank dataList={league}></DataRank>
            </div>
          </div>
          <div className="second-modular">
            <div className="modular modular1 ">
              <div className="modular-title">志愿队伍Top5</div>
              <DataRank dataList={team}></DataRank>
            </div>
            <div className="modular modular2">
              <div className="modular-title">志愿者Top5</div>
              <DataRank dataList={volunteer}></DataRank>
            </div>
          </div>
        </div> : modalType == 2 ? <div className="DataCenterCont">
          <div className="modaltitle">
            <div>文明时长(累计)排行专题</div>
            <div className="backCockpit" onClick={() => { this.props.getFun() }}> 返回驾驶舱 <img src={arrow} style={{ width: '0.18rem' }}></img></div>
          </div>
          <div className="all-modular">
            <div className="modular">
              <div className="modular-title">{communityId == 0 ? '新时代文明实践中心Top5' : '新时代文明实践站Top5'}</div>
              <DataRank dataList={communityId == 0 ? centerTotal : stationTotal}></DataRank>
            </div>
            <div className="modular">
              <div className="modular-title">新时代文明实践所Top5</div>
              <DataRank dataList={placeTotal}></DataRank>
            </div>
            <div className="modular">
              <div className="modular-title">志愿联盟Top5</div>
              <DataRank dataList={leagueTotal}></DataRank>
            </div>
          </div>
          <div className="second-modular">
            <div className="modular modular1 ">
              <div className="modular-title">志愿队伍Top5</div>
              <DataRank dataList={teamTotal}></DataRank>
            </div>
            <div className="modular modular2">
              <div className="modular-title">志愿者Top5</div>
              <DataRank dataList={volunteerTotal}></DataRank>
            </div>
          </div>

        </div> : <div className="DataCenterCont">
              <div className="modaltitle">
                <div>活动排行专题</div>
                <div className="backCockpit" onClick={() => { this.props.getFun() }}>返回驾驶舱 <img src={arrow} style={{ width: '0.18rem' }}></img></div>
              </div>
              <div className="all-modular" style={{ marginTop: '-0.3rem' }}>
                <div className="modular">
                  <div className="modular-title">上月活动类型按发布数Top5</div>
                  <DataRank dataList={newList}></DataRank>
                </div>
                <div className="modular">
                  <div className="modular-title">上月活动类型按报名人数Top5</div>
                  <DataRank dataList={applyList}></DataRank>
                </div>
              </div>
              <div className="all-modular" style={{ marginTop: '-0.3rem' }}>
                <div className="modular  ">
                  <div className="modular-title">本月热门活动Top5</div>
                  <DataRank dataList={hotList}></DataRank>
                </div>
                <div className="modular ">
                  <div className="modular-title">上月活动类型占比Top5</div>
                  {newList && newList.length > 0 ? newList && newList.length > 0 && newList.map((item, index) => {
                    return <div key={index}>
                      <div className={index == 1 || index == 3 ? "rank" : "rank-opacity"} >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={index == 0 ? first : index == 1 ? second : index == 2 ? third : index == 3 ? fourth : index == 4 ? fifth : ""}></img>
                          <div style={{ marginLeft: '0.16rem' }}>{item.name || '-'}</div>
                        </div>
                        <div className={index == 3 || index == 4 ? "fontColor-white" : 'fontColor-green'}>{item.percent || '-'}</div>
                      </div>
                    </div>
                  })
                    : <div className="noData">暂无数据</div>}
                </div>
              </div>
            </div>}
      </div>
    );
  }
}

export default DataCenterModal;

