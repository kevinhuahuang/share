var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var home = require('./routes/home');
var instruction = require('./routes/instruction');
var start_page = require('./routes/start');
var gap_min_table = require('./routes/waterfall_table');
var gap_min_scatter = require('./routes/waterfall_chart');
var waterfall_kline = require('./routes/waterfall');
var digital_process = require('./routes/digital_process');
var axon02 = require('./routes/axon02');
var guide = require('./routes/guide')
var resume = require('./routes/resume');
var others = require('./routes/others');
var dp7 = require('./routes/dp7');

var main = require('./routes/main')
var cellphone = require('./routes/cellphone')
var children = require('./routes/children')
var dress = require('./routes/dress')
var household = require('./routes/household')
var life = require('./routes/life')
var list = require('./routes/list')
var notepad = require('./routes/notepad')
var power = require('./routes/power')
var router = require('./routes/router')
var speaker = require('./routes/speaker')
var television = require('./routes/television')
var building = require('./routes/building')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('.html', require('ejs').__express);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', main);
app.use('/users', users);
app.use('/home', home);
app.use('/instruction', instruction);
app.use('/start_page', start_page);
app.use('/gap_min_table', gap_min_table);
app.use('/gap_min_scatter', gap_min_scatter);
app.use('/waterfall_kline', waterfall_kline);
app.use('/digital_process', digital_process);
app.use('/axon02', axon02);
app.use('/guide', guide);
app.use('/resume', resume);
app.use('/others', others);
app.use('/dp7', dp7);

app.use('/millet', main)
app.use('/cellphone', cellphone)
app.use('/children', children)
app.use('/dress', dress)
app.use('/household', household)
app.use('/life', life)
app.use('/list', list)
app.use('/notepad', notepad)
app.use('/power', power)
app.use('/router', router)
app.use('/speaker', speaker)
app.use('/television', television)
app.use('/building', building)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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







