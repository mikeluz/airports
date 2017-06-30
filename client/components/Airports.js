import React from 'react';
import axios from 'axios';
import Autocomplete from 'react-predictive-input';

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

  componentDidUpdate() {
    let airportNames = this.props.airports;

    let array = airportNames.map(airport => {
      return airport.name;
    })

  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  onItemSelected(value){
    console.log(`${value} was selected`);
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
            onSelected={this.onItemSelected.bind(this)} 
            ></Autocomplete>

          </div>
          <div id="arrive" style={inputStyle}>
            <h2>Arrive</h2>
            <Autocomplete
            id="arrive"
            placeholder="e.g., Seattle Tacoma"
            data={this.props.airports && this.props.airports.map(airport => airport.name)}
            style={predictiveDropdownStyles}
            onSelected={this.onItemSelected.bind(this)} 
            ></Autocomplete>
          </div>
        </div>  
        </form>
        <br/>
        <button type="submit">SUBMIT</button>
        <br/>
        <hr/>
      </div>
    )
  }
}

import {connect} from 'react-redux'

// export default Airports

// action creators
import {getAirports} from '../reducers/airports'

export default connect(
  ({airports}) => ({
    airports: airports
  }), {getAirports},
)(Airports)