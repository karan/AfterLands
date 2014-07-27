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

// add a song to a room
exports.addSong = function(req, res) {
  var song = req.body.song;
  var room_id = req.body.room_id;

  Room.findById(room_id, function(err, room) {
    room.songs.push(song);
    room.save(function(err, r) {
      res.send(200, r);
    });
  });
}
