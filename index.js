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
// Connect to socket
var io = require('socket.io')(server);
var Room = require('./private/models/room');

io.sockets.on('connection', function (socket) {

  socket.on('joinRoom', function(room_id) {
    console.log("connecting to room " + room);
    socket.partyRoom = room_id;
    socket.join(room_id);
    routes.userIncrease(room_id, function(room) {
      io.sockets.in(room_id).emit('userAdded', room);
    });
  });


  socket.on('disconnect', function () {
    var room_id = socket.partyRoom;
    console.log("disconnect from" + room_id);
    if (room_id) {
      routes.userDecrease(room_id);
    }
  });

});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
