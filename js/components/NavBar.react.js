var React           = require('react');
var Store           = require('../stores/Store');
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
    Store.addChangeListener(this._onChange);
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
    SessionStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
  },
  onClickLights:function  (e) {
    e.preventDefault();
    redirect('lights');
  },

  onClickAlarms:function  (e) {
    e.preventDefault();
    redirect('alarms');
  },
  onClickTvs:function  (e) {
    e.preventDefault();
    redirect('tvs');
  },
  onClickTemperatureSensors:function  (e) {
    e.preventDefault();
    redirect('temperatureSensors');
  },
  onClickRooms:function  (e) {
    e.preventDefault();
    redirect('rooms');
  },

  onClickIrrigation:function  (e) {
    e.preventDefault();
    redirect('irrigation_systems');
  },



  render: function() {
    if(1==1){
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
                      <li><a href="#">Ver usuarios</a></li>
                      <li><a href="#">Crear nuevo usuario</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">Cerrar sesión</a></li>
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
