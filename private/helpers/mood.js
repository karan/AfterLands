var Gracenote = require("node-gracenote");
var Constants = require('./../constants');

var clientId = Constants.GRACENOTE.CLIENT_ID;
var clientTag = Constants.GRACENOTE.CLIENT_TAG;
var userId = Constants.GRACENOTE.USER;

var api = new Gracenote(clientId, clientTag, userId);

// Returns the moods of the passed options
// [
//   {
//     "id": "42955",
//     "text": "Urgent"
//   },
//   {
//     "id": "65351",
//     "text": "Energetic Anxious"
//   }
// ]
module.exports.getMoods = function(artistName, albumTitle, trackTitle, callback) {
  api.searchTrack(artistName, albumTitle, trackTitle, function(result) {
    var moods = result[0]['tracks'][0]['mood'];
    var result = [];
    for (var i = 0; i < moods.length; i++) {
      result.push(moods[i].text);
    }
    callback(result);
  }, Gracenote.BEST_MATCH_ONLY);
}
