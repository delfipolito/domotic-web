var Dispatcher  = require ('../dispatcher/Dispatcher');
var ActionTypes   = require ('../constants/Constants').ActionTypes;

module.exports = {

	showLights: function(lights) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_LIGHTS,
			res: lights
		});
	},
	showTvs: function(tvs) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_TVS,
			res: tvs
		});
	},
	showAlarms: function(alarms) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_ALARMS,
			res: alarms
		});
	},
	showTemperatureSensors: function(alarms) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_TEMPERATURE_SENSORS,
			res: alarms
		});
	},

}
