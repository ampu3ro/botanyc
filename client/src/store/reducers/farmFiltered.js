import { FILTER_FARMS } from '../actionTypes';

// filter for mapping and csv/json outputs
const farmFiltered = (state = {}, action) => {
  switch (action.type) {
    case FILTER_FARMS:
      const { farm, filters } = action.data;
      if (!farm.features) return {};

      const features = farm.features.filter(({ properties }) => {
        return Object.keys(filters)
          .map((k) => {
            let f = filters[k];
            if (!f.length) return true;
            if (f[0].name) {
              f = f.map(({ name }) => name);
            }
            const p = properties[k];
            return Array.isArray(p)
              ? p.some((d) => f.includes(d))
              : f.includes(p);
          })
          .every((d) => d);
      });

      return { ...farm, features };
    default:
      return state;
  }
};

export default farmFiltered;
