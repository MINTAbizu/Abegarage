const express = require('express');
const router = express.Router();
const serviceController = require('../controller/service.controller');

// Get all services
router.get('/services', serviceController.getAllServices);

// Get all orders
router.get('/orders', serviceController.getAllOrders);

// Get customer's services
router.get('/customer/:id/services', serviceController.getCustomerServices);

// Create service order for customer
router.post('/customer/:id/services', serviceController.createServiceOrder);

// Get service by ID
router.get('/services/:service_id', serviceController.getServiceById);

// Create new service
router.post('/services', serviceController.createService);

// Update service
router.patch('/services/:service_id', serviceController.updateService);

// Delete service
router.delete('/services/:service_id', serviceController.deleteService);

module.exports = router; 