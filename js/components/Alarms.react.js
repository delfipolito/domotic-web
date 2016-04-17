var React           = require('react');
var router          = require('../router');
var getAlarms       = require('../actions/Actions').getAlarms;
var Store           = require('../stores/Store');
var Alarm           = require('./Alarm.react.js');
var redirect        = require('../actions/RouteActions').redirect;

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },
  componentWillMount: function() {
    getAlarms();
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },


  _onChange: function() {
    var alarms = Store.getAlarms();

    this.setState({
      alarms: alarms,
    });
  },
  newAlarm: function () {
    redirect('create_alarm');
  },


  render: function() {
    var alarms = this.state.alarms;
    var allAlarms = [];

    for (var key in alarms) {
      allAlarms.push(<Alarm key={key} alarm={alarms[key]} />);
    }

    return(
      <div className="">
        <div className="container">
          <button className="newElementButton pull-right" onClick={this.newAlarm}>+ Nueva alarma</button>
          <br/>
          <br/>
          <br/>
          <div className="whiteBox">
            <p className="title">ALARMAS Y SENSORES DE MOVIMIENTO DE LA CASA</p>
            <hr/>
            <div className="noPadding col-xs-12 col-sm-offset-2 col-sm-8">{allAlarms}</div>
          </div>
        </div>
      </div>
    )
  }
});
