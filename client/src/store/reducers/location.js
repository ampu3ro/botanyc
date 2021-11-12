import { SET_LOCATIONS } from '../actionTypes';
import { FARM_PROPS } from '../../components/data';

const location = (state = {}, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      const { data } = action;

      // could make this a calculated field in Mongo but more manual if updating fields
      data.features.map((feature) => {
        const { properties } = feature;
        let p = 0;
        FARM_PROPS.crops.fields.forEach((d) => {
          p += parseInt(properties[d.name]) || 0;
        });
        properties.production = p > 0 ? p : NaN;
      });

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
