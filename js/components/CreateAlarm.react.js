var React           = require('react');
var router          = require('../router');
var getSensors      = require('../actions/Actions').getMotionSensors;
var Store           = require('../stores/Store');
var ActivateSensor           = require('./ActivateSensor.react');
var redirect        = require('../actions/RouteActions').redirect;

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
    Store.addChangeListener(this._onChange);
    getSensors();
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },


  _onChange: function() {
    var sensors = Store.getMotionSensors();

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
    console.log("sen", this.state.sensors);
    var allSensors = [];

    for (var key in sensors) {
      allSensors.push(<ActivateSensor key={key} sensor={sensors[key]} addSensorToAlarm={this.addSensorToAlarm} removeSensorToAlarm={this.removeSensorToAlarm}/>);
    }


    return(
      <div className="">
        <div className="container">
          <button className="goBackButton " onClick={this.goBack}>Volver</button>
          <br/>
          <div className="whiteBox">
            <p className="title">CREAR NUEVA ALARMA</p>
            <hr/>
              <div className="input-field col-xs-6  col-xs-offset-3 ">
                <input id="name" type="text" className="formText"/>
                <label for="name">Nombre de la alarma</label>
              </div>
              <br/>
              <div className="input-field col-xs-6  col-xs-offset-3 ">
                <input id="description" type="text" className="formText"/>
                <label for="description">Descripción de la alarma</label>
              </div>
              <div className="input-field col-xs-6  col-xs-offset-3 ">
                <br/>
                <p className="leftTitle">Seleccionar sensores</p>
                <div className="noPadding col-xs-12 ">{allSensors}</div>
                <br/>
              </div>
              <div className="input-field col-xs-6  col-xs-offset-3 centered">
                <button className="newElementButton centered" onClick={this.newAlarm}>Crear</button>
              </div>


          </div>
        </div>
      </div>
    )
  }
});
