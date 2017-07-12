import React from 'react';
import { connect } from 'react-redux';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';

// components
import App from './App';
import Airports from './Airports';
import GoogleMap from './GoogleMap';
import MapScript from './MapScript';

// utils
import { drawMap, generateInfoWindow, drawMarkersAndRoute, clearMarkersAndRoute, chooseAirports } from '../utils/mapUtils.js';
import { addInputEventListeners, togglePredictions, hideAndClearInputs, toggleDistance } from '../utils/inputUtils.js';

// action creators
import {getAirports} from '../reducers/airports';

describe('COMPONENTS: ', () => {

  let store;

  describe('<App />', () => {

    let wrapper, getAirportsSpy;
    before('Create wrapper and spy', () => {
      store = createMockStore();
      getAirportsSpy = sinon.spy({getAirports: getAirports}, 'getAirports');
      sinon.spy(App.prototype, 'componentWillMount');
      wrapper = mount(<Provider store={store}><App getAirports={getAirportsSpy}/></Provider>);
    })

    it('receives getAirports as prop', () => {
      expect(wrapper.props().children.props.getAirports.wrappedMethod).to.equal(getAirports);
    });

    it('calls componentWillMount which dispatches getAirports', () => {
      expect(App.prototype.componentWillMount.calledOnce).to.equal(true);
      expect(getAirportsSpy.calledOnce).to.equal(true);
    });

  });
  
  describe('<GoogleMap />', () => {

    let wrapper, initMapSpy;
    before('Create wrapper and spy', () => {
      store = createMockStore();
      sinon.spy(GoogleMap.prototype, 'componentDidMount');
      initMapSpy = sinon.spy({initMap: drawMap}, 'initMap');
      wrapper = mount(<GoogleMap initMap={initMapSpy} />);
    });

    it('calls componentDidMount which calls drawMap', () => {
      expect(GoogleMap.prototype.componentDidMount.calledOnce).to.equal(true);
      expect(initMapSpy.calledOnce).to.equal(true);
    });

  });

  describe('<MapScript />', () => {

    let wrapper, initMapSpy, script;
    before('Create wrapper and spy', () => {
      store = createMockStore();
      initMapSpy = sinon.spy({initMap: drawMap}, 'initMap');
      sinon.spy(MapScript.prototype, 'handleScriptLoad');
      wrapper = mount(<MapScript initMap={initMapSpy}/>);
    });

    it('receives initMap as prop', () => {
      expect(wrapper.props().initMap.wrappedMethod).to.equal(drawMap);
    });

    it('calls initMap on handleScriptLoad', () => {
      wrapper.instance().handleScriptLoad();
      expect(MapScript.prototype.handleScriptLoad.calledOnce).to.equal(true);
    })

  });

  describe('<Airports />', () => {

    let wrapper, utils;
    before('Create wrapper and spy', () => {
      utils = {
        addInputEventListeners: addInputEventListeners
      };
      store = createMockStore();
      sinon.spy(Airports.prototype, 'componentDidMount');
      wrapper = mount(<Airports store={store} utils={utils} test={5} />);
    });

    it('calls componentDidMount', () => {
      expect(Airports.prototype.componentDidMount.calledOnce).to.equal(true);
    });

    describe('plotRoute and onTryAgainClick functions', () => {

      let wrapper, plotRouteSpy, onTryAgainClickSpy, utils, utilSpies;
      before('Create wrapper and spies', () => {
        utils = {};
        utilSpies = {};
        store = createMockStore();
        plotRouteSpy = sinon.spy(Airports.prototype, 'plotRoute');
        onTryAgainClickSpy = sinon.spy(Airports.prototype, 'onTryAgainClick');

        // componentDidMount
        utils["addInputEventListeners"] = addInputEventListeners;
        
        // plotRoute
        utils["chooseAirports"] = chooseAirports;
        utils["drawMarkersAndRoute"] = drawMarkersAndRoute;
        utils["hideAndClearInputs"] = hideAndClearInputs;
        // onTryAgainClick
        utils["clearMarkersAndRoute"] = clearMarkersAndRoute;
        // other handlers
        utils["togglePredictions"] = togglePredictions;
        utils["toggleDistance"] = toggleDistance;

        utilSpies["chooseAirports"] = sinon.spy(utils, "chooseAirports");
        utilSpies["drawMarkersAndRoute"] = sinon.spy(utils, "drawMarkersAndRoute");
        utilSpies["hideAndClearInputs"] = sinon.spy(utils, "hideAndClearInputs");
        utilSpies["togglePredictions"] = sinon.spy(utils, "togglePredictions");
        utilSpies["addInputEventListeners"] = sinon.spy(utils, "addInputEventListeners");
        utilSpies["toggleDistance"] = sinon.spy(utils, "toggleDistance");
        utilSpies["clearMarkersAndRoute"] = sinon.spy(utils, "clearMarkersAndRoute");

        wrapper = mount(<Airports store={store} utils={utilSpies} />);
        wrapper.setState({
          distance: 0,
          depart: "",
          arrive: "",
          showTryAgain: false,
          badInput: false
        });

      });

      afterEach('Clear spies', () => {
        plotRouteSpy.reset();
        for (var key in utilSpies) {
          utilSpies[key].reset();
        }
      })
  
      it('is called when #button is clicked and showTryAgain is false', () => {
        wrapper.find('button').simulate('click');
        expect(wrapper.state().showTryAgain).to.equal(false);
        expect(plotRouteSpy.calledOnce).to.equal(true);
      })

      it('is called when "Enter" is pressed, showTryAgain is false, and depart and arrive are not empty', () => {
        wrapper.setState({depart: "TEST DEPART", arrive: "TEST ARRIVE", badInput: false}, () => {
          wrapper.find('#inputContainer').simulate('keyDown', {which: 13});
          expect(plotRouteSpy.calledOnce).to.equal(true);
        });
      });

      it('is not called when #button is clicked and showTryAgain is true --> onTryAgainClick is called instead', () => {
        wrapper.setState({showTryAgain: true, depart: "", arrive: ""}, () => {
          wrapper.find('button').simulate('click');
          expect(wrapper.state('showTryAgain')).to.equal(true);
          expect(plotRouteSpy.calledOnce).to.equal(false);
          expect(onTryAgainClickSpy.calledOnce).to.equal(true);
          // onTryAgainClick calls clearMarkersAndRoute
          expect(utilSpies["clearMarkersAndRoute"].calledOnce).to.equal(true);
        });
      }); 

      it('is not called when "Enter" is pressed and showTryAgain is true', () => {
        wrapper.setState({showTryAgain: true, depart: "TEST DEPART", arrive: "TEST ARRIVE"}, () => {
          wrapper.find('#inputContainer').simulate('keyDown', {keyCode: 13});
          expect(wrapper.state('showTryAgain')).to.equal(true);
          expect(plotRouteSpy.calledOnce).to.equal(false);
          expect(onTryAgainClickSpy.calledOnce).to.equal(true);
        });
      });  

      it('plots route with valid input by calling chooseAirports, drawMakrersAndRoute, and hideAndClearInputs', () => {
        wrapper.setState({showTryAgain: false}, () => {
          wrapper.instance().plotRoute();
          expect(utilSpies["chooseAirports"].calledOnce).to.equal(true);
          expect(utilSpies["drawMarkersAndRoute"].calledOnce).to.equal(true);
          expect(utilSpies["hideAndClearInputs"].calledOnce).to.equal(true);
        });
      });

      it('does NOT plot route with invalid input and sets badInput on state to true', () => {
        wrapper.setState({showTryAgain: false, depart: "", arrive: ""}, () => {
          var badInputPromise = new Promise((res, rej) => {
            res(wrapper.instance().plotRoute());
          })
          expect(utilSpies["chooseAirports"].calledOnce).to.equal(false);
          expect(utilSpies["drawMarkersAndRoute"].calledOnce).to.equal(false);
          expect(utilSpies["hideAndClearInputs"].calledOnce).to.equal(false);
          badInputPromise
            .then(() => {
              expect(wrapper.state('badInput')).to.equal(true);
            })
            .catch((rejectionReason) => {
              console.log(rejectionReason);
            })
        });
      });

      it('does NOT plot route with identical inputs and sets badInput on state to true', () => {
        wrapper.setState({showTryAgain: false, depart: "TEST", arrive: "TEST"}, () => {
          var badInputPromise = new Promise((res, rej) => {
            res(wrapper.instance().plotRoute());
          })
          expect(utilSpies["chooseAirports"].calledOnce).to.equal(false);
          expect(utilSpies["drawMarkersAndRoute"].calledOnce).to.equal(false);
          expect(utilSpies["hideAndClearInputs"].calledOnce).to.equal(false);
          badInputPromise
            .then(() => {
              expect(wrapper.state('badInput')).to.equal(true);
            })
            .catch((rejectionReason) => {
              console.log(rejectionReason);
            })
        });
      });
    
    });

  });
  
});