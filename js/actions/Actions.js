var DomoticAPIUtils = require ('../utils/DomoticAPIUtils');

module.exports = {

	getLights: function() {
		DomoticAPIUtils.getLights();
	},
	getTvs: function() {
		DomoticAPIUtils.getTvs();
	},
	getAlarms: function() {
		DomoticAPIUtils.getAlarms();
	},
	getTemperatureSensors: function() {
		DomoticAPIUtils.getTemperatureSensors();
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
