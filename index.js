var express = require('express'),
    http = require('http'),
    routes = require('./private/routes'),
    path = require('path'),
    db = require('./private/db/connect'),
    Constants = require('./private/constants');

var app = express();


app.configure(function(){
  app.set('port', process.env.PORT || 8888);
  // app.set('views', __dirname + '/webapp/html');
  // app.set('view engine', 'html');
  // app.engine('html', require('hbs').__express);
  // app.use(express.static(path.join(__dirname, 'webapp')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboard cat'));
  app.use(app.router);
});

//
// Routes
//

// auth
app.get('/', routes.index);

// get all close by rooms
// GET /getallnear/39.14,-36.13
app.get('/getallnear/:lat,:lon', routes.getAllNear);

// Make a new room
app.post('/make', routes.makeRoom);

// Add a song to a room
app.post('/addsong', routes.addSong);

// Search for songs on rdio
app.get('/search', routes.searchSong);

var server = http.createServer(app);
// // Connect to socket
// var io = require('socket.io')(server);
// var Room = require('./private/models/room');

// io.sockets.on('connection', function (socket) {

//   socket.on('joinRoom', function(room) {
//     console.log("connecting to room " + room);
//     socket.join(room);
//     // User.findById(room, function(err, u) {
//     //   socket.user = u;
//     //   routes.setOnline(u._id, true);
//     // });
//   });


//   // Sets up the user data
//   socket.on('sessionConnected', function (game, mode) {
//     console.log("connecting to other person " + JSON.stringify(game));
//     ProblemSession.findById(game.problemsession, function(err, ps) {
//       console.log("emit to other client");
//       ps.connected = true;
//       ps.save(function(err, ps) {
//         io.sockets.in(ps.user2).emit('connectToGame', game, mode);
//       });
//     });
//   });

//   socket.on('runTests', function (game, id) {
//     console.log(id);
//     for (var i = 0; i < game.users.length; ++i) {
//       if (game.users[i]._id !== id) {
//         console.log("in loop: " + game.users[i]._id);
//         io.sockets.in(game.users[i]._id).emit('runMyTests');
//       }
//     }
//   });

//   socket.on('disconnect', function () {
//     var userData = socket.user;
//     console.log("disconnect " + userData);
//     if (userData) {
//       routes.setOnline(userData._id, false);
//     }
//   });

// });

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
