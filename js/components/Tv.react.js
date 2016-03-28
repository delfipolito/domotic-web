var React          = require('react');
var ReactPropTypes = React.PropTypes;
var turnTv       = require('../actions/Actions').turnTv;

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
    turnTv: function  () {
        turnTv(this.props.tv.id, this.props.tv.turned_on);
    },
	
	render: function() {
        var tv = this.props.tv;
        var interruptor = '';
        if(this.props.tv.turned_on){
            interruptor = 'onOff tvOn';
        }else{
            interruptor = 'onOff tvOff'
        }
        
		return(
    		<div className="row list"> 
                <div className="col-xs-9">
                    <p className="name">{tv.name}</p>
                    <p className="description">{tv.description}</p>
                </div> 
                <div className="col-xs-3">
                    <button className={interruptor} onClick={this.turnTv}></button>
                </div>  
            </div>
		)
	},
});