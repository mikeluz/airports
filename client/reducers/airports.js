import axios from 'axios';

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_AIRPORTS:
    return action.airports;
  }
  return state;
};

const SET_AIRPORTS = 'SET_AIRPORTS';
export const setAirports = airports => ({
  type: SET_AIRPORTS, airports
});

export const getAirports = () =>
  dispatch =>
    axios.get('/api/airports')
      .then((res) => dispatch(setAirports(res.data)))
      .catch(() => dispatch(setAirports(null)));

export default reducer;