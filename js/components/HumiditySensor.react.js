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
        var humiditySensor = this.props.humiditySensor;

		return(
    		<div className="row list">

                <div className="col-xs-6 col-sm-9 ">
                    <p className="name">{humiditySensor.name}</p>
                    <p className="description">{humiditySensor.room_name}</p>
                </div>
                <div className="col-xs-4 col-sm-2">
                    <button className='onOff humidityOff'></button>
                </div>
                <div className="col-xs-2 col-sm-1 noPadding">
                    <p className="name">{humiditySensor.humidity} %</p>
                </div>
            </div>
		)
	},
});
