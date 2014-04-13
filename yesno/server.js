// Express
var express = require('express')
  , http = require('http')
  , app = express()
  , allcount = 0
  , yescount = 0
  ;

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app).listen(3000);
console.log('server start:', 3000);

// Socket.IO
var io = require('socket.io')
  , io = io.listen(server)
  ;

var admin_sockets={};
var admin_socket;

const STATE_WAIT 		= 'wait';
const STATE_RUNNING 	= 'running';
const STATE_RESULT 		= 'result';
const STATE_FINISHED 	= 'finished';

var state = STATE_WAIT;
io.sockets
.on('connection', function(socket) {
	console.log("guest connection success");
  io.sockets.emit('login', socket.id);
  io.sockets.emit('state', state);

  socket.on('post', function(data) {
	allcount++;
	if(data==true){
		yescount++;
	}
    admin_socket.emit('post', { 
		allcount: allcount,
		yescount: yescount
	 });
  });
});

/*
  */


io.of('/admin').on('connection',function(socket){
	console.log("admin connection success");
    //io.sockets.emit('welcome', socket.id);
	socket.emit('welcome',socket.id);
	admin_sockets[socket.id] = socket;
	admin_socket = socket;
  socket.on('reset', function(data) {
	state = STATE_RESULT;
    io.sockets.emit('state',state); 
    io.sockets.emit('result',{ 
		allcount: allcount,
		yescount: yescount
	 });
	yescount=0;
	allcount=0;
  });

  socket.on('start', function(title) {
	state = STATE_RUNNING;
    io.sockets.emit('state', state); 
    io.sockets.emit('upd_ttl', { 
		title:title
	});
  });
});

