import React from 'react';
import MapScript from './MapScript';

// utils
import styles from '../utils/styles.js';

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
      initMap: this.props.initMap()
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

export default GoogleMap;