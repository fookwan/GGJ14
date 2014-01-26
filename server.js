/**
 * Module dependencies.
 */
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var env = process.env.NODE_ENV || 'development';
var dbConf = require('./config/database')[env];
var http = require('http');
var passport = require('passport');

if ((env === 'staging' || env === 'production')){require('newrelic');}

//declared globalFns as a global variable accessible to any file

//todo: make modular
globalFns = require('./globalFunctions');

var app = express();

//set global config from config/environment
app.locals({
  env_config: require('./config/environment')[env]
});

//connect to db from mongolab first or local if not production
var dbconnectstring = dbConf.url;
mongoose.connect(dbconnectstring, function(err){
  if (err){
    console.log('Error connecting to: ' + dbconnectstring + '. ' + err);
  }
  else {
    console.log('Succeeded connecting to: ' + dbconnectstring);
  }
});

var connection = mongoose.connection;
autoIncrement.initialize(connection);

//require all models recursively within the models folder
var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function(file){
  if (~file.indexOf('.js')){
    require(models_path + '/' + file);
  }
});

//configre express app
require('./config/express')(app, passport);

//routes
require('./router')(app);

//exposing app
exports = module.exports = app;

//Handle uncaught exceptions
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Server crash prevented....");
});

//if not testing, start the http server
if (!module.parent){
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}
