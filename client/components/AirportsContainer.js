import React from 'react';
import axios from 'axios';

import Airports from './Airports';

// utils
import { drawMap, generateInfoWindow, drawMarkersAndRoute, clearMarkersAndRoute, chooseAirports } from '../utils/mapUtils.js';
import { addInputEventListeners, togglePredictions, hideAndClearInputs, toggleDistance } from '../utils/inputUtils.js';

const utils ={
	drawMap,
	generateInfoWindow,
	drawMarkersAndRoute,
	clearMarkersAndRoute,
	chooseAirports,
	addInputEventListeners,
	toggleDistance,
	togglePredictions,
	hideAndClearInputs
};

const AirportsContainer = ({airports}) => (
  <Airports airports={airports} utils={utils} />
)

import {connect} from 'react-redux'

export default connect(
  ({airports, utils, map}) => ({
    airports: airports,
    utils: utils,
    map: map
  }), {},
)(AirportsContainer)