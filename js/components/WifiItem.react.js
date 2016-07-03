var React          = require('react');
var ReactPropTypes = React.PropTypes;
//var deleteWifi     = require('../actions/Actions').deleteWifi;

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
      //deleteUser(this.props.wifi.id);
    }
  },

	render: function() {
    var wifi = this.props.wifi;


		return(
    		<div className="row list valign-wrapper">
                <div className="col-xs-9">
                    <p className="name">{wifi.ssid}</p>
                    <p className="description">{wifi.password}</p>
                </div>
                <div className="col-xs-3">
                    <button className= "deleteButton allHeight" onClick={this.deleteWifi} ></button>
                </div>
            </div>
		)
	},
});
