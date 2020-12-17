const express = require('express');


const UserCtrl = require('../controller/method')

const router = express.Router()

router.post('/createUser', UserCtrl.createUser)
router.get('/userList', UserCtrl.getUsers)

router.delete('/user/:id', UserCtrl.deleteUser);

router.put('/userEdit/:id', UserCtrl.updateUser);

router.get('/viewUser/:id', UserCtrl.getUserById)
module.exports = router;