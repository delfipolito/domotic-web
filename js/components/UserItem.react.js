var React          = require('react');
var ReactPropTypes = React.PropTypes;
var deleteUser    = require('../actions/Actions').deleteUser;

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
  deleteUser: function() {
    if(confirm('Seguro desea eliminar este usuario?')){
      deleteUser(this.props.user.id);
    }
  },

	render: function() {
        var user = this.props.user;


		return(
    		<div className="row list valign-wrapper">
                <div className="col-xs-9">
                    <p className="name"><span>{user.first_name}</span><span> </span><span>{user.last_name}</span></p>
                    <p className="description">{user.email}</p>
                </div>
                <div className="col-xs-3">
                    <button className= "deleteButton allHeight" onClick={this.deleteUser} ></button>
                </div>
            </div>
		)
	},
});
