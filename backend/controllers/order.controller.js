const orderService = require('../services/order.services');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const result = await orderService.createOrder(orderData);
        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error in createOrder controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Error in getAllOrders controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const { order_id } = req.params;
        const order = await orderService.getOrderById(order_id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Error in getOrderById controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { status } = req.body;

        const result = await orderService.updateOrderStatus(order_id, status);
        
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Order not found or status update failed'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully'
        });
    } catch (error) {
        console.error('Error in updateOrderStatus controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
};

// Update order completion
const updateOrderCompletion = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { completion_date } = req.body;

        const result = await orderService.updateOrderCompletion(order_id, completion_date);
        
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Order not found or completion update failed'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order completion updated successfully'
        });
    } catch (error) {
        console.error('Error in updateOrderCompletion controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating order completion',
            error: error.message
        });
    }
};

// Update service completion status
const updateServiceCompletion = async (req, res) => {
    try {
        const { order_id, service_id } = req.params;
        const { completed } = req.body;

        const result = await orderService.updateServiceCompletion(order_id, service_id, completed);
        
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Service not found or completion update failed'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service completion status updated successfully'
        });
    } catch (error) {
        console.error('Error in updateServiceCompletion controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating service completion status',
            error: error.message
        });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const { order_id } = req.params;
        const result = await orderService.deleteOrder(order_id);
        
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Order not found or deletion failed'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteOrder controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting order',
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updateOrderCompletion,
    updateServiceCompletion,
    deleteOrder
}; 