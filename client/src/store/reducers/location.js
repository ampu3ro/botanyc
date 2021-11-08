import { SET_LOCATIONS } from '../actionTypes';

const location = (state = {}, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      const { data } = action;
      let options = undefined;
      if (data && data.features) {
        options = data.features.map((d) => {
          const { name, address } = d.properties;
          const center = d.geometry.coordinates;
          const tag = address ? address : center.join(', ');
          const label = `${name} (${tag})`;
          return {
            ...d.properties,
            label,
            center,
            featureId: d.id,
          };
        });
      }
      return { data, options };
    default:
      return state;
  }
};

export default location;
