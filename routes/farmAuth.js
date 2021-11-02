const express = require('express');
const router = express.Router();
const { editFarm, deleteFarm } = require('../handlers/farm');

router.post('/edit', editFarm);
router.post('/delete', deleteFarm);

module.exports = router;
