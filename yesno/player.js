var Player = function(socket){
	this.name = "";
	this.socket = socket;
	this.alive = true;
	this.room;
	this.socket.on('post',this.onPost);
};

Player.prototype = {
	onPost : function(type){
		console.log('post:');
	},
	setRoom : function(room){
		this.room = room;
		this.initializeEventHandler();
	},
	initializeEventHandler : function(){
		var handler = (function(room){
			return function(type) { room.onPostByPlayer(type); };
		})(this.room);
		this.socket.on('post',handler);
	},
}

 module.exports = Player;
