import { SET_SIZE_BY, SET_COLOR_BY, SET_POI } from '../actionTypes';

export const setSizeBy = (payload) => ({
  type: SET_SIZE_BY,
  payload,
});

export const setColorBy = (payload) => ({
  type: SET_COLOR_BY,
  payload,
});

export const setPoi = (payload) => ({
  type: SET_POI,
  payload,
});
