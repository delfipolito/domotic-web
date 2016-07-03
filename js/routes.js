var React          				= require ('react');
var Router         				= require ('react-router');
var Route          				= Router.Route;
var DomoticApp     				= require ('./components/DomoticApp.react');

var Login        				  = require ('./components/Login.react');
var UsersConfiguration    = require ('./components/UsersConfiguration.react');
var Configuration         = require ('./components/Configuration.react');
var NewUser               = require ('./components/NewUser.react');
var Profile        				= require ('./components/Profile.react');
var Rooms        	   		  = require ('./components/Rooms.react');
var LightSystems        	= require ('./components/LightSystems.react');
var Tvs            				= require ('./components/Tvs.react');
var CameraView            = require ('./components/CameraView.react');
var Alarms                = require ('./components/Alarms.react');
var IrrigationSystems     = require ('./components/IrrigationSystems.react');

var CreateIrrigationSystem = require ('./components/CreateIrrigationSystem.react');
var CreateAlarm            = require ('./components/CreateAlarm.react');
var CreateLightSystem      = require ('./components/CreateLightSystem.react');

var TemperatureSensors    = require ('./components/TemperatureSensors.react');
var DefaultRoute   				= Router.DefaultRoute;


var routes = (
  <Route handler={DomoticApp} path="/">
    <Route name='profile' path='/profile' handler={Profile} />
    <Route name='users_configuration' path='/users_configuration' handler={UsersConfiguration} />
    <Route name='new_user' path='/new_user' handler={NewUser} />
    <Route name='configuration' path='/configuration' handler={Configuration} />

    <Route name='rooms'   path='/rooms' handler={Rooms} />
    <Route name='camera_view' path='/camera_view' handler={CameraView} />
    <Route name='tvs' path='/tvs' handler={Tvs} />
    <Route name='temperatureSensors' path='/temperatureSensors' handler={TemperatureSensors} />

    <Route name='alarms' path='/alarms' handler={Alarms} />
    <Route name='irrigation_systems' path='/irrigation_systems' handler={IrrigationSystems} />
    <Route name='light_systems' path='/lights' handler={LightSystems} />

    <Route name='create_alarm' path='/create_alarms' handler={CreateAlarm} />
    <Route name='create_irrigation_system' path='/create_irrigation_systems' handler={CreateIrrigationSystem} />
    <Route name='create_light_system' path='/create_light_system' handler={CreateLightSystem} />


    <DefaultRoute handler={Login}/>

  </Route>
);

module.exports = routes;
