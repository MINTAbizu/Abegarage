const express = require('express');
const router = express.Router();

const employeerouter = require('./employee.route');

router.use(employeerouter);


module.exports = router;