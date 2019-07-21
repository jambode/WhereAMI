var express = require('express');
var app = express();
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const bodyparser = require('body-parser');
const uuid = require('uuid');
const credentials = require("./cred.json");    //to use this file you need to create an oAuth json for Google Login
const passport = require('passport');
const axios = require('axios');
const open = require('open');
const youtube = require("youtube-api");
var aurl = "";

app.use(express.static(path.join(__dirname, 'build')))
app.set('view engine', 'ejs');
 app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build','index.html'));
}); 

//var desc="";
app.use(
        cors({
                origin: 'http://localhost:8000',
                credentials: true,
}));

app.options('*', cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var urlEncoder = bodyparser.urlencoded({extended: false})
app.use(bodyparser.json())
var desc= "";
var SCOPES=["https://www.googleapis.com/auth/youtube.upload",
            "https://www.googleapis.com/auth/youtubepartner",
            "https://www.googleapis.com/auth/youtube",
            "https://www.googleapis.com/auth/youtube.force-ssl"]

const storage = multer.memoryStorage();
const uploadVideoFile = multer({storage}).single("videoFile");


const oAuth = youtube.authenticate({
  type: "oauth",
  client_id: credentials.web.client_id,
  client_secret: credentials.web.client_secret,
  redirect_url: credentials.web.redirect_uris[0]
});


app.post('/upload', urlEncoder, uploadVideoFile, (req, res)=>{
// console.log(oAuth);
 res.setHeader('Content-Type', 'application/json');
 res.setHeader('Access-Control-Allow-Origin', '*', 'X-Requested-With','XMLHttpRequest');
 res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
 if(req.file){
   const {title,description, category, audience, purpose, playlist} = req.body;
//   res.send('welcome');
//      require("openurl").open("http://google.it")
aurl = (oAuth.generateAuthUrl({
  access_type: "offline",
    scope: SCOPES,
    state: JSON.stringify({filename: req.file.originalname, title, description, category, audience, purpose, playlist}) }));
    desc = req.body.geoloc+":"+req.body.purpose+":"+req.body.title+":"+"italiano"+":"+req.body.content+":"+req.body.audience+":"+req.body.detail;
    res.redirect(aurl);
    //res.render('index', {url: aurl})
    //console.log(res.data);
    //console.log(aurl);
    //open(aurl);
    /*axios.get(url)
      .then(function(res){
          console.log(res);
      })*/
  }});

app.get('/', (req, res)=>{
  res.render("index", {url: aurl});
}) 
 
app.get('/oauth2callback', (req, res) =>{
        res.setHeader('Content-Type', 'application/json');
        res.send('welcome');
});
/*      res.redirect('site181924.tw.cs.unibo.it/success'); 
        const {filename, title, description, playlist} = JSON.parse(req.query.state);
        oAuth.getToken(req.query.code, (err,tokens)=>{
                if(err){
                  return console.error(err);
                 }
        oAuth.setCredentials(tokens);
        youtube.videos.insert({
                resource: {
                    snippet:{
                        title: title,
                        description: description + "\n" + desc},
                    status: {privacyStatus: "public"}
                   },
                   part: "snippet, status, id",
                   media:{
                        body: streamifier.createReadStream(filename)
                        }
                    },function(err, data){
                        if(err){
                           console.log(err);
                        }
                        console.log("Done");
                        youtube.playlistItems.insert({
                          part: "snippet, status, id",
                          resource:{
                                snippet:{
                                    playlistId: playlist,
                                    resourceId:{
                                        kind: "youtube#video",
                                        videoId: data.id
                                    }
                                },
                          status: {
                                privacyStatus: "public"
                                }
                            }
                        });
                      });
                    });
                });
*/
app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
