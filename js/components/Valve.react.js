var React          = require('react');
var ReactPropTypes = React.PropTypes;
var switchValve    = require('../actions/Actions').switchValve;

module.exports = React.createClass({

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
    switchValve: function  () {
        switchValve(this.props.valve.id, this.props.valve.opened);
    },

	render: function() {
        var valve = this.props.valve;
        var interruptor = '';
        if(this.props.valve.opened){
            interruptor = 'onOff waterOn';
        }else{
            interruptor = 'onOff waterOff'
        }

		return(
    		<div className="row list">
                <div className="col-xs-9">
                    <p className="name">{valve.name}</p>
                    <p className="description">{valve.description}</p>
                </div>
                <div className="col-xs-3">
                    <button className={interruptor} onClick={this.switchValve}></button>
                </div>
            </div>
		)
	},
});
