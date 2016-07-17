var React                     = require('react');
var router                    = require('../router');
var getSensors                = require('../actions/Actions').getIrrigationSensors;
var getValves                 = require('../actions/Actions').getValves;
var IrrigationSystemStore     = require('../stores/IrrigationSystemStore');
var ActivateIrrigationSensor  = require('./ActivateIrrigationSensor.react');
var AddValves                 = require('./AddValves.react');
var redirect                  = require('../actions/RouteActions').redirect;
var createIrrigationSystem    = require('../actions/Actions').createIrrigationSystem;

module.exports = React.createClass({

  getInitialState: function(){
    return {
      sensorsInIrrigation: [],
      valvesInSystem: [],
    };
  },
  componentWillMount: function() {
    getSensors();
    getValves();
  },
  componentDidMount: function() {
    IrrigationSystemStore.addChangeListener(this._onChange);
    getSensors();
    getValves();
  },

  componentWillUnmount: function() {
    IrrigationSystemStore.removeChangeListener(this._onChange);
  },
  _onSubmit: function(e) {
        e.preventDefault();

        var form   = e.target.elements;
        var data   = {};
        data.name = form.name.value;
        data.description = form.description.value;
        data.valves_ids = this.state.valvesInSystem;
        data.soil_humidity_sensors_ids = this.state.sensorsInIrrigation;

        createIrrigationSystem(data);
  },

  _onChange: function() {
    var sensors = IrrigationSystemStore.getIrrigationSensors();
    var valves = IrrigationSystemStore.getValves();

    this.setState({
      sensors: sensors,
      valves: valves,
    });
  },
  goBack: function () {
    redirect('irrigation_systems');
  },

  addSensorToSystem: function (id) {
    sensorsInIrrigation = this.state.sensorsInIrrigation;
    sensorsInIrrigation.push(id);
    this.setState({
      sensorsInIrrigation: sensorsInIrrigation
    });
  },
  removeSensorFromSystem: function (id) {
    sensorsInIrrigation = this.state.sensorsInIrrigation;
    var index = sensorsInIrrigation.indexOf(id);
    sensorsInIrrigation.splice(index, 1);
    this.setState({
      sensorsInIrrigation: sensorsInIrrigation
    });
  },
  addValveToSystem: function (id) {
    console.log("id", id);
    valvesInSystem = this.state.valvesInSystem;
    valvesInSystem.push(id);
    this.setState({
      valvesInSystem: valvesInSystem
    });
  },
  removeValveFromSystem: function (id) {
    valvesInSystem = this.state.valvesInSystem;
    var index = valvesInSystem.indexOf(id);
    valvesInSystem.splice(index, 1);
    this.setState({
      valvesInSystem: valvesInSystem
    });
  },


  render: function() {
    var sensors = this.state.sensors;
    var allSensors = [];

    for (var key in sensors) {
      allSensors.push(<ActivateIrrigationSensor key={key} sensor={sensors[key]} addSensorToSystem={this.addSensorToSystem} removeSensorFromSystem={this.removeSensorFromSystem}/>);
    }

    var valves = this.state.valves;
    var allValves = [];

    for (var key in valves) {
      allValves.push(<AddValves key={key} valve={valves[key]} addValveToSystem={this.addValveToSystem} removeValveFromSystem={this.removeValveFromSystem}/>);
    }


    return(
      <div className="">
        <div className="container">
          <form onSubmit={this._onSubmit}>
            <button className="goBackButton " onClick={this.goBack}>Volver</button>
            <br/>
            <div className="whiteBox">
              <p className="title gradient">CREAR NUEVO SISTEMA DE RIEGO</p>
              <hr/>
                <div className="input-field col-md-6  col-md-offset-3 ">
                  <input id="name" type="text" className="formText"/>
                  <label for="name">Nombre del sistema de riego</label>
                </div>
                <br/>
                <div className="input-field col-md-6  col-md-offset-3 ">
                  <input id="description" type="text" className="formText"/>
                  <label for="description">Descripción del sistema de riego</label>
                </div>
                <div className="input-field col-md-6  col-md-offset-3 ">
                  <br/>
                  <p className="leftTitle">Seleccionar sensores:</p>
                  <div className="noPadding col-md-12 ">{allSensors}</div>
                  <br/>
                </div>
                <div className="input-field col-md-6  col-md-offset-3 ">
                  <br/>
                  <p className="leftTitle">Seleccionar valvulas:</p>
                  <div className="noPadding col-xs-12 ">{allValves}</div>
                  <br/>
                </div>
                <div className="input-field col-md-6  col-md-offset-3 centered">
                  <button type="submit" className="newElementButton centered">Crear</button>
                </div>
             </div>
          </form>
        </div>
      </div>
    )
  }
});
