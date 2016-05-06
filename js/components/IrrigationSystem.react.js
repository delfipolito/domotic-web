var React                     = require('react');
var ReactPropTypes            = React.PropTypes;
var enableIrrigationSystem    = require('../actions/Actions').enableIrrigationSystem;

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

    enableIrrigationSystem: function  () {
        enableIrrigationSystem(this.props.system.id, this.props.system.enabled);
    },

	render: function() {
        var irrigationSystem = this.props.system;
        var enabledProp = '';
        if(this.props.system.enabled){
            enabledProp = 'material-icons buttonOn';
        }else{
            enabledProp = 'material-icons buttonOff'
        }

        if(this.props.system.active){
            activeProp = 'onOff waterOn';
        }else{
            activeProp = 'onOff waterOff'
        }

		return(
    		<div className="row list">
                <div className="col-xs-8">
                    <p className="name">{irrigationSystem.name}</p>
                    <p className="description">{irrigationSystem.description}</p>
                </div>
                <div className="col-xs-2">
                    <i className={enabledProp} onClick={this.enableIrrigationSystem}>power_settings_new</i>
                </div>
                <div className="col-xs-2">
                    <div className={activeProp} ></div>
                </div>
            </div>
		)
	},
});
