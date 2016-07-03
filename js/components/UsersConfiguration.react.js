var React                     = require('react');
var router                    = require('../router');
var UsersStore                = require('../stores/UsersStore');
var redirect                  = require('../actions/RouteActions').redirect;
var getUsers                  = require('../actions/Actions').getUsers;
var UserItem                  = require('./UserItem.react');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      users: []
    };
  },
  componentWillMount: function() {
    getUsers();
  },
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onChange);
    getUsers();
  },

  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onChange);
  },
  _onSubmit: function(e) {
        e.preventDefault();
  },

  _onChange: function() {
    users = UsersStore.getUsers();
    this.setState({
      users: users
    });
  },
  newUser: function () {
    redirect('new_user');
  },

  render: function() {

    console.log(this.state.users);
    var users = this.state.users;
    var allUsers = [];

    for (var key in users) {
      allUsers.push(<UserItem key={key} user={users[key]} />);
    }

    return(
      <div className="">
        <div className="container">
          <form onSubmit={this._onSubmit}>
            <div className="whiteBox">
              <p className="title gradient">CONFIGURACION DE USUARIOS</p>
              <hr/>
              <div className="col-xs-12">
                <button className="newElementButton pull-right" onClick={this.newUser}>+ Nuevo usuario</button>
              </div>
              <div className="col-xs-8 col-xs-offset-2">{allUsers}</div>
             </div>
          </form>
        </div>
      </div>
    )
  }
});
