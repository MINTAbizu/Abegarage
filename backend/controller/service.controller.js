const serviceService = require('../services/service.services');

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        res.status(200).json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error('Error in getAllServices controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching services',
            error: error.message
        });
    }
};

// Get service by ID
const getServiceById = async (req, res) => {
    try {
        const { service_id } = req.params;
        const service = await serviceService.getServiceById(service_id);
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error('Error in getServiceById controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching service',
            error: error.message
        });
    }
};

// Create new service
const createService = async (req, res) => {
    try {
        const serviceData = req.body;
         const result = await serviceService.createService(serviceData);
        // Validate required fields
        if (!result) {
            return res.status(400).json({
                success: false,
                message: 'services is not registered'
            });
        }

        // const result = await serviceService.createService(serviceData);
        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error in createService controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating service',
            error: error.message
        });
    }
};

// Update service
const updateService = async (req, res) => {
    try {
        const { service_id } = req.params;
        const serviceData = req.body;

        const result = await serviceService.updateService(service_id, serviceData);
        
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Service not found or update failed'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service updated successfully'
        });
    } catch (error) {
        console.error('Error in updateService controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating service',
            error: error.message
        });
    }
};

// Delete service
const deleteService = async (req, res) => {
    try {
        const { service_id } = req.params;
        const result = await serviceService.deleteService(service_id);
        
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Service not found or deletion failed'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteService controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting service',
            error: error.message
        });
    }
};

// Get customer's services
const getCustomerServices = async (req, res) => {
    try {
        const customerId = req.params.id;
        const services = await serviceService.getCustomerServices(customerId);
        res.status(200).json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error('Error in getCustomerServices controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching customer services',
            error: error.message
        });
    }
};

// Create service order for customer
const createServiceOrder = async (req, res) => {
    try {
        const customerId = req.params.id;
        const { services } = req.body;

        if (!services || !Array.isArray(services)) {
            return res.status(400).json({
                success: false,
                message: 'Services array is required'
            });
        }

        const result = await serviceService.createServiceOrder(customerId, services);
        res.status(201).json({
            success: true,
            message: 'Service order created successfully',
            data: result
        });
    } catch (error) {
        console.error('Error in createServiceOrder controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating service order',
            error: error.message
        });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await serviceService.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error('Error in getAllOrders controller:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllServices,
    getCustomerServices,
    getServiceById,
    createService,
    updateService,
    createServiceOrder,
    getAllOrders,
    deleteService
}; 