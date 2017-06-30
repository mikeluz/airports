import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);

    // bind all handlers
    // this.handlePubClick = this.handlePubClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handlePubClick() {
  //   this.props.findPubsByName('');
  // }

  handleSubmit() {

  }

  render() {
    return (
      <div>
        <h1>How far?</h1>
        <form onSubmit={this.handleSubmit}>
          <h4>Depart</h4>
          <input placeholder="ex. John F. Kennedy"></input>
          <h4>Arrive</h4>
          <input placeholder="ex. Seattle-Tacoma"></input>
        </form>
        <button type="submit">SUBMIT</button>
      </div>
    )
  }
}

import {connect} from 'react-redux'

export default App

// action creators
// import {findPubsByName} from 'APP/app/reducers/pubs/pubSearchResults'

// export default connect(
//   ({}) => ({}), {},
// )(App)