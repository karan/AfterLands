'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://heroku_app27834486:met3h9hh26b262843deh916e6d@ds053469.mongolab.com:53469/heroku_app27834486'
  },

  // Redis
  redis: {
    url: process.env.REDISTOGO_URL ||
         'redis://redistogo:4a1b6dd43dacfe05a41a752f6fd30824@hoki.redistogo.com:9109/'
  }
};
