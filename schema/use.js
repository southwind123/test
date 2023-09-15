//导入Joi包，为表单中携带的每个数据项，定义验证规则
const joi = require('joi')
//为username定义验证规则
const username = joi.string().alphanum().min(1).max(10).required()
//为password定义验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

//定义 id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

//定义头像的验证规则
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const posterImg = joi.string().dataUri().required()
//定义文章分类名字
const name = joi.string().required()
//定义文章别名
const alias = joi.string().required()

//定义文章的标题
const title = joi.string().required()
//定义分类的id
const cate_id = joi.number().integer().min(1).required()
//定义内容
const content = joi.string().required().allow('')
//定义状态
const state = joi.string().valid('已发布', '草稿').required()

//这相当于reg_login_schema是exports的一个属性
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
}
exports.update_userinfo_schema = {
  body: {
    //username,
    //id,
    nickname,
    email,
  },
}
//重置密码时的验证规则：旧密码需要满足password这个规则，新密码在满足password这个规则的同时需要与旧密码不一样
exports.update_password_schema = {
  body: {
    // 使用 password 这个规则，验证 req.body.oldPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}
//更新头像验证
exports.update_avatar_schema = {
  body: {
    posterImg,
  },
}
//新增文章类别验证
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
}

//根据id删除文章分类
exports.delete_cate_schema = {
  params: {
    id,
  },
}

//根据 Id 更新文章分类数据
exports.update_cate_schema = {
  body: {
    id,
    name,
    alias,
  },
}

// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
}
