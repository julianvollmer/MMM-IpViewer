Module.register("MMM-IpViewer",{
    defaults: {
        text: "Hello World!",
        lists: "some list",
        itemsCount: "3",
        
    },

    socketNotificationReceived: function(notification, payload) {

        if(notification === 'GET_IP'){
          this.ips = payload;
          this.updateDom(3000); 
        }


        this.sendSocketNotification("LOG", payload);
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("table");  
        wrapper.className = "normal small light";
        if(this.ips.length === 0){
          wrapper.innerHTML = "Keine Ip vergeben"
        }
        else{
          for (var i = 0; i < this.config.itemsCount && i < this.ips.length; i++) {
              var titleWrapper = document.createElement("tr");
              titleWrapper.innerHTML = this.ips[i];
              titleWrapper.className = "title bright";
              wrapper.appendChild(titleWrapper);
          }
        }

        return wrapper;
        
    },

    start: function() {        
        this.ips = [];
        this.sendSocketNotification("CONNECTED", "connected");
        this.update();
    },

    update: function () {
        this.sendSocketNotification("UPDATEUI", "options");
    }
});
