const express = require("express")
const cors = require("cors")
// const joi = require('@hapi/joi')
const joi = require('joi')
//定义服务器实例
const app = express()
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
//在此配置中间件
app.use(cors())//解决接口跨域问题
app.use(express.urlencoded({ extended: false }))//解析urlencoded数据
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))




app.use(function (req, res, next) {
  //status=0为成功；status=1为失败;默认将status值设为1
  res.cc = function (err, status = 1) {
    res.send({
      status,
      //状态描述，判断err是错误对象还是字符串
      message: err instanceof ERROR ? err.message : err,
    })
  }
  next()
})

//导入路由模块
const userRouter = require("./router/user")
app.use('/api', userRouter)


//启动服务器
app.listen(8082, () => {
  console.log("express server running at https://127.0.0.1:8082")
})
//错误中间件
app.use((err, req, res, next) => {
  //数据验证失败
  if (err instanceof joi.ValidationError)
    return res.send(err.message)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError')
    // return res.cc('身份认证失败！')
    return res.send("身份认证失败")
  //未知错误
  // res.cc(err)
  res.send(err.message)
})
