var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var winston = require('./config/winston');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signUp = require('./routes/register');
var auth = require('./routes/auth');
var config = require('./config');
var passport = require('passport');
var recipe = require('./routes/recipe');
var cors = require('./middlewares/cors');
require('./config/passport');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);
// url like
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var user = require('./routes/user');  // user profil need auth
app.use('/signup',signUp);
app.use('/signin', auth); // login action
app.use('/createrecipe',recipe);
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
require('./models');  //required!
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.set('port', config.get('port'));
process.env.PORT = config.get('port');
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', passport.authenticate('jwt', {session: false}), usersRouter); // admin
app.use('/admin', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  if(req.app.get('env') === 'development'){
    res.locals.error = err;
    errorHandler()(err, req, res, next);
  }
  else {
    res.locals.error = {};
    res.status(500);
    res.render('error');
  }
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  // render the error page
  res.status(err.status || 500).render('error');
});

module.exports = app;
