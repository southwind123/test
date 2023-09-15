//导入数据库模块，方便查询数据库中信息
const db = require('../db/index')

//生成海报
exports.updatePoster = (req, res) => {
  console.log(req.body)
  res.send({
    status: 200,
    msg: '海报生成成功',
    data: req.body,
  })
}
