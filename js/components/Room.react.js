var React             = require('react');
var ReactPropTypes    = React.PropTypes;
var Light             = require('./Light.react.js');
var Tv                = require('./Tv.react.js');
var TemperatureSensor = require('./TemperatureSensor.react.js');
var HumiditySensor    = require('./HumiditySensor.react.js');

module.exports = React.createClass({

  propTypes: {
      post: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {

      return{
      };
  },
  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  _onChange: function() {
  },


	render: function() {
    var room = this.props.room;


    var lights = this.props.room.lights;
    var allLights = [];

    for (var key in lights) {
      allLights.push(<Light key={key} light={lights[key]} />);
    }

    var tvs = this.props.room.tvs;
    var allTvs = [];

    for (var key in tvs) {
      allTvs.push(<Tv key={key} tv={tvs[key]} />);
    }

    var temperatureSensors = this.props.room.temperature_sensors;
    var allTemperatureSensors = [];

    for (var key in temperatureSensors) {
      allTemperatureSensors.push(<TemperatureSensor key={key} temperatureSensor={temperatureSensors[key]} />);
    }

    var humiditySensors = this.props.room.humidity_sensors;
    var allHumiditySensors = [];

    for (var key in humiditySensors) {
      allHumiditySensors.push(<HumiditySensor key={key} humiditySensor={humiditySensors[key]} />);
    }


		return(
    		<div className="roomContainer">
          <p className="title">{room.name}</p>
          <hr/>
          <div>{allLights}</div>
          <div>{allTvs}</div>
            <div>{allTemperatureSensors}</div>
            <div>{allHumiditySensors}</div>
        </div>
		)
	},
});
