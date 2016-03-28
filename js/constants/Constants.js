var keyMirror = require('keymirror');
var Root      = "http://mlnwidjgpd.localtunnel.me//api/v1/";
var APIRoot   = Root + "/web";

module.exports = {

  ActionTypes: keyMirror({
    REDIRECT: null,
    SHOW_LIGHTS: null,
    SHOW_TVS: null,
    SHOW_ALARMS: null,
    SHOW_TEMPERATURE_SENSORS: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  APIEndpoints: {
    PUBLIC:      Root
  }
};
