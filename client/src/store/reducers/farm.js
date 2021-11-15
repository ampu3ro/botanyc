import { SET_FARMS } from '../actionTypes';
import { FARM_PROPS } from '../../components/data';

const farm = (state = {}, action) => {
  switch (action.type) {
    case SET_FARMS:
      let { data } = action;

      data.features.forEach((feature) => {
        let { properties } = feature;
        const { name, address, lat, lon } = properties;
        const tag = address ? address : [lon, lat].join(', ');
        feature.label = `${name} (${tag})`;

        let p = 0;
        FARM_PROPS.crops.fields.forEach(({ name }) => {
          p += parseInt(properties[name]) || 0;
        });
        // could make this a calculated field in Mongo but more manual if any fields change
        properties.production = p > 0 ? p : NaN;

        const d = FARM_PROPS.distros.fields
          .map(({ name }) => ({ name, value: properties[name] || 0 }))
          .sort((a, b) => b.value - a.value)
          .filter((d) => d.value > 0);

        properties.distro1 = d.length ? d[0] : 'None specified';
      });

      data.features.forEach((feature, i, a) => {
        if (a.findIndex((d) => d.label === feature.label) !== i) {
          feature.label += ` [${i}]`;
        }
      });

      return data;
    default:
      return state;
  }
};

export default farm;
