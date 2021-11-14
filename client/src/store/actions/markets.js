import { apiCall } from '../../services/api';
import { SET_MARKETS } from '../actionTypes';
import { setAlert } from './alert';

export function setMarket(data) {
  return {
    type: SET_MARKETS,
    data,
  };
}

export function fetchMarkets() {
  return async (dispatch) => {
    try {
      const data = await apiCall('get', '/api/markets');
      dispatch(setMarket(data));
      return data;
    } catch (err) {
      dispatch(setAlert({ message: err?.message }));
      return {};
    }
  };
}
