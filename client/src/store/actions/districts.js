import { apiCall } from '../../services/api';
import { SET_DISTRICTS } from '../actionTypes';
import { setAlert } from './alert';

export function setDistrict(data) {
  return {
    type: SET_DISTRICTS,
    data,
  };
}

export function fetchDistricts() {
  return async (dispatch) => {
    try {
      const data = await apiCall('get', '/api/districts');
      return dispatch(setDistrict(data));
    } catch (err) {
      dispatch(setAlert({ message: err?.message }));
      return {};
    }
  };
}
