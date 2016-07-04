var React                    = require('react');
var router                   = require('../router');
var getTemperatureSensors    = require('../actions/Actions').getTemperatureSensors;
var getHumiditySensors       = require('../actions/Actions').getHumiditySensors;
var Store                    = require('../stores/Store');
var TemperatureSensor        = require('./TemperatureSensor.react.js');
var HumiditySensor           = require('./HumiditySensor.react.js');

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },
  componentWillMount: function() {
    getTemperatureSensors();
    getHumiditySensors();
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },


  _onChange: function() {
    var temperatureSensors = Store.getTemperatureSensors();
    var humiditySensors    = Store.getHumiditySensors();
    console.log("hum", Store.getHumiditySensors());
    this.setState({
      temperatureSensors: temperatureSensors,
      humiditySensors: humiditySensors,
    });
  },



  render: function() {
    var temperatureSensors = this.state.temperatureSensors;
    var allTemperatureSensors = [];

    for (var key in temperatureSensors) {
      allTemperatureSensors.push(<TemperatureSensor key={key} temperatureSensor={temperatureSensors[key]} />);
    }

    var humiditySensors = this.state.humiditySensors;
    var allHumiditySensors = [];

    for (var key in humiditySensors) {
      allHumiditySensors.push(<HumiditySensor key={key} humiditySensor={humiditySensors[key]} />);
    }


    return(
      <div className="">
        <div className="container">
          <div className="whiteBox">
            <p className="title gradient">SENSORES DE AMBIENTE</p>
            <hr/>
            <div className="noPadding col-xs-12 col-sm-offset-2 col-sm-8">{allTemperatureSensors}</div>
            <div className="noPadding col-xs-12 col-sm-offset-2 col-sm-8">{allHumiditySensors}</div>
          </div>
        </div>
      </div>
    )
  }
});
