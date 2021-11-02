const db = require('../models');

exports.fetchLocations = async (req, res, next) => {
  try {
    const farms = await db.Farm.find({ needsApproval: false }).lean();

    const features = farms
      .map((farm) => {
        let { _id, environments, ...properties } = farm;
        properties.id = _id;
        properties.environments = environments.join(','); // mapbox filter expressions don't seem to work with arrays
        return farm.locations.map((loc) => {
          const { address, lat, lon } = loc;
          const tag = address === '' ? `${lat}, ${lon}` : address;
          const label = `${farm.name} (${tag})`;
          properties.address = address;
          properties.label = label;
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lon, lat],
            },
            properties,
          };
        });
      })
      .flat();

    const result = {
      type: 'FeatureCollection',
      features,
    };

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
