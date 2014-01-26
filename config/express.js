var express = require('express');
var swig  = require('swig');
var config = require('./config');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(express);
var env = process.env.NODE_ENV || 'development';
var dbConf = require('./database')[env];

module.exports = function(app, passport){

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', config.rootPath + '/views');

    // This is where all the magic happens!
    app.engine('html', swig.renderFile);

    app.set('view engine', 'html');

    // Swig will cache templates for you, but you can disable
    // that and use Express's caching instead, if you like:
    app.set('view cache', false);
    // To disable Swig's cache, do the following:
    swig.setDefaults({ cache: false });
    // NOTE: You should always cache templates in a production environment.
    // Don't leave both of these to `false` in production!


    app.use(express.favicon());
    if (env === 'development' || env === 'production') //don't use logger in test
      app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    if (env === 'development' || env === 'production') { //persistent sessions only in development and production
      app.use(express.session({
        secret: 'secretkey',
        maxAge: new Date(Date.now() + 3600000),
        store: new MongoStore({
          url: dbConf.url,
          collection: 'sessions'
        })
      }));
    } else { //don't use mongostore persistent sessions in test environment
      app.use(express.session({
        secret: 'secretkey'
      }));
    }
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function(req, res, next){
      res.locals.current_user = req.user;
      next();
    });
    app.use(app.router);
    app.use(express.static(config.rootPath + '/public'));
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
    mongoose.set('debug', true);
  });

}