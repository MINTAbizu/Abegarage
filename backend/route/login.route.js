const express=require('express');
const router=express.Router();

const logincontroller=require('../controller/login.controller');

router.post('/login', logincontroller.login);

module.exports=router