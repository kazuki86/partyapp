var Player = require('./player');

const STATE_WAIT 		= 'wait';
const STATE_RUNNING 	= 'running';
const STATE_RESULT 		= 'result';
const STATE_FINISHED 	= 'finished';

var Room = function(roomName)
{
	this.roomName = roomName;
	this.playerList = new Array(0);
	//this.playerSockets;
	this.adminUser;
	this.allCount = 0;
	this.yesCount = 0;
	this.question = "";
	this.state = STATE_WAIT;
};

Room.prototype = {
	getRoomName : function(){
		return this.roomName;
	},
	joinPlayer : function(player){
		this.playerList.push(player);
		player.setRoom(this);
	},
	getPlayerCount : function(){
		return this.playerList.length;
	},
	addAdmin : function(adminUser){
		this.adminUser = adminUser;
		this.adminUser.setRoom(this);
	},
	getAdminSockets : function(){
		return this.adminUser.socket;
	},
	getState : function(){
		return this.state;
	},
	setState : function(state){
		this.state = state;
	},
	addYes : function(){
		this.allCount++;
		this.yesCount++;
	},
	addNo : function(){
		this.allCount++;
	},
	clear : function(){
		this.allCount = 0;
		this.yesCount = 0;
	},
	setQuestion : function(question){
		console.log('question-----');
		this.question = question;
	},
	start : function(){
		this.state = STATE_RUNNING;
		
		for(var i=0; i < this.playerList.length; i++){
			var socket = this.playerList[i].socket;
			socket.emit('state',this.state);
			socket.emit('upd_ttl',{title:this.question});
		}
	},
	reset : function(){
		this.state = STATE_RESULT;
		for(var i=0; i < this.playerList.length; i++){
			var socket = this.playerList[i].socket;
			socket.emit('state',this.state);
			socket.emit('result',{ 
				allcount : this.allCount,
				yescount : this.yesCount
	 		});
		}
	},
	updateAdmin : function(){
		this.getAdminSockets().emit('post',{
			allcount : this.allCount,
			yescount : this.yesCount
		});
	},
	onPostByPlayer : function(type){
		console.log('post in room object');
		if (type == true){
			this.addYes();
		}else{
			this.addNo();
		}
		this.updateAdmin();
	},
	
};

	
		
	
module.exports = Room;	
