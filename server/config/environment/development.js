'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://heroku_app27834486:met3h9hh26b262843deh916e6d@ds053469.mongolab.com:53469/heroku_app27834486'
  },
  redis: {
    url: 'redis://redistogo:4a1b6dd43dacfe05a41a752f6fd30824@hoki.redistogo.com:9109/'
  },
  seedDB: true
};
