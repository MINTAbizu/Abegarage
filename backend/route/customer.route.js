const express=require('express')
const router=express.Router()
const customercontroller=require('../controller/customer.controller')


router.post('/admin/addcustomer',customercontroller.addcustomer)


module.exports=router