import { SET_LOCATIONS } from '../actionTypes';
import { FARM_PROPS } from '../../components/data';

const location = (state = {}, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      const { data } = action;

      // could make this a calculated field in Mongo but more manual if updating fields
      data.features.forEach((feature) => {
        const { properties } = feature;

        let p = 0;
        FARM_PROPS.crops.fields.forEach(({ name }) => {
          p += parseInt(properties[name]) || 0;
        });
        properties.production = p > 0 ? p : NaN;

        const d = FARM_PROPS.distros.fields
          .map(({ name }) => ({ name, value: properties[name] || 0 }))
          .sort((a, b) => b.value - a.value)
          .filter((d) => d.value > 0);

        properties.distro1 = d.length ? d[0] : 'None specified';
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
        options.forEach((d, i, a) => {
          const dupe = a.findIndex((t) => t.label === d.label) !== i;
          if (dupe) {
            d.label += ` [${i}]`;
          }
        });
      }
      return { data, options };
    default:
      return state;
  }
};

export default location;
