const db = require('../models');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const NO_USER = { status: 400, message: 'User not found in database' };

exports.signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await db.User.findOne({ username });
    if (!user) {
      return next(NO_USER);
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const { id, email, admin } = user;
      const userData = { id, username, email, admin };
      const token = jwt.sign(userData, keys.secretKey);
      return res.status(200).json({ ...userData, token });
    } else {
      return next({
        status: 400,
        message: 'Invalid password',
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.signUp = async (req, res, next) => {
  try {
    let user = await db.User.create(req.body);
    const { id, username, email, admin } = user;
    const userData = { id, username, email, admin };
    const token = jwt.sign(userData, keys.secretKey);
    return res.status(200).json({ ...userData, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry that username is taken';
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { username } = req.body;
    const resetToken = crypto.randomBytes(20).toString('hex');
    const update = {
      resetToken,
      resetExpires: new Date(Date.now() + 1000 * 60 * 60),
    };
    let user = await db.User.findOneAndUpdate({ username }, update, {
      new: true,
    });
    if (!user) {
      return next(NO_USER);
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: keys.emailAddress,
        pass: keys.emailPassword,
      },
    });
    const mailOptions = {
      from: keys.emailAddress,
      to: user.email,
      subject: 'Link to reset your botaNYC password',
      text: `You are receiving this because you have requested a password reset.
      Please click on the link below to complete the reset within one hour of receiving this email\n\n
      ${keys.redirectDomain}/reset/${resetToken}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        return next({ status: 400, message: err });
      } else {
        return res.status(200).json(user);
      }
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.checkToken = async (req, res, next) => {
  try {
    const resetToken = req.params.token;
    let user = await db.User.findOne({
      resetToken,
      resetExpires: { $gt: new Date() },
    });
    if (user) {
      return res.status(200).json({ email: user.email, resetToken });
    } else {
      return next({
        status: 400,
        message: 'Password reset link is invalid or expired',
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { resetToken, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const update = {
      password: hashedPassword,
      resetToken: null,
      resetExpires: null,
    };

    let user = await db.User.findOneAndUpdate({ resetToken }, update, {
      new: true,
    });
    if (user) {
      const { id, username, email, admin } = user;
      const userData = { id, username, email, admin };
      const token = jwt.sign(userData, keys.secretKey);
      return res.status(200).json({ ...userData, token });
    } else {
      return next(NO_USER);
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
