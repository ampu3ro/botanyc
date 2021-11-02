const db = require('../models');
const mongoose = require('mongoose');

exports.fetchUsers = async (req, res, next) => {
  try {
    const users = await db.User.find({}, 'id email admin');
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const { _id, ...update } = req.body;

    const result = await db.User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      { ...update }
    );

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
