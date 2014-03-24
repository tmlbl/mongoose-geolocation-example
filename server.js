var express = require('express'),
    jade = require('jade'),
    _ = require('underscore'),
    mongoose = require('mongoose'), 
    app = express();

/* Configuration */
app.configure(function () {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/app/views');
  app.use(express.bodyParser());
  app.use('/public', express.static(__dirname + '/public'));
});

/* Connect to db */
mongoose.connect('localhost', 'geoJSON');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Post = require('./models/post.js')(Schema, mongoose);

/* Find posts near Code Fellows */
app.get('/', function (req, res) {
  Post.find({ 
    loc: { 
      $nearSphere: [ -122.3360289,  47.6233918 ],
      $maxDistance: 0.01
    }
  }, 
  function (err, docs) {
    if (err) {
      res.send(err);
    }
    res.send(docs);
  });
});

/* Render the message form */
app.get('/geo', function (req, res) {
  res.render('index');
});

/* Save a new geoMessage from form */
app.post('/geo', function (req, res) {
  var post = new Post({
    body: req.body.msg,
    loc: {
      type: 'Point',
      coordinates: [ parseFloat(req.body.lon), parseFloat(req.body.lat) ]
    }
  });
  post.save(function (err, post) {
    if (err) {
      res.send(err);
    } else {
      //res.send(post);
      Post.find({ 
        loc: { 
          $nearSphere: post.loc.coordinates,
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