var express = require('express');
require('coffee-script/register');
var google = require('googleapis');
var port = process.env.PORT || 8000;
var plus = google.plus('v1');


var app = express();
var OAuth2 = google.auth.OAuth2;

var CLIENT_ID = '83113483705-0plenscpkd5s3ttpem0ik1q046k5pkpn.apps.googleusercontent.com';
var CLIENT_SECRET = 'd17b752e0dee7b9020b8d98fa376a6f6';
var REDIRECT_URL = 'http://localhost:8000/oauth2callback';

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);


function getAccessToken(oauth2Client, res ) {
    // generate consent page url
    var url = oauth2Client.generateAuthUrl({
        access_type: 'online', // will return a refresh token
        scope: [
            'https://www.googleapis.com/auth/plus.me',
            'https://www.googleapis.com/auth/plus.login'
        ] // can be a space-delimited string or an array of scopes
    });



    res.redirect(url);
}


app.get('/', function(req,res){

    // retrieve an access token
    getAccessToken(oauth2Client, res, function() {
        // retrieve user profile
        plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, profile) {
            if (err) {
                console.log('An error occured', err);
                return;
            }
            console.log(profile.displayName, ':', profile.tagline);
        });
    });

});

app.get('/oauth2callback', function(req,res){
    var code = req.query.code;

    oauth2Client.getToken(code, function(err,tokens){

        if(!err){
           oauth2Client.setCredentials(tokens);
       }

        plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        });


    });
});

app.listen(port);

