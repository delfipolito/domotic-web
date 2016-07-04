var React           = require('react');
var router          = require('../router');
var redirect        = require('../actions/RouteActions').redirect;

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

  _onChange: function() {
  },

  goBack: function() {
    redirect('rooms');
  },


  render: function() {
    return(
      <div className="">
        <div className="container">
          <div className="whiteBox centered">
            <div className="row">
              <div className="col-xs-3 leftAligned"><button className="goBackButton " onClick={this.goBack}>Volver</button></div>
              <div className="col-xs-6"><p className="title gradient">Camera</p></div>
            </div>
            <hr/>
            <img className="centered" src={localStorage.getItem('cameraUrl')}></img>
          </div>
        </div>
      </div>
    )
  }
});
