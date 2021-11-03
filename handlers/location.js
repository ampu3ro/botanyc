const db = require('../models');

exports.fetchLocations = async (req, res, next) => {
  try {
    const farms = await db.Farm.find({ needsApproval: false }).lean();

    const features = farms
      .map((farm, id) => {
        let { _id, environments, locations, ...data } = farm;
        data.id = _id;
        if (environments) {
          data.environments = environments.join(','); // mapbox filter expressions don't seem to work with arrays
        }
        return locations.map((loc) => {
          const { address, lat, lon } = loc;
          const tag = address === '' ? `${lat}, ${lon}` : address;
          const label = `${farm.name} (${tag})`;

          return {
            type: 'Feature',
            id,
            geometry: {
              type: 'Point',
              coordinates: [lon, lat],
            },
            properties: { ...data, address, label },
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
