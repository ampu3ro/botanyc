import collect from '@turf/collect';
import centroid from '@turf/centroid';
import { COLLECT_FARMS } from '../actionTypes';

const districtCollected = (state = {}, action) => {
  switch (action.type) {
    case COLLECT_FARMS:
      const { district, farm } = action.data;
      if (!district.features || !farm.features) return {};

      const features = district.features.filter(
        ({ properties }) => properties.name
      );

      let dc = collect({ ...district, features }, farm, 'area', 'area');
      dc = collect(dc, farm, 'production', 'production');
      const add = (acc, v) => acc + (v || 0);

      dc.features.forEach((feature) => {
        let { properties } = feature;
        properties.centroid = centroid(feature).geometry.coordinates;

        properties.count = properties.area.length;
        properties.area = properties.area.reduce(add, 0);
        properties.production = properties.production.reduce(add, 0);

        const { count, area, production, population } = properties;
        properties.countCapita = population > 0 ? count / population : 0;
        properties.areaCapita = population > 0 ? area / population : 0;
        properties.productionCapita =
          population > 0 ? production / population : 0;
      });
      return dc;
    default:
      return state;
  }
};

export default districtCollected;
