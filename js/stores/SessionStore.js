var Dispatcher   = require('../dispatcher/Dispatcher');
var Constants    = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var router       = require('../router');

var ActionTypes  = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID   = null;
var _threads     = {};
var _authToken   = localStorage.getItem('authToken');
var _adminID     = localStorage.getItem('adminID');
var _adminMail   = localStorage.getItem('adminMail');
var _errorMessage= '';
var _resetPassword = false;

var SessionStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    console.log("log", localStorage.getItem('Authorization'));
    return (localStorage.getItem('Authorization')) ? true : false;
  },

  getErrors: function() {
    return _errorMessage;
  },

  getAdminId: function() {
    return _adminID;
  },

  getResetPassword: function() {
    return _resetPassword;
  },

  getAdminMail: function() {
    return _adminMail;
  },

  getAuthToken: function() {
    return localStorage.getItem('authToken');
  },

  setAuthToken: function(token) {
    localStorage.setItem('authToken', token);
  },


});

SessionStore.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {

    case ActionTypes.LOGIN_RESPONSE:
      _resetPassword = false;
      _currentID = action.threadID;
      if(action.res && action.res.auth_token && action.res.id) {
        _authToken = action.res.auth_token;
        _adminID   = action.res.id;
        _adminMail = action.mail;
        _level   = action.res.level;

        localStorage.setItem('authToken', _authToken);
        localStorage.setItem('adminID', _adminID);
        localStorage.setItem('adminMail', _adminMail);
      }
      if (action.code>300){
        _errorMessage = action.err;

      }

      SessionStore.emitChange();
    break;

    case ActionTypes.ERROR:
      _resetPassword = false;
      _errorMessage = action.res;
      _errorCode = action.code;
      SessionStore.emitChange();
    break;

    case ActionTypes.RESET_PASSWORD:
      _resetPassword = true;
      SessionStore.emitChange();
    break;


    case ActionTypes.NEWADMIN_RESPONSE:
      _resetPassword = false;
      if (action.res.message){
        _errorMessage = action.res.message;

      }

      SessionStore.emitChange();
    break;

    case ActionTypes.LOGOUT:
      _resetPassword = false;
      _currentID = '';
      _authToken = '';
      _adminID = '';
      _adminMail = '';
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminID');
      localStorage.removeItem('adminMail');
      localStorage.removeItem('isSuper');
      localStorage.removeItem('entityId');
      localStorage.removeItem('contactId');
      localStorage.removeItem('areaId');
      localStorage.removeItem('serviceId');

      SessionStore.emitChange();
    break;


    default:
        _resetPassword = false;
        if(action.res!= null && action.code!=null && (action.code==401)){
          _currentID = '';
          _authToken = '';
          _adminID = '';
          _adminMail = '';
          localStorage.removeItem('authToken');
          localStorage.removeItem('adminID');
          localStorage.removeItem('adminMail');
          localStorage.removeItem('isSuper');
          localStorage.removeItem('entityId');
          localStorage.removeItem('contactId');
          localStorage.removeItem('areaId');
          localStorage.removeItem('serviceId');

          router.transitionTo('login');
        }

        if(!SessionStore.isLoggedIn()) {
        router.transitionTo('login');
        }

        SessionStore.emitChange();
      break;
  }

  return true;
});

module.exports = SessionStore;
