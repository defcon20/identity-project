var express = require('express');
var port = process.env.PORT || 8000;

var app = express();

app.get('/', function(req,res){


    res.send("Hello World");


});

app.get('/test1', function(req,res){

    res.send("Test 1");


});


app.listen(port);

