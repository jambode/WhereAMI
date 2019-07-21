import React, { Component } from 'react';
import Map from './component/Map/Map';
import MapEditor from './component/MapEditor/MapEditor';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/fontawesome-free';
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input } from 'reactstrap';
import { Navbar, Nav, NavDropdown, FormControl, Modal, ButtonGroup } from 'react-bootstrap';
import YouTube from 'react-youtube';
import Whereiam from './component/Whereiam';
import data from './locations';
 
//import './App.css';
class App extends Component {
  constructor(props){
    super(props);
  this.state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
    funzbrowser: 0,
    isEditorvisible: false,
    hamburgerOpen: false,
    itinerario: 0
  }
  };
 
formChild1(params) {
    this.setState({
      data : params
  })
}
 
toggleClickHandler = () => {
  this.setState((prevState) => {
  return{hamburgerOpen: !prevState.hamburgerOpen}
  });
};
 
 
backdropClickHandler = () => {
  this.setState({hamburgerOpen: false});
};
 
_onReady(event) {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
}
 
 
  render()
{
  //let isEditorClose =() =>this.setState({isEditorvisible: false});
  let lgClose = () => this.setState({ lgShow: false });
  const opts = {
    height: '390',
    width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };
 
  return(
    <div className={Map}>
      <header>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home" onClick={() => this.setState({isEditorvisible: false})}>Where-I-aM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Il Browser" id="basic-nav-dropdown">{console.log(this.state.itinerario)}
              <NavDropdown.Item eventKey="WhereIam" href="#" onClick={() => this.setState({ lgShow: true, funzbrowser: 1})}>Where I am</NavDropdown.Item>
              <NavDropdown.Item eventKey="Next" className={this.state.itinerario === 10 ? 'disabled' : ''} href="#" onClick={() => this.setState({ funzbrowser: 2, itinerario: this.state.itinerario+1 })}>Next</NavDropdown.Item>
              <NavDropdown.Item eventKey="Previous" className={this.state.itinerario === 0 ? 'disabled' : ''} href="#" onClick={() => this.setState({ funzbrowser: 3, itinerario: this.state.itinerario-1 })}>Previous</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home">Login</Nav.Link>
            <Nav.Link href="#home" onClick={() => this.setState({isEditorvisible: true})}>Passa a Editor</Nav.Link>
          </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Luogo di Interesse" className="mr-sm-2" />
            <Button variant="outline-success" onClick={() => this.setState({ lgShow: true, funzbrowser: 4 })}>Cerca Clip</Button>
        </Form>
        </Navbar.Collapse>
        </Navbar>
      </header>
 
 
 
    <Map callback={this.formChild1.bind(this)} funzione={this.state.funzbrowser} itinerario={this.state.itinerario}></Map>
    { this.state.isEditorvisible ? <MapEditor /> : null }
 
    <Modal
          size="lg"
          show={this.state.lgShow}
          onHide={lgClose}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {/*this.state.funzbrowser*/}
              <ButtonGroup className="mt-3">
                <Button> More</Button>
                <Button>Stop</Button>
                <Button>Continue </Button>
              </ButtonGroup>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Whereiam lati={this.state.lat} longi={this.state.lng}  data={this.state.data} />
          </Modal.Body>
        </Modal>
    </div>
  );
  }
}
 
 
export default App;
