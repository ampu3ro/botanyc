import { apiCall } from '../../services/api';
import { SET_GEOCODED } from '../actionTypes';
import { setAlert } from './alert';

export function setGeocoded(data) {
  return {
    type: SET_GEOCODED,
    data,
  };
}

export function geocode(data) {
  return async (dispatch) => {
    try {
      const result = await apiCall('post', '/api/maps/geocode', data);
      dispatch(setGeocoded(result));
      if (!result.length) {
        dispatch(
          setAlert({
            severity: 'error',
            message: 'No location match found for address entered',
          })
        );
      }
    } catch (err) {
      dispatch(setAlert({ severity: 'error', message: err.message }));
    }
  };
}
