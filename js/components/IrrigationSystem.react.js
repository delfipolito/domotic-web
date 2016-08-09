var React                     = require('react');
var ReactPropTypes            = React.PropTypes;
var enableIrrigationSystem    = require('../actions/Actions').enableIrrigationSystem;
var updateIrrigationSystem    = require('../actions/Actions').updateIrrigationSystem;

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

    enableIrrigationSystem: function  () {
        enableIrrigationSystem(this.props.system.id, this.props.system.enabled);
    },
    editNumber: function () {
      this.setState({
        numberThreshold: 'hidden',
        editingThreshold: ''
      });
      console.log(this.state.editingThreshold);
    },
    editSistemThreshold: function (e) {
      e.preventDefault();
      var form   = e.target.elements;
      var threshold = form.threshold.value;
      updateIrrigationSystem(threshold, this.props.system.id);
      this.setState({
        numberThreshold: 'description pointer',
        editingThreshold: 'hidden'
      });
    },
	render: function() {
        var irrigationSystem = this.props.system;
        console.log(irrigationSystem);
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
                <div className="col-sm-6 col-xs-4">
                    <p className="name">{irrigationSystem.name}</p>
                    <p className="description">{irrigationSystem.description}</p>
                </div>
                <div className="col-sm-2 col-xs-2">
                    <p className="name">Umbral</p>
                    <p className={this.state.numberThreshold} onClick={this.editNumber}>{irrigationSystem.threshold}</p>
                    <form onSubmit={this.editSistemThreshold}><input className={this.state.editingThreshold} defaultValue={irrigationSystem.threshold} name="threshold" ref="threshold"></input></form>
                </div>
                <div className="col-sm-2 col-xs-2">
                    <i className={enabledProp} onClick={this.enableIrrigationSystem}>power_settings_new</i>
                </div>
                <div className="col-xs-3 col-sm-2">
                    <div className={activeProp} ></div>
                </div>
            </div>
		)
	},
});
