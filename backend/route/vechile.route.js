const express = require('express');
const router = express.Router();
const vehicleController = require('../controller/vechile.controller');

router.post('/admin/addvehicle', vehicleController.addVehicle);
router.get('/admin/vehicles', vehicleController.getVehicles);
router.get('/admin/vehicle/:id', vehicleController.getVehicleById);
router.delete('/admin/vehicle/:id', vehicleController.deleteVehicle);

module.exports = router;