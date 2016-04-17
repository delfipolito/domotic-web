var React          = require('react');
var ReactPropTypes = React.PropTypes;

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
        var temperatureSensor = this.props.temperatureSensor;

		return(
    		<div className="row list">

                <div className="col-xs-6 col-sm-9 ">
                    <p className="name">{temperatureSensor.name}</p>
                    <p className="description">{temperatureSensor.room_name}</p>
                </div>
                <div className="col-xs-4 col-sm-2">
                    <button className='onOff temperatureOff'></button>
                </div>
                <div className="col-xs-2 col-sm-1 noPadding">
                    <p className="name">{temperatureSensor.temperature} ºC</p>
                </div>
            </div>
		)
	},
});
