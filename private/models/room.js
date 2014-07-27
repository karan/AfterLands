/*
  Schema for a room.
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var roomSchema = new Schema({
  created_at: {
    // auto added user registration timestamp
    type: Date,
    default: Date.now
  },
  room_name: String,
  active: Boolean,
  mood: String,
  songs: Object,  // list of Rdio song objects
  location: {
    'lat': Number,
    'lon': Number
  },
  num_people: Number
});


module.exports = mongoose.model('Room', roomSchema);
