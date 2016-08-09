var request             = require('superagent');
var Constants           = require('../constants/Constants');
var APIEndpoints        = Constants.APIEndpoints;
var redirect            = require('../actions/RouteActions').redirect;
var RouteStore          = require('../stores/RouteStore');
var ElementsStore       = require('../stores/ElementsStore');
var error               = require('../actions/ServerActions').error;
var showUsers           = require('../actions/ServerActions').showUsers;
var showWifi            = require('../actions/ServerActions').showWifi;
var showRooms           = require('../actions/ServerActions').showRooms;
var showLights          = require('../actions/ServerActions').showLights;
var showTvs             = require('../actions/ServerActions').showTvs;
var showAlarms          = require('../actions/ServerActions').showAlarms;
var showValves          = require('../actions/ServerActions').showValves;
var showIrrigationSistems  = require('../actions/ServerActions').showIrrigationSistems;
var showIrrigationSensors  = require('../actions/ServerActions').showIrrigationSensors;
var showLightSistems       = require('../actions/ServerActions').showLightSistems;
var showLightSensors       = require('../actions/ServerActions').showLightSensors;
var showLamps              = require('../actions/ServerActions').showLamps;
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
				if(res.status<400){
					var atoken= res.xhr.getResponseHeader("Authorization");
	        localStorage.setItem('Authorization', atoken );
	        redirect('rooms');
				}else{
					console.log("error");
				}

      }.bind(this));
  },

	getUsers: function() {
    request
      .get(APIEndpoints.PUBLIC + 'users')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					showUsers(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}


      });
  },
	deleteUser: function(id) {
    request
      .del(APIEndpoints.PUBLIC + 'users/' + id)
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					this.getUsers();
				}else{
					error("Ha ocurrido un error", res.status);
				}
      }.bind(this));
  },
	createUser: function(user) {
		console.log("user en utils", user);
    request
      .post(APIEndpoints.PUBLIC + 'users' )
			.send({user: user})
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					this.getUsers();
					redirect('users_configuration');
				}else{
					error("Ha ocurrido un error", res.status);
				}

      }.bind(this));
  },

	// REDES WIFI
	getWifi: function() {
    request
      .get(APIEndpoints.PUBLIC + 'network_configurations')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					showWifi(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}

      });
  },
	deleteWifi: function(id) {
    request
      .del(APIEndpoints.PUBLIC + 'network_configurations/' + id)
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					this.getWifi();
				}else{
					error("Ha ocurrido un error", res.status);
				}

      }.bind(this));
  },
	createWifi: function(wifi) {
    request
      .post(APIEndpoints.PUBLIC + 'network_configurations' )
			.send({network_configuration: wifi})
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					redirect('configuration');
				}else{
					error("Ha ocurrido un error", res.status);
				}

      }.bind(this));
  },
	selectWifi: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'network_configurations/' + id + '/current')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
				if(res.status<400){
					this.getWifi();
				}else{
					error("Ha ocurrido un error", res.status);
				}

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
				if(res.status<400){
					showRooms(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}

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
				if(res.status<400){
					showLights(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}

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
				if(res.status<400){
					this.getRooms();
				}else{
					error("Ha ocurrido un error", res.status);
				}

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
				if(res.status<400){
					this.getRooms();
				}else{
					error("Ha ocurrido un error", res.status);
				}

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
				if(res.status<400){
					showTvs(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}
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
				if(res.status<400){
					this.getRooms();
				}else{
					error("Ha ocurrido un error", res.status);
				}
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
				if(res.status<400){
					this.getRooms();
				}else{
					error("Ha ocurrido un error", res.status);
				}
      }.bind(this));
  },
	openValve: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'valves/' + id +'/open')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					this.getRooms();
				}else{
					error("Ha ocurrido un error", res.status);
				}

      }.bind(this));
  },
  closeValve: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'valves/' + id +'/close')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					this.getRooms();
				}else{
					error("Ha ocurrido un error", res.status);
				}

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
				if(res.status<400){
					showAlarms(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}
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
				if(res.status<400){
					redirect('alarms');
				}else{
					error("Ha ocurrido un error", res.status);
				}
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
				if(res.status<400){
					this.getAlarms();
				}else{
					error("Ha ocurrido un error", res.status);
				}
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
				if(res.status<400){
					this.getAlarms();
				}else{
					error("Ha ocurrido un error", res.status);
				}
      }.bind(this));
  },
	desactivateAlarm: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'alarms/' + id +'/inactivate')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					this.getAlarms();
				}else{
					error("Ha ocurrido un error", res.status);
				}
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
				if(res.status<400){
					showMotionSensors(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}
      });
  },

	// LIGHT SYSTEMS
	getLightSystems: function() {
    request
      .get(APIEndpoints.PUBLIC + 'lighting_systems')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					showLightSistems(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}

      });
  },

	createLightSystem: function(data) {
    request
			.post(APIEndpoints.PUBLIC + 'lighting_systems')
			.send({lighting_system: {name: data.name, description: data.description, luminosity_sensors_ids: data.sensors_ids, lights_ids: data.lamps_ids}})
			.set('Accept', 'application/json')
			.set('Authorization', localStorage.getItem('Authorization'))
			.end(function(res) {
				var text = JSON.parse(res.text);
				var code = JSON.parse(res.status);
				if(res.status<400){
					redirect('light_systems');
				}else{
					error("Ha ocurrido un error", res.status);
				}
      });
  },
	updateLightSystem: function(threshold, id){
    request
			.patch(APIEndpoints.PUBLIC + 'lighting_systems/' + id)
			.send({lighting_system: {luminosity_threshold: threshold}})
			.set('Accept', 'application/json')
			.set('Authorization', localStorage.getItem('Authorization'))
			.end(function(res) {
				var text = JSON.parse(res.text);
				var code = JSON.parse(res.status);
				if(res.status<400){
					this.getLightSystems();
				}else{
					error("Ha ocurrido un error", res.status);
				}
      }.bind(this));
  },

	enableLightSystem: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'lighting_systems/' + id +'/enable')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					this.getLightSystems();
				}else{
					error("Ha ocurrido un error", res.status);
				}

      }.bind(this));
  },
  desableLightSystem: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'lighting_systems/' + id +'/disable')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					this.getLightSystems();
				}else{
					error("Ha ocurrido un error", res.status);
				}

      }.bind(this));
  },

	getLightSensors: function() {
    request
      .get(APIEndpoints.PUBLIC + 'luminosity_sensors')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					showLightSensors(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}
      });
  },

	 getLamps: function() {
		request
			.get(APIEndpoints.PUBLIC + 'lights')
			.set('Accept', 'application/json')
			.set('Authorization', localStorage.getItem('Authorization'))
			.end(function(res) {
				var text = JSON.parse(res.text);
				var code = JSON.parse(res.status);
				if(res.status<400){
					showLamps(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}

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
				if(res.status<400){
					showIrrigationSistems(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}
      });
  },
	updateIrrigationSystem: function(threshold, id){
    request
			.patch(APIEndpoints.PUBLIC + 'irrigation_systems/' + id)
			.send({irrigation_system: {humidity_threshold: threshold}})
			.set('Accept', 'application/json')
			.set('Authorization', localStorage.getItem('Authorization'))
			.end(function(res) {
				var text = JSON.parse(res.text);
				var code = JSON.parse(res.status);
				if(res.status<400){
					this.getIrrigationSystems();
				}else{
					error("Ha ocurrido un error", res.status);
				}
      }.bind(this));
  },
	createIrrigationSystem: function(data) {
		console.log(data, "DATA");
    request
			.post(APIEndpoints.PUBLIC + 'irrigation_systems')
			.send({irrigation_system: {name: data.name, description: data.description, soil_humidity_sensors_ids: data.soil_humidity_sensors_ids, valves_ids: data.valves_ids}})
			.set('Accept', 'application/json')
			.set('Authorization', localStorage.getItem('Authorization'))
			.end(function(res) {
				var text = JSON.parse(res.text);
				var code = JSON.parse(res.status);
				if(res.status<400){
					redirect('irrigation_systems');
				}else{
					error("Ha ocurrido un error", res.status);
				}
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
				if(res.status<400){
					this.getIrrigationSystems();
				}else{
					error("Ha ocurrido un error", res.status);
				}

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
				if(res.status<400){
					this.getIrrigationSystems();
				}else{
					error("Ha ocurrido un error", res.status);
				}

      }.bind(this));
  },
	getIrrigationSensors: function() {
    request
      .get(APIEndpoints.PUBLIC + 'soil_humidity_sensors')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					showIrrigationSensors(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}

      });
  },

	getValves: function() {
    request
      .get(APIEndpoints.PUBLIC + 'valves')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				if(res.status<400){
					showValves(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}
      });
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
				if(res.status<400){
					showTemperatureSensors(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}
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
				if(res.status<400){
					showHumiditySensors(text);
				}else{
					error("Ha ocurrido un error", res.status);
				}

			});
	},

};
