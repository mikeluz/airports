import React from 'react';
import axios from 'axios';

import styles from '../styles.js';

import MapScript from './MapScript';

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
        center: {lat: 40.806862, lng: -96.681679},
        zoom: 4
      });
    }
    this.setState({
      initMap: initMap
    });
  }

  render() {
    return (
      <div id="map-container" style={styles.mapContainerStyle}>
        <div id="map" style={styles.mapStyle}></div>
        {
          (typeof this.state.initMap === 'function') ? <MapScript initMap={this.state.initMap}/> : <h1>Oops, something went wrong.</h1>
        }
      </div>
    )
  }
}

import {connect} from 'react-redux';

export default GoogleMap;