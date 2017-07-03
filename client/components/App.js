import React from 'react';
import axios from 'axios';

import Airports from './Airports';
import GoogleMap from './GoogleMap';

import { drawMap } from '../utils/mapUtils.js';

import store from '../store';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    store.dispatch(this.props.getAirports());
  }

  render() {
    return (
      <div>
        <Airports />
        <GoogleMap initMap={drawMap} />
      </div>
    )
  }
}

export default App;