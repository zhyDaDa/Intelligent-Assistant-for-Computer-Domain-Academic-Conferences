const mysql = require("mysql")
//与数据库建立连接
const db = mysql.createPool({
  host: '127.0.0.1',//我有腾讯云服务器ovo
  //后期咱们可以把数据库和服务器都运载在上面ovo
  user: 'root',
  password: 'zwy!031126',//数据库密码
  database: 'cogconf_db'
})
// //测试连接
// const user = {
//   id: 6,
//   name: 'Spiderman'
// }
// // const sqlStr = "select * from users"
// const sqlStr = "insert into users (id,name) values (?,?)"
// db.query(sqlStr, [user.id, user.name], (err, results) => {
//   if (err)
//     return console.log(err.Message)
//   else
//     //select语句结果为数组
//     console.log(results)
// })

//向外共享db数据库连接对象
module.exports = db