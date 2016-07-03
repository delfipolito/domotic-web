var request             = require('superagent');
var Constants           = require('../constants/Constants');
var APIEndpoints        = Constants.APIEndpoints;
var redirect            = require('../actions/RouteActions').redirect;
var RouteStore          = require('../stores/RouteStore');
var Store               = require('../stores/Store');
var showUsers           = require('../actions/ServerActions').showUsers;
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
	        redirect('lights');
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
        showUsers(text);

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
        this.getUsers();

      }.bind(this));
  },
	createUser: function(user) {
		console.log("user en utils", user);
    request
      .post(APIEndpoints.PUBLIC + 'users/' )
			.send({user: user})
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        this.getUsers();
				redirect('users_configuration');

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

	// LIGHT SYSTEMS
	getLightSystems: function() {
    request
      .get(APIEndpoints.PUBLIC + 'lighting_systems')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);

       showLightSistems(text);

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
					redirect('light_systems');

      });
  },

	enableLightSystem: function(id) {
    request
      .post(APIEndpoints.PUBLIC + 'lighting_systems/' + id +'/enable')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);

          this.getLightSystems();

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

          this.getLightSystems();

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
				console.log(res);
          showLightSensors(text);

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
				console.log("lights", res);

					showLamps(text);

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
					redirect('irrigation_systems');

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
	getIrrigationSensors: function() {
    request
      .get(APIEndpoints.PUBLIC + 'soil_humidity_sensors')
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('Authorization'))
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
				console.log(res);
          showIrrigationSensors(text);

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
				console.log(res);
          showValves(text);

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
