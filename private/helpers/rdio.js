var Constants = require('./../constants');

var config = {
  rdio_api_key: Constants.RDIO.KEY,
  rdio_api_shared: Constants.RDIO.SECRET,
  callback_url: ''
}

var rdio = require('rdio')(config);

module.exports.search = function (query, callback) {
  rdio.api('', '', {
      method: 'search',
      query: query,
      types: 'Track',
      count: 10
  }, function(err, data, response) {
    data = JSON.parse(data);
    callback(data);
  });
};

