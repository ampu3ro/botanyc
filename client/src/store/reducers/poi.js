import { SET_POI } from '../actionTypes';

const poi = (state = { pantry: false }, action) => {
  switch (action.type) {
    case SET_POI:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default poi;
