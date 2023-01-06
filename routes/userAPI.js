const express=require('express');
const { test, register, updateUser, allUsers, singleUser } = require('../controller/UserController');
const upload = require('../helper/fileHandle');

const router=express.Router()


router.get('/all',allUsers)
router.get('/user/:userId',singleUser)
router.get('/test',test)
router.post('/test',register)
router.put('/test',upload.single('image'),updateUser)

module.exports=router;