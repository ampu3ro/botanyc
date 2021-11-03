import { apiCall } from '../../services/api';
import { SET_LOCATIONS, SET_SELECTED } from '../actionTypes';
import { setAlert } from './alert';

export function setLocations(data) {
  return {
    type: SET_LOCATIONS,
    data,
  };
}

export function fetchLocations() {
  return async (dispatch) => {
    try {
      const data = await apiCall('get', '/api/loc/fetch');
      dispatch(setLocations(data));
    } catch (err) {
      dispatch(setLocations({ data: null }));
      dispatch(setAlert({ severity: 'error', message: err.message }));
    }
  };
}

export function setSelected(data) {
  return {
    type: SET_SELECTED,
    data,
  };
}
