var React                     = require('react');
var router                    = require('../router');
var createWifi                = require('../actions/Actions').createWifi;

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },
  componentWillMount: function() {
  },
  componentDidMount: function() {

  },

  componentWillUnmount: function() {
  },
  _onSubmit: function(e) {
        e.preventDefault();
        var form   = e.target.elements;
        var wifi   = {};

        wifi.ssid            = form.name.value;
        wifi.password        = form.password.value;
        createWifi(wifi);


  },

  _onChange: function() {

  },

  render: function() {

    return(
        <div className="container">
          <form onSubmit={this._onSubmit}>
            <div className="whiteBox">
              <p className="title gradient">NUEVA RED WIFI</p>
              <hr/>
              <div className="col-xs-12">
                    <div className="input-field col-xs-6  col-xs-offset-3 ">
                      <input id="name" type="text" className="formText" required/>
                      <label for="name">Nombre de la red</label>
                    </div>
                    <br/>

                    <div className="input-field col-xs-6  col-xs-offset-3 ">
                      <input id="password" type="password" className="formText" pattern=".{16,}"   required title=" minimo 16 caracteres" required/>
                      <label for="description">Contraseña de la red</label>
                    </div>

                    <div className="input-field col-xs-6  col-xs-offset-3 centered">
                      <button type="submit" className="newElementButton centered">Crear</button>
                    </div>
               </div>
             </div>
          </form>
        </div>
    )
  }
});
