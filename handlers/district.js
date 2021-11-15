const axios = require('axios');

exports.fetchDistricts = async (req, res, next) => {
  try {
    const api =
      'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services';
    const endpoint = 'FeatureServer/0/query';
    const params = 'where=1=1&outFields=*&outSR=4326&f=pgeojson';
    const [bb, cd] = await Promise.all([
      axios.get(`${api}/NYC_Borough_Boundary/${endpoint}?${params}`),
      axios.get(`${api}/NYC_Community_Districts/${endpoint}?${params}`),
    ]);
    const result = { borough: bb.data, community: cd.data };
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
