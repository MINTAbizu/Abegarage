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
            message: "Customer registered.",
            customer: createdCustomer
        });

    } catch (error) {
        return res.status(500).json({
            error: 'User is not registered: ' + error
        });
    }
}

module.exports = { addcustomer };