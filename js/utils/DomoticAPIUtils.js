var request             = require('superagent');
var Constants           = require('../constants/Constants');
var APIEndpoints        = Constants.APIEndpoints;
var RouteStore          = require('../stores/RouteStore');
var Store               = require('../stores/Store');
var showLights          = require('../actions/ServerActions').showLights;
var showTvs             = require('../actions/ServerActions').showTvs;
var showAlarms          = require('../actions/ServerActions').showAlarms;
var showTemperatureSensors = require('../actions/ServerActions').showTemperatureSensors;

module.exports = {
  
	login: function() {
		console.log("login");
    request
      .post(APIEndpoints.PUBLIC + 'login')
      .send({user:{email: "facundo_spagnuolo@icloud.com", password: "1234567812345678"}})
      .set('Accept', 'application/json')
      .end(function(res) {
        console.log("login", res);
      
        	console.log("light");
          this.getLights();
        
      }.bind(this));
  },

  // LUCES
  getLights: function() {
    request
      .get(APIEndpoints.PUBLIC + 'lights')
      .set('Accept', 'application/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        console.log("lights", res);
     
          showLights(text);
        
      });
  },
  switchLightOn: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'lights/' + id +'/switch_on')
      .set('Accept', 'application/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        console.log("lights", res);
     
          this.getLights();
        
      }.bind(this));
  },
  switchLightOff: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'lights/' + id +'/switch_off')
      .set('Accept', 'application/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        console.log("lights", res);
     
          this.getLights();
        
      }.bind(this));
  },

  // TELEVISION
  getTvs: function() {
    request
      .get(APIEndpoints.PUBLIC + 'tvs')
      .set('Accept', 'application/json')
      .end(function(res) {
        console.log("tvs", res);
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
     
          showTvs(text);
        
      });
  },
  switchTvOn: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'tvs/' + id +'/turn_on')
      .set('Accept', 'application/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        console.log("tvs", res);
     
          this.getTvs();
        
      }.bind(this));
  },
  switchTvOff: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'tvs/' + id +'/turn_off')
      .set('Accept', 'application/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
     
          this.getTvs();
        
      }.bind(this));
  },
  // ALARMS
  getAlarms: function() {
    request
      .get(APIEndpoints.PUBLIC + 'alarms')
      .set('Accept', 'application/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
     
          showAlarms(text);
        
      });
  },
  enableAlarm: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'alarms/' + id +'/enable')
      .set('Accept', 'application/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
     
          this.getAlarms();
        
      }.bind(this));
  },
  desableAlarm: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'alarms/' + id +'/disable')
      .set('Accept', 'application/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
     
          this.getAlarms();
        
      }.bind(this));
  },

  // TEMPERATURE SENSORS
  getTemperatureSensors: function() {
    request
      .get(APIEndpoints.PUBLIC + 'temperature_sensors')
      .set('Accept', 'application/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
     
          showTemperatureSensors(text);
        
      });
  },
  
};
