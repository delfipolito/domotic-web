var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var redirect      = require('../actions/RouteActions').redirect;

var ActionTypes        = Constants.ActionTypes;
var CHANGE_EVENT       = 'change';
var router             = require('../router');
var lights             = '';
var tvs                = '';
var alarms             = '';
var motionSensors      = '';
var temperatureSensors = '';
var humiditySensors    = '';

var ElementsStore = assign({}, EventEmitter.prototype, {

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
  getMotionSensors: function  () {
    return motionSensors;
  },
  getTemperatureSensors: function  () {
    return temperatureSensors;
  },
  getHumiditySensors: function  () {
    return humiditySensors;
  },


});

ElementsStore.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      ElementsStore.emitChange();
    break;
    case ActionTypes.SHOW_LIGHTS:
      lights = action.res.lights;
      ElementsStore.emitChange();
    break;
    case ActionTypes.SHOW_TVS:
      tvs = action.res.tvs;
      ElementsStore.emitChange();
    break;
    case ActionTypes.SHOW_ALARMS:
      alarms = action.res.alarms;
      ElementsStore.emitChange();
    break;

    case ActionTypes.SHOW_TEMPERATURE_SENSORS:
      temperatureSensors = action.res.temperature_sensors;
      ElementsStore.emitChange();
    break;
    case ActionTypes.SHOW_HUMIDITY_SENSORS:
      humiditySensors = action.res.humidity_sensors;
      ElementsStore.emitChange();
    break;
    case ActionTypes.SHOW_MOTION_SENSORS:
      motionSensors = action.res.motion_sensors;
      ElementsStore.emitChange();
    break;
    case ActionTypes.ERROR:
      if(action.code==401){
        localStorage.removeItem('Authorization');
        redirect('login');
      }else{
        _errorMessage = action.res;
        _errorCode = action.code;
      }

      ElementsStore.emitChange();
    break;
    default:
      // do nothing
  }

  return true;
});

module.exports = ElementsStore;
