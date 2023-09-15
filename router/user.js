const express = require('express')
const userLoginHandle = require('../router_handler/user')
const router = express.Router()

router.post('/login', userLoginHandle.userLogin)

module.exports = router
