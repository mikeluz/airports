import React from 'react';
import axios from 'axios';
import geolib from 'geolib';

import Autocomplete from 'react-predictive-input';

// utils
import styles from '../utils/styles.js';
import { drawMap, generateInfoWindow, drawMarkersAndRoute } from '../utils/mapUtils.js';
import { addEventHandlers, changeValue } from '../utils/eventHandlers.js';
import togglePredictions from '../utils/inputUtils.js';

// click tracker for header toggle
let bannerClicks = 0;

class Airports extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      depart: "",
      arrive: "",
      showTryAgain: false,
      badInput: false
    };
  }

  componentDidMount() {
    addEventHandlers(this, bannerClicks);
  }

  plotRoute(evt) {
    if (evt) {
      // prevent default event behavior if evt is present
      evt.preventDefault();
    }

    // validate input
    if (!this.state.depart || !this.state.arrive || (this.state.depart === this.state.arrive)) {
      this.setState({
        badInput: true
      });
    } else {
      // if good input, plot route //

      // get DEPART airport from store
      let [departAirport] = this.props.airports.filter(airport => {
        if (airport.name === this.state.depart) {
          return airport;
        }
      });
      // build DEPART coordinates object
      let departCoors = {
        latitude: departAirport.latitude_deg,
        longitude: departAirport.longitude_deg
      };

      // get ARRIVE object from store
      let [arriveAirport] = this.props.airports.filter(airport => {
        if (airport.name === this.state.arrive) {
          return airport;
        }
      });
      // build ARRIVE coordinates object
      let arriveCoors = {
        latitude: arriveAirport.latitude_deg,
        longitude: arriveAirport.longitude_deg
      };

      // get distance in meters with geolib npm module
      let distance = geolib.getDistance(departCoors, arriveCoors);
      
      ////////////////
      // PLOT ROUTE //
      ////////////////

      // redraw map to capture reference to it
      let map = drawMap()();

      // draw markers and route
      drawMarkersAndRoute(map, departAirport, arriveAirport);

      // shrink input container to expose map so you can interact with it
      // note this initially covers the map so as to disallow interacting with the map right away (messes with scrolling)
      document.getElementById('inputContainer').style.height = "";

      // hide inputs
      let hideInput = document.getElementsByTagName("form")[0];
      hideInput.style.cssText = "display: none";

      // set state distance, clear depart and arrive airports
      this.setState({
        distance: distance,
        showTryAgain: true,
        depart: "",
        arrive: "",
        badInput: false
      });

      // clear inputs
      let clearInputs = [].slice.call(document.getElementsByTagName('input'));
      clearInputs.forEach(input => {
        changeValue(input, "");
      });

    }

  }

  // handle selections -- see AutoComplete component
  onDepartSelected(value){
    togglePredictions();
    this.setState({
      depart: value,
      badInput: false
    });
  }

  // handle selections -- see AutoComplete component
  onArriveSelected(value){
    togglePredictions();
    this.setState({
      arrive: value,
      badInput: false
    });
  }

  onTryAgainClick() {
    // grab form to show
    let showInput = document.getElementsByTagName("form")[0];
    showInput.style.cssText = "display: unset";

    // redraw map to reset
    let map = drawMap()();

    // reset height of input to cover map
    document.getElementById('inputContainer').style.height = "100vh";
    
    // clear state
    this.setState({
      distance: 0,
      showTryAgain: false,
      badInput: false
    });
  }

  render() {
    return (
      <div id="inputContainer" style={styles.inputContainerStyle}>
        <h1 id="banner" style={styles.headerStyle}>{(this.state.distance > 0) ? `Distance: ${this.state.distance * 0.000539957} nautical miles` : `Choose two airports to find the distance between them`}</h1>

        {this.state.badInput && <h2 id="badInputWarning" style={styles.badInputWarning}>You must select 2 airports!</h2>}

        <form>
          <div style={styles.table}>

            <div id="depart-div" style={styles.inputStyle}>
              <h1 style={styles.headerStyle}>Depart</h1>
              <Autocomplete
              id="depart"
              placeholder="e.g., John F. Kennedy"
              data={this.props.airports && this.props.airports.map(airport => airport.name)}
              style={styles.predictiveDropdownStyles}
              onSelected={this.onDepartSelected.bind(this)}
              reload={this.state.showTryAgain}
              ></Autocomplete>
            </div>
          
            <div id="arrive-div" style={styles.inputStyle}>
              <h1 style={styles.headerStyle}>Arrive</h1>
              <Autocomplete
              id="arrive"
              placeholder="e.g., Seattle Tacoma"
              data={this.props.airports && this.props.airports.map(airport => airport.name)}
              style={styles.predictiveDropdownStyles}
              onSelected={this.onArriveSelected.bind(this)} 
              reload={this.state.showTryAgain}
              ></Autocomplete>
            </div>
          
          </div>  
        </form>
        {
          this.state.showTryAgain ? 
          <button onClick={this.onTryAgainClick.bind(this)} id="button" style={styles.btnStyle}>TRY AGAIN</button> :
          <button type="submit" id="button" onClick={this.plotRoute.bind(this)} style={styles.btnStyle}>CALCULATE</button>
        }
      </div>
    )
  }
}

import {connect} from 'react-redux'

export default connect(
  ({airports}) => ({
    airports: airports
  }), {},
)(Airports)