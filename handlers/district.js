const axios = require('axios');

exports.fetchDistricts = async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://gist.githubusercontent.com/ampu3ro/ea3aa1e6fecc1c528e57fb65f535491e/raw/5181f4d5570cd45e0f26fe63cebb9f82df154a16/nyc_cd_pop.geojson'
    );
    return res.status(200).json(response.data);
  } catch (err) {
    next(err);
  }
};
