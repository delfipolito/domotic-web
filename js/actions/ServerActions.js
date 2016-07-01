var Dispatcher  = require ('../dispatcher/Dispatcher');
var ActionTypes   = require ('../constants/Constants').ActionTypes;

module.exports = {
	showRooms: function(lights) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_ROOMS,
			res: lights
		});
	},
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
	showIrrigationSistems: function(alarms) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_IRRIGATION_SISTEMS,
			res: alarms
		});
	},
	showValves: function(tvs) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_VALVES,
			res: tvs
		});
	},
	showAlarms: function(alarms) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_ALARMS,
			res: alarms
		});
	},
	showMotionSensors: function(sensors) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_MOTION_SENSORS,
			res: sensors
		});
	},
	showTemperatureSensors: function(alarms) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_TEMPERATURE_SENSORS,
			res: alarms
		});
	},
	showHumiditySensors: function(alarms) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_HUMIDITY_SENSORS,
			res: alarms
		});
	},
	showIrrigationSensors: function(sensors) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_IRRIGATION_SENSORS,
			res: sensors
		});
	},

	showLightSistems: function(lights) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_LIGHT_SISTEMS,
			res: lights
		});
	},

	showLightSensors: function(sensors) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_LIGHT_SENSORS,
			res: sensors
		});
	},
	showLamps: function(sensors) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_LAMPS,
			res: sensors
		});
	},

}
