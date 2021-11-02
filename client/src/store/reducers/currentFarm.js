import { SET_CURRENT_FARM } from '../actionTypes';

const currentFarm = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_FARM:
      return action.data;
    default:
      return state;
  }
};

export default currentFarm;
