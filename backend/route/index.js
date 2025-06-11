const express = require('express');
const router = express.Router();

const employeerouter = require('./employee.route');
const lloginsrouter = require('./login.route');
const serviceRouter = require('./service.route');
const customerRouter = require('./customer.route');
const vehicleRouter = require('./vechile.route');
const orderRouter = require('../routes/order.routes');
const installRouter = require('./install.route');

router.use('/employees', employeerouter);
router.use('/auth', lloginsrouter);
router.use('/services', serviceRouter);
router.use('/customers', customerRouter);
router.use('/vehicles', vehicleRouter);
router.use('/orders', orderRouter);
router.use('/install', installRouter);

module.exports = router;