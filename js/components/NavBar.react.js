var React           = require('react');
var ElementsStore   = require('../stores/ElementsStore');
var SessionStore    = require('../stores/SessionStore');
var redirect        = require('../actions/RouteActions').redirect;
var getServerPhotos = require('../actions/Actions').getServerPhotos;
var router          = require('../router');
var getTopics       = require('../actions/Actions').getLights;

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },

  componentWillMount: function(){
  },

  componentDidMount: function() {
    ElementsStore.addChangeListener(this._onChange);
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ElementsStore.removeChangeListener(this._onChange);
    SessionStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
  },
  onClickLights:function  (e) {
    e.preventDefault();
    redirect('light_systems');
  },

  onClickAlarms:function  (e) {
    e.preventDefault();
    redirect('alarms');
  },

  onClickRooms:function  (e) {
    e.preventDefault();
    redirect('rooms');
  },

  onClickIrrigation:function  (e) {
    e.preventDefault();
    redirect('irrigation_systems');
  },
  onClickUsersConfiguration:function  (e) {
    e.preventDefault();
    redirect('users_configuration');
  },
  onClickNewUser: function () {
    redirect('new_user');
  },
  onClickLogOut:function  (e) {
    e.preventDefault();
    localStorage.removeItem('Authorization');
    redirect('login');
  },



  render: function() {
    console.log("isLoggedIn",SessionStore.isLoggedIn());
    if(SessionStore.isLoggedIn()){
      return(
        <div className="">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header hidden-xs">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">IntelliHome</a>
              </div>


                <ul className="nav navbar-nav navbar-right">
                  <li className="icons" onClick={this.onClickAlarms}><a className="roundIcon security" href="#"></a></li>
                  <li className="icons" onClick={this.onClickIrrigation}><a className="roundIcon water" href="#"></a></li>
                  <li className="icons" onClick={this.onClickLights}><a className="roundIcon light" href="#"></a></li>
                  <li className="icons" onClick={this.onClickRooms}><a className="roundIcon home" href="#"></a></li>
                  <li className="dropdown icons">
                    <a href="#" className="dropdown-toggle roundIcon user" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"></a>
                    <ul className="dropdown-menu">
                      <li><a className="navbarLink" onClick={this.onClickUsersConfiguration}>Ver usuarios</a></li>
                      <li><a className="navbarLink" onClick={this.onClickNewUser}>Crear nuevo usuario</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a className="navbarLink" onClick={this.onClickLogOut}>Cerrar sesión</a></li>
                    </ul>
                  </li>
                </ul>

              </div>
          </nav>
        </div>
      )
    }else{
      return(<div></div>);
    }

  }
});
