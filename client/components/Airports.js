import React from 'react';
import axios from 'axios';
import Autocomplete from 'react-predictive-input';

import styles from '../styles.js';

import geolib from 'geolib';

import generateInfoWindow from '../info.js';

const changeValue = (element, value) => {
  const event = new Event('input', { bubbles: true });
  element.value = value;
  element.dispatchEvent(event);
};

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

    this.plotRoute = this.plotRoute.bind(this);
  }

  componentDidMount() {

    let clearInputs = [].slice.call(document.getElementsByTagName('input'));

    clearInputs.forEach(input => {
      input.addEventListener("input", (e) => {
        if (this.state.showTryAgain === true) {
          e.target.value = "";
        }
      });
    });

    if (document.getElementById('tryAgain')) {
      document.getElementById('tryAgain').addEventListener('mouseenter', (evt) => {
        evt.target.style.cursor = "pointer";
        evt.target.style.backgroundColor = "yellow";
      });
      document.getElementById('tryAgain').addEventListener('mouseleave', (evt) => {
        evt.target.style.backgroundColor = "white";
      });
    }

    document.addEventListener('keypress', (evt) => {
        if (evt.which === 13 && !this.state.badInput && !this.state.distance) {
          this.plotRoute();
        }
      });

  }

  plotRoute(evt) {
    if (evt) {
      evt.preventDefault();
    }

    if (!this.state.depart || !this.state.arrive || (this.state.depart === this.state.arrive)) {
      this.setState({
        badInput: true
      });
    } else {

      let [departAirport] = this.props.airports.filter(airport => {
        if (airport.name === this.state.depart) {
          return airport;
        }
      });

      let departCoors = {
        latitude: departAirport.latitude_deg,
        longitude: departAirport.longitude_deg
      };

      let [arriveAirport] = this.props.airports.filter(airport => {
        if (airport.name === this.state.arrive) {
          return airport;
        }
      });

      let arriveCoors = {
        latitude: arriveAirport.latitude_deg,
        longitude: arriveAirport.longitude_deg
      };

      let distance = geolib.getDistance(departCoors, arriveCoors) * 0.000539957;
      let departMarkerCoors = {lat: Number(departAirport.latitude_deg), lng: Number(departAirport.longitude_deg)};
      let arriveMarkerCoors = {lat: Number(arriveAirport.latitude_deg), lng: Number(arriveAirport.longitude_deg)};

      let map;
      (function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.806862, lng: -96.681679},
          zoom: 4
        });
      }());

      let departMarker = new google.maps.Marker({
        position: departMarkerCoors
      });

      let arriveMarker = new google.maps.Marker({
        position: arriveMarkerCoors
      });

      departMarker.setMap(map);
      arriveMarker.setMap(map);

      let departInfo = generateInfoWindow(departAirport).open(map, departMarker);
      let arriveInfo = generateInfoWindow(arriveAirport).open(map, arriveMarker);

      // draw route using Polyline -- no "FLIGHT" travel option in directions service :(
      let line = new google.maps.Polyline({
        path: [
            departMarkerCoors, 
            arriveMarkerCoors
        ],
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
      });

      document.getElementById('inputContainer').style.height = "";

      let hideInput = document.getElementsByTagName("form")[0];
      hideInput.style.cssText = "display: none";

      this.setState({
        distance: distance,
        showTryAgain: true,
        depart: "",
        arrive: "",
        badInput: false
      });

      let clearInputs = [].slice.call(document.getElementsByTagName('input'));

      clearInputs.forEach(input => {
        changeValue(input, "");
      });

    }
  }

  onDepartSelected(value){
    this.setState({
      depart: value,
      badInput: false
    });
  }

  onArriveSelected(value){
    this.setState({
      arrive: value,
      badInput: false
    });
  }

  onTryAgainClick() {
    let showInput = document.getElementsByTagName("form")[0];
    showInput.style.cssText = "display: unset";

    let map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.806862, lng: -96.681679},
        zoom: 4
      });
    }

    initMap();

    document.getElementById('inputContainer').style.height = "100vh";

    this.setState({
      distance: 0,
      showTryAgain: false,
      badInput: false
    });
  }

  render() {
    return (
      <div id="inputContainer" style={styles.inputContainerStyle}>
        <h1 style={styles.headerStyle}>{
          this.state.showTryAgain ? 
          <button onClick={this.onTryAgainClick.bind(this)} id="tryAgain" style={styles.btnStyle}>TRY AGAIN</button> :
          <button type="submit" id="tryAgain" onClick={this.plotRoute} style={styles.btnStyle}>CALCULATE</button>
        }{(this.state.distance > 0) ? `Distance is ${this.state.distance} nautical miles` : `Choose two airports to find the distance between them`}</h1>
        
        {this.state.badInput && <h2 id="badInputWarning" style={styles.badInputWarning}>You must select 2 airports!</h2>}

        <form onSubmit={this.plotRoute}>
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