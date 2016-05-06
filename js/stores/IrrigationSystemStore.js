var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var ActionTypes       = Constants.ActionTypes;
var CHANGE_EVENT      = 'change';
var router            = require('../router');
var irrigationSystems = '';


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
    default:
      // do nothing
  }

  return true;
});

module.exports = IrrigationSystemStore;
