const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Create a new order
router.post('/createorder', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Get order by ID
router.get('/:order_id', orderController.getOrderById);

// Update order status
router.patch('/:order_id/status', orderController.updateOrderStatus);

// Update order completion
router.patch('/:order_id/completion', orderController.updateOrderCompletion);

// Update service completion
router.patch('/:order_id/services/:service_id/completion', orderController.updateServiceCompletion);

// Delete order
router.delete('/:order_id', orderController.deleteOrder);

module.exports = router; 