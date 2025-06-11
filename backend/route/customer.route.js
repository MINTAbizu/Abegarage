const express = require('express')
const router = express.Router()
const customerController = require('../controller/customer.controller')

// Get all customers
router.get('/customerlist', customerController.customerlist)

// Get customer by ID
router.get('/customer/:id', customerController.getCustomerById)

// Get customer vehicles
router.get('/customer/:id/vehicles', customerController.getCustomerVehicles)

// Create new customer
router.post('/customer', customerController.addcustomer)

// Delete customer
router.delete('/customer/:id', customerController.deleteCustomer)

module.exports = router