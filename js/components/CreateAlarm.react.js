var React              = require('react');
var router             = require('../router');
var getSensors         = require('../actions/Actions').getMotionSensors;
var ElementsStore      = require('../stores/ElementsStore');
var ActivateSensor     = require('./ActivateSensor.react');
var redirect           = require('../actions/RouteActions').redirect;
var createAlarm        = require('../actions/Actions').createAlarm;

module.exports = React.createClass({

  getInitialState: function(){
    return {
      sensorsInAlarm: []
    };
  },
  componentWillMount: function() {
    getSensors();
  },
  componentDidMount: function() {
    ElementsStore.addChangeListener(this._onChange);
    getSensors();
  },

  componentWillUnmount: function() {
    ElementsStore.removeChangeListener(this._onChange);
  },
  _onSubmit: function(e) {
        e.preventDefault();

        var form   = e.target.elements;
        var data   = {};
        data.name = form.name.value;
        data.description = form.description.value;
        data.motion_sensors_ids = this.state.sensorsInAlarm;

        createAlarm(data);
  },

  _onChange: function() {
    var sensors = ElementsStore.getMotionSensors();

    this.setState({
      sensors: sensors,
    });
  },
  goBack: function () {
    redirect('alarms');
  },

  addSensorToAlarm: function (id) {
    sensorsInAlarm = this.state.sensorsInAlarm;
    sensorsInAlarm.push(id);
    this.setState({
      sensorsInAlarm: sensorsInAlarm
    });
  },
  removeSensorToAlarm: function (id) {
    sensorsInAlarm = this.state.sensorsInAlarm;
    var index = sensorsInAlarm.indexOf(id);
    sensorsInAlarm.splice(index, 1);
    this.setState({
      sensorsInAlarm: sensorsInAlarm
    });
  },


  render: function() {
    var sensors = this.state.sensors;
    var allSensors = [];

    for (var key in sensors) {
      allSensors.push(<ActivateSensor key={key} sensor={sensors[key]} addSensorToAlarm={this.addSensorToAlarm} removeSensorToAlarm={this.removeSensorToAlarm}/>);
    }


    return(
      <div className="">
        <div className="container">
          <form onSubmit={this._onSubmit}>
            <button className="goBackButton " onClick={this.goBack}>Volver</button>
            <br/>
            <div className="whiteBox">
              <p className="title gradient">CREAR NUEVA ALARMA</p>
              <hr/>
                <div className="input-field col-md-6  col-md-offset-3 ">
                  <input id="name" type="text" className="formText"/>
                  <label for="name">Nombre de la alarma</label>
                </div>
                <br/>
                <div className="input-field col-md-6  col-md-offset-3 ">
                  <input id="description" type="text" className="formText"/>
                  <label for="description">Descripción de la alarma</label>
                </div>
                <div className="input-field col-md-6  col-md-offset-3 ">
                  <br/>
                  <p className="leftTitle">Seleccionar sensores:</p>
                  <div className="noPadding col-xs-12 ">{allSensors}</div>
                  <br/>
                </div>
                <div className="input-field col-md-6  col-md-offset-3 centered">
                  <button type="submit" className="newElementButton centered" onClick={this.newAlarm}>Crear</button>
                </div>
             </div>
          </form>
        </div>
      </div>
    )
  }
});
