import React, { PureComponent } from 'react';
import jiande from "./jdxzj.json";
import fjjh from "./fjjh.json";
import pcs from "./pcs.json";
import './Map3D.less';
let map;

class Map3D extends PureComponent {
  componentDidMount() {
    this.initMaps();
    
  }
  componentWillReceiveProps(nextProps) {
    const { points, scale, bubbleData, bubbleDatass } = nextProps;
  }
  initMaps() {
    const { points, scale, bubbleData } = this.props;
    map = new window.AMap.Map('container', {});
    // map.setMapStyle('amap://styles/a95800a0437327ec6165bf9d94ddf12c');
    // map.setMapStyle('amap://styles/547d4b8c6e41c70a7cf062008f7b59d4');
    let { features } = jiande;
    console.log(features,'featuresfeatures===11111')
    features.map((item1, index1) => {
      if (item1.geometry.coordinates&&item1.geometry.coordinates.length == 1) {
        let polygon = new AMap.Polygon({
          path: item1.geometry.coordinates,
          fillColor: 'red',
          strokeOpacity: 1,
          fillOpacity: 0.5,
          strokeColor: 'red',
          strokeWeight: 1,
          strokeStyle: 'dashed',
          strokeDasharray: [5, 5],
        });
        polygon.on('mouseover', () => {
          polygon.setOptions({
            fillOpacity: 0.7,
            fillColor: '#7bccc4'
          })
        })
        polygon.on('mouseout', () => {
          polygon.setOptions({
            fillOpacity: 0.5,
            fillColor: '#ccebc5'

          })
        })
        map.add(polygon);
      } else {
        item1.geometry.coordinates.map((item2, index2) => {
          let polygon = new AMap.Polygon({
            path: item2,
            fillColor: '#ccebc5',
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: '#2b8cbe',
            strokeWeight: 1,
            strokeStyle: 'dashed',
            strokeDasharray: [5, 5],
          });
          polygon.on('mouseover', () => {
            polygon.setOptions({
              fillOpacity: 0.7,
              fillColor: '#7bccc4'
            })
          })
          polygon.on('mouseout', () => {
            polygon.setOptions({
              fillOpacity: 0.5,
              fillColor: '#ccebc5'

            })
          })
          map.add(polygon);
        });

      }

    });
    let features2 = pcs.features;
    features2.map((item1, index1) => {
      if (item1.geometry.coordinates && item1.geometry.coordinates.length == 1) {
        let polygon = new AMap.Polygon({
          path: item1.geometry.rings,
          fillColor: '#ccebc5',
          strokeOpacity: 1,
          fillOpacity: 0.5,
          strokeColor: '#2b8cbe',
          strokeWeight: 1,
          strokeStyle: 'dashed',
          strokeDasharray: [5, 5],
        });
        polygon.on('mouseover', () => {
          polygon.setOptions({
            fillOpacity: 0.7,
            fillColor: '#7bccc4'
          })
        })
        polygon.on('mouseout', () => {
          polygon.setOptions({
            fillOpacity: 0.5,
            fillColor: '#ccebc5'

          })
        })
        map.add(polygon);
      } else {
        item1.geometry.rings.map((item2, index2) => {
          let polygon = new AMap.Polygon({
            path: item2,
            fillColor: '#ccebc5',
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: '#2b8cbe',
            strokeWeight: 1,
            strokeStyle: 'dashed',
            strokeDasharray: [5, 5],
          });
          polygon.on('mouseover', () => {
            polygon.setOptions({
              fillOpacity: 0.7,
              fillColor: '#7bccc4'
            })
          })
          polygon.on('mouseout', () => {
            polygon.setOptions({
              fillOpacity: 0.5,
              fillColor: '#ccebc5'

            })
          })
          map.add(polygon);
          let text =  new AMap.Text({
                    text: item1.attributes.PAICHUSUO,
                    position: new AMap.LngLat(item1.attributes.x,item1.attributes.y)
                  })
                  text.setStyle({
                    color:'#333'
                  })
                  map.add(text);
        });

      }

    });
    let features1 = fjjh.features;
    console.log(features1,'features1===features1')
    features1.map((item1, index1) => {
      if (item1.geometry.coordinates && item1.geometry.coordinates.length == 1) {
        let polygon = new AMap.Polygon({
          path: item1.geometry.coordinates,
          fillColor: 'red',
          strokeOpacity: 1,
          fillOpacity: 0.5,
          strokeColor: 'red',
          strokeWeight: 1,
          strokeStyle: 'dashed',
          strokeDasharray: [5, 5],
        });
        polygon.on('mouseover', () => {
          polygon.setOptions({
            fillOpacity: 0.7,
            fillColor: '#7bccc4'
          })
        })
        polygon.on('mouseout', () => {
          polygon.setOptions({
            fillOpacity: 0.5,
            fillColor: '#ccebc5'

          })
        })
        map.add(polygon);
      } else {
        item1.geometry.rings.map((item2, index2) => {
          let polygon = new AMap.Polygon({
            path: item2,
            fillColor: '#ccebc5',
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: '#2b8cbe',
            strokeWeight: 1,
            strokeStyle: 'dashed',
            strokeDasharray: [5, 5],
          });
          polygon.on('mouseover', () => {
            polygon.setOptions({
              fillOpacity: 0.7,
              fillColor: '#7bccc4'
            })
          })
          polygon.on('mouseout', () => {
            polygon.setOptions({
              fillOpacity: 0.5,
              fillColor: '#ccebc5'

            })
          })
          map.add(polygon);
          let text =  new AMap.Text({
            text: item1.attributes.fenju,
            position: new AMap.LngLat(item1.attributes.x,item1.attributes.y)
          })
          text.setStyle({
            color:'#333'
          })
          map.add(text);
        });

      }

    });
    
  }


  render() {
    const { scale } = this.props;
    return (
      <div id="container" style={{ width: '100%', height: '100%' }}></div>
    );
  }
}
export default Map3D;
