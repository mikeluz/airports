import React from 'react';
import axios from 'axios';

import Script from 'react-load-script';

class MapScript extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      scriptLoaded: false,
      scriptError: false,
    };

  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }
   
  handleScriptError() {
    this.setState({ scriptError: true })
  }
   
  handleScriptLoad() {
    this.props.initMap();
    this.setState({ scriptLoaded: true })
  }


  render() {
    return (
      <div>
        <Script
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