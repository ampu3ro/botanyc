import { SET_DENSITY_BY } from '../actionTypes';

const densityBy = (state = 'countCapita', action) => {
  switch (action.type) {
    case SET_DENSITY_BY:
      return action.payload;
    default:
      return state;
  }
};

export default densityBy;
