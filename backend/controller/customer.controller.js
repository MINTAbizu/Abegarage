const customerservices = require('../services/customer.services');

async function addcustomer(req, res) {
    const customerEmail = req.body.customer_email;

    const customerexist = await customerservices.checkCustomerExists(customerEmail);

    if (customerexist) {
        return res.status(400).json({
            message: 'Customer already registered'
        });
    }

    try {
        const customerData = req.body;
        const createdCustomer = await customerservices.createCustomer(customerData);

        return res.status(201).json({
            message: "Customer registered successfully.",
            customer: createdCustomer
        });

    } catch (error) {
        console.error("Error creating customer:", error);
        return res.status(500).json({
            error: 'Failed to register customer: ' + error.message
        });
    }
}

async function customerlist(req, res) {
    try {
        const customers = await customerservices.customerlist();

        if (!customers || customers.length === 0) {
            return res.status(404).json({
                message: 'No customers found'
            });
        }

        res.status(200).json({
            data: customers
        });

    } catch (error) {
        console.error("customerlist error:", error);
        res.status(500).json({ 
            error: "Internal server error: " + error.message 
        });
    }
}

async function getCustomerById(req, res) {
    try {
        const customerId = req.params.id;
        console.log('Fetching customer with ID:', customerId);
        
        const customer = await customerservices.getCustomerById(customerId);
        console.log('Customer data:', customer);

        if (!customer) {
            console.log('Customer not found for ID:', customerId);
            return res.status(404).json({
                message: 'Customer not found'
            });
        }

        res.status(200).json({
            data: customer
        });

    } catch (error) {
        console.error("getCustomerById error:", error);
        res.status(500).json({ 
            error: "Internal server error: " + error.message 
        });
    }
}

async function deleteCustomer(req, res) {
    try {
        const customerId = req.params.id;
        const exists = await customerservices.checkCustomerById(customerId);

        if (!exists) {
            return res.status(404).json({
                message: 'Customer not found'
            });
        }

        await customerservices.deleteCustomer(customerId);
        res.status(200).json({
            message: 'Customer deleted successfully'
        });

    } catch (error) {
        console.error("deleteCustomer error:", error);
        res.status(500).json({ 
            error: "Internal server error: " + error.message 
        });
    }
}

async function getCustomerVehicles(req, res) {
    try {
        const customerId = req.params.id;
        const exists = await customerservices.checkCustomerById(customerId);

        if (!exists) {
            return res.status(404).json({
                message: 'Customer not found'
            });
        }

        const vehicles = await customerservices.getCustomerVehicles(customerId);
        res.status(200).json({
            data: vehicles
        });

    } catch (error) {
        console.error("getCustomerVehicles error:", error);
        res.status(500).json({ 
            error: "Internal server error: " + error.message 
        });
    }
}

module.exports = {
    addcustomer,
    customerlist,
    getCustomerById,
    deleteCustomer,
    getCustomerVehicles
};