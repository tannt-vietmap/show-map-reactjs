import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import React, { Component } from 'react'
import L from 'leaflet'
import axios from 'axios'
import polyline from '@mapbox/polyline';
export default class Map extends Component {

    constructor(props) {
    super(props);
     this.state = {positionLine: []};
    
  }
  
   arrMap = [
    {
      x: 106.68534799462223,
      y: 10.78252517522869,
      id: 1,
      name: 'Điểm 1',
      address: 'địa chỉ 1'
    },
    {
      x: 106.66938629614792,
      y: 10.784824619376634,
      id: 2,
      name: 'Điểm 2',
      address: 'địa chỉ 2'
    },
    {
      x: 106.66217651892876,
      y: 10.789293262425321,
      id: 3,
      name: 'Điểm 3',
      address: 'địa chỉ 3'
    },
    {
      x: 106.65771332350738,
      y: 10.792075591529395,
      id: 4,
      name: 'Điểm 4',
      address: 'địa chỉ 4'
    },
    {
      x: 106.65033188492585,
      y: 10.796122569704261,
      id: 5,
      name: 'Điểm 5',
      address: 'địa chỉ 5'
    },
    {
      x: 106.64355126111259,
      y: 10.799916562239094,
      id: 6,
      name: 'Điểm 6',
      address: 'địa chỉ 6'
    }
  ];

  componentDidMount () {

      var points=[];
      this.arrMap.map(x=>{
          points.push(`point=${x.y},${x.x}`);
      });
      
    var config = {
      method: 'get',
      url:
        `https://maps.vietmap.vn/api/route?api-version=1.1&apikey=YOUR APIKEY&vehicle=motorcycle&${points.join('&')}`,
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json'
      }
    }
    axios(config)
      .then(response=> {
        //console.log(JSON.stringify(response.data))
        
        const str_points=response.data.paths[0].points;
        var lines= polyline.decode(str_points);
        
        this.setState({positionLine: lines });
        
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  renderPoint = () => {
    let myIcon = L.icon({
      iconUrl: 'my-icon.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    })
    let point = this.arrMap.map((point, index) => {
      return (
        <Marker position={[point.y, point.x]} key={index} icon={myIcon}>
          <Popup>
            <table>
              <tr>
                <th>ID</th>
                <td>{point.id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{point.name}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{point.address}</td>
              </tr>
            </table>
          </Popup>
        </Marker>
      )
    })
    return point
  }

  

  render () {
    const position = [10.78252517522869, 106.68534799462223]
    console.log('render');
    return (
      <div>
        <MapContainer center={position} zoom={13} style={{ height: '100vh' }}>
          <TileLayer url='https://maps.vietmap.vn/tm/{z}/{x}/{y}@2x.png?apikey=YOUR APIKEY' />
          <div>{this.renderPoint()}</div>
          <Polyline key={'1'} positions={this.state.positionLine}></Polyline>
        </MapContainer>
      </div>
    )
  }
}
