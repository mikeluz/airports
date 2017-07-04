import React from 'react';
import axios from 'axios';

import Autocomplete from 'react-predictive-input';

// utils
import styles from '../utils/styles.js';
import { drawMap, generateInfoWindow, drawMarkersAndRoute, chooseAirports } from '../utils/mapUtils.js';
import addEventHandlers from '../utils/eventHandlers.js';
import { togglePredictions, hideAndClearInputs } from '../utils/inputUtils.js';

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
    // validate input -- if depart or arrive are not defined or are the same, set badInput to false
    if (!this.state.depart || !this.state.arrive || (this.state.depart === this.state.arrive)) {
      this.setState({
        badInput: true,
      });
    } else { // input is good, plot route

      // get needed values from chooseAirports util function
      const [departAirport, departCoors, arriveAirport, arriveCoors, distance] = chooseAirports(this.props.airports, this.state.depart, this.state.arrive);
      
      // redraw map to capture reference to it
      let map = drawMap()();
      // draw markers and route
      drawMarkersAndRoute(map, departAirport, arriveAirport);
      hideAndClearInputs();

      // set state distance, clear depart and arrive airports
      this.setState({
        distance: distance,
        showTryAgain: true,
        depart: "",
        arrive: "",
        badInput: false
      });
    }

  }

  // handle selections -- see AutoComplete component
  onDepartSelected(value){
    if (value) {
      togglePredictions();
      this.setState({
        depart: value,
        badInput: false
      });
    }
  }

  // handle selections -- see AutoComplete component
  onArriveSelected(value){
    if (value) {
      togglePredictions();
      this.setState({
        arrive: value,
        badInput: false
      });
    }
  }

  onMouseEnterHandler(evt) {
    evt.target.style.cursor = "pointer";
    evt.target.style.backgroundColor = "yellow";
  }

  onMouseLeaveHandler(evt) {
    evt.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  }

  bannerClickHandler(evt) {
    if (this.state.distance) {
      ++bannerClicks;
      if (bannerClicks === 1) {
        evt.target.innerHTML = `Distance: ${this.state.distance} meters`
      }
      if (bannerClicks === 2) {
        evt.target.innerHTML = `Distance: ${this.state.distance * 0.000621371} miles` 
      }
      if (bannerClicks === 3) {
        evt.target.innerHTML = `Distance: ${this.state.distance * 0.000539957} nautical miles` 
        bannerClicks = 0;
      }
    }
  }

  onTryAgainClick() {
    
    // REMOVE MARKERS AND INFO WINDOWS ?

    // clear state
    this.setState({
      distance: 0,
      showTryAgain: false,
      badInput: false
    });
  }

  render() {
    return (
      <div id="inputContainer" style={styles.inputContainerStyle} onKeyDown={ evt => {
        if (evt.which === 13 && !this.state.badInput && !this.state.distance && (this.state.depart && this.state.arrive)) {
          this.plotRoute();
        }
      }}>
        <h1 id="banner"
        onClick={this.bannerClickHandler.bind(this)} 
        style={styles.headerStyle}>{(this.state.distance > 0) ? 
          `Distance: ${this.state.distance * 0.000539957} nautical miles` : 
          `Choose two airports to find the distance between them`}</h1>
        {
          this.state.badInput && <h2 id="badInputWarning" style={styles.badInputWarning}>You must select 2 airports!</h2>
        }
        {
          !this.state.showTryAgain &&
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
        }
        {
          <button 
          id="button" 
          onClick={this.state.showTryAgain ? this.onTryAgainClick.bind(this) : this.plotRoute.bind(this)}
          onMouseEnter={this.onMouseEnterHandler.bind(this)}
          onMouseLeave={this.onMouseLeaveHandler.bind(this)}
          style={styles.btnStyle}>{this.state.showTryAgain ? "TRY AGAIN" : "CALCULATE"}</button>
        }
      </div>
    )
  }
}

export default Airports;
