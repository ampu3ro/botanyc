import { SET_FILTERS } from '../actionTypes';

const filters = (state = {}, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return { ...state, ...action.props };
    default:
      return state;
  }
};

export default filters;
