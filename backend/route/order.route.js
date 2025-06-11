const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updateOrderCompletion,
    updateServiceCompletion,
    deleteOrder
} = require('../controller/order.controller');

// Create a new order
router.post('/createorder', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Get order by ID
router.get('/:order_id', getOrderById);

// Update order status
router.patch('/:order_id/status', updateOrderStatus);

// Update order completion
router.patch('/:order_id/completion', updateOrderCompletion);

// Update service completion status
router.patch('/:order_id/services/:service_id/completion', updateServiceCompletion);

// Delete order
router.delete('/:order_id', deleteOrder);

module.exports = router;