import React from 'react';
import axios from 'axios';

import Airports from './Airports';
import GoogleMap from './GoogleMap';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAirports();
  }

  render() {
    return (
      <div>
        <Airports/>
        <GoogleMap/>
      </div>
    )
  }
}

import {connect} from 'react-redux'

// action creator
import {getAirports} from '../reducers/airports'

export default connect(
  ({}) => ({}), {getAirports},
)(App)