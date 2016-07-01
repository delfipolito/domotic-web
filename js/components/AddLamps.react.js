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

    addLampToSystem: function  () {
        if(this.state.isSelected){
          this.setState({
            selected: 'material-icons notSelected pull-right',
            isSelected: false,
          });
          this.props.removeLampFromSystem(this.props.valve.id);
        }else{
          this.setState({
            selected: 'material-icons selected pull-right',
            isSelected:true,
          });
          this.props.addLampToSystem(this.props.valve.id);
        }
    },

	render: function() {
        var lamp = this.props.lamp;
        console.log(lamp, "lamp");

		return(
    		<div className="row list">
                <div className="col-xs-9">
                    <p className="greyName">{lamp.name}</p>
                </div>
                <div className="col-xs-3">
                    <i className={this.state.selected} onClick={this.addLampToSystem}>done</i>
                </div>
            </div>
		)
	},
});
