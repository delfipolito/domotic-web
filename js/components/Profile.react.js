var React           = require('react');
var router          = require('../router');
var getTopics       = require('../actions/Actions').getLights;
var Store           = require('../stores/Store');
var redirect        = require('../actions/RouteActions').redirect;
var getServerPhotos = require('../actions/Actions').getServerPhotos;

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },

  componentWillMount: function(){
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    
  },

  render: function() {
    
    return(
      <div className="">
      </div>
    )
  }
});
