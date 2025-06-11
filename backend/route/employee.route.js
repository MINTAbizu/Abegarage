const express = require('express');
const router = express.Router();

const employyecontroller = require('../controller/employee.controller');

// Create new employee
router.post('/', employyecontroller.employyecontroller);

// Get all employees
router.get('/', employyecontroller.getallemployee);

module.exports = router;