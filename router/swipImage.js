const express = require('express')
const router = express.Router()
const { sendImage } = require('../router_handler/swipImage')

router.get('/getImage', sendImage)

module.exports = router
