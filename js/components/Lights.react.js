var React           = require('react');
var router          = require('../router');
var getLights       = require('../actions/Actions').getLights;
var Store           = require('../stores/Store');
var Light           = require('./Light.react.js');

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },
  componentWillMount: function() {
    getLights();
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },


  _onChange: function() {
    var lights = Store.getLights();
    lights.push({name: 'Lampara de pie', description: 'Cuarto de Facundo', switched_on: false});
    lights.push({name: 'Lampara de ecritorio', description: 'Cuarto de Facundo', switched_on: true});
    this.setState({
      lights: lights,
    });
  },



  render: function() {
    var lights = this.state.lights;
    var allLights = [];

    for (var key in lights) {
      allLights.push(<Light key={key} light={lights[key]} />);
    }


    return(
      <div className="">
        <div className="container">
          <div className="whiteBox">
            <p className="title">LUCES DE LA CASA</p>
            <hr/>
            <div className="noPadding col-xs-12 col-sm-offset-2 col-sm-8">{allLights}</div>
          </div>
        </div>
      </div>
    )
  }
});
