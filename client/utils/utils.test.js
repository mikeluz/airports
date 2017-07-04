import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { expect } from 'chai';
import sinon from 'sinon';
import {spy} from 'sinon';
import { mount, shallow } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux'

import { drawMap, generateInfoWindow, drawMarkersAndRoute } from './mapUtils.js';
import { addEventHandlers, changeValue } from './eventHandlers.js';
import togglePredictions from './inputUtils.js';

// created in test.setup.js and set as global variables
// console.log(window);
// console.log(document); 

describe('UTILS: ', () => {

  describe('mapUtils', () => {

    describe('drawMap', () => {

      ////////////////////////////////////////////////////////
      // HOW DO I IMPORT GOOGLE MAPS API INTO TEST ENV ???? //
      ////////////////////////////////////////////////////////
      // I've tried:
      // 1. jsdom -> new JSDOM object with script in HTML text to load the maps API
      // -- why didn't work: not sure, but it wasn't working as if it had loaded the API
      // 2. axios GET request to (https://maps.googleapis.com/maps/api/js?key=AIzaSyAJJ4zQXgdDc2gJfyGy746iBpoGBgSbdp8) and then calling eval() on the res.data
      // -- why didn't work: "google" is undefined; something related to the runtime environment

      it('returns a function', () => {
        expect(typeof drawMap()).to.equal("function");
      });
    });

  });

  describe('eventHandlers', () => {

    let wrapper, getAirportsSpy;
    before('Create wrapper and spy', () => {
      // store = createMockStore();
      // getAirportsSpy = sinon.spy({getAirports: getAirports}, 'getAirports');
      // sinon.spy(App.prototype, 'componentWillMount');
      // wrapper = mount(<Provider store={store}><App getAirports={getAirportsSpy}/></Provider>);
    })

    it('receives getAirports as prop', () => {
      // expect(wrapper.props().children.props.getAirports.wrappedMethod).to.equal(getAirports);
    });

    it('calls componentWillMount which dispatches getAirports', () => {
      // expect(App.prototype.componentWillMount.calledOnce).to.equal(true);
      // expect(getAirportsSpy.calledOnce).to.equal(true);
    });

  });

  describe('inputUtils', () => {

    let wrapper, getAirportsSpy;
    before('Create wrapper and spy', () => {
      // store = createMockStore();
      // getAirportsSpy = sinon.spy({getAirports: getAirports}, 'getAirports');
      // sinon.spy(App.prototype, 'componentWillMount');
      // wrapper = mount(<Provider store={store}><App getAirports={getAirportsSpy}/></Provider>);
    })

    it('receives getAirports as prop', () => {
      // expect(wrapper.props().children.props.getAirports.wrappedMethod).to.equal(getAirports);
    });

    it('calls componentWillMount which dispatches getAirports', () => {
      // expect(App.prototype.componentWillMount.calledOnce).to.equal(true);
      // expect(getAirportsSpy.calledOnce).to.equal(true);
    });

  });

  
})
