var React                   = require('react');
var router                  = require('../router');
var getLightSystems         = require('../actions/Actions').getLightSystems;
var LightSystemStore        = require('../stores/LightSystemStore');
var redirect                = require('../actions/RouteActions').redirect;
var LightSystem             = require('./LightSystem.react.js');

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },
  componentWillMount: function() {
    getLightSystems();
  },
  componentDidMount: function() {
    LightSystemStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LightSystemStore.removeChangeListener(this._onChange);
  },


  _onChange: function() {
    var lightSystem = LightSystemStore.getLightSystems();

    this.setState({
      lightSystem: lightSystem,
    });
  },
  newSystem: function () {
    redirect('create_light_system');
  },


  render: function() {
    var lightSystem = this.state.lightSystem;
    console.log("LIGHT", lightSystem);
    var allSystems = [];

    for (var key in lightSystem) {
       allSystems.push(<LightSystem key={key} system={lightSystem[key]} />);
    }

    return(
      <div className="">
        <div className="container">
          <button className="newElementButton pull-right" onClick={this.newSystem}>+ Nuevo sistema de luz</button>
          <br/>
          <br/>
          <br/>
          <div className="whiteBox">
            <p className="title gradient">SISTEMAS DE LUZ DE LA CASA</p>
            <hr/>
            <div className="noPadding col-xs-12 col-sm-offset-2 col-sm-8">{allSystems}</div>
          </div>
        </div>
      </div>
    )
  }
});
