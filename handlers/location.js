const db = require('../models');

exports.fetchLocations = async (req, res, next) => {
  try {
    const farms = await db.Farm.find({ needsApproval: false }).lean();

    const features = farms
      .map((farm, id) => {
        let { _id, locations, ...data } = farm;
        data.id = _id;
        return locations.map((loc) => {
          const { _id, ...locData } = loc;
          const { lat, lon } = locData;
          return {
            type: 'Feature',
            id,
            geometry: {
              type: 'Point',
              coordinates: [lon, lat],
            },
            properties: { ...data, ...locData },
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
