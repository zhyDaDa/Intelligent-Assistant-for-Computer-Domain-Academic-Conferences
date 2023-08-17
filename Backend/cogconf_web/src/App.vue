<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <h1>注册界面</h1>
    <br/><br/>
    姓名：<input v-model='name'><br/><br/>
    密码：<input v-model='pwd'><br/><br/>
    <button @click="login()">测试注册</button>
  </div>
</template>

<script>

import axios from 'axios'
import qs from "qs"
export default {
  name: 'App',
  data(){
    return {
      name:"",
      pwd:""
    }
  },
  components: {
    
  },
  methods:{
    login(){
      // axios({
      //   method:'post',
      //   url:'http://localhost:8082/api/reguser',
      //   data:{
      //     id:2,
      //     username:'zwy',
      //     password:'123'
      //   }
      // }).then(response=>{
      //   console.log(response)
      // })
      // console.log(this._data)
      axios.post('http://localhost:8082/api/reguser',qs.stringify({username:this.name,password:this.pwd}))
      .then(response=>{
        console.log(response)
      })
    }
  }
}
</script>

<style>

</style>
