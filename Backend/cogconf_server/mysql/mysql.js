const mysql = require("mysql")
//与数据库建立连接
const db = mysql.createPool({
  host: '127.0.0.1',//我有腾讯云服务器ovo
  //后期咱们可以把数据库和服务器都运载在上面ovo
  user: 'root',
  password: 'zwy!031126',//数据库密码
  database: 'cogconf_db'
})
//测试连接
db.query("select 1", (err, results) => {
  if (err)
    return console.log(err.Message)
  else
    console.log(results)
})