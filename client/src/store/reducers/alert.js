import { SET_ALERT } from '../actionTypes';

const DEFAULT_STATE = {
  isActive: false,
  payload: {},
};

const alert = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        isActive: !!Object.keys(action.payload).length,
        payload: action.payload,
      };
    default:
      return state;
  }
};

export default alert;
