import { CLEAR_LAYERS, SET_LAYERS } from '../actionTypes';

export const setLayers = (props) => ({
  type: SET_LAYERS,
  props,
});

export const clearLayers = () => ({
  type: CLEAR_LAYERS,
});
