const keys = require('../config/keys');
const NodeGeocoder = require('node-geocoder');

exports.geocode = async (req, res, next) => {
  try {
    const options = {
      provider: 'google',
      apiKey: keys.googleKey,
    };

    const geocoder = NodeGeocoder(options);
    const result = await geocoder.geocode({
      address: req.body.address,
      bounds: [
        { lat: 40.493803, lng: -74.265674 },
        { lat: 40.924216, lng: -73.699443 },
      ],
    });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
