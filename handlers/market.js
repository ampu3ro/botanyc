const soda = require('soda-js');

exports.fetchMarkets = (req, res, next) => {
  try {
    const consumer = new soda.Consumer('data.cityofnewyork.us', {
      apiToken: 'b0nu5h6f5RSJRNPajPuuCf7wo',
    });

    consumer
      .query()
      .withDataset('8vwk-6iz2')
      .getRows()
      .on('success', (rows) => {
        const features = rows.map((d, id) => {
          const { latitude, longitude, ...x } = d;
          const properties = {
            Name: x.marketname,
            Address: x.streetaddress,
            Open: `
            ${x.daysoperation || ''} ${x.hoursoperation || ''} ${
              x.seasondates || ''
            }
            `,
            EBT: x.accepts_ebt,
            Cooking: x.nyc_dept_of_health_cooking,
            Kids: x.kids,
          };
          const geometry = {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          };
          return { type: 'Feature', id, geometry, properties };
        });
        const result = { type: 'FeatureCollection', features };
        return res.status(200).json(result);
      })
      .on('error', (err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
