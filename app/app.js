'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);
var port = process.env.PORT || 3000;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// view engine setup
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(port);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(require('node-sass-middleware')({
  src: _path2.default.join(__dirname, 'public'),
  dest: _path2.default.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.use('/', _index2.default);
// app.use('/search', _search2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 去空格
app.locals.trimAll = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
};

// 替换关键字
app.locals.markWord = function (str, word) {
  var s = str.replace(decodeURI(word), '<b>' + decodeURI(word) + '</b>');
  return s;
};

// 编码URI
app.locals.decodeURI = function (str) {
  return decodeURI(str);
};

/*公共*/
// MD5加密
global.md5 = function (data) {
  var Buffer = require("buffer").Buffer;
  var buf = new Buffer(data);
  var str = buf.toString("binary");
  var crypto = require("crypto");
  return crypto.createHash("md5").update(str).digest("hex");
};
global.trimAll = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
};

module.exports = app;
//# sourceMappingURL=app.js.map
