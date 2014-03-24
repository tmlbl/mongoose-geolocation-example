/* Import node modules */
var express = require('express'),
    mongoose = require('mongoose'), 
    app = express();

/* Configuration */
app.configure(function () {
  app.use(express.bodyParser());
  app.use('/public', express.static(__dirname + '/public'));
});

/* Connect to db */
mongoose.connect('localhost', 'geoJSON');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Message = require('./models/message.js')(Schema, mongoose);

/* Render the message form */
app.get('/', function (req, res) {
  res.sendfile('views/index.html');
});

/* Save a new geoMessage from form */
app.post('/', function (req, res) {
  var msg = new Message({
    body: req.body.msg,
    loc: {
      type: 'Point',
      coordinates: [ parseFloat(req.body.lon), parseFloat(req.body.lat) ]
    }
  });
  msg.save(function (err, msg) {
    if (err) {
      res.send(err);
    } else {
      //res.send(msg);
      Message.find({ 
        loc: { 
          $nearSphere: msg.loc.coordinates,
          $maxDistance: 0.01
        }
      }, 
      function (err, docs) {
        if (err) {
          res.send(err);
        }
        res.send(docs);
      });
    }
  });
});

/* Hey! Listen! */
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Listening on ' + port);
});
