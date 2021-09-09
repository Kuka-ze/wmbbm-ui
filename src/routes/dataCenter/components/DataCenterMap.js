import React from 'react';
import './DataCenterMap.less'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

class DataCenterMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {   
      tipShow: false
    };
    this.echartsReact = React.createRef()
  }
  UNSAFE_componentWillReceiveProps(preProps){
    this.echartsReact.getEchartsInstance().setOption(this.echartsReact.props.option)
  }
  renderJson = (HZJson,areaName)=>{
    let { features = [] } = HZJson;
    let area;
    let id = sessionStorage.getItem('communityId');
    if(id == '0') area = HZJson;
    features&&features.length>0&&features.map((item,index)=>{
      if(id!='0'&&item.properties.name==areaName){
        area= '{"type":"FeatureCollection","features":['+ JSON.stringify(item) +']}'
      }
    })
    if(area){
      echarts.registerMap('杭州', area);
    }
  }
  render() {
    const { areaName, mapDataJSON, centerArea } = this.props;
    let areaList = [];
    centerArea.map((item, index)=>{
      let obj = {name: item.area, value: Math.round(item.integral)};
      areaList[index] = obj
    });
    // let list =  [{name: "杭州市", value: undefined},{name: "上城区", value: 110}, 
    //   {name: "江干区", value: 70},
    //   {name: "西湖区", value: 40},
    //   {name: "拱墅区", value: 10},
    //   {name: "淳安县", value: 130}]
    const getOptionDay = {
      title: {
        text: '',
        subtext: ''
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
        // formatter: function(params) {
        //   // let res = params.name+'<br/>';
        //   // let myseries = getOptionDay.series;
        //   // for (let i = 0; i < myseries.length; i++) {
        //   //   for(let j=0;j<myseries[i].data.length;j++){
        //   //     if(myseries[i].data[j].name==params.name){
        //   //       //res+=`<i class="bg-img"></i>` +myseries[i].data[j].value+'</br>';   //value为string
        //   //       for(let m of myseries[i].data[j].text){    //value为数组
        //   //         res+=`<i class="bg-img"></i>` +m+'</br>';
        //   //       }
        //   //     }
        //   //   }
        //   // }
        //   let res = ''
        //   return res;
        // }
      },
      visualMap: {
        show:false,
        min: 35,
        max: 70,
        splitList: [
          {start: 120, end: 150, label: '120-150', color: '#FFC400'},
          {start: 100, end: 120, label: '100-120', color: '#FE5037'},
          {start: 30, end: 100, label: '30-100', color: '#FF802C'},
          {start: 0, end: 29, label: '0-30', color: '#d9d9d9'}
        ],
      },
      series: [
        {
          name: '发布活动',
          type: 'map',
          mapType: '杭州', // 自定义扩展图表类型
          map: '杭州',
          itemStyle: {
            areaColor:'#d9d9d9'
          },
          label: {
            normal:{
              show: false
            },
            emphasis: {
              show: true
            },
            textStyle: {
              fontSize: 14,
              color: '#f0f0f0'
            }
          },
          data: areaList
        }
      ]
    }
    if(mapDataJSON.type){
      this.renderJson(mapDataJSON,areaName);
    }
    return (
      <div 
        id="container"
        className="DataCenterMap" style={{
          height: '100%',
          width: '100%',
        }}>
        <ReactEcharts 
          option={getOptionDay} 
          ref={(e) => { this.echartsReact = e }} 
          style={{height:'100%'}} 
          // onEvents={this.onclick}
        />
      </div>
    );
  }
}

export default DataCenterMap;

