import React from 'react';
import { connect } from 'react-redux';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';

// components
import App from './App';
import Airports from './Airports';
import GoogleMap from './GoogleMap';
import MapScript from './MapScript';

// utils
import { drawMap } from '../utils/mapUtils.js';
import { addEventHandlers } from '../utils/eventHandlers.js';

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

    let wrapper, addEventHandlersSpy;
    before('Create wrapper and spy', () => {
      store = createMockStore();
      sinon.spy(Airports.prototype, 'componentDidMount');
      wrapper = mount(<Airports store={store}/>);
    });

    it('calls componentDidMount', () => {
      expect(Airports.prototype.componentDidMount.calledOnce).to.equal(true);
    });

    describe('plotRoute function', () => {

      let wrapper, plotRouteSpy, onTryAgainClickSpy;
      before('Create wrapper and spy', () => {
        store = createMockStore();
        plotRouteSpy = sinon.spy(Airports.prototype, 'plotRoute');
        onTryAgainClickSpy = sinon.spy(Airports.prototype, 'onTryAgainClick');
        // keyDownSpy = sinon.spy(addEventHandlers);
        wrapper = mount(<Airports store={store} />);
        wrapper.setState({
          distance: 0,
          depart: "",
          arrive: "",
          showTryAgain: false,
          badInput: false
        });
    });
  
      it('is called when #button is clicked and showTryAgain is false', () => {
        wrapper.find('button').simulate('click');
        expect(wrapper.state().showTryAgain).to.equal(false);
        expect(Airports.prototype.plotRoute.calledOnce).to.equal(true);
      })

      it('is called when "Enter" is pressed and showTryAgain is false', () => {
        wrapper.find('#inputContainer').simulate('keyDown', {keyCode: 13});
        expect(plotRouteSpy.calledOnce).to.equal(true);
      })

      it('is not called when #button is clicked and showTryAgain is true --> onTryAgainClick is called instead', () => {
        wrapper.setState({showTryAgain: true}, () => {
          wrapper.find('button').simulate('click');
          expect(wrapper.state('showTryAgain')).to.equal(true);
          expect(Airports.prototype.plotRoute.calledTwice).to.equal(false);
          expect(Airports.prototype.onTryAgainClick.calledOnce).to.equal(true);
        });
      })  

      it('is not called when "Enter" is pressed and showTryAgain is true --> onTryAgainClick is called instead', () => {
        wrapper.setState({showTryAgain: true}, () => {
          wrapper.find('#inputContainer').simulate('keyDown', {keyCode: 13});
          expect(wrapper.state('showTryAgain')).to.equal(true);
          expect(Airports.prototype.plotRoute.calledTwice).to.equal(false);
          expect(Airports.prototype.onTryAgainClick.calledOnce).to.equal(true);
        });
      })  


      it('plots route with valid input', () => {

      })

    })

    // it('calls passed in onChange prop with value of change event', () => {
    //     wrapper.simulate('change', { target: { value: 13 } });
    //     expect(onChangeSpy.called).to.be.true;
    // });

  });
  
})
