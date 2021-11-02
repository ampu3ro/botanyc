import { SET_GEOCODED } from '../actionTypes';

const geocoded = (state = [], action) => {
  switch (action.type) {
    case SET_GEOCODED:
      return action.data;
    default:
      return state;
  }
};

export default geocoded;
