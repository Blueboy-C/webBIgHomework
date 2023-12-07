
<style>
.login{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.box-card{
    width: 400px;
    height: 400px;
}



</style>
<template>

 <div class="login">
    <el-card class="box-card">
        <el-row :gutter="12">
            <el-col :span="24">
              <el-card shadow="never"> <h1>登录</h1> </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :span="24">
              <el-card shadow="hover"><input type="text" placeholder="用户名"  v-model="userName"> </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :span="24">
              <el-card shadow="hover"> <input type="text" placeholder="密码" v-model="passwd"> </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :span="24">
              <el-card shadow="always">
                <el-button type="primary" @click="signup()">注册</el-button>
                <el-button type="success" @click="userStore.login(userName,passwd)">登录</el-button>
              </el-card>
            </el-col>
        </el-row>
        
       
    </el-card>

 </div>

</template>

<script setup>
import {useUserStore} from "../stores/user"
import {ref} from "vue"
import {useRouter} from "vue-router"
import axios from  "axios"


const $router = useRouter()
const userName = ref("ikun66")
const passwd = ref("123456")

const userStore = useUserStore();

function signup(){
    axios.get(`api/user/register?name=${userName.value}&password=${passwd.value}`).then(res=>{
       if(res.status === 200){
          alert("注册成功！")
       }else alert("注册失败")
    })

    console.log("前端已死");
}
</script>