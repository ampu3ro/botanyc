import { FILTER_FARMS, COLLECT_FARMS } from '../actionTypes';

export function filterFarms(data) {
  return {
    type: FILTER_FARMS,
    data,
  };
}

export function collectFarms(data) {
  return {
    type: COLLECT_FARMS,
    data,
  };
}
