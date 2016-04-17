var React          				= require ('react');
var Router         				= require ('react-router');
var Route          				= Router.Route;
var DomoticApp     				= require ('./components/DomoticApp.react');

var Login        				  = require ('./components/Login.react');
var Profile        				= require ('./components/Profile.react');
var Lights        			  = require ('./components/Lights.react');
var Tvs            				= require ('./components/Tvs.react');
var Alarms                = require ('./components/Alarms.react');
var CreateAlarm           = require ('./components/CreateAlarm.react');
var TemperatureSensors    = require ('./components/TemperatureSensors.react');
var DefaultRoute   				= Router.DefaultRoute;


var routes = (
  <Route handler={DomoticApp} path="/">
    <Route name='profile' path='/profile' handler={Profile} />
    <Route name='lights' path='/lights' handler={Lights} />
    <Route name='alarms' path='/alarms' handler={Alarms} />
    <Route name='create_alarm' path='/create_alarms' handler={CreateAlarm} />
    <Route name='tvs' path='/tvs' handler={Tvs} />
    <Route name='temperatureSensors' path='/temperatureSensors' handler={TemperatureSensors} />

    <DefaultRoute handler={Login}/>

  </Route>
);

module.exports = routes;
