var React           = require('react');
var router          = require('../router');
var getTopics       = require('../actions/Actions').getLights;
var ElementsStore   = require('../stores/ElementsStore');
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
    ElementsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ElementsStore.removeChangeListener(this._onChange);
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
