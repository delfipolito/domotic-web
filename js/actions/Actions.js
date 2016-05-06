var DomoticAPIUtils = require ('../utils/DomoticAPIUtils');

module.exports = {

	// MANEJO DE USUARIOS
	login: function(email, password) {
		DomoticAPIUtils.login(email, password);
	},

	// SISTEMA DE ALARMAS
	getAlarms: function() {
		DomoticAPIUtils.getAlarms();
	},
	createAlarm: function(data) {
		DomoticAPIUtils.createAlarm(data);
	},
	getMotionSensors: function() {
		DomoticAPIUtils.getMotionSensors();
	},
	enableAlarm: function(id, enabled) {
		if(enabled){
			DomoticAPIUtils.desableAlarm(id);
		}else{
			DomoticAPIUtils.enableAlarm(id);
		}
	},

// SISTEMA DE RIEGO
	getIrrigationSystems: function() {
		DomoticAPIUtils.getIrrigationSystems();
	},
	enableIrrigationSystem: function(id, enabled) {
		if(enabled){
			DomoticAPIUtils.desableIrrigationSystem(id);
		}else{
			DomoticAPIUtils.enableIrrigationSystem(id);
		}
	},

	// SENSORES
	getTemperatureSensors: function() {
		DomoticAPIUtils.getTemperatureSensors();
	},
	getHumiditySensors: function() {
		DomoticAPIUtils.getHumiditySensors();
	},


// ELEMENTOS
	getRooms: function() {
		DomoticAPIUtils.getRooms();
	},

	getLights: function() {
		DomoticAPIUtils.getLights();
	},
	getTvs: function() {
		DomoticAPIUtils.getTvs();
	},
	switchLight: function(id, switched_on) {
		if(switched_on){
			DomoticAPIUtils.switchLightOff(id);
		}else{
			DomoticAPIUtils.switchLightOn(id);
		}

	},
	turnTv: function(id, turned_on) {
		if(turned_on){
			DomoticAPIUtils.switchTvOff(id);
		}else{
			DomoticAPIUtils.switchTvOn(id);
		}
	},




};
