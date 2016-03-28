var React          = require('react');
var ReactPropTypes = React.PropTypes;
var switchLight    = require('../actions/Actions').switchLight;

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
    switchLight: function  () {
        switchLight(this.props.light.id, this.props.light.switched_on);
    },
	
	render: function() {
        var light = this.props.light;
        var interruptor = '';
        if(this.props.light.switched_on){
            interruptor = 'onOff lightOn';
        }else{
            interruptor = 'onOff lightOff'
        }
        
		return(
    		<div className="row list"> 
                <div className="col-xs-9">
                    <p className="name">{light.name}</p>
                    <p className="description">{light.description}</p>
                </div> 
                <div className="col-xs-3">
                    <button className={interruptor} onClick={this.switchLight}></button>
                </div>  
            </div>
		)
	},
});