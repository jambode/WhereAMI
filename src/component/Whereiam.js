import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Map from './Map/Map';
import data from '../locations';
 
class Whereiam extends Component {
    constructor(props) {
        super(props);
        this.state= {
            location: {
                lat: this.props.data.lat,
                lng: this.props.data.lng,
              },
            error: null,
            isLoaded: false,
            indirizzo_olc: '',
            indirizzo2: '',
            posizioniolc: []
        };
    }
 
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.playVideo();
    }
 
    componentDidMount() {
            fetch("https://plus.codes/api?address="+this.props.data.lat+","+this.props.data.lng)
            .then(res => res.json())
            .then(
                (result) => {this.setState({indirizzo_olc: result.plus_code.global_code, isLoaded: true});},
                (error) => {this.setState({error})}
            );
 
            fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,id&playlistId=PLSDFEDmxqVoMoElPF6OkI_TgzDeU2Y1XF&key=AIzaSyCZP3WiXeKYrqWbleOpqIo9SGr5oHr87vY")
            .then(res => res.json())
            .then(
                (result) => {console.log(result.items[0].snippet.resourceId.videoId)},
                (error) => {this.setState({error})}
            );
 
            /*fetch(data)
            .then(res => res.json())
            .then(posizioniolc => {
                this.setState({
                    posizioniolc
                });
            });*/
 
 
 
 
 
    }
    /*componentDidMount() {
        fetch("https://plus.codes/api?address=14.917313,-23.511313")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    indirizzo_olc: result.plus_code.global_code
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }*/
    render() {
        var posizione = [this.state.location.lat, this.state.location.lng];
        const { error, isLoaded, items, indirizzo_olc, indirizzo2 } = this.state;
        const opts = {
            height: '390',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
          };
          var poi = '';
          {data.loc.map((loc)=>{
            //console.log(this.state.indirizzo_olc,loc.addressolc)
              if (this.state.indirizzo_olc.substring(0, 8)==loc.addressolc.substring(0, 8) && poi=='') {
                poi = loc.name;
              }
          })
        }
        //this.setState({indirizzo2: poi})
 
 
 
          //{data.loc.map((loc)=>{console.log([loc[addressolc[0]]]);})}
 
        //console.log(this.state.indirizzo_olc,this.state.indirizzo2)
        /*{
            this.state.indirizzo_olc == [loc["indirizzoolc"]] ? 'ok' : 'no'
        }*/
        if (poi!='') {
            return(<div><h2>Benvenuti a {poi}</h2><YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} /></div>);
        } else {
            return(<div><h2>Non ci sono punti di interessi nei dintorni</h2></div>);
        }
 
        }
    }
export default Whereiam;