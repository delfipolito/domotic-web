var React                     = require('react');
var ReactPropTypes            = React.PropTypes;
var enableLightSystem         = require('../actions/Actions').enableLightSystem;
var updateLightSystem         = require('../actions/Actions').updateLightSystem;

module.exports = React.createClass({

    propTypes: {
        post: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
      return{
        numberThreshold: 'description pointer',
        editingThreshold: 'hidden'
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

    editNumber: function () {
      this.setState({
        numberThreshold: 'hidden',
        editingThreshold: ''
      });
    },

    editSistemThreshold: function (e) {
      e.preventDefault();
      var form   = e.target.elements;
      var threshold = form.threshold.value;
      updateLightSystem(threshold, this.props.system.id);
      this.setState({
        numberThreshold: 'description pointer',
        editingThreshold: 'hidden'
      });
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
                <div className="col-md-6 col-xs-4">
                    <p className="name">{lightSystem.name}</p>
                    <p className="description">{lightSystem.description}</p>
                </div>
                <div className="col-md-2 col-xs-2">
                    <p className="name">Umbral</p>
                    <p className={this.state.numberThreshold} onClick={this.editNumber}>{lightSystem.threshold}</p>
                    <form onSubmit={this.editSistemThreshold}><input className={this.state.editingThreshold} defaultValue={lightSystem.threshold} name="threshold" ref="threshold"></input></form>
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
