const axios = require('axios');

exports.fetchDistricts = async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://gist.githubusercontent.com/ampu3ro/ea3aa1e6fecc1c528e57fb65f535491e/raw/2d47b61fac978d98d855eb90950c20e6b9e81bca/nyc_cd_pop.geojson'
    );
    return res.status(200).json(response.data);
  } catch (err) {
    next(err);
  }
};
