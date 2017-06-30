import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);

    // bind all handlers
    // this.handlePubClick = this.handlePubClick.bind(this);
  }

  // handlePubClick() {
  //   this.props.findPubsByName('');
  // }

  render() {
    return (
      <div>
        <h1>AIRPORTS</h1>      
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