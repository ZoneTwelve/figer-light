var exprango = require("exprango");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();
exprango.upgrade( app );

var appConfig = require("./modules/app/config.js");

// view engine setup
// let moduleViews = [
//   path.join(__dirname, "modules", "app", "views"),
// ];
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// exprango need to do this.
// let layouts = [ 
//   path.join( __dirname, "modules", "app", "views", "layouts" ) 
// ];
// let hbsEngine = engine({ extname: '.hbs', layoutsDir: path.resolve( __dirname, 'templates' ), layouts });
// app.engine( 'hbs', hbsEngine );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req,res, next) => {
  // check if is under /app, if not, redirect to /app
  if(req.path.indexOf("/app") != 0){
    res.redirect("/app");
  }else{
    next();
  }
});

app.modular( "app", appConfig );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
