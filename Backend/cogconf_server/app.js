const express = require("express")
const cors = require("cors")
//定义服务器实例
const app = express()

//在此配置中间件
app.use(cors())//解决接口跨域问题


//导入路由模块
const router = require("./apiRouter")
app.use('/api', router)

//启动服务器
app.listen(8080, () => {
  console("express server running at https://127.0.0.1")
})