var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var ActionTypes       = Constants.ActionTypes;
var CHANGE_EVENT      = 'change';
var router            = require('../router');
var lightSystems      = '';
var lightSensors      = '';
var lamps            = '';


var LightSystemStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getLightSystems: function  () {
    return lightSystems;
  },
  getLamps: function  () {
    return lamps;
  },
  getLightSensors: function  () {
    return lightSensors;
  },
});

LightSystemStore.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      LightSystemStore.emitChange();
    break;
    case ActionTypes.SHOW_LIGHT_SISTEMS:
      lightSystems = action.res.lighting_systems;
      LightSystemStore.emitChange();
    break;
    case ActionTypes.SHOW_LIGHT_SENSORS:
      lightSensors = action.res.luminosity_sensors;
      LightSystemStore.emitChange();
    break;
    case ActionTypes.SHOW_LAMPS:
      lamps = action.res.lights;
      LightSystemStore.emitChange();
    break;
    default:
      // do nothing
  }

  return true;
});

module.exports = LightSystemStore;
