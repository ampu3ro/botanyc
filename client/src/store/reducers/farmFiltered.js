import { FILTER_FARMS } from '../actionTypes';
import { FARM_PROPS } from '../../components/data';

// filter for mapping and csv/json outputs
const FILTER_KEYS = Object.keys(FARM_PROPS).filter((k) => FARM_PROPS[k].filter);

const farmFiltered = (state = {}, action) => {
  switch (action.type) {
    case FILTER_FARMS:
      const { farm, filters } = action.data;
      if (!farm.features) return {};

      const features = farm.features.filter(({ properties }) => {
        return FILTER_KEYS.map((k) => {
          const f = filters[k];
          const p = properties[k];
          return !f || !f.length
            ? true
            : Array.isArray(p)
            ? p.some((d) => f.includes(d))
            : f.includes(p);
        }).every((d) => d);
      });

      return { ...farm, features };
    default:
      return state;
  }
};

export default farmFiltered;
