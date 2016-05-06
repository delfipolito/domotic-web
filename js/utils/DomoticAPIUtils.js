var request             = require('superagent');
var Constants           = require('../constants/Constants');
var APIEndpoints        = Constants.APIEndpoints;
var redirect            = require('../actions/RouteActions').redirect;
var RouteStore          = require('../stores/RouteStore');
var Store               = require('../stores/Store');
var showRooms           = require('../actions/ServerActions').showRooms;
var showLights          = require('../actions/ServerActions').showLights;
var showTvs             = require('../actions/ServerActions').showTvs;
var showAlarms          = require('../actions/ServerActions').showAlarms;
var showIrrigationSistems  = require('../actions/ServerActions').showIrrigationSistems;
var showMotionSensors      = require('../actions/ServerActions').showMotionSensors;
var showTemperatureSensors = require('../actions/ServerActions').showTemperatureSensors;
var showHumiditySensors    = require('../actions/ServerActions').showHumiditySensors;

module.exports = {

	login: function(email, password) {
    request
      .post(APIEndpoints.PUBLIC + 'login')
      .send({user:{email: email, password: password}})
      .set('Accept', 'application/json')
      .end(function(res) {
        var atoken= res.xhr.getResponseHeader("Authorization");
        localStorage.setItem('Authorization', res.xhr.getAllResponseHeaders() );
        redirect('lights');
      }.bind(this));
  },

	// HABITACIONES
  getRooms: function() {
    request
      .get(APIEndpoints.PUBLIC + 'rooms')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				console.log("HABITACIONES", text);
        showRooms(text);

      });
  },

  // LUCES
  getLights: function() {
    request
      .get(APIEndpoints.PUBLIC + 'lights')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
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
      .set('Authorization', localStorage.getItem('Authorization'))
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
      .set('Authorization', localStorage.getItem('Authorization'))
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
      .set('Authorization', localStorage.getItem('Authorization'))
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
      .set('Authorization', localStorage.getItem('Authorization'))
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
      .set('Authorization', localStorage.getItem('Authorization'))
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
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);

          showAlarms(text);

      });
  },
	createAlarm: function(data) {
		console.log("in api utils", data.motion_sensors_ids);
    request
			.post(APIEndpoints.PUBLIC + 'alarms/')
			.send({alarm: {name: data.name, description: data.description, motion_sensors_ids: data.motion_sensors_ids}})
			.set('Accept', 'application/json')
			.set('Authorization', localStorage.getItem('Authorization'))
			.end(function(res) {
				var text = JSON.parse(res.text);
				var code = JSON.parse(res.status);
					redirect('alarms');

      });
  },
  enableAlarm: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'alarms/' + id +'/enable')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
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
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);

          this.getAlarms();

      }.bind(this));
  },

  getMotionSensors: function() {
    request
      .get(APIEndpoints.PUBLIC + 'motion_sensors')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);

          showMotionSensors(text);

      });
  },

	// IRRIGATION SYSTEMS
  getIrrigationSystems: function() {
    request
      .get(APIEndpoints.PUBLIC + 'irrigation_systems')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);

          showIrrigationSistems(text);

      });
  },

	enableIrrigationSystem: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'irrigation_systems/' + id +'/enable')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);

          this.getIrrigationSystems();

      }.bind(this));
  },
  desableIrrigationSystem: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'irrigation_systems/' + id +'/disable')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);

          this.getIrrigationSystems();

      }.bind(this));
  },

  // TEMPERATURE SENSORS
  getTemperatureSensors: function() {
    request
      .get(APIEndpoints.PUBLIC + 'temperature_sensors')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);

          showTemperatureSensors(text);

      });
  },

	// HUMIDITY SENSORS
	getHumiditySensors: function() {
		request
			.get(APIEndpoints.PUBLIC + 'humidity_sensors')
			.set('Accept', 'application/json')
			.set('Authorization', localStorage.getItem('Authorization'))
			.end(function(res) {
				var text = JSON.parse(res.text);
				var code = JSON.parse(res.status);

					showHumiditySensors(text);

			});
	},

};
