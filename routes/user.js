const express = require('express');
const router = express.Router();
const { fetchUsers, editUser } = require('../handlers/users');

router.get('/fetch', fetchUsers);
router.post('/edit', editUser);

module.exports = router;
