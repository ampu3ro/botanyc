const express = require('express');
const router = express.Router();
const { fetchApprovals, bulkFarms } = require('../handlers/farm');

router.post('/bulk', bulkFarms);
router.get('/approvals', fetchApprovals);

module.exports = router;
