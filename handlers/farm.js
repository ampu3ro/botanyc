const db = require('../models');
const mongoose = require('mongoose');
const FARM_FIELDS = require('../models/data');

exports.fetchFarms = async (req, res, next) => {
  try {
    const farms = await db.Farm.find({ needsApproval: false }).lean();

    const features = farms.map((farm) => {
      const { _id, ...properties } = farm;
      properties.id = _id;
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [properties.lon, properties.lat],
        },
        properties,
      };
    });

    const result = {
      type: 'FeatureCollection',
      features,
    };

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.bulkFarms = async (req, res, next) => {
  try {
    const bulkOps = req.body.data
      .map((d) => {
        let { id, remove } = d;
        if (id === '') {
          id = undefined;
        }
        const filter = { _id: id ? mongoose.Types.ObjectId(id) : '' };
        if (remove && id) {
          return { deleteOne: { filter } };
        }

        const doc = Object.keys(FARM_FIELDS)
          .map((k) => {
            let v = d[k];
            if (!v) return;
            const f = FARM_FIELDS[k].type || FARM_FIELDS[k];
            if (Array.isArray(f)) {
              v = v
                .replace(/,\s/, ';;')
                .split(',')
                .map((d) => d.replace(';;', ', '));
            } else if (f() === Number()) {
              v = parseFloat(v);
            }
            return [k, v];
          })
          .filter((d) => d);

        if (!doc.length) return;

        let document = {
          ...Object.fromEntries(doc),
          modifiedBy: req.body.currentUser.user.email,
          needsApproval: false,
        };

        let { lat, lon, address } = document;
        if (
          lat &&
          lon &&
          address &&
          (isNaN(lat) || isNaN(lon)) &&
          address !== ''
        ) {
          const g = geocode(address); // could get expensive
          if (g.length) {
            address = g[0].formattedAddress;
            lat = g[0].latitude;
            lon = g[0].longitude;
          }
          document = { ...document, address, lat, lon };
        }
        if (!id) {
          return { insertOne: { document } };
        }
        return {
          updateOne: {
            filter,
            update: { $set: document },
          },
        };
      })
      .filter((d) => d);
    const result = await db.Farm.bulkWrite(bulkOps);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.submitFarm = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    data.needsApproval = true;
    const result = await db.Farm.create(data);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.editFarm = async (req, res, next) => {
  try {
    const { currentUser, data } = req.body;
    let { id, ...update } = data;
    if (!Object.keys(update).length) {
      return res.status(204).json('No content');
    }
    if (!currentUser.isAdmin) {
      delete update.authUsers;
    }
    update.needsApproval = false;
    const result = await db.Farm.findOneAndUpdate(
      {
        _id:
          id === ''
            ? new mongoose.mongo.ObjectID()
            : mongoose.Types.ObjectId(id),
      },
      update,
      { new: true, upsert: true, rawResult: true }
    );

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteFarm = async (req, res, next) => {
  try {
    const { data } = req.body;
    const { id } = data;

    const result = await db.Farm.deleteOne({
      _id: mongoose.Types.ObjectId(id),
    });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.fetchApprovals = async (req, res, next) => {
  try {
    const result = await db.Farm.find({ needsApproval: true }).lean();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
