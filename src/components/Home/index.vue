
<style scoped>
.home{
    width:100vw;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}

.top{
    width:100%;
    /* height:50px; */
    /* background-color:red; */
    display:flex;
    flex:0.5;
    /* background-color: red; */
    justify-content:space-between;
    align-items: center;
}

.user{
    width:50px;
    height:100%;
    border-radius:50%;
}

.main{
  flex: 9.5;
  display:flex;
  width: 100%;
  justify-content:center;
  align-items:center;
}


</style>

<template>
     <div class="home">
        <div class="top"> 
            <div style="margin-left: 20px;">
                <el-button type="primary" @click="goBack()"> <el-icon><ArrowLeftBold /></el-icon></el-button>
                <el-button type="success" @click="goforWard()"><el-icon><ArrowRightBold /></el-icon></el-button>
            </div>
            <h1>{{ $router.currentRoute.value.name }}</h1>
            <el-dropdown style="margin-right: 20px;">
            <el-button type="primary">
                用户<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                <el-dropdown-item @click="userStore.logout()">登出</el-dropdown-item>
                <el-dropdown-item @click="()=>{$router.push('/')}">首页</el-dropdown-item>
                <el-dropdown-item @click="goShopCar()">购物车</el-dropdown-item>
                <el-dropdown-item @click="goOrderForm()">我的订单</el-dropdown-item>
                </el-dropdown-menu>
            </template>
            </el-dropdown>
        </div>
        <div class="main">
            <RouterView></RouterView>
        </div> 
        <el-drawer
            v-model="goodsStore.orderDisplay"
            title="待支付订单"
            direction="rtl"
            size="50%"
        >
                <div class="perOrder">
                    <el-row :gutter="24" >
                        <el-col :span="4">
                        <el-card shadow="never" style="background-color: yellow;"><el-icon><Tickets /></el-icon>订单</el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="never">
                            生成时间：{{ new Date() }}
                            </el-card>
                        </el-col>
                        <el-col :span="12" style="text-align:center;align-self: center;">
                            <!-- <el-card shadow="hover" style="width: 100%;text-align: right;height: 100%;"> -->
                                    <span style="margin-right:50px ;">总价：{{goodsStore.orderListTotal}}元</span>
                                    <el-button type="warning"  @click="goodsStore.pay()">支付</el-button>
                                    <el-button type="danger"  @click="()=>{goodsStore.orderDisplay=false;goodsStore.orderList=[]}">取消</el-button>
                                    <span style="margin-right: 20px;"></span>
                            
                            <!-- </el-card> -->
                        </el-col>
                    </el-row>
                    <el-row :gutter="24" v-for="it in goodsStore.curOrderList" >
                        <el-col :span="14">
                        <el-card shadow="never">商品名称：{{ it.name }}</el-card>
                        </el-col>
                        <el-col :span="4">
                        <el-card shadow="never"> 数量:{{ it.num || it.count}}</el-card>
                        </el-col>
                        <el-col :span="6">
                        <el-card shadow="never"> 价格:{{ it.price ||it .price1 }}元</el-card>
                        </el-col>
                    </el-row>
                </div>
        </el-drawer>
     </div>
</template>


<script setup>
import {onMounted} from "vue"
import axios from "axios"
import {useUserStore} from "@/stores/user"
const userStore=useUserStore()
import {useGoodsStore} from "@/stores/Goods"
const goodsStore=useGoodsStore()
import {onBeforeRouteLeave, useRouter} from 'vue-router'

const $router=useRouter();
const request = axios.create({
   baseURL: "/api",
   timeout: 5000,
})

function goShopCar(){
   $router.push('/shopcar')
}

function goBack(){
    $router.back()
}

function logout(){
    $router.push('/login')
}


function goforWard(){
    $router.go(1)
}

function goOrderForm(){
    $router.push('/orders')
}
onMounted(()=>{
    goodsStore.getCar()
    goodsStore.getGoodsList()
})

</script>