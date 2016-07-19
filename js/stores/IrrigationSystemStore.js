var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var redirect      = require('../actions/RouteActions').redirect;

var ActionTypes       = Constants.ActionTypes;
var CHANGE_EVENT      = 'change';
var router            = require('../router');
var irrigationSystems = '';
var irrigationSensors = '';
var valves            = '';


var IrrigationSystemStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getIrrigationSystems: function  () {
    return irrigationSystems;
  },
  getValves: function  () {
    return valves;
  },
  getIrrigationSensors: function  () {
    return irrigationSensors;
  },
});

IrrigationSystemStore.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      IrrigationSystemStore.emitChange();
    break;
    case ActionTypes.SHOW_IRRIGATION_SISTEMS:
      console.log("entra en store");
      irrigationSystems = action.res.irrigation_systems;
      IrrigationSystemStore.emitChange();
    break;
    case ActionTypes.SHOW_IRRIGATION_SENSORS:
      console.log("irrigation_sensors", action.res.soil_humidity_sensors);
      irrigationSensors = action.res.soil_humidity_sensors;
      IrrigationSystemStore.emitChange();
    break;
    case ActionTypes.SHOW_VALVES:
      console.log("irrigation_sensors", action.res.valves);
      valves = action.res.valves;
      IrrigationSystemStore.emitChange();
    break;
    case ActionTypes.ERROR:
      if(action.code==401){
        localStorage.removeItem('Authorization');
        redirect('login');
      }else{
        _errorMessage = action.res;
        _errorCode = action.code;
      }

      IrrigationSystemStore.emitChange();
    break;
    default:
      // do nothing
  }

  return true;
});

module.exports = IrrigationSystemStore;
