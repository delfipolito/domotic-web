var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var router       = require('../router');
var lights       = '';
var tvs          = '';
var alarms       = '';
var temperatureSensors = '';

var Store = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getLights: function  () {
    return lights;
  },
  getTvs: function  () {
    return tvs;
  },
  getAlarms: function  () {
    return alarms;
  },
  getTemperatureSensors: function  () {
    return temperatureSensors;
  },


});

Store.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.REDIRECT:
      console.log("ruta,", action.route);
      router.transitionTo(action.route);
      Store.emitChange();
    break;
    case ActionTypes.SHOW_LIGHTS:
      console.log("lightss", action.res.lights);
      lights = action.res.lights; 
      Store.emitChange();
    break;
    case ActionTypes.SHOW_TVS:
      console.log("tvs", action.res.tvs);
      tvs = action.res.tvs; 
      Store.emitChange();
    break;
    case ActionTypes.SHOW_ALARMS:
      console.log("alarms", action.res.alarms);
      alarms = action.res.alarms; 
      Store.emitChange();
    break;
    case ActionTypes.SHOW_TEMPERATURE_SENSORS:
      console.log("temperature_sensors", action.res.temperature_sensors);
      temperatureSensors = action.res.temperature_sensors; 
      Store.emitChange();
    break;
    default:
      // do nothing
  }

  return true;
});

module.exports = Store;
