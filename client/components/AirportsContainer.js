import React from 'react';
import axios from 'axios';

import Airports from './Airports';

const AirportsContainer = ({airports}) => (

  <Airports airports={airports}/>

)

import {connect} from 'react-redux'

export default connect(
  ({airports}) => ({
    airports: airports
  }), {},
)(AirportsContainer)