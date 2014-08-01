(function() {
  var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    static = require('serve-static'),
    request = require('request'),
    config = require('./config.json');

  var app = express();

  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib());
  }

  app.set('views', __dirname + '/views');

  app.set('view engine', 'jade');

  app.use(logger('dev'));

  app.use(bodyParser.json());

  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  }));

  app.use(static(__dirname + '/public'));

  app.get('/', function (req, res) {
    res.render('index', {
      title : 'VIBE Receiver'
    });
  });

  app.get('/report', function(req, res) {
    request.get(config.apiURL + '/v1/vibes/' + req.query.clientId + '.json?clientId=' + req.query.clientId, function(error, response, body) {
      res.end(body);
    });
  });

  app.listen(4040);
}())
