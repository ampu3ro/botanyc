import { SET_LOCATIONS } from '../actionTypes';

const locations = (state = {}, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return action.data;
    default:
      return state;
  }
};

export default locations;
