const express = require('express');
const router = express.Router();
const {
  signUp,
  signIn,
  forgotPassword,
  checkToken,
  resetPassword,
} = require('../handlers/auth');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/forgot', forgotPassword);
router.get('/reset/:token', checkToken);
router.post('/reset', resetPassword);

module.exports = router;
