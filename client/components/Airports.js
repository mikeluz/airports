import React from 'react';
import axios from 'axios';
import Autocomplete from 'react-predictive-input';

import geolib from 'geolib';

const table = {
  display: 'table',
  textAlign: 'center',
  margin: 'auto'
};

const inputStyle = {
  display: 'table-cell'
};

const headerStyle = {
  marginBottom: '2px',
  padding: "5px",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "rgba(252, 123, 42, 0.8)"
};

const predictiveDropdownStyles = {
  fontSize: "10pt",
  listStyle: "none",
}

class Airports extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      distance: 0,
      depart: "",
      arrive: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    let [departAirport] = this.props.airports.filter(airport => {
      if (airport.name === this.state.depart) {
        return airport;
      }
    });

    let departCoors = {
      latitude: departAirport.latitude_deg,
      longitude: departAirport.longitude_deg
    }

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

  render() {
    return (
      <div>
        <h1 style={headerStyle}>How far is it? {this.state.distance && this.state.distance} miles.</h1>
        <form onSubmit={this.handleSubmit}>
        <div style={table}>
          <div id="depart" style={inputStyle}>
            <h2>Depart</h2>
            <Autocomplete
            id="depart"
            placeholder="e.g., John F. Kennedy"
            data={this.props.airports && this.props.airports.map(airport => airport.name)}
            style={predictiveDropdownStyles}
            onSelected={this.onDepartSelected.bind(this)} 
            ></Autocomplete>

          </div>
          <div id="arrive" style={inputStyle}>
            <h2>Arrive</h2>
            <Autocomplete
            id="arrive"
            placeholder="e.g., Seattle Tacoma"
            data={this.props.airports && this.props.airports.map(airport => airport.name)}
            style={predictiveDropdownStyles}
            onSelected={this.onArriveSelected.bind(this)} 
            ></Autocomplete>
          </div>
        </div>  
        </form>
        <br/>
        <button type="submit" onClick={this.handleSubmit}>SUBMIT</button>
        <br/>
        <hr/>
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