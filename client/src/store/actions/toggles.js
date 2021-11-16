import {
  SET_DISPLAY,
  SET_SIZE_BY,
  SET_COLOR_BY,
  SET_DENSITY_BY,
  SET_POI,
} from '../actionTypes';

export const setDisplay = (payload) => ({
  type: SET_DISPLAY,
  payload,
});

export const setSizeBy = (payload) => ({
  type: SET_SIZE_BY,
  payload,
});

export const setColorBy = (payload) => ({
  type: SET_COLOR_BY,
  payload,
});

export const setDensityBy = (payload) => ({
  type: SET_DENSITY_BY,
  payload,
});

export const setPoi = (payload) => ({
  type: SET_POI,
  payload,
});
