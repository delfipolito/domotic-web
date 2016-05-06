var React           = require('react');
var router          = require('../router');
var getTvs          = require('../actions/Actions').getTvs;
var NavBar          = require('./NavBar.react');
var Store           = require('../stores/Store');
var Tv              = require('./Tv.react.js');

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },
  componentWillMount: function() {
    getTvs();
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },


  _onChange: function() {

    var tvs = Store.getTvs();
    console.log("change", tvs);
    this.setState({
      tvs: tvs,
    });
  },



  render: function() {
    var tvs = this.state.tvs;
    var allTvs = [];

    for (var key in tvs) {
      allTvs.push(<Tv key={key} tv={tvs[key]} />);
    }


    return(
      <div className="">

        <div className="container">
          <div className="whiteBox">
            <p className="title">TELEVISIONES DE LA CASA</p>
            <hr/>
            <div className="noPadding col-xs-12 col-sm-offset-2 col-sm-8">{allTvs}</div>
          </div>
        </div>
      </div>
    )
  }
});
