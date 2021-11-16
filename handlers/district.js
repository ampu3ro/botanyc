const axios = require('axios');

exports.fetchDistricts = async (req, res, next) => {
  try {
    const [bb, cd] = await Promise.all([
      axios.get(
        'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Borough_Boundary/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson'
      ),
      axios.get(
        'https://gist.githubusercontent.com/ampu3ro/ea3aa1e6fecc1c528e57fb65f535491e/raw/2d47b61fac978d98d855eb90950c20e6b9e81bca/nyc_cd_pop.geojson'
      ),
    ]);
    const result = { borough: bb.data, community: cd.data };
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
