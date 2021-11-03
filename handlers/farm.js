const db = require('../models');
const mongoose = require('mongoose');

exports.bulkFarms = async (req, res, next) => {
  try {
    const bulkOps = req.body.data.map((d) => {
      let {
        id,
        remove,
        name,
        lat,
        lon,
        address,
        type,
        environments,
        enviroDetails,
        area,
        authEmails,
      } = d;
      if (id === '') {
        id = undefined;
      }
      const filter = { _id: id ? mongoose.Types.ObjectId(id) : '' };
      if (remove && id) {
        return { deleteOne: { filter } };
      }
      const fromString = (x) => {
        return x ? x.replace(' ', '').split(',') : undefined;
      };
      let document = {
        name,
        type,
        environments: fromString(environments),
        enviroDetails: fromString(enviroDetails),
        area: area ? parseFloat(area) : undefined,
        authEmails: fromString(authEmails),
        modifiedBy: req.body.currentUser.user.email,
      };
      if (lat && lon) {
        lat = parseFloat(lat);
        lon = parseFloat(lon);
        if ((isNaN(lat) || isNaN(lon)) && address !== '') {
          const g = geocode(address); // could get expensive
          if (g.length) {
            address = g[0].formattedAddress;
            lat = g[0].latitude;
            lon = g[0].longitude;
          }
        }
        document.locations = [{ lat, lon, address }]; // need to refactor for multi-loc
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
    });
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
    if (!currentUser.isAdmin) {
      delete update.authEmails;
    }
    update = Object.keys(update)
      .filter((k) => update[k].length)
      .reduce((a, k) => Object.assign(a, { [k]: update[k] }), {});

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
