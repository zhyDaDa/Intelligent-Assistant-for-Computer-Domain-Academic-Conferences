const express = require('express')
const router = express.Router()

//在这里挂载相应的路由
//get接口
router.get("/get", (req, res) => {
  const query = req.query
  res.send({ data: query })
})
//post接口
router.post("/post", (req, res) => {

})




module.exports = {
  router
}