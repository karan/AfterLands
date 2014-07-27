var request = require('request');
var Room = require('./../models/room');
var Constants = require('./../constants');

exports.index = function (req, res){
  res.send('AfterLands');
};

// Main functions

// Make a new room
exports.makeRoom = function(req, res) {
  var newRoom = new Room({
    room_name: req.body.room_name,
    active: true,
    mood: '',
    songs: [],
    location: { 'lat': +req.body.lat, 'lon': +req.body.lon },
    num_people: 0
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
    require('./../helpers/mood').getMoods(song.artist, song.album, song.name, function(moods) {
      song.moods = moods;
      require('./../helpers/mode').mode(moods, function(mood) {
        room.songs.push(song);
        room.mood = mood;
        room.save(function(err, r) {
          res.send(200, r);
        });
      });
    });
  });
}

// search for a song on Rdio
exports.searchSong = function(req, res) {
  var query = req.query.query;
  require('./../helpers/rdio.js').search(query, function(results) {
    res.send(200, results);
  });
}

// returns the room object as defined by room id
exports.getRoom = function(req, res) {
  var room_id = req.params.room_id;
  Room.findById(room_id, function(err, room) {
    res.send(200, room);
  });
}


// Handlers for socket

exports.userIncrease = function(room_id, callback) {
  Room.findById(room_id, function(err, room) {
    if (!room) return callback(null);
    room.num_people += 1;
    room.save(function(err, r) {
      callback(r);
    });
  });
}

exports.userDecrease = function(room_id, callback) {
  Room.findById(room_id, function(err, room) {
    if (!room) return callback(null);
    room.num_people -= 1;
    room.save(function(err, r) {
      callback(r);
    });
  });
}
