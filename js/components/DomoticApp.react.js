var React 			 = require('react');
var RouteHandler = require('react-router').RouteHandler;
var NavBar       = require('./NavBar.react');

var DomoticApp = React.createClass({
  render: function() {


    return(<div><NavBar/><RouteHandler/></div>)
  }
});

module.exports = DomoticApp;
