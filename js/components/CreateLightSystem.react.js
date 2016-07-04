var React                     = require('react');
var router                    = require('../router');
var getSensors                = require('../actions/Actions').getLightSensors;
var getLamps                  = require('../actions/Actions').getLamps;
var LightSystemStore          = require('../stores/LightSystemStore');
var ActivateLightSensor       = require('./ActivateLightSensor.react');
var AddLamps                  = require('./AddLamps.react');
var redirect                  = require('../actions/RouteActions').redirect;
var createLightSystem         = require('../actions/Actions').createLightSystem;

module.exports = React.createClass({

  getInitialState: function(){
    return {
      sensorsInSystem: [],
      lampsInSystem: [],
    };
  },
  componentWillMount: function() {
    getSensors();
    getLamps();
  },
  componentDidMount: function() {
    LightSystemStore.addChangeListener(this._onChange);
    getSensors();
    getLamps();
  },

  componentWillUnmount: function() {
    LightSystemStore.removeChangeListener(this._onChange);
  },
  _onSubmit: function(e) {
        e.preventDefault();

        var form   = e.target.elements;
        var data   = {};
        data.name = form.name.value;
        data.description = form.description.value;
        data.lamps_ids = this.state.lampsInSystem;
        data.sensors_ids = this.state.sensorsInSystem;

        createLightSystem(data);
  },

  _onChange: function() {
    var sensors = LightSystemStore.getLightSensors();
    var lamps = LightSystemStore.getLamps();

    this.setState({
      sensors: sensors,
      lamps: lamps,
    });
  },
  goBack: function () {
    redirect('light_systems');
  },

  addSensorToSystem: function (id) {
    sensorsInSystem = this.state.sensorsInSystem;
    sensorsInSystem.push(id);
    this.setState({
      sensorsInSystem: sensorsInSystem
    });
  },
  removeSensorFromSystem: function (id) {
    sensorsInSystem = this.state.sensorsInSystem;
    var index = sensorsInSystem.indexOf(id);
    sensorsInSystem.splice(index, 1);
    this.setState({
      sensorsInSystem: sensorsInSystem
    });
  },
  addLampToSystem: function (id) {
    console.log("id", id);
    lampsInSystem = this.state.lampsInSystem;
    lampsInSystem.push(id);
    this.setState({
      lampsInSystem: lampsInSystem
    });
  },
  removeLampFromSystem: function (id) {
    lampsInSystem = this.state.lampsInSystem;
    var index = lampsInSystem.indexOf(id);
    lampsInSystem.splice(index, 1);
    this.setState({
      lampsInSystem: lampsInSystem
    });
  },


  render: function() {
    var sensors = this.state.sensors;
    var allSensors = [];

    for (var key in sensors) {
      allSensors.push(<ActivateLightSensor key={key} sensor={sensors[key]} addSensorToSystem={this.addSensorToSystem} removeSensorFromSystem={this.removeSensorFromSystem}/>);
    }

    var lamps = this.state.lamps;
    var allLamps = [];

    for (var key in lamps) {
      allLamps.push(<AddLamps key={key} lamp={lamps[key]} addLampToSystem={this.addLampToSystem} removeLampFromSystem={this.removeLampFromSystem}/>);
    }


    return(
      <div className="">
        <div className="container">
          <form onSubmit={this._onSubmit}>
            <button className="goBackButton " onClick={this.goBack}>Volver</button>
            <br/>
            <div className="whiteBox">
              <p className="title gradient">CREAR NUEVO SISTEMA DE LUZ</p>
              <hr/>
                <div className="input-field col-xs-6  col-xs-offset-3 ">
                  <input id="name" type="text" className="formText"/>
                  <label for="name">Nombre del sistema de luz</label>
                </div>
                <br/>
                <div className="input-field col-xs-6  col-xs-offset-3 ">
                  <input id="description" type="text" className="formText"/>
                  <label for="description">Descripción del sistema de luz</label>
                </div>
                <div className="input-field col-xs-6  col-xs-offset-3 ">
                  <br/>
                  <p className="leftTitle">Seleccionar sensores:</p>
                  <div className="noPadding col-xs-12 ">{allSensors}</div>
                  <br/>
                </div>
                <div className="input-field col-xs-6  col-xs-offset-3 ">
                  <br/>
                  <p className="leftTitle">Seleccionar luces:</p>
                  <div className="noPadding col-xs-12 ">{allLamps}</div>
                  <br/>
                </div>
                <div className="input-field col-xs-6  col-xs-offset-3 centered">
                  <button type="submit" className="newElementButton centered">Crear</button>
                </div>
             </div>
          </form>
        </div>
      </div>
    )
  }
});
