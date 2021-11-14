import { SET_MARKETS } from '../actionTypes';

const market = (state = null, action) => {
  switch (action.type) {
    case SET_MARKETS:
      return action.data;
    default:
      return state;
  }
};

export default market;
