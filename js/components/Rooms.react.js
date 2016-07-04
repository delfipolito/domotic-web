var React           = require('react');
var router          = require('../router');
var getRooms        = require('../actions/Actions').getRooms;
var RoomsStore      = require('../stores/RoomsStore');
var Room            = require('./Room.react.js');

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },
  componentWillMount: function() {
    getRooms();
  },
  componentDidMount: function() {
    RoomsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RoomsStore.removeChangeListener(this._onChange);
  },


  _onChange: function() {
    var rooms = RoomsStore.getRooms();

    this.setState({
      rooms: rooms,
    });
  },



  render: function() {
    var rooms = this.state.rooms;
    var allRooms = [];

    for (var key in rooms) {
      allRooms.push(<Room key={key} room={rooms[key]} />);
      allRooms.push(<Room key={key+1} room={rooms[key]} />);
    }


    return(
      <div className="">
        <div className="container">
          <div className="whiteBox">
            <p className="title gradient">HABITACIONES DE LA CASA</p>
            <hr/>
            <div className="noPadding col-xs-12 col-sm-offset-2 col-sm-8">{allRooms}</div>
          </div>
        </div>
      </div>
    )
  }
});
