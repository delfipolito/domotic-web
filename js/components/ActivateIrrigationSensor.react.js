var React          = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

    propTypes: {
        post: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {

        return{
          selected: 'material-icons notSelected pull-right',
          isSelected: false,
        };
    },
    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    _onChange: function() {
    },

    addSensorToSystem: function  () {
        if(this.state.isSelected){
          this.setState({
            selected: 'material-icons notSelected pull-right',
            isSelected: false,
          });
          this.props.removeSensorFromSystem(this.props.sensor.id);
        }else{
          this.setState({
            selected: 'material-icons selected pull-right',
            isSelected:true,
          });
          this.props.addSensorToSystem(this.props.sensor.id);
        }
    },

	render: function() {
        var sensor = this.props.sensor;

		return(
    		<div className="row list">
                <div className="col-xs-9">
                    <p className="greyName">{sensor.name}</p>
                </div>
                <div className="col-xs-3">
                    <i className={this.state.selected} onClick={this.addSensorToSystem}>done</i>
                </div>
            </div>
		)
	},
});
