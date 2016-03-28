var React                    = require('react');
var router                   = require('../router');
var getTemperatureSensors    = require('../actions/Actions').getTemperatureSensors;
var Store                    = require('../stores/Store');
var TemperatureSensor        = require('./TemperatureSensor.react.js');

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },
  componentWillMount: function() {
    getTemperatureSensors();
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },


  _onChange: function() {
    var temperatureSensors = Store.getTemperatureSensors();

    this.setState({
      temperatureSensors: temperatureSensors,
    });
  },

  

  render: function() {
    var temperatureSensors = this.state.temperatureSensors;
    var allTemperatureSensors = [];

    for (var key in temperatureSensors) {
      allTemperatureSensors.push(<TemperatureSensor key={key} temperatureSensor={temperatureSensors[key]} />);
    }
      
    
    return(
      <div className="">
        <div className="container">
          <div className="whiteBox">
            <p className="title">SENSORES DE TEMPERATURA</p>
            <hr/>
            <div className="noPadding col-xs-12 col-sm-offset-2 col-sm-8">{allTemperatureSensors}</div>
          </div>
        </div>
      </div>
    )
  }
});