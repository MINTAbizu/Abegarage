const express = require('express');
const router = express.Router();
const installcontroller = require('../controller/install.controller');

router.post('/install', installcontroller.install);

module.exports = router;