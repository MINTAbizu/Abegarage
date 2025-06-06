const express=require('express');
const router=express.Router();

const logincontroller=require('../controller/login.controller');

router.post('/Api/login',logincontroller.login);

module.exports=router