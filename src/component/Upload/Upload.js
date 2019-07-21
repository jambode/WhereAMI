
var util = require('util');
var fs = require('fs');
var http = require('http');
var spawn = require('child_process').spawn;
var querystring = require('querystring');
var url = require('url');
const {google} = require('googleapis')

var OAuth2 = google.auth.OAuth2;

var FILENAME = '/home/user/test.mp4';

// get these from https://console.developers.google.com/apis/credentials (don't forget to activate Youtube API)
var YOUR_CLIENT_ID = "947181775302-09if9o3nla9k6m6chmm4fvorsub9q98k.apps.googleusercontent.com";
var YOUR_CLIENT_SECRET = "gUpthzPYMV_FbtThXN0Z3Ypx";
var YOUR_REDIRECT_URL = "http://localhost:4000/oauth2callback";

var oauth2Client = new OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URL
);

// initialize the Youtube API library
var youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client
});

// very basic example of uploading a video to youtube
function uploadVideo() {

    var req = youtube.videos.insert({
        part: 'id,snippet,status',
        notifySubscribers: false,
        resource: {
            snippet: {
                title: 'Node.js YouTube Upload Test',
                description: 'Testing YouTube upload via Google APIs Node.js Client'
            },
            status: {
                privacyStatus: 'private'
            }
        },
        media: {
            body: fs.createReadStream(FILENAME)
        }
    }, function(err, data) {
        if (err) {
            console.error('Error: ' + err);
        }
        if (data) {
            console.log(util.inspect(data, false, null));
        }
        process.exit();
    });

    var fileSize = fs.statSync(FILENAME).size;

    // show some progress
    var id = setInterval(function() {
        var uploadedBytes = req.req.connection._bytesDispatched;
        var uploadedMBytes = uploadedBytes / 1000000;
        var progress = uploadedBytes > fileSize ? 100 : (uploadedBytes / fileSize) * 100;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(uploadedMBytes.toFixed(2) + ' MBs uploaded. ' +
            progress.toFixed(2) + '% completed.');
        if (progress === 100) {
            process.stdout.write('\nDone uploading, waiting for response...\n');
            clearInterval(id);
        }
    }, 250);
}

var scopes = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube'
];

var authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes.join(' ')
});

console.log("go to " + authorizeUrl + " to get authorization code");

var AUTHORIZATION_CODE = "947181775302-09if9o3nla9k6m6chmm4fvorsub9q98k"; 
oauth2Client.getToken(AUTHORIZATION_CODE, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if (!err) {
        oauth2Client.setCredentials(tokens);
        uploadVideo();
    } else {
        console.log(err);
    }
});