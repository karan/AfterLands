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

app.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, access');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
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

// Get details of a room
app.get('/room/:room_id', routes.getRoom);

var server = http.createServer(app);
// Connect to socket
var io = require('socket.io')(server);
var Room = require('./private/models/room');

io.sockets.on('connection', function (socket) {

  console.log("someone connected");

  socket.on('joinRoom', function(room_id) {
    console.log("connecting to room " + room_id);
    socket.partyRoom = room_id;
    socket.join(room_id);
    routes.userIncrease(room_id, function(room) {
      if (room)
        io.sockets.in(room_id).emit('userChange', room.num_people);
    });
  });


  socket.on('pause', function(room_id) {
    io.sockets.in(room_id).emit('pause');
  });


  socket.on('play', function(room_id) {
    io.sockets.in(room_id).emit('play');
  });


  socket.on('nextSong', function(room_id) {
    io.sockets.in(room_id).emit('nextSong');
  });


  socket.on('disconnect', function () {
    var room_id = socket.partyRoom;
    console.log("disconnect from" + room_id);
    if (room_id) {
      routes.userDecrease(room_id, function(room) {
        if (room)
          io.sockets.in(room_id).emit('userChange', room.num_people);
      });
    }
  });

});

server.listen(app.get('port'), '0.0.0.0', function(){
  console.log('Express server listening on port ' + app.get('port'));
});
