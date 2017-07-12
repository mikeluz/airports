import React from 'react';
import axios from 'axios';

// predictive text component: notes I had to customize this module, hence it being included in the project
import Autocomplete from 'react-predictive-input';

// utils
import styles from '../utils/styles.js';

import store from '../store';

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
      badInput: false,
      departMarker: {},
      arriveMarker: {},
      route: {}
    };
  }

  componentDidMount() {
    this.props.utils.addInputEventListeners();
  }

  plotRoute(evt) {

    // validate input -- if depart or arrive are not defined or are the same, set badInput to false
    if (!this.state.depart || !this.state.arrive || (this.state.depart === this.state.arrive)) {
      this.setState({
        badInput: true,
      });
    } else { // input is good, plot route

      // get needed values with chooseAirports util function
      const [departAirport, departCoors, arriveAirport, arriveCoors, distance] = this.props.utils.chooseAirports(this.props.airports, this.state.depart, this.state.arrive);

      // grab mapRef from store
      let map = store.getState().map;
      // draw markers and route
      let {departMarker, arriveMarker, route} = this.props.utils.drawMarkersAndRoute(map, departAirport, arriveAirport) || {};
      this.props.utils.hideAndClearInputs();

      // set state distance, clear depart and arrive airports
      this.setState({
        distance: distance,
        showTryAgain: true,
        depart: "",
        arrive: "",
        badInput: false,
        departMarker: departMarker,
        arriveMarker: arriveMarker,
        route: route
      });
    }

  }

  // handle selections -- see AutoComplete component
  onDepartSelected(value){
    if (value) {
      this.props.utils.togglePredictions();
      this.setState({
        depart: value,
        badInput: false
      });
    }
  }

  // handle selections -- see AutoComplete component
  onArriveSelected(value){
    if (value) {
      this.props.utils.togglePredictions();
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
    bannerClicks = this.props.utils.toggleDistance(evt, this.state.distance, bannerClicks);
  }

  onTryAgainClick() {
    // clear markers and route
    this.props.utils.clearMarkersAndRoute(this.state.departMarker, this.state.arriveMarker, this.state.route);
    // reset map to default center and zoom
    let map = store.getState().map || null;

    // for testing: check if map is not null
    if (map) {
      map.setCenter({lat: 45.375163, lng: -98.319996});
      map.setZoom(4);
    }

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

              {/* DEPART */}
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

              {/* ARRIVE */}
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
