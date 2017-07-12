import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { expect } from 'chai';

import { drawMap, generateInfoWindow, drawMarkersAndRoute, clearMarkersAndRoute, chooseAirports } from '../utils/mapUtils.js';
import { addInputEventListeners, togglePredictions, hideAndClearInputs, toggleDistance } from '../utils/inputUtils.js';

describe('UTILS: ', () => {

  describe('mapUtils', () => {

    describe('drawMap', () => {
      ////////////////////////////////////////////////////////
      // HOW TO IMPORT GOOGLE MAPS API INTO TEST ENV ???? ///
      //////////////////////////////////////////////////////
      // I've tried:
      // 1. jsdom -> new JSDOM object with script in HTML text to load the maps API
      // -- why didn't work: not sure, but it wasn't working as if it had loaded the API
      // 2. axios GET request to (https://maps.googleapis.com/maps/api/js?key=AIzaSyAJJ4zQXgdDc2gJfyGy746iBpoGBgSbdp8) and then calling eval() on the res.data
      // -- why didn't work: "google" is undefined; something related to the runtime environment

      // as is, I'm just verifying it returns a function
      it('returns a function', () => {
        expect(typeof drawMap()).to.equal("function");
      });
    });

  });

  describe('inputUtils', () => {

    let inputContainer, form, departInput, arriveInput;
    before('Create wrapper and spy', () => {

      // form
      form = document.createElement('form');
      form.display = "block";

      // depart input
      departInput = document.createElement('input');
      departInput.display = "block";
      form.appendChild(departInput);
      
      // arrive input
      arriveInput = document.createElement('input');
      arriveInput.display = "block";
      form.appendChild(arriveInput);
      
      // inputContainer
      inputContainer = document.createElement('div');
      inputContainer.id = "inputContainer";
      inputContainer.style.height = "900px";
      inputContainer.appendChild(form);
      document.body.appendChild(inputContainer);

      // dropdowns
      document.body.appendChild(document.createElement('ul'));
      document.body.appendChild(document.createElement('ul'));    
    
    });

    describe('TogglePredictions function', () => {

      it('toggles the display property of all ul elements --> if has children display:block, else display:none', () => {
        
        togglePredictions();
        
        [].slice.call(document.getElementsByTagName('ul'))
          .forEach(ul => {
            expect(ul.style._values.display).to.equal("none");
          });
        [].slice.call(document.getElementsByTagName('ul'))
          .forEach(ul => {
            ul.appendChild(document.createElement('li'));
          });
        
        togglePredictions();
        
        // display should be toggled back after second call
        [].slice.call(document.getElementsByTagName('ul'))
          .forEach(ul => {
            expect(ul.style._values.display).to.equal("block");
          });

        [].slice.call(document.getElementsByTagName('ul'))
          .forEach(ul => {
            ul.removeChild(ul.firstChild);
          });
      });
    
    });

    describe('hideAndClearInputs function', () => {

      it('shrinks inputContainer height to 0 and hides/clear input form', () => {

        // before
        expect(inputContainer.style._values.height).to.equal("900px");
        expect(form.display).to.equal("block");
        
        hideAndClearInputs();
        
        // after
        expect(inputContainer.style._values.height).to.equal(undefined);
        expect(form.display).to.equal("none");
      
      });
    
    });

    describe('addInputEventListeners function', () => {

      it('adds listeners to check if ul dropdowns have children --> if so display:block, else display:none', () => {

        addInputEventListeners();

        // before -- no children, display should be "none"
        [].slice.call(document.getElementsByTagName('ul'))
          .forEach(ul => {
            expect(ul.children.length).to.equal(0);
            expect(ul.style._values.display).to.equal("none");
          });

        // add children
        [].slice.call(document.getElementsByTagName('ul'))
          .forEach(ul => {
            ul.appendChild(document.createElement('li'));
          });

        // fire input event
        const event = new window.Event('input', { bubbles: true });
        document.dispatchEvent(event);
        
        // after -- has children so display is now "block"
        [].slice.call(document.getElementsByTagName('ul'))
          .forEach(ul => {
            expect(ul.children.length).to.equal(1);
            expect(ul.style._values.display).to.equal("block");
          });
      
      });
    
    });

    describe('toggleDistance', () => {

      it('cycles through 3 conversions of distance', () => {

        let clicks = 0;
        let banner = document.createElement('h1');
        banner.id = "banner";
        document.body.appendChild(banner);

        let clickEvent = {
          target: banner
        };

        // check that output is correct and clicks is incremented and reset correctly
        clicks = toggleDistance(clickEvent, 1200, clicks);
        expect(banner.innerHTML).to.equal("Distance: 1200 meters");
        expect(clicks).to.equal(1);
        clicks = toggleDistance(clickEvent, 1200, clicks);
        expect(banner.innerHTML).to.equal(`Distance: ${1200 * 0.000621371} miles`);
        expect(clicks).to.equal(2);
        clicks = toggleDistance(clickEvent, 1200, clicks);
        expect(banner.innerHTML).to.equal(`Distance: ${1200 * 0.000539957} nautical miles`);
        expect(clicks).to.equal(0);

      });

    });

  });

});
