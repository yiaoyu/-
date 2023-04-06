<template>
    <div class="loginBox">
      <div class="title">Login to Account</div>
      <hr>
      <div><span class="white">账号:</span><input type="text" v-model="username" placeholder="name"></div>
      <div><span class="white">密码:</span><input type="password" v-model="pwd" placeholder="password"></div>
      <a-button class="confirmButton" @click="login">登录</a-button>
      <a-button class="confirmButton" @click="createUser">注册</a-button>
    </div>
</template>

<style lang="less" scoped>
    .loginBox{
        position: relative;
        padding-top:2px;
        top: 200px;
        width: 400px;
        height: 300px;
        font-size: 20px;
        background-color: #f5f5f5;
        margin: auto;
        text-align: center;
        border-radius: 20px;
        *{
            margin-top:9px;
        }
        box-shadow: 0 10px 10px rgba(0,0,0,0.19), 0 6px 3px rgba(0,0,0,0.23);
    }
    .confirmButton{
        background-color: #F44336; 
        margin-top:15px;
        color: white;
        text-align: center;
        display: inline-block;
        width: 80%;
    }
    .white{
        margin-right: 20px;
    }
    .title{
      font-size: 28px;
    }
</style>

<script lang="ts">
import {
  defineComponent,
  reactive,
} from 'vue';

import { message } from 'ant-design-vue';

export default defineComponent({
  name: 'login',

  components: {
  },

  computed: {
    // 计算属性
  },
  watch: {
    // 数据监听
  },
  setup() {
    return reactive({
      username:'',
      pwd:'',
    });
  },
  methods: {
    createUser(){
      fetch(`/api/createUser?name=${this.username}&pwd=${this.pwd}`).then(v=>{
        return v.text()
      }).then(v=>{
        switch(v){
          case "注册成功":
            message.success('注册成功');
            //window.location.replace("http://localhost:5500/#/chat")
            break;
          case "该名称已被使用":
            message.error('该名称已被使用')
            break; 
        }
      }).catch(err=>{
        console.log(err);
      });
    },
    login(){
      fetch(`/api/login?name=${this.username}&pwd=${this.pwd}`).then(v=>{
        return v.text()
      }).then(v=>{
        if(v == "欢迎登录"){
          message.success('欢迎登录');
          window.location.replace("http://localhost:5500/#/chat")
        }else if(v == "密码错误"){
          message.error('密码错误')
        }else{
          message.error('找不到用户或用户名错误')
        }
      }).catch(err=>{
        console.log(err);
      });
    },
  },
});
</script>