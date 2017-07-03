import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

// import Airports component
import Airports from './Airports';

// import store
import { Provider } from 'react-redux'
import store from '../store';

describe('<Airports /> component', () => {

  it('calls componentDidMount', () => {
    sinon.spy(Airports.prototype, 'componentDidMount');
    const wrapper = mount(<Provider store={store}><Airports /></Provider>);
    expect(Airports.prototype.componentDidMount.calledOnce).to.equal(true);
  });

});