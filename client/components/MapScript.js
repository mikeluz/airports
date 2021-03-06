import React from 'react';
import axios from 'axios';

import Script from 'react-load-script';

import store from '../store';

class MapScript extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scriptLoaded: false,
      scriptError: false,
    };
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }
   
  handleScriptError() {
    this.setState({ scriptError: true });
  }
   
  handleScriptLoad() {
    // once loaded, call the callback that was declared in GoogleMap and passed down as a prop and put ref to the map on store
    let mapRefStore = this.props.initMap();
    // for testing: check if has received setMap
    if (this.props.setMap) {
      store.dispatch(this.props.setMap(mapRefStore));
    }
    this.setState({ scriptLoaded: true });
  }

  render() {
    return (
      <div>
        <Script
          // load API
          url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAJJ4zQXgdDc2gJfyGy746iBpoGBgSbdp8`}
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
      </div>
    )
  }
}

export default MapScript;