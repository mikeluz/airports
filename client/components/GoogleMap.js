import React from 'react';
import axios from 'axios';

const mapStyle = {
  height: "100%"
};

class GoogleMap extends React.Component {

  constructor(props) {
    super(props);

    // bind all handlers
    // this.handlePubClick = this.handlePubClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handlePubClick() {
  //   this.props.findPubsByName('');
  // }

  componentDidMount() {

  }

  handleSubmit() {

  }

  render() {
    return (
      <div>
        <h1>THIS WILL BE A MAP</h1>
        <div id="map" style={mapStyle}></div>
      </div>
    )
  }
}

import {connect} from 'react-redux'

export default GoogleMap

// action creators
// import {findPubsByName} from 'APP/app/reducers/pubs/pubSearchResults'

// export default connect(
//   ({}) => ({}), {},
// )(App)