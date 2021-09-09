import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';
import DataCenterLayout from './components/DataCenterLayout.js';
import Header from "./components/Header"; //头部
import StreetLeft from './components/StreetLeft.js'; //Left
import StreetCenter from './components/StreetCenter.js'; //Center
import StreetRight from './components/StreetRight.js'; //Right
import "./DataCenter.less";

class DataCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapIndex: 0,
      areaIdIndex: 0,
      placeIndex: 0,
      messIndex: 0,
      infoTransition: true
    };
  }
  componentDidMount() {

    this.interval = setInterval(() => {
      let time = new Date(); // 程序计时的月从0开始取值后+1
      if (time.getSeconds() % 3 === 0) {
        // 按照秒刷新(3秒)
        // console.log("3秒");
        if (this.state.messIndex < 20) {
          this.setState({
            messIndex: this.state.messIndex + 1
          })
        } else {
          this.setState({
            messIndex: 0
          })
        }
      }
      if (time.getSeconds() % 5 === 0) {
        // 按照秒刷新(5秒)
        // console.log("5秒");
        this.props.dispatch({
          type: 'DataCenterModel/centerFiveSecond',
          payload: {
            center_id: sessionStorage.getItem('communityId') || "0"
          },
        });
        let communityId = sessionStorage.getItem('communityId') || "0";
        if(communityId==0){ //市级
          let { centerArea } = this.props;
          if (this.state.areaIdIndex < centerArea.length) {
            this.setState({
              areaIdIndex: this.state.areaIdIndex + 1
            }, () => {
              centerArea.map((item,index)=>{
                if(index==this.state.areaIdIndex){
                  this.props.dispatch({
                    type: 'DataCenterModel/mapData',
                    payload: {
                      center_id: item.id || "0"
                    },
                  });
                }
              }) 
            })
          } else {
            this.setState({
              areaIdIndex: 0
            }, () => {
              centerArea.map((item,index)=>{
                if(index==this.state.areaIdIndex){
                  this.props.dispatch({
                    type: 'DataCenterModel/mapData',
                    payload: {
                      center_id: "0"
                    },
                  });
                }
              })
            })
          }
        }else{
          let { mapList } = this.props; 
          if(mapList.length==0){
            this.props.dispatch({
              type: 'DataCenterModel/mapData',
              payload: {
                center_id: sessionStorage.getItem('communityId') || "1",
                place_id: ''
              },
            });
          }else if (this.state.placeIndex < mapList.length-1) {
            this.setState({
              placeIndex: this.state.placeIndex + 1
            }, () => {
              mapList.map((item,index)=>{
                if(index==this.state.placeIndex){
                  this.props.dispatch({
                    type: 'DataCenterModel/mapData',
                    payload: {
                      center_id: sessionStorage.getItem('communityId') || "1",
                      place_id: item.organizationId?item.organizationId:''
                    },
                  });
                }
              }) 
            })
          } else {
            this.setState({
              placeIndex: 0
            }, () => {
              mapList.map((item,index)=>{
                if(index==this.state.placeIndex){
                  this.props.dispatch({
                    type: 'DataCenterModel/mapData',
                    payload: {
                      center_id: sessionStorage.getItem('communityId') || "0",
                      place_id: item.organizationId?item.organizationId:''
                    },
                  });
                }
              })
            })
          }
        }
      }
      if (time.getSeconds() % 60 === 0) {
        // 按照秒刷新(60秒)
        // console.log("60秒");
        this.setState({
          messIndex: 0
        })
        this.props.dispatch({
          type: 'DataCenterModel/mapMessage',
          payload: {
            center_id: sessionStorage.getItem('communityId') || "0"
          }
        });
        this.props.dispatch({
          type: 'DataCenterModel/civilizationGovernance',
          payload: {
            center_id: sessionStorage.getItem('communityId') || "0"
          }
        })
      }
      if (time.getHours() % 1 === 0 && time.getMinutes() === 0 && time.getSeconds() === 0) {
        // 按照小时刷新(1小时)
        this.props.dispatch({
          type: 'DataCenterModel/screenOneHour',
          payload: {
            center_id: sessionStorage.getItem('communityId') || "0"
          },
        });
      }
      if (time.getHours() % 12 === 0 && time.getMinutes() === 0 && time.getSeconds() === 0) {
        // 按照小时刷新(12小时)
        this.props.dispatch({
          type: 'DataCenterModel/screenTwelveHour',
          payload: {
            center_id: sessionStorage.getItem('communityId') || "0"
          },
        });
      }
      if (time.getHours() === 0 && time.getMinutes() === 0 && time.getSeconds() === 0) {
        // 零点刷新所有
        this.props.dispatch({
          type: 'DataCenterModel/init',
          payload: {
            center_id: sessionStorage.getItem('communityId') || "0"
          },
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    let { placeIndex } = this.state;
    let { dispatch, screenOneHour = {}, screenTwelveHour = {}, centerFiveSecond = {}, mapData = {}, areaList, colorList, mapDataJSON = {}, placeList = [],mapMessage = [], mapList = [], civilizationGovernance = [], centerArea = [], areaName, screenCivilization = [], showLun } = this.props;
    let { rmhd = [], topRight = {} } = screenOneHour;
    let { hdlxzb = [], zyfwyx = [], integralRoll = {}, durationRoll = {}, wmzsMonth = [], volunteerCode = {}, volunteerSex = {}, durationLj = {} } = screenTwelveHour;
    let { adc = {}, activeVolunteer = {} } = centerFiveSecond;
    // console.log('this,props',this.props)
    /** Left */
    let streetLeftProps = {
      rmhd,
      hdlxzb,
      wmzsDay: screenCivilization,
      wmzsMonth,
      civilizationGovernance

    }
    /** Center */
    let streetCenterProps = {
      adc,
      activeVolunteer,
      mapIndex: this.state.placeIndex,
      messIndex: this.state.messIndex,
      mapData,
      mapDataJSON,
      areaList,
      colorList,
      areaName,
      mapMessage,
      infoTransition: this.state.infoTransition,
      mapList,
      placeList,
      centerArea,
      showLun,
      handleChange(){}
    }
    /** Right */
    let streetRightProps = {
      topRight,
      zyfwyx,
      integralRoll,
      durationRoll,
      volunteerCode,
      volunteerSex,
      durationLj,
      areaName
    }
    /** header */
    let headerProps = {
      titleName: sessionStorage.getItem('communityId') == 0 ? `${areaName}文明大脑` : `${areaName}新时代文明实践中心`,
      communityList: centerArea,
      communityId: this.props.communityId,
      mapList,
      handleChange(value, o){
        sessionStorage.setItem('communityId', value);
        dispatch({
          type: 'DataCenterModel/concat',
          payload: {
            communityId: value,
            areaName: o.props.children
          }
        });
        dispatch({
          type: 'DataCenterModel/centerFiveSecond',
          payload: {
            center_id: value
          },
        });
        if(value==0){
          dispatch({
            type: 'DataCenterModel/mapData',
            payload: {
              center_id: value
            },
          });
          dispatch({
            type: 'DataCenterModel/concat',
            payload: {
              showLun: true
            }
          });
        }else{
          dispatch({
            type: 'DataCenterModel/mapList',
            payload: {
              center_id: value
            },
            callback(data) {
              dispatch({
                type: 'DataCenterModel/mapData',
                payload: {
                  center_id: value,
                  place_id: data.list.length>0?data.list[0].organizationId:'1'
                }
              });
              if(data.list.length>0){
                dispatch({
                  type: 'DataCenterModel/concat',
                  payload: {
                    showLun: true
                  }
                });
              }else{
                dispatch({
                  type: 'DataCenterModel/concat',
                  payload: {
                    showLun: false
                  }
                });
              }
            }
          });
        } 
        dispatch({
          type: 'DataCenterModel/mapMessage',
          payload: {
            center_id: value
          },
        });
        // dispatch({
        //   type: 'DataCenterModel/mapList',
        //   payload: {
        //     center_id: value
        //   },
        // });
        dispatch({
          type: 'DataCenterModel/screenOneHour',
          payload: {
            center_id: value
          },
        });
        dispatch({
          type: 'DataCenterModel/screenTwelveHour',
          payload: {
            center_id: value
          },
        });
        dispatch({
          type: 'DataCenterModel/civilizationGovernance',
          payload: {
            center_id: value
          },
        });
        dispatch({
          type: 'DataCenterModel/screenCivilization',
          payload: {
            center_id: value
          },
        });
      }
    }
    return (
      <DataCenterLayout>
        <Header {...headerProps}/>
        <div className="data-center-container data-center-index" style={{ paddingTop: '.7rem', overflow: 'hidden' }}>
          <Row type="flex" style={{ height: '100%' }}>
            <Col style={{ height: '100%', width: '26.5%' }}>
              <StreetLeft {...streetLeftProps} />
            </Col>
            <Col style={{ height: '100%', width: '47%', padding: '0 .8%' }}>
              <StreetCenter {...streetCenterProps} />
            </Col>
            <Col style={{ height: '100%', width: '26.5%' }}>
              <StreetRight {...streetRightProps} />
            </Col>
          </Row>
        </div>
      </DataCenterLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.DataCenterModel,
    loading: state.loading.models.DataCenterModel
  };
}
export default connect(mapStateToProps)(Form.create()(DataCenter));
