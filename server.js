var express = require('express'),
    jade = require('jade'),
    _ = require('underscore'),
    app = express();

/* Configuration */
app.configure(function () {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/app/views');
  app.use(express.bodyParser());
  app.use('/public', express.static(__dirname + 'public'));
});

/* Index controller */
app.get('/', function (req, res) {
  res.render('index');
});

/* Listen */
var port = process.env.PORT || 5000;
app.listen(port, function () {
        console.log('Listening on ' + port);
});