var React          = require('react');
var ReactPropTypes = React.PropTypes;
var redirect       = require('../actions/RouteActions').redirect;

module.exports = React.createClass({

  getInitialState: function() {

      return{
      };
  },
  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  _onChange: function() {
  },


  seeCamera: function() {
    localStorage.setItem("cameraUrl", this.props.camera.url);
    redirect('camera_view');

  },

	render: function() {
    var camera = this.props.camera;

		return(
    		<div className="row list pointer" onClick={this.seeCamera}>
          <div className="col-xs-9">
              <p className="name">{camera.name}</p>
              <p className="description">{camera.description}</p>
          </div>
          <div className="col-xs-3">
              <button className='onOff videoOff' ></button>
          </div>
        </div>
		)
	},
});
