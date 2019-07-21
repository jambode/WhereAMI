import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Editor from '../Editor/Editor';
import data from '../../locations';
 
var POI = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJfeDMxXzU3X3gyQ19fVHdpdHRlcl94MkNfX0xvY2F0aW9uX3gyQ19fTWFwIj48ZyBpZD0iWE1MSURfNTA2M18iPjxnIGlkPSJYTUxJRF82NzMyXyI+PGc+PGc+PHBhdGggZD0iTTI1Ni4wOCw1NmM4NC44NywwLDE1My44MSw2OC45NCwxNTMuODEsMTUzLjk2YzAsNzcuMDYtODcuMDIsMTk1LjAzLTE1My4yLDI0Ni4wNCAgICAgICBjLTg1LjMzLTY5LjI0LTE1NC41OC0xNjcuNzUtMTU0LjU4LTI0Ni4wNEMxMDIuMTEsMTI0Ljk0LDE3MS4wNSw1NiwyNTYuMDgsNTZ6IE0zMzAuODcsMjA2LjggICAgICAgYzAtNDEuMzQtMzMuNTIxLTc0Ljg2LTc0Ljg3LTc0Ljg2Yy00MS4zNSwwLTc0Ljg2LDMzLjUyLTc0Ljg2LDc0Ljg2YzAsNDEuMzUsMzMuNTEsNzQuODcsNzQuODYsNzQuODcgICAgICAgQzI5Ny4zNSwyODEuNjcsMzMwLjg3LDI0OC4xNSwzMzAuODcsMjA2Ljh6IiBzdHlsZT0iZmlsbDojRkY3OTc5OyIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0iTTI1NiwyOTEuNjdjLTQ2Ljc5MiwwLTg0Ljg2LTM4LjA3My04NC44Ni04NC44N2MwLTQ2Ljc5MiwzOC4wNjgtODQuODYsODQuODYtODQuODZjNDYuNzk4LDAsODQuODcsMzguMDY4LDg0Ljg3LDg0Ljg2ICAgICAgIEMzNDAuODcsMjUzLjU5NywzMDIuNzk4LDI5MS42NywyNTYsMjkxLjY3eiBNMjU2LDE0MS45NGMtMzUuNzY0LDAtNjQuODYsMjkuMDk2LTY0Ljg2LDY0Ljg2YzAsMzUuNzcsMjkuMDk2LDY0Ljg3LDY0Ljg2LDY0Ljg3ICAgICAgIGMzNS43NywwLDY0Ljg3LTI5LjEwMSw2NC44Ny02NC44N0MzMjAuODcsMTcxLjAzNiwyOTEuNzcsMTQxLjk0LDI1NiwxNDEuOTR6Ii8+PC9nPjxnPjxwYXRoIGQ9Ik0yNTYuNjksNDY2Yy0yLjIzNSwwLTQuNDY3LTAuNzQ2LTYuMzAxLTIuMjM0Yy00My44NTItMzUuNTgzLTgzLjQwNS03OC44OTEtMTExLjM3NC0xMjEuOTQ0ICAgICAgIEMxMDguMzMsMjk0LjU4Niw5Mi4xMSwyNDguOTg5LDkyLjExLDIwOS45NkM5Mi4xMSwxMTkuNTUyLDE2NS42NjcsNDYsMjU2LjA4LDQ2YzkwLjMyNSwwLDE2My44MSw3My41NTIsMTYzLjgxLDE2My45NiAgICAgICBjMCwzNi45NjYtMTguOTc4LDg2LjA4LTUzLjQzNiwxMzguMjk3Yy0zMC4wOCw0NS41OC02OC44MzEsODguODE4LTEwMy42NTksMTE1LjY2M0MyNjAuOTk0LDQ2NS4zMDksMjU4Ljg0MSw0NjYsMjU2LjY5LDQ2NnogICAgICAgIE0yNTYuMDgsNjZjLTc5LjM4NSwwLTE0My45Nyw2NC41OC0xNDMuOTcsMTQzLjk2YzAsNjcuNjk1LDU3Ljg3MywxNjAuNjUsMTQ0LjY5NiwyMzMuMTgyICAgICAgIEMzMjQuMzU2LDM4Ny45OSwzOTkuODksMjc3LjE4MSwzOTkuODksMjA5Ljk2QzM5OS44OSwxMzAuNTgsMzM1LjM3Nyw2NiwyNTYuMDgsNjZ6Ii8+PC9nPjwvZz48L2c+PC9nPjwvZz48ZyBpZD0iTGF5ZXJfMSIvPjwvc3ZnPg==',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  draggable: true
});
//const mapCenter = [51.5098192, -0.1345484];
//var zoomLevel = 12;
data.loc.map((loc)=>{
  Marker._leaflet_id = loc.name;
})

