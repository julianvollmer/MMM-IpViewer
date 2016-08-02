"use strict";

var ip = require('ip');

module.exports = NodeHelper.create({
	start: function() {	
		
		this.checkMails();
 	},

 	checkMails: function(){
		this.updateIp();
 	},

	socketNotificationReceived: function(notification, payload) {
		
		if(notification === "CONNECTED"){
			console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
			this.updateIp();
		}

		if (notification === "LOG"){
			console.log("here" + JSON.stringify(payload));
		}
	},

	updateUi: function () {
		var self = this;
		setInterval(function() {
			self.checkMails();
		}, 5000);
	},

	updateIp: function() {
		var array = [];
		console.log(ip.address());
		array.push(ip.address());
		this.sendSocketNotification("GET_IP", array);
	}
});
