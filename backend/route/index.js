const express = require('express');
const router = express.Router();

const employeerouter = require('./employee.route');
const lloginsrouter = require('./login.route');
router.use(employeerouter);
router.use(lloginsrouter);
module.exports = router;