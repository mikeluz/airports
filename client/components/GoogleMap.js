import React from 'react';
import axios from 'axios';

import MapScript from './MapScript';

// utils
import styles from '../utils/styles.js';
import { drawMap } from '../utils/mapUtils.js';

class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initMap: {}
    };
  }

  componentDidMount() {
    this.setState({
      // set state with initMap callback to be called once map script has loaded the maps API
      initMap: drawMap()
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