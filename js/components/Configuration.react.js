var React                     = require('react');
var router                    = require('../router');
var ConfigurationStore        = require('../stores/ConfigurationStore');
var redirect                  = require('../actions/RouteActions').redirect;
var getWifi                   = require('../actions/Actions').getWifi;
var WifiItem                  = require('./WifiItem.react');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      wifi: []
    };
  },
  componentWillMount: function() {
    getWifi();
  },
  componentDidMount: function() {
    ConfigurationStore.addChangeListener(this._onChange);
    getWifi();
  },

  componentWillUnmount: function() {
    ConfigurationStore.removeChangeListener(this._onChange);
  },
  _onSubmit: function(e) {
        e.preventDefault();
  },

  _onChange: function() {
    wifi = ConfigurationStore.getWifi();
    this.setState({
      wifi: wifi
    });
  },
  newWifi: function () {
    redirect('new_wifi');
  },

  render: function() {

    console.log("wifi",this.state.wifi);
    var wifi = this.state.wifi;
    var allWifi = [];

    for (var key in wifi) {
      allWifi.push(<WifiItem key={key} wifi={wifi[key]} />);
    }

    return(
      <div className="">
        <div className="container">
          <form onSubmit={this._onSubmit}>
            <div className="whiteBox">
              <div className="row">
                <p className="title gradient">CONFIGURACION DE REDES WIFI</p>
                <hr/>
                <div className="col-xs-12">
                  <button className="newElementButton pull-right" onClick={this.newWifi}>+ Nueva red</button>
                </div>
                <div className="col-xs-8 col-xs-offset-2">{allWifi}</div>
              </div>

              <div className="spaceMargin">

              </div>
              <div className="row">
                <p className="title gradient">CONFIGURACION DE RASPBERRY PI</p>
                <hr/>
                <div className="col-xs-12">
                  //<button className="newElementButton pull-right" onClick={this.newUser}>+ Nueva red</button>
                </div>
              </div>
             </div>
          </form>
        </div>
      </div>
    )
  }
});
