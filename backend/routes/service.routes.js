const express = require('express');
const router = express.Router();
const serviceController = require('../controller/service.controller');

// Get all services
router.get('/', serviceController.getAllServices);

// Get customer services
router.get('/customer/:customerId', serviceController.getCustomerServices);

// Get service by ID
router.get('/:id', serviceController.getServiceById);

// Create new service
router.post('/', serviceController.createService);

// Update service
router.put('/:id', serviceController.updateService);

// Get all orders
router.get('/orders', serviceController.getAllOrders);

// Create service order
router.post('/orders', serviceController.createServiceOrder);

module.exports = router; 