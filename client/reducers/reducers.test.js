import {expect} from 'chai';

import {createStore} from 'redux';
import rootReducer from './index';

import {setAirports} from './airports';
import {setMap} from './map';

describe('REDUX:', ()=> {

    // ACTIONS
    describe('Action creators', () => {

        describe('setAirports', () => {
            
            it('returns properly formatted action', () => {

                const testAirports = ["Airport 1", "Airport 2", "Airport 3"];

                expect(setAirports(testAirports)).to.be.deep.equal({
                    type: 'SET_AIRPORTS',
                    airports: testAirports
                });

            });
        
        });

        describe('setMap', () => {

            it('returns properly formatted action', () => {

                const testMap = { map: "Google Map"};

                expect(setMap(testMap)).to.be.deep.equal({
                    type: 'SET_MAP',
                    map: testMap
                });

            });

        });

    });


    // REDUCERS
    describe('Root reducer', () => {

        let testStore;
        beforeEach('Create testing store', () => {
            testStore = createStore(rootReducer);
        });

        it('has expected initial state', () => {
            expect(testStore.getState()).to.be.deep.equal({
                airports: null,
                map: null
            });
        });

        describe('SET_AIRPORTS', () => {

            it('sets airports to action airports', () => {
                testStore.dispatch({ type: 'SET_AIRPORTS', airports: ["Airport 1", "Airport 2", "Airport 3"] });
                const newState = testStore.getState();
                expect(newState.airports).to.be.deep.equal(["Airport 1", "Airport 2", "Airport 3"]);
            });

        });

        describe('SET_MAP', () => {

            it('sets map to action map', () => {
                const testMap = { map: "Google Map"};
                testStore.dispatch({ type: 'SET_MAP', map: testMap });
                const newState = testStore.getState();
                expect(newState.map).to.be.deep.equal({ map: "Google Map" });
            });

        });

    });

});