class myMap extends Component{
  constructor(props){
    super(props);
    this.state = {
      location: {
        lat: 51.5098192,
        lng: -0.1345484,
      },
      posizioneNota: false,
      zoomLevel: 16,
      playlist: '',
      geoloc: '',
      // modal should be closed on page load
      isModalOpen: false
    };
    // binding methods
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }
    openModal() {
      console.log('clicked');
      this.setState({ isModalOpen: true})
      
    }
     
    closeModal () {
      this.setState({ isModalOpen: false })
    }

    handleClick(e){
      const { lat, lng } = e.latlng;
      console.log(lat, lng);
      data.loc.map((loc)=>{
        if(lat==loc["coordinates"][0] && lng == loc["coordinates"][1]){
          this.setState({geoloc: loc["addressolc"]});
          console.log(this.state.geoloc);
          this.setState({playlist: loc["playlist"]});
          console.log(this.state.playlist);
        }
      })
     
    }
 /*    
    componentDidMount() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          posizioneNota: true,
          zoomLevel: 18
        });
      });
    }
 
     
    updatePosition = event => {
        this.setState({
          location: {
            lat: event.target.getLatLng().lat,
            lng: event.target.getLatLng().lng
          },
          posizioneNota: true
        })
    }
 
    mettiPin = event => {
      this.setState({
        location: {
          lat: event.latlng.lat,
          lng: event.latlng.lng
        },
        posizioneNota: true,
        zoomLevel: 18
      })
    }
     */
 
  render(){
   // var position = [this.state.location.lat, this.state.location.lng];
    //const markerPosition = [51.505, -0.09]
    return(
  <div className="map">
<Map className="map"
    center={[51.5098192, -0.1345484]}
    zoom={this.state.zoomLevel} 
   // onClick={this.state.posizioneNota ? '' : this.mettiPin}
>
  <TileLayer
    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
 {/*
{ 
    this.state.posizioneNota ?
    <Marker
    position={position}
    icon={MiaPosizione}
    draggable={true}
    onDragend={this.updatePosition}>
    <Popup>Sono proprio qui ora {position}</Popup>
    </Marker> : ''
  }*/}
  {data.loc.map((loc)=>{
    return(
 
 
  <Marker
    position={[loc["coordinates"][0], loc["coordinates"][1]]}
    icon={POI}
    onClick={this.handleClick}
    >
        <Popup
          width={1000}
          height={1000}
          
        >
           
          <p><b>Tu sei qui </b>
          <a class="btn" href ="#" onClick={this.openModal}><i class="fa fa-street-view"></i></a> 
          </p>
          <p>Riempi il form per creare una clip.</p>
          <p>{this.state.playlist}</p>
          <div><Editor playlist={this.state.playlist}  geoID={this.state.geoloc}/></div>
  {/* creare un nuovo elemento per il popup dell'editor */}
        </Popup>
    </Marker>
     
    )})}
     
</Map>
 
</div>
    )}}
export default myMap;