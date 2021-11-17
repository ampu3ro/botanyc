import { FILTER_FARMS } from '../actionTypes';

// filter for mapping and csv/json outputs
const farmFiltered = (state = {}, action) => {
  switch (action.type) {
    case FILTER_FARMS:
      const { farm, filters } = action.data;
      if (!farm.features) return {};

      const features = farm.features.filter(({ properties }) => {
        const { type, environments } = properties;
        return (
          (filters.types ? filters.types.includes(type) : true) &&
          (filters.environments && environments
            ? environments.some((e) => filters.environments.includes(e))
            : true)
        );
      });
      return { ...farm, features };
    default:
      return state;
  }
};

export default farmFiltered;
