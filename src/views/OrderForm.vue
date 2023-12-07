<template>
    <div class="orderForm" v-if="goodsStore.orderList.length>0">
        <div class="perOrder" v-for="item,index in goodsStore.orderList">
            <el-row :gutter="24" >
                <el-col :span="4">
                <el-card shadow="never" style="background-color: yellow;"><el-icon><Tickets /></el-icon>订单{{index+1}}</el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="never">
                       生成时间：{{ item.orderTime }}
                    </el-card>
                </el-col>
                <el-col :span="12" style="text-align:right;align-self: center;">
                    <!-- <el-card shadow="hover" style="width: 100%;text-align: right;height: 100%;"> -->
                            <span style="margin-right:200px ;">总价：{{item.total}}元</span>
                            <el-button type="warning" @click="goodsStore.pay()">支付</el-button>
                            <el-button type="danger" @click="cancelOrder">取消</el-button>
                            <span style="margin-right: 20px;"></span>
                       
                    <!-- </el-card> -->
                </el-col>
            </el-row>
             <el-row :gutter="24" v-for="it in item.orderDetail" >
                <el-col :span="14">
                <el-card shadow="never">商品名称：{{ it.goodsName }}</el-card>
                </el-col>
                <el-col :span="4">
                <el-card shadow="never"> 数量:{{ it.nums.split(',')[0] }}</el-card>
                </el-col>
                <el-col :span="6">
                <el-card shadow="never"> 价格:{{ it.nums.split(',')[1].split('=')[1] }}元</el-card>
                </el-col>
            </el-row>
        </div>
    </div>
    <h1 v-else>暂无订单</h1>
  </template>
  
  <script setup lang="ts">
  import { computed, ref ,onMounted} from 'vue'
  import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User,
  } from '@element-plus/icons-vue'
  
import { useGoodsStore } from '@/stores/Goods';
const goodsStore = useGoodsStore();
onMounted(()=>{
    goodsStore.getOrderList()
})

function cancelOrder(){
   alert("取消成功！")
}




  </script>
  
  <style scoped>

  .orderForm{
    width: 90vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    /* align-items: center;
    justify-content: center; */
    overflow-y:scroll;
  }

  .perOrder{
     margin: 10px;
     border: 2px solid rgb(131, 139, 231);
  }
  </style>
  