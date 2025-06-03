const express = require('express');
const router = express.Router();

const employyecontroller=require('../controller/employee.controller')

router.post('/Admin/addemployee',employyecontroller.employyecontroller)


module.exports=router