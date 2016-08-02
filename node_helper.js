"use strict";

var ip = require('ip');

module.exports = NodeHelper.create({

	socketNotificationReceived: function(notification, payload) {
		
		if(notification === "CONNECTED"){
			console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
			this.updateUi();
		}

		if (notification === "LOG"){
			console.log("here" + JSON.stringify(payload));
		}
	},

	updateUi: function () {
		var self = this;
		setInterval(function() {
			self.updateIp();
		}, 50000);
	},

	updateIp: function() {
		var array = [];
		console.log(ip.address());
		array.push(ip.address());
		this.sendSocketNotification("GET_IP", array);
	}
});
