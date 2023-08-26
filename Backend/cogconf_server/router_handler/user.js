/**
* 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
*/
//导入其他模块区域
const db = require('../mysql/index')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require('../config')


// 注册用户的处理函数
exports.regUser = (req, res) => {
  console.log("进入注册函数")
  let userinfo = req.body
  console.log(userinfo)
  //1.检测表单数据是否合法
  if (!userinfo.username || !userinfo.password) {
    // return res.cc('用户名密码不能为空')
    return res.send("用户名密码不能为空")
  }
  //2.检测用户名是否被占用

  let sql = "select * from user where username=?"
  db.query(sql, userinfo.username, (err, results) => {
    if (err) {//执行sql语句失败
      // return res.cc(err)
      return res.send(err.message)
    }
    if (results.length > 0) {
      //用户名被占用
      // return res.cc('用户名被占用，请更换其他用户名')
      res.send('用户名被占用，请更换用户名')
    }
    //用户名可用
    //对密码进行加密处理
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
  })
  let user = { username: userinfo.username, password: userinfo.password }
  sql = "insert into user set ?"
  db.query(sql, user, (err, results) => {
    if (err)
      // return res.cc("注册表单失败请稍后再试")
      return res.send('注册表单失败请稍后再试')
    console.log("插入成功")
  })
  //走到这里就注册成功了
  res.send('reguser OK')
}
// 登录的处理函数
exports.login = (req, res) => {

  const userinfo = req.body
  const sql = `select * from users where username=?`
  db.query(sql, userinfo.username, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是查询到数据条数不等于 1
    if (results.length !== 1)
      //return res.cc('登录失败！')
      return res.send("登陆失败")
    // 判断用户输入的登录密码是否和数据库中的密码一致
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) {
      // return res.cc('登录失败！')
      return res.send("登陆失败")
    }
    //剔除密码头像信息
    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expireIn: '10h',//token有效期为十个小时
    })
    res.send({
      status: 0,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr,
    })

  })

  res.send('login OK')
}