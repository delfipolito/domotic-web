var React            = require('react');
var ReactPropTypes   = React.PropTypes;
var enableAlarm      = require('../actions/Actions').enableAlarm;
var desactivateAlarm = require('../actions/Actions').desactivateAlarm;

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

    enableAlarm: function  () {
        enableAlarm(this.props.alarm.id, this.props.alarm.enabled);
    },
    desactivateAlarm: function  () {
        desactivateAlarm(this.props.alarm.id);
    },

	render: function() {
        var alarm = this.props.alarm;
        var enabledProp = '';
        if(this.props.alarm.enabled){
            enabledProp = 'onOff alarmOn';
        }else{
            enabledProp = 'onOff alarmOff'
        }
        if(this.props.alarm.active){
          activeProp = 'desactivateAlarmButton valign'
        }else{
          activeProp = 'hidden';
        }

		return(
    		<div className="row list">
                <div className="col-xs-6">
                    <p className="name">{alarm.name}</p>
                    <p className="description">{alarm.description}</p>
                </div>
                <div className="col-xs-3 valign-wrapper">
                    <button  className={activeProp} onClick={this.desactivateAlarm}>Desactivar</button>
                </div>
                <div className="col-xs-3">
                    <button className={enabledProp} onClick={this.enableAlarm}></button>
                </div>
            </div>
		)
	},
});
