var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var router       = require('../router');
var rooms        = '';


var RoomsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getRooms: function  () {
    return rooms;
  },

});

RoomsStore.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      RoomsStore.emitChange();
    break;
    case ActionTypes.SHOW_ROOMS:
      rooms = action.res.rooms;
      RoomsStore.emitChange();
    break;
    default:
      // do nothing
  }

  return true;
});

module.exports = RoomsStore;
