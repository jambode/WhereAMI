import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import data from '../../locations';
 
var MiaPosizione = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMCAzMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzAgMzA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkYwMEZGO30KCS5zdDF7ZmlsbDojNDU0NTQ1O30KCS5zdDJ7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDN7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDowLjU7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNS4zLDI5LjVDMTMuOSwyOCw1LjYsMTguMiw1LjYsOS42YzAtNSw0LjUtOS40LDkuNy05LjRTMjUsNC42LDI1LDkuNkMyNC45LDE3LjksMTYuNiwyNy45LDE1LjMsMjkuNXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNS4zLDAuNGM1LDAsOS40LDQuMyw5LjQsOS4yYzAsOC03LjYsMTcuNC05LjQsMTkuNkMxMy41LDI3LDUuOSwxNy43LDUuOSw5LjVDNS45LDQuNywxMC4zLDAuNCwxNS4zLDAuNAoJCSBNMTUuMy0wLjFjLTUuNSwwLTkuOSw0LjctOS45LDkuN2MwLDkuNSw5LjksMjAuMyw5LjksMjAuM3M5LjktMTEuMSw5LjktMjAuM0MyNS4yLDQuNSwyMC44LTAuMSwxNS4zLTAuMUwxNS4zLTAuMXoiLz4KPC9nPgo8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMjAuMSwxMy43SDExYy0wLjYsMC0xLTAuNC0xLTFWNy4xYzAtMC41LDAuNC0xLDEtMWg5LjFjMC41LDAsMSwwLjUsMSwxdjUuNkMyMS4xLDEzLjIsMjAuNiwxMy43LDIwLjEsMTMuN3oiCgkvPgo8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTguNiwxMy42aC02LjJjLTAuNCwwLTAuNy0wLjQtMC43LTFWN2MwLTAuNSwwLjMtMSwwLjctMWg2LjJjMC4zLDAsMC43LDAuNSwwLjcsMXY1LjYKCUMxOS4zLDEzLjEsMTksMTMuNiwxOC42LDEzLjZ6Ii8+CjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMy45LDUuOEwxMy45LDUuOGMwLTEuMSwwLjQtMS45LDAuOS0xLjloMS41YzAuNSwwLDAuOSwwLjksMC45LDEuOWwwLDAiLz4KPC9zdmc+Cg==',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  draggable: true
});
//const mapCenter = [51.5098192, -0.1345484];
var zoomLevel = 2;
class myMap extends Component{
  constructor(props){
    super(props);
    this.state = {
      location: {
        lat: 51.5098192,
        lng: -0.1345484,
      },
      posizioneNota: false,
      zoomLevel: 10,
      // modal should be closed on page load
      isModalOpen: false
    };
     
    // binding methods
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
     
    openModal() {
      console.log('clicked');
      this.setState({ isModalOpen: true})
      
    }
     
    closeModal () {
      this.setState({ isModalOpen: false })
    }
     
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
     
 
  render(){
    var position = [this.state.location.lat, this.state.location.lng];
    const markerPosition = [51.505, -0.09]
    return(
  <div className="map">
<Map className="map"
    center={position}
    zoom={this.state.zoomLevel} 
    onClick={this.state.posizioneNota ? '' : this.mettiPin}
>
  <TileLayer
    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
 
{ 
    this.state.posizioneNota ?
    <Marker
    position={position}
    icon={MiaPosizione}
    draggable={true}
    onDragend={this.updatePosition}>
    <Popup>Sono proprio qui ora {position}</Popup>
    </Marker> : ''
  }
  {data.loc.map((loc)=>{
    return(
 
 
  <Marker
    position={[loc["coordinates"][0], loc["coordinates"][1]]}
    >
        <Popup
          width={1000}
          height={1000}
        >
           
          <p><b>Tu sei qui: {loc.name} </b>
          </p>
  {/* creare un nuovo elemento per il popup dell'editor */}
        </Popup>
    </Marker>
     
    )})}
     
</Map>
 
</div>
    )}}
export default myMap;