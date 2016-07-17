var React          = require('react');
var ReactPropTypes = React.PropTypes;
var deleteWifi     = require('../actions/Actions').deleteWifi;
var selectWifi     = require('../actions/Actions').selectWifi;

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

  deleteWifi: function() {
    if(confirm('Seguro desea eliminar esta red wifi?')){
    deleteWifi(this.props.wifi.id);
    }
  },

  selectWifi: function() {
    if(!this.props.wifi.current){
      selectWifi(this.props.wifi.id);
      console.log("IF");
    }else{
      console.log("elseeee");
    }
  },

	render: function() {
    var wifi = this.props.wifi;
    console.log(wifi);
    var selected = '';
    if(wifi.current){
      selected = 'material-icons selected pull-right';
    }else{
      selected = 'material-icons notSelected pull-right';
    }
		return(
    		<div className="row list valign-wrapper">
                <div className="col-xs-9">
                    <p className="name">{wifi.ssid}</p>
                    <p className="description">{wifi.password}</p>
                </div>
                <div className="col-xs-3">
                    <i className={selected} onClick={this.selectWifi}>done</i>
                    <button className= "deleteButton allHeight" onClick={this.deleteWifi} ></button>
                </div>
            </div>
		)
	},
});
