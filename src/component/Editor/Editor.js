import React, {Component, Fragment} from 'react';
import './Editor.css';
import Render from '../Render/Render';
import axios from 'axios';
import {Form, FormGroup, Label, Input, Col, Row, TextArea, Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';
/*const fs = require('fs');
var fileContent = "hello";
fs.writeFile('../../locations.json', fileContent, (err)=>{
  if (err) {
    console.error(err);
    return;
};
console.log("File has been created");
});*/

var fs = require('browserify-fs');
let jsonData = require('../../locations.json');
console.log(jsonData);
function Editor(props) {
  const geoloc = props.geoID;    //id OLC
  const plID = props.playlist;

  //var isRendervisible= true;
  const [form, setForm]=React.useState({
    title: "",
    description: "",
    purpose: "",
    category: "", 
    audience: "",
    level: "",
    file: null
  });
 
const [isRendervisible, visible]= React.useState(false);
const[isInputDisabled, disable] = React.useState(true);

  function handleChange(event){
    //event.target.name event.target.value
    const {name, files, value} = event.target;
    const inputValue = name === 'file' && name !== 'playlist' ? files[0] : value;
    setForm({
      ...form,
      [name]: inputValue
    });
  }


  function handleSubmit(event){
    event.preventDefault();   //prevents submit to reload page
    //console.log({form});
    console.log("playlist id:");
    console.log(plID);
    const videoData = new FormData();
    videoData.append("videoFile", form.file); //richiama quello di multer
    videoData.append("title", form.title);
    videoData.append("category", form.category);
    videoData.append("audience", form.audience);
    videoData.append("purpose", form.purpose);
    videoData.append("description", form.description);
    videoData.append("playlist", plID);
    videoData.append("level", form.level);
    videoData.append("geoloc", geoloc);
    axios.post('http://localhost:8000/upload', videoData)
      .then(response => {
        console.log(response.data);
      });
   // getData();
    
  }
/* 
   function getData(){
      fetch("http://localhost:000/upload",{
        headers:{
          'Access-Control-Allow-Origin':'*'
        }})
        .then(res =>{
          console.log(res);
        });
        } */
  
 
  return (
    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,20,20,0.7), rgba(9, 93, 225, 0.5)))`
      }}
    >
      {/*<img src={youtubeIcon} alt="Youtube Icon" className="youtube" />*/}
      <h1 className="title">Upload Your Video to</h1>
      <p> {props.playlist}</p>
      <Form onSubmit={handleSubmit} method="post"> 
      {/* <FormGroup>
        <Input type="text" name="playlist" onChange={handleChange} placeholder="Copia ID della playlist qui"></Input>
      </FormGroup> */}
      <FormGroup row>
                    <Label sm={2}>Nome:</Label>
                    <Col sm={10}>
                      <Input type = "text"  onChange={handleChange} name = "title"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Testo:</Label>
                    <Col sm={10}>
                      <Input type="textarea" onChange={handleChange} name="description"/>
                    </Col>
              </FormGroup>
           <FormGroup tag="fieldset" row>
          <legend className="col-form-label col-sm-2">Scopo:</legend>
          <Row >
            <Col>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="purpose" onChange={handleChange} value="how" onClick={()=>disable(true)}/>{' '}
                How
              </Label>
            </FormGroup>
            </Col>
            <Col>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="purpose" onChange={handleChange} value="why" onClick={()=>disable(false)}/>{' '}
                Why
              </Label>
            </FormGroup>
            </Col>
            <Col>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="purpose" onChange={handleChange} value="what" onClick={()=>disable(true)}/>{' '}
               What
              </Label>
            </FormGroup>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Input type="text" onChange={handleChange} placeholder="Livello Why" name="level" disabled ={isInputDisabled} ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleCustomSelect">Categoria: </Label>
          <Input type="select" name="category"  onChange={handleChange}>
            <option value="none">None</option>
            <option value="art">Art</option>
            <option value="nat">Nature</option>
            <option value="spo">Sport</option>
            <option value="fas">Moda</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Pubblico:</Label>
          <Input type="select" name="audience"  onChange={handleChange}>
                  <option value="none">None</option>
                  <option value="gen">Tutti</option>
                  <option value="mid">Adulti</option>
                  <option value="elm">Elementari</option>
          </Input>
        </FormGroup>
        <FormGroup> 
          <Input type="file" name="file" accept="video/flv" placeholder="Add video File" onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
          <Button onClick={()=>visible(true)}>Registra Video</Button>
        </FormGroup>
        { isRendervisible ? <Render /> : null }
        <Input className="is-success button" type="submit">
          Submit
        </Input>
      </Form>
    </div>
  );
}

/*
class Editor extends Component{
      constructor(props){
        super(props);
        this.state={name:'',
                    textVal:'',
                    purpose:'',
                    category:'',
                    audience: '',
                    file: null,
                    isRendervisible: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      
      handleSubmit(event){
        event.preventDefault();   //prevents submit to reload page
        const { name, textVal, purpose, category, audience} = this.state;
       /* alert('A name was submitted: ' + this.state.name+
        '\nA text was submitted: ' + this.state.textVal+
        '\nCategory selected: ' + this.state.category+
        '\nAudience selected: ' + this.state.audience);
        event.preventDefault();
        //console.log("submitted");
        //nope*/
 /*       const obj ={
          name,
          textVal,
          purpose,
          category,
          audience
        };
        axios
            .post('http://localhost:4000/submit', obj)
            .then(() => console.log('obj Created'))
            .catch(err => {
              console.error(err);
      });
      
      //console.log({form});
      const videoData = new FormData();
      videoData.append("videoFile", this.state.file); //richiama quello di multer
      videoData.append("title", this.state.name);
      videoData.append("description", this.state.textVal);
      axios.post('http://localhost:4000/upload', videoData)
        .then(response => {
          console.log(response.data);
        });
      }
      handleChange(event){
        this.setState({[event.target.name]: event.target.value});
      }

      handleFileChange(event){
        const [form, setForm]=React.useState({
          name: "",
          textVal: "",
          file: null
        });
        //event.target.name event.target.value
        const {name, files, value} = event.target;
        const inputValue = name === 'file' ? files[0] : value;
        setForm({
          ...form,
          [name]: inputValue
        });
      }

        render () {
          const { isOpen, onClose } = this.props;
      
          return (
            <Fragment>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label sm={2}>Nome:</Label>
                    <Col sm={10}>
                      <Input type = "text" value={this.state.name} onChange={this.handleChange} name = "name"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Testo:</Label>
                    <Col sm={10}>
                      <Input type="text" value={this.state.text} onChange={this.handleChange} name="textVal"/>
                    </Col>
              </FormGroup>
              <FormGroup tag="fieldset" row>
          <legend className="col-form-label col-sm-2">Scopo:</legend>
          <Row >
            <Col>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="purpose" value={this.state.purpose} onSelect={this.handleChange} />{' '}
                How
              </Label>
            </FormGroup>
            </Col>
            <Col>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="purpose" value={this.state.purpose} onCheck={this.handleChange} />{' '}
                Why
              </Label>
            </FormGroup>
            </Col>
            <Col>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="purpose" value={this.state.purpose} onCheck={this.handleChange} />{' '}
               What
              </Label>
            </FormGroup>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label for="exampleCustomSelect">Categoria: </Label>
          <Input type="select" name="category" value={this.state.category} onCheck={this.handleChange}>
            <option>None</option>
            <option>Art</option>
            <option>Nature</option>
            <option>Sport</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Pubblico:</Label>
          <Input type="select" name="audience" value={this.state.audience} onChange={this.handleChange}>
                  <option value="none">None</option>
                  <option value="tutti">Tutti</option>
                  <option value="adulti">Adulti</option>
                  <option value="elementari">Elementari</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="file" name="file" accept="video/mp4" placeholder="Add video File" onChange={this.handleFileChange}/>
        </FormGroup>
              {/*
              <b>Pubblico:</b>
                <select name="audience" onChange={this.handleChange} value={this.state.audience}>
                  <option value="all">Tutti</option>
                  <option value="adults">Adulti</option>
                  <option value="elm">Elementari</option>
                </select>
                <br></br>
              *//*} 
              <i class="fas fa-microphone" onClick={() => this.setState({isRendervisible: true})}></i>
              { this.state.isRendervisible ? <Render /> : null }
              
              {/* <button onClick={onClose}>close</button> */
             /* <Input type="submit"></Input>
              </Form>
              
              </Fragment>
          );
        }
      }*/
      
    

export default Editor;