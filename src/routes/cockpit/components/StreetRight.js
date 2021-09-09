import React from 'react';
import { Row, Col, Carousel, Modal, Rate } from 'antd';
import DataCenterTitle from './DataCenterTitle.js'; //DataCenterTitle
import DataCenterBorder from './DataCenterBorder.js'; //DataCenterBorder
import './StreetRight.less';
import DataCenterModal from './DataCenterModal'
import DataRank from './DataRank.js';
/**
 * 右边组件
 */

class StreetRight extends React.Component {
  constructor(props) {
    super(props);
    this.fun = this.fun.bind(this);
    this.state = {
      visibleModal: false

    };
  }

  fun() {
    this.setState({
      visibleModal: false,
    });
  }

  showModal = () => {
    this.setState({
      visibleModal: true,
    });
  };

  componentDidMount() {

  }
  show(e) {
    // eslint-disable-next-line no-console
    console.log('弹窗id', e)
    this.setState({
      visibleModal: true,
      modalType: e
    })

  }

  render() {
    let { styleList, applyList, hotList, rollMonth, rollTotal, communityId } = this.props;

    let { center, league, place, station, team, volunteer } = rollMonth
    let centerTotal = rollTotal.center || []
    let leagueTotal = rollTotal.league || []
    let placeTotal = rollTotal.place || []
    let stationTotal = rollTotal.station || []
    let teamTotal = rollTotal.team || []
    let volunteerTotal = rollTotal.volunteer || []

    let dataProps = {
      modalType: this.state.modalType,
      styleList,
      applyList,
      hotList,
      rollTotal,
      rollMonth,
      communityId
    }
    return (
      <div className="StreetRights" >
        <div>
          <DataCenterBorder>
            <div style={{ height: '2.99rem' }}>
              <DataCenterTitle titleName="文明时长（本月）" />
              <Carousel autoplay dots={false} effect="fade" autoplaySpeed={4000} style={{ width: '100%', height: '2.65rem' }}>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">{communityId == 0 ? '新时代文明实践中心Top5' : '新时代文明实践站Top5'}</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 1)}>查看专题</div>
                  </div>
                  <DataRank dataList={communityId == 0 ? center : station}></DataRank>
                </div>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">新时代文明实践所Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 1)}>查看专题</div>
                  </div>
                  <DataRank dataList={place}></DataRank>
                </div>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">志愿联盟Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 1)}>查看专题</div>
                  </div>
                  <DataRank dataList={league}></DataRank>
                </div>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">志愿队伍Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 1)}>查看专题</div>
                  </div>
                  <DataRank dataList={team}></DataRank>
                </div>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">志愿者Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 1)}>查看专题</div>
                  </div>
                  <DataRank dataList={volunteer}></DataRank>
                </div>

              </Carousel>
            </div>
          </DataCenterBorder>
        </div>
        <div style={{ padding: '.25rem 0' }}>
          <DataCenterBorder>
            <div style={{ height: '2.99rem', overflow: 'hidden' }}>
              <DataCenterTitle titleName="文明时长（累计）" />
              <Carousel dots={false} autoplay effect="fade" autoplaySpeed={4000} style={{ width: '100%', height: '2.65rem' }}>
                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">{centerTotal && centerTotal.length > 0 ? '新时代文明实践中心Top5' : '新时代文明实践站Top5'}</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 2)}>查看专题</div>
                  </div>
                  <DataRank dataList={centerTotal && centerTotal.length > 0 ? centerTotal : stationTotal}></DataRank>
                </div>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">新时代文明实践所Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 2)}>查看专题</div>
                  </div>
                  <DataRank dataList={placeTotal}></DataRank>
                </div>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">志愿联盟Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 2)}>查看专题</div>
                  </div>
                  <DataRank dataList={leagueTotal}></DataRank>
                </div>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">志愿队伍Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 2)}>查看专题</div>
                  </div>
                  <DataRank dataList={teamTotal}></DataRank>
                </div>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">志愿者Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 2)}>查看专题</div>
                  </div>
                  <DataRank dataList={volunteerTotal}></DataRank>
                </div>

              </Carousel>
            </div>
          </DataCenterBorder>
        </div>
        <div>
          <div style={{ height: '2.98rem' }}>
            <DataCenterBorder>
              <DataCenterTitle titleName="活动排行" />
              <Carousel autoplay dots={false} effect="fade" autoplaySpeed={4000} style={{ width: '100%', height: '2.65rem' }}>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">活动类型按发布数Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 3)}>查看专题</div>
                  </div>
                  <DataRank dataList={styleList}></DataRank>
                </div>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">活动类型按报名人数Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 3)}>查看专题</div>
                  </div>
                  <DataRank dataList={applyList}></DataRank>
                </div>

                <div className="carouselStyle">
                  <div className="carouse-title-div">
                    <div className="carouse-style-title">本月热门活动Top5</div>
                    <div className="viewTopics" onClick={this.show.bind(this, 3)}>查看专题</div>
                  </div>
                  <DataRank dataList={hotList}></DataRank>
                </div>
              </Carousel>
            </DataCenterBorder>
          </div>

        </div>
        <Modal
          className="InfoModal"
          // centered={true}
          footer={null}
          closable={false}
          visible={this.state.visibleModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <DataCenterModal {...dataProps} getFun={this.fun} />

        </Modal>
      </div >
    );
  }
}

export default StreetRight;