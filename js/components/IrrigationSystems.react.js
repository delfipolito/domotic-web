var React                   = require('react');
var router                  = require('../router');
var getIrrigationSystems    = require('../actions/Actions').getIrrigationSystems;
var IrrigationSystemStore   = require('../stores/IrrigationSystemStore');
var redirect                = require('../actions/RouteActions').redirect;
var IrrigationSystem        = require('./IrrigationSystem.react.js');

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },
  componentWillMount: function() {
    getIrrigationSystems();
  },
  componentDidMount: function() {
    IrrigationSystemStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    IrrigationSystemStore.removeChangeListener(this._onChange);
  },


  _onChange: function() {
    var irrigationSystem = IrrigationSystemStore.getIrrigationSystems();

    this.setState({
      irrigationSystem: irrigationSystem,
    });
  },
  newSystem: function () {
    redirect('create_irrigation_system');
  },


  render: function() {
    var irrigationSystem = this.state.irrigationSystem;
    console.log("IRRIGATION", irrigationSystem);
    var allSystems = [];

    for (var key in irrigationSystem) {
      allSystems.push(<IrrigationSystem key={key} system={irrigationSystem[key]} />);
    }

    return(
      <div className="">
        <div className="container">
          <button className="newElementButton pull-right" onClick={this.newSystem}>+ Nuevo sistema de riego</button>
          <br/>
          <br/>
          <br/>
          <div className="whiteBox">
            <p className="title">SISTEMAS DE RIEGO DE LA CASA</p>
            <hr/>
            <div className="noPadding col-xs-12 col-sm-offset-2 col-sm-8">{allSystems}</div>
          </div>
        </div>
      </div>
    )
  }
});
