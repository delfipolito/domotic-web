var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var redirect      = require('../actions/RouteActions').redirect;

var ActionTypes   = Constants.ActionTypes;
var CHANGE_EVENT  = 'change';
var router        = require('../router');
var wifi          = '';


var ConfigurationStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },


  getWifi: function  () {
    return wifi;
  },

});

ConfigurationStore.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      ConfigurationStore.emitChange();
    break;
    case ActionTypes.SHOW_WIFI:
      wifi = action.res.network_configurations;
      ConfigurationStore.emitChange();
    break;
    case ActionTypes.ERROR:
      if(action.code==401){
        localStorage.removeItem('Authorization');
        redirect('login');
      }else{
        _errorMessage = action.res;
        _errorCode = action.code;
      }

      ConfigurationStore.emitChange();
    break;

    default:
      // do nothing
  }

  return true;
});

module.exports = ConfigurationStore;
