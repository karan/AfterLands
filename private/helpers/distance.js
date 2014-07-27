// return the distance between two coordinates in metres
module.exports.getDistanceFromLatLonInM = function(lat1, lon1, lat2, lon2) {
  console.log(lat1 + ' ' + lon1 + ' ' + lat2 + ' ' + lon2);
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  console.log(d);
  return d * 1000;

  function deg2rad(deg) {
    console.log("deg: " + deg);
    return deg * (Math.PI / 180)
  }
}
