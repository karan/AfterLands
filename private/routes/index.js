var request = require('request');
var async = require('async');
var Room = require('./../models/room');
var Constants = require('./../constants');

exports.index = function (req, res){
  return res.render('index');
};

// Main functions

// Make a new room
exports.makeRoom = function(req, res) {
  var newRoom = new Room({
    name: req.body.room_name,
    active: true,
    mood: '',
    songs: [],
    location: { 'lat': +req.body.lat, 'lon': +req.body.lon }
  });

  newRoom.save(function(err, nr) {
    res.send(200, nr);
  });
}

// get rooms near a location
exports.getAllNear = function(req, res) {
  var lat = +req.params.lat;
  var lon = +req.params.lon;

  Room.find(function(err, rooms) {
    if (err) {
      return res.send(500, {
        'response': 'fail',
        'errors': 'Something went wrong. Please try again later.'
      });
    }

    var result = [];

    for (var i = 0; i < rooms.length; i++) {
      var curRoom = rooms[i].toObject();
      var distance = require('./../helpers/distance.js').getDistanceFromLatLonInM(
        lat, lon,
        curRoom.location.lat, curRoom.location.lon);

      if (distance <= Constants.maxDistance) {
        console.log(distance);
        curRoom["distance"] = distance;
        result.push(curRoom);
      }
    }

    res.send(200, {
      'response': 'ok',
      'rooms': result
    });

  });
};


