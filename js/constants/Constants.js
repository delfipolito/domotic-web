var keyMirror = require('keymirror');
var Root      = "http://10.0.0.6:3000/api/v1/";
var APIRoot   = Root + "/web";

module.exports = {

  ActionTypes: keyMirror({
    REDIRECT: null,
    SHOW_LIGHTS: null,
    SHOW_TVS: null,
    SHOW_ALARMS: null,
    SHOW_TEMPERATURE_SENSORS: null,
    SHOW_MOTION_SENSORS: null,
    SHOW_HUMIDITY_SENSORS: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  APIEndpoints: {
    PUBLIC:      Root
  }
};
