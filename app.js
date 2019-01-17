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
var register = require('./routes/register');
var auth = require('./routes/auth');
var config = require('./config');
var session = require('express-session');
var pool = require('pg-pool');
var pgSession = require('connect-pg-simple')(session);
var passport = require('passport');
require('./config/passport');

var app = express();
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const user = require('./routes/user');
app.use('/user', passport.authenticate('jwt', {session: false}), user);
app.use('/auth', auth);

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

app.use(session({
  store: new pgSession({
    pool: new pool({
      database: 'itra',
      user: 'postgres',
      password: 'postgres',
      port: 5432,
      max: 20,
      min: 4,
      //idleTimeoutMillis: 1000, // close idle clients after 1 second
      //connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
    })
  }),
  secret: config.get('session:secret'),
  key: config.get('session:secret'),
  cookie: config.get('session:cookie'),
  resave: false,
  conString: config.get('db_connect_str'),
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
var router = express.Router();
app.post('/signin', (req,res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  return res.json(req.body)
});
//app.use()
app.use('/error', function (req, res, next) {
  throw new Error('Tst');
});

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
  //res.status(err.status || 500);
  //res.render('error');

});

module.exports = app;
