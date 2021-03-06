var DomoticAPIUtils = require ('../utils/DomoticAPIUtils');

module.exports = {

	// MANEJO DE USUARIOS
	login: function(email, password) {
		DomoticAPIUtils.login(email, password);
	},
	getUsers: function() {
		DomoticAPIUtils.getUsers();
	},
	deleteUser: function(id) {
		DomoticAPIUtils.deleteUser(id);
	},
	createUser: function(user) {
		DomoticAPIUtils.createUser(user);
	},

	// REDES WIFI
	getWifi: function() {
		DomoticAPIUtils.getWifi();
	},
	deleteWifi: function(id) {
		DomoticAPIUtils.deleteWifi(id);
	},
	createWifi: function(wifi) {
		DomoticAPIUtils.createWifi(wifi);
	},
	selectWifi: function(id) {
		DomoticAPIUtils.selectWifi(id);
	},

	// SISTEMA DE LUZ
	getLightSystems: function() {
		DomoticAPIUtils.getLightSystems();
	},

	createLightSystem: function(data) {
		DomoticAPIUtils.createLightSystem(data);
	},

	enableLightSystem: function(id, enabled) {
		if(enabled){
			DomoticAPIUtils.desableLightSystem(id);
		}else{
			DomoticAPIUtils.enableLightSystem(id);
		}
	},
	getLightSensors: function() {
		DomoticAPIUtils.getLightSensors();
	},
	getLamps: function() {
		DomoticAPIUtils.getLamps();
	},
	updateLightSystem(threshold, id){
		DomoticAPIUtils.updateLightSystem(threshold, id);
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
	desactivateAlarm: function(id){
		DomoticAPIUtils.desactivateAlarm(id);
	},

// SISTEMA DE RIEGO
	getIrrigationSystems: function() {
		DomoticAPIUtils.getIrrigationSystems();
	},
	createIrrigationSystem: function(data) {
		DomoticAPIUtils.createIrrigationSystem(data);
	},
	enableIrrigationSystem: function(id, enabled) {
		if(enabled){
			DomoticAPIUtils.desableIrrigationSystem(id);
		}else{
			DomoticAPIUtils.enableIrrigationSystem(id);
		}
	},
	getIrrigationSensors: function() {
		DomoticAPIUtils.getIrrigationSensors();
	},
	getValves: function() {
		DomoticAPIUtils.getValves();
	},
	updateIrrigationSystem(threshold, id){
		DomoticAPIUtils.updateIrrigationSystem(threshold, id);
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
	switchValve: function(id, opened) {
		if(opened){
			DomoticAPIUtils.closeValve(id);
		}else{
			DomoticAPIUtils.openValve(id);
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
