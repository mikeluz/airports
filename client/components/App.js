import React from 'react';
import axios from 'axios';

import Airports from './Airports'
import GoogleMap from './GoogleMap'

class App extends React.Component {

  constructor(props) {
    super(props);

    // bind all handlers
    // this.handlePubClick = this.handlePubClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getAirports();
  }

  // handlePubClick() {
  //   this.props.findPubsByName('');
  // }

  handleSubmit() {

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

// export default App

// action creators
import {getAirports} from '../reducers/airports'

export default connect(
  ({}) => ({}), {getAirports},
)(App)