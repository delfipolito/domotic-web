var keyMirror = require('keymirror');
var Root2      = "http://192.168.0.10:3000/api/v1/";
var Root       = "http://domotic-server.herokuapp.com/api/v1/";
var APIRoot   = Root + "/web";

module.exports = {

  ActionTypes: keyMirror({
    REDIRECT: null,
    REDIRECT_TO_CAMERA: null,
    SHOW_ROOMS: null,
    SHOW_LIGHTS: null,
    SHOW_TVS: null,
    SHOW_ALARMS: null,
    SHOW_VALVES: null,
    SHOW_IRRIGATION_SISTEMS: null,
    SHOW_TEMPERATURE_SENSORS: null,
    SHOW_MOTION_SENSORS: null,
    SHOW_HUMIDITY_SENSORS: null,
    SHOW_IRRIGATION_SENSORS: null,
    SHOW_LIGHT_SISTEMS: null,
    SHOW_LIGHT_SENSORS: null,
    SHOW_LAMPS: null,
    SHOW_USERS: null,
    SHOW_WIFI: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  APIEndpoints: {
    PUBLIC:      Root
  }
};
