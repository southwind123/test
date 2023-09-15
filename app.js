//项目的入口文件
const express = require('express')
//创建express的服务器实例
const app = express()
const port = 3007
//数据验证
const joi = require('joi')
const { jwtSecretKey } = require('./config')

//所有路由之前，声明一个全局中间件，挂载rest.cc函数
app.use(function (req, res, next) {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
//导入express-jwt
const expressJWT = require('express-jwt')

//配置全局的解析token字符串中间件,使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: jwtSecretKey }).unless({ path: [/^\/api\//] }))
//导入配置文件
const config = require('./config')

//注册跨域访问中间件
const cors = require('cors')
app.use(cors())

//配置解析表单的中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '50mb' }))

//托管静态资源文件
app.use('/api', express.static(__dirname + '/static'))

//导入并注册获取海报的路由模块
const creatPosterRouter = require('./router/creatPoster')
app.use('/creatPoster', creatPosterRouter)

//导入并注册获取轮播图数据的模块
const swiperRouter = require('./router/swipImage')
app.use('/api', swiperRouter)

//导入并注册用户模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 错误中间件，放到所有路由和其他中间件的后面
app.use(function (err, req, res, next) {
  // 数据验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})

//启动web服务器
app.listen(port, () =>
  console.log(`api server running at http://127.0.0.1:3007`)
)
