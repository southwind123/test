const axios = require('axios')
const { appid, secret, jwtSecretKey } = require('../config')
//导入jsonwebtoken   用于生成JWT字符串
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { log } = require('console')
//用户登录的接口函数
exports.userLogin = async function (req, res) {
  const { code } = req.body
  // console.log(code, appid, secret)
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
  try {
    const { data } = await axios.get(url)
    // console.log(data)
    //获取openid, session_key，openid是用户的唯一标识
    const { openid, session_key } = data
    // console.log(session_key)
    // console.log(openid, session_key)
    const user = { ...req.body.rawData, openid }
    //生成token字符串,并设置token的有效期为10h
    const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn: '10h' })
    //将生成的token响应给客户端
    res.send({
      status: 200,
      msg: '登陆成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
