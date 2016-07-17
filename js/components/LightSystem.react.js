var React                     = require('react');
var ReactPropTypes            = React.PropTypes;
var enableLightSystem         = require('../actions/Actions').enableLightSystem;

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

    enableLightSystem: function  () {
        enableLightSystem(this.props.system.id, this.props.system.enabled);
    },

	render: function() {
        var lightSystem = this.props.system;
        var enabledProp = '';
        if(this.props.system.enabled){
            enabledProp = 'material-icons buttonOn';
        }else{
            enabledProp = 'material-icons buttonOff'
        }

        if(this.props.system.active){
            activeProp = 'onOff lightOn';
        }else{
            activeProp = 'onOff lightOff'
        }

		return(
    		<div className="row list">
                <div className="col-md-8 col-xs-6">
                    <p className="name">{lightSystem.name}</p>
                    <p className="description">{lightSystem.description}</p>
                </div>
                <div className="col-xs-2 col-md-2">
                    <i className={enabledProp} onClick={this.enableLightSystem}>power_settings_new</i>
                </div>
                <div className="col-xs-3 col-md-2">
                    <div className={activeProp} ></div>
                </div>
            </div>
		)
	},
});
