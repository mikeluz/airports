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
      showTryAgain: false
    };

    this.plotRoute = this.plotRoute.bind(this);
  }

  componentDidMount() {

    let clearInputs = [].slice.call(document.getElementsByTagName('input'));

    clearInputs.forEach(input => {
      // console.log(input);
      input.addEventListener("input", (e) => {
        if (this.state.showTryAgain === true) {
          e.target.value = "";
        }
        // console.log(e.target.value);
        // console.log("INPUT FIRED");
      });
    });

  }

  plotRoute(evt) {
    evt.preventDefault();

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

    this.setState({
      distance: distance
    });

    var departMarkerCoors = {lat: Number(departAirport.latitude_deg), lng: Number(departAirport.longitude_deg)};
    var arriveMarkerCoors = {lat: Number(arriveAirport.latitude_deg), lng: Number(arriveAirport.longitude_deg)};

    let map;
    (function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.806862, lng: -96.681679},
        zoom: 4
      });
    }());

    var departMarker = new google.maps.Marker({
      position: departMarkerCoors
    });

    var arriveMarker = new google.maps.Marker({
      position: arriveMarkerCoors
    });

    departMarker.setMap(map);
    arriveMarker.setMap(map);

    let departInfo = generateInfoWindow(departAirport).open(map, departMarker);
    let arriveInfo = generateInfoWindow(arriveAirport).open(map, arriveMarker);

    // draw route using Polyline -- no "FLIGHT" travel option in directions service :(
    var line = new google.maps.Polyline({
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

    var hideInput = document.getElementsByTagName("form")[0];
    hideInput.style.cssText = "display: none";

    this.setState({
      showTryAgain: true,
      depart: "",
      arrive: "",
    });

    let clearInputs = [].slice.call(document.getElementsByTagName('input'));

    clearInputs.forEach(input => {
      changeValue(input, "");
    });

  }

  onDepartSelected(value){
    this.setState({
      depart: value
    });
  }

  onArriveSelected(value){
    this.setState({
      arrive: value
    });
  }

  onTryAgainClick() {
    var showInput = document.getElementsByTagName("form")[0];
    showInput.style.cssText = "display: unset";

    let map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.806862, lng: -96.681679},
        zoom: 4
      });
    }

    initMap();

    document.getElementById('inputContainer').style.height = "100%";

    this.setState({
      distance: 0,
      showTryAgain: false
    });
  }

  render() {
    // console.log("RENDER", this.state.showTryAgain);
    return (
      <div id="inputContainer" style={styles.inputContainerStyle}>
        <h1 style={styles.headerStyle}>How far is it? {(this.state.distance > 0) && ` ${this.state.distance} nautical miles.`}</h1>
        <form onSubmit={this.plotRoute}>
        <div style={styles.table}>
          <div id="depart-div" style={styles.inputStyle}>
            <h2>Depart</h2>
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
            <h2>Arrive</h2>
            <Autocomplete
            id="arrive"
            placeholder="e.g., Seattle Tacoma"
            data={this.props.airports && this.props.airports.map(airport => airport.name)}
            style={styles.predictiveDropdownStyles}
            onSelected={this.onArriveSelected.bind(this)} 
            reload={this.state.showTryAgain}
            ></Autocomplete>
          </div>
        <div>{
          (this.state.depart && this.state.arrive) && <button type="submit" onClick={this.plotRoute} style={styles.submitBtn}>SUBMIT</button>
        }</div>
        </div>  
        </form>
        <div>
        {
          this.state.showTryAgain && <button onClick={this.onTryAgainClick.bind(this)} id="tryAgain" style={styles.tryAgainStyle}>TRY AGAIN</button>
        }
        </div>
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