const express = require('express')
const router = express.Router()

//导入处理函数模块
const creatPosterHandler = require('../router_handler/creatPoster')
//表单验证
const expressJOI = require('@escook/express-joi')
//导入验证的模块
const {
  update_avatar_schema,
} = require('../schema/use')


//生成海报
router.post(
  '/update/poster',
  expressJOI(update_avatar_schema),
  creatPosterHandler.updatePoster
)

// 向外共享路由对象
module.exports = router
