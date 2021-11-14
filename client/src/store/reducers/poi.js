import { SET_POI } from '../actionTypes';
import { POI_PROPS } from '../../components/data';

const DEFAULT_POI = Object.fromEntries(POI_PROPS.map(({ id }) => [id, false]));

const poi = (state = DEFAULT_POI, action) => {
  switch (action.type) {
    case SET_POI:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default poi;
