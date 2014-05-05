var AdminUser = function(socket){
	this.room;
	this.socket = socket;
	this.initialize();
};

AdminUser.prototype = {
	initialize : function(){
	},
	setRoom : function(room){
		this.room = room;

		var handler = (function(room){
			return function(question) { room.setQuestion(question);};
		})(room);
		this.socket.on('question',handler);

		handler = (function(room){
			return function() { room.start();};
		})(room);
		this.socket.on('start',handler);

		handler = (function(room){
			return function() { room.reset();};
		})(room);
		this.socket.on('reset',handler);

	},
/*
	onQuestion : function(room,question){
		room.setQuestion(question);	
	},
	onStart : function(room){

	},
	onReset : function(room){

	},
*/

};

 module.exports = AdminUser;
