import { SET_LAYERS, CLEAR_LAYERS } from '../actionTypes';

const layers = (state = {}, action) => {
  switch (action.type) {
    case SET_LAYERS:
      return { ...state, ...action.props };
    case CLEAR_LAYERS:
      return {};
    default:
      return state;
  }
};

export default layers;
