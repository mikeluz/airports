import React from 'react';
import axios from 'axios';

// import Script from 'react-load-script';
import MapScript from './MapScript'

const mapStyle = {
  height: "600px",
  zIndex: "-5"
};

const mapContainerStyle = {
  height: "100%"
};

class GoogleMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      initMap: {}
    };

  }

  componentDidMount() {
    let map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
    this.setState({
      initMap: initMap
    });
  }

  render() {
    return (
      <div id="map-container" style={mapContainerStyle}>
        <div id="map" style={mapStyle}></div>
        {
          (typeof this.state.initMap === 'function') ? <MapScript initMap={this.state.initMap}/> : <h1>Oops, something went wrong.</h1>
        }
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