

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var subdomain = require('wildcard-subdomains');
var router = express.Router();
var routes = require('./routes/index');
var config = require('./config/config');
var compression = require('compression')
var app = express();

//TFS-2412
var xFrameOptions = require('x-frame-options');
app.use(xFrameOptions('Sameorigin'));
var middleware = xFrameOptions(headerValue = 'sameorigin');
router.use(xFrameOptions('Sameorigin'));
router.get('/', function (req, res) {
    res.get('x-frame-options');
});
//END TFS#2412

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function nowww(request, response, next) {
    var protocol = 'http' + (request.connection.encrypted ? 's' : '') + '://'
      , host = request.headers.host
      , href
      ;
      
    if (!/^www\./i.test(host)) {
      next();
      return;
    }
    // remove www.
    host = host.replace(/^www\./i, '');
    href = protocol + host + request.url;
    response.statusCode = 301;
    response.setHeader('Location', href);
    response.write('Redirecting to ' + host + request.url + '');
    response.end();
}
);
app.use(subdomain({
  domains: config.domains,
  www: 'true'
}));

app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //next(err);
  next();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
