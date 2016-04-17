var DomoticAPIUtils = require ('../utils/DomoticAPIUtils');

module.exports = {

	login: function(email, password) {
		DomoticAPIUtils.login(email, password);
	},

	// SISTEMAS
	getAlarms: function() {
		DomoticAPIUtils.getAlarms();
	},
	createAlarm: function(data) {
		DomoticAPIUtils.createAlarm(data);
	},

	// SENSORES
	getMotionSensors: function() {
		DomoticAPIUtils.getMotionSensors();
	},
	getTemperatureSensors: function() {
		DomoticAPIUtils.getTemperatureSensors();
	},
	getHumiditySensors: function() {
		DomoticAPIUtils.getHumiditySensors();
	},


// ELEMENTOS

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
	enableAlarm: function(id, enabled) {
		if(enabled){
			DomoticAPIUtils.desableAlarm(id);
		}else{
			DomoticAPIUtils.enableAlarm(id);
		}
	},



};
