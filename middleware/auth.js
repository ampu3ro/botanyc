const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

exports.loginRequired = function (req, res, next) {
  const err = {
    status: 401,
    message: 'Please log in first',
  };
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer lsdfjldfkjlsdjlf
    jwt.verify(token, keys.secretKey, function (e, decoded) {
      if (decoded) {
        return next();
      } else {
        return next(err);
      }
    });
  } catch (e) {
    return next(err);
  }
};

exports.authRequired = function (req, res, next) {
  const err = {
    status: 401,
    message: 'Unauthorized',
  };
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer lsdfjldfkjlsdjlf
    jwt.verify(token, keys.secretKey, function (e, decoded) {
      const { authEmails } = req.body.data;
      const authorized =
        decoded &&
        (decoded.admin || (authEmails && authEmails.includes(decoded.email)));
      if (authorized) {
        return next();
      } else {
        return next(err);
      }
    });
  } catch (e) {
    return next(err);
  }
};

exports.adminRequired = function (req, res, next) {
  const err = {
    status: 401,
    message: 'Unauthorized',
  };
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer lsdfjldfkjlsdjlf
    jwt.verify(token, keys.secretKey, function (e, decoded) {
      if (decoded && decoded.admin) {
        return next();
      } else {
        return next(err);
      }
    });
  } catch (e) {
    return next(err);
  }
};
